import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/RecipeList.css'

export default class RecipeList extends React.Component {

    state={
        recipes: [],
        ingredients: [],
        error: null,
        recipeAmount: 0
    }

    componentDidMount() {

        fetch(`http://localhost:3000/getrecipe?ingredients=${this.props.ingredients}`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            if (data.error){
                this.setState({ error: data.error })
            } else {
                this.setState({ recipes: data })
            }
        })
    }

    handleClick = (e) => {
        // debugger
        // e.target.id? to pass down recipe's id to backend => fetch API
        this.props.renderRecipeDetails(e.target.id, 'list')
    }

    handleMoreRecipes = () => {
        if (this.state.recipeAmount === 48) {
            this.setState({ recipeAmount: 0 })
            alert('Reached the end of result :).')
        } else {
            this.setState(prevState => {
                return{ recipeAmount: prevState.recipeAmount + 12}
            })
        }
    }

    render(){
        const num = this.state.recipeAmount
        return(
            <div className='recipe_card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.recipes.length === 0 ? <h2>Loading Results...</h2> :
                        this.state.recipes.slice(num, num+12).map(recipe => 
                            <Card style={{ width: '19rem', height: '20rem' }} className='individual-card' >
                                <Card.Img variant="top" src={recipe.image} />

                                <Card.Body>
                                    <Card.Title onClick={this.handleClick} id={recipe.id} className='recipe-img'>{recipe.title}</Card.Title>
                                </Card.Body>

                            </Card>
                        )
                }

                {this.state.recipes.length !== 0 ? 
                    <Button size="lg" block className='more-btn' variant='outline-warning' onClick={this.handleMoreRecipes}>More Recipes</Button> 
                    : null
                }
            </div>
        )
    }
}