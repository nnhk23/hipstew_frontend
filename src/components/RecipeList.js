import React from 'react'
import Card from 'react-bootstrap/Card'
import '../css/RecipeList.css'

export default class RecipeList extends React.Component {

    state={
        recipes: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipe?ingredients=${this.props.ingredients}`)
        // fetch('http://localhost:3000/recipes')
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState({ recipes: data })
        })
    }

    handleClick = (e) => {
        // debugger
        // e.target.id? to pass down recipe's id to backend => fetch API
        this.props.renderRecipeDetails(e.target.id)
    }

    render(){
        return(
            <div className='recipe_card'>
                {this.state.recipes.length === 0 ? <h2>Sorry, there is no recipe for {this.props.ingredients} :(. Please try another search term.</h2> : 
                this.state.recipes.map(recipe => 
                    <Card border="success" style={{ width: '18rem' }} >
                        <Card.Img variant="top" src={recipe.image} />

                        <Card.Body>
                            <Card.Title onClick={this.handleClick} id={recipe.id}>{recipe.title}</Card.Title>
                        </Card.Body>

                    </Card>
                )}
            </div>
        )
    }
}