import React from 'react'
import Card from 'react-bootstrap/Card'
import '../css/RecipeList.css'

export default class RecipeList extends React.Component {

    state={
        recipes: [],
        ingredients: [],
        error: null
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

    render(){
        return(
            <div className='recipe_card'>
                {this.state.error ? <h2>{this.state.error}</h2> : 
                    this.state.recipes.length === 0 ? <h2>Loading Results...</h2> :
                        this.state.recipes.map(recipe => 
                            <Card border="success" style={{ width: '19rem' }} >
                                <Card.Img variant="top" src={recipe.image} />

                                <Card.Body>
                                    <Card.Title onClick={this.handleClick} id={recipe.id} className='recipe-img'>{recipe.title}</Card.Title>
                                </Card.Body>

                            </Card>
                        )
                }
            </div>
        )
    }
}