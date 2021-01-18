import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/RecipeList.css'

export default class UserRecipe extends React.Component {

    state={
        currentRecipe: []
    }

    handleClick = (e) => {
        fetch(`http://localhost:3000/getrecipedetails?id=${e.target.id}`)
        .then(resp => resp.json())
        .then(data => {
            debugger
        })
    }

    handleDelete = (e) => {
        debugger
    }

    render(){
        return(
            <div className='recipe_card'>
                {/* render 3 columns of recipes */}
                {this.props.recipes ?
                    this.props.recipes.map(recipe =>
                        <Card border="success" style={{ width: '18rem' }} >

                            <Card.Img variant="top" src={recipe.img_url} />

                            <Card.Body>
                                <Card.Title onClick={this.handleClick} id={recipe.recipe_id}>{recipe.name}</Card.Title>
                                <Card.Text>
                                <Button variant='danger' onClick={this.handleDelete}>Remove</Button>
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    ) : null
                }
            </div>
        )
    }
}