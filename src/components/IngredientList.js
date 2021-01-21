import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/IngredientList.css'

export default class IngredientList extends React.Component {

    state={
        ingredients: [],
        error: null,
        ingredientId: null,
        ingrAmount: 0
    }

    componentDidMount() {

        fetch(`http://localhost:3000/getingredients?ingredient=${this.props.ingredient}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.error){
                this.setState({ error: data.error })
            } else {
                this.setState({ ingredients: data.results })
            }
        })

    }

    handleBookmark = (ingredient) => {
        const { name, image } = ingredient
        fetch('http://localhost:3000/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name ,
                img_url: `https://spoonacular.com/cdn/ingredients_500x500/${image}`
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({ ingredientId: data.id }, () => {
                fetch('http://localhost:3000/user_ingres', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: this.props.userId,
                        ingredient_id: this.state.ingredientId
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    alert('Ingredient Bookmarked :)')
                })
            })
        })
    }

    handleMoreIngredients = () => {
        if (this.state.ingrAmount === 16) {
            this.setState({ ingrAmount: 0 })
            alert('Reached the end of result :).')
        } else {
            this.setState(prevState => {
                return{ ingrAmount: prevState.ingrAmount + 8}
            })
        }
    }

    render(){
        const num = this.state.ingrAmount
        return(
            <div className='ingr-card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.ingredients.length === 0 ? <h2>Loading Results...</h2> : 
                        this.state.ingredients.slice(num, num+8).map(ingredient => 
                            <Card className='individual-card' style={{ width: '18rem', height: '26rem' }} >
                                <Card.Img variant="top" src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`} className='ingr-img-card' />
                                <Card.Title >{ingredient.name}</Card.Title>

                                <Card.Body>
                                    {this.props.userId ? 
                                        <Button variant="danger" onClick={() => this.handleBookmark(ingredient)} id={ingredient.id}>Bookmark</Button> : <h5>Please log in to unlock extra functionality :)</h5> 
                                    }
                                </Card.Body>

                            </Card>
                        )
                }

                {this.state.ingredients.length !== 0 ? 
                    <Button size="lg" block className='more-btn' variant='outline-warning' onClick={this.handleMoreIngredients}>More Result</Button> 
                    : null
                }
            </div>  
        )
    }
}