import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../css/IngredientList.css'

export default class IngredientList extends React.Component {

    state={
        ingredients: [],
        error: null,
        ingredientId: null,
        ingrAmount: 0
    }

    componentDidMount() {

        fetch(`https://hipstew-backend.herokuapp.com/getingredients?ingredient=${this.props.ingredient}`)
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
        debugger
        const { name, image } = ingredient
        fetch('https://hipstew-backend.herokuapp.com/ingredients', {
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
                fetch('https://hipstew-backend.herokuapp.com/user_ingres', {
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

    handleMoreIngredients = () => this.setState(prevState => {return{ ingrAmount: prevState.ingrAmount + 9 }})
        
    render(){
        const num = this.state.ingrAmount
        return(
            <div className='ingr-card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.ingredients.length === 0 ? <>
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                    </> : 
                        this.state.ingredients.slice(0, num+9).map(ingredient => 
                            <Card className='individual-card' style={{ width: '18rem', height: '26rem' }} >
                                <Card.Img id='ingr-img-card' variant="top" src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`} />
                                <Card.Title >{ingredient.name}</Card.Title>

                                <Card.Body>
                                    {this.props.userId ? 
                                        <Button variant="danger" onClick={() => this.handleBookmark(ingredient)} id={ingredient.id}>Bookmark</Button> : <h5>Please log in to unlock extra functionality!</h5> 
                                    }
                                </Card.Body>

                            </Card>
                        )
                }

                {this.state.ingredients.length !== 0 && this.state.ingredients.length > this.state.ingrAmount+9 ? 
                    <Button size="lg" block className='more-btn' variant='warning' onClick={this.handleMoreIngredients}>More Result</Button> 
                    : null
                }
            </div>  
        )
    }
}