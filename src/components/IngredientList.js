import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/RecipeList.css'

export default class IngredientList extends React.Component {

    state={
        ingredients: [],
        error: null,
        ingredientId: null
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

    render(){
        return(
            <div className='recipe_card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.ingredients.length === 0 ? <h2>Loading Results...</h2> : 
                        this.state.ingredients.map(ingredient => 
                            <Card border="success" style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={`https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`} />
                                <Card.Title >{ingredient.name}</Card.Title>

                                <Card.Body>
                                    <Button variant="danger" onClick={() => this.handleBookmark(ingredient)} id={ingredient.id}>Bookmark</Button>
                                </Card.Body>

                            </Card>
                        )
                }
            </div>  
        )
    }
}