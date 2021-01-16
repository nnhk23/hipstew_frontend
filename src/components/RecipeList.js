import React from 'react'
import Card from 'react-bootstrap/Card'
import '../css/RecipeList.css'

export default class RecipeList extends React.Component {

    state={
        recipes: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipe?ingredients=${this.props.ingredients}`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState({ recipes: data })
        })
    }

    handleClick = (e) => {
        debugger
        this.props.renderRecipeDetails(e.target.id)
        // e.target.id? to pass down recipe's id to backend => fetch API
    }

    render(){
        return(
            <div>
                List of recipes based on search term
                {/* render 3 columns of recipes */}
                {/* sorted by fastest prep time/healthiest/cheapest per serving */}
                {this.state.recipes.map(recipe => 
                    <Card border="success" style={{ width: '18rem' }} className='recipe_card'>
                        <Card.Img variant="top" src={recipe.image} />

                        <Card.Body>
                            <Card.Title onClick={this.handleClick} id={recipe.id}>{recipe.title}</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>

                    </Card>
                )}
            </div>
        )
    }
}