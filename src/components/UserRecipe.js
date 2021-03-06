import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import UserRecipeDetails from './UserRecipeDetails'
import '../css/UserRecipe.css'

export default class UserRecipe extends React.Component {

    handleDelete = (e) => {
        // remove a recipe from favorite list
        fetch(`https://hipstew-backend.herokuapp.com/user_recipes/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            alert('Successfully remove recipe from list')
            window.location.reload();
        })
    }

    render(){
        return(
            <div className='user-cards'>
                {/* render 3 columns of recipes */}
                {this.props.recipeId ? 
                    <UserRecipeDetails history={this.props.history} recipeId={this.props.recipeId} handleDelete={this.handleDelete} /> : 
                        this.props.recipes ? this.props.recipes.length === 0 ? <h5>Recipe List is empty :(...</h5> :
                        this.props.recipes.map(recipe =>
                            <Card className='user-recipe-card' style={{ width: '18rem', height: '24rem', borderRadius: '10px' }} >
                                
                            <Link to={`userrecipes/${recipe.recipe_id}`}><Card.Img style={{ borderRadius: '10px' }} variant="top" src={recipe.img_url} /></Link>

                                <Card.Body>
                                    <Card.Title onClick={this.handleClick} id={recipe.recipe_id}>{recipe.name}</Card.Title>
                                    <Card.Text>
                                        <Button id={recipe.user_recipe_id} variant='danger' onClick={this.handleDelete}>Remove</Button>
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        ) : null
                }
            </div>
        )
    }
}