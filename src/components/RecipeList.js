import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../css/RecipeList.css'

export default class RecipeList extends React.Component {

    state={
        recipes: [],
        ingredients: [],
        error: null,
        recipeAmount: 0
    }

    componentDidMount() {

        fetch(`https://hipstew-backend.herokuapp.com/getrecipe?ingredients=${this.props.ingredients}`)
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
        // e.target.id? to pass down recipe's id to backend => fetch API
        this.props.renderRecipeDetails(e.target.id, 'list')
    }

    handleMoreRecipes = () => this.setState(prevState => {return{ recipeAmount: prevState.recipeAmount + 9 }})
        

    render(){
        const num = this.state.recipeAmount
        return(
            <div className='recipe_card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.recipes.length === 0 ? <>
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="success" />
                    </> :
                        this.state.recipes.slice(0, num+9).map(recipe => 
                            <Card style={{ width: '19rem', height: '20rem' }} className='individual-card' >
                                <Card.Img variant="top" src={recipe.image} />

                                <Card.Body>
                                    <Card.Title onClick={this.handleClick} id={recipe.id} className='recipe-img'>{recipe.title}</Card.Title>
                                </Card.Body>

                            </Card>
                        )
                }

                {this.state.recipes.length !== 0 && this.state.recipeAmount !== 45 ? 
                    <Button size="lg" block id='more-btn' variant='warning' onClick={this.handleMoreRecipes}>More Recipes</Button> 
                    : null
                }
            </div>
        )
    }
}