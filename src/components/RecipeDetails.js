import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import DetailsTab from './DetailsTab'
import AmountUnit from './AmountUnit'
import '../css/RecipeDetails.css'

export default class RecipeDetails extends React.Component  {

    state = {
        currentRecipe: [],
        recipeImage: '',
        recipeId: null,
        unit: 'us',
        servings: null,
        OGservings: null,
        liked: null,
        userRecipeId: null
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => this.setState({ currentRecipe: data, recipeImage: data.image, servings: data.servings, OGservings: data.servings }))

        if (this.props.userId){
            this.checkUserBookmarkedList()
        }
    }

    checkUserBookmarkedList = () => {
        fetch(`http://localhost:3000/users/${this.props.userId}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.user_recipes.filter(recipe => recipe.recipe_id === this.state.currentRecipe.id).length === 0){
                this.setState({ liked: false })
            } else { this.setState({ liked: true })}
        })
    }

    handleBookmark = (recipe) => {
        const { currentRecipe, recipeImage } = recipe
        // save recipe to database (create new Recipe)
        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: currentRecipe.title,
                img_url: recipeImage,
                recipe_id: currentRecipe.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({ recipeId: data.id }, () => {
                // post request to create UserRecipe
                fetch('http://localhost:3000/user_recipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: this.props.userId,
                        recipe_id: this.state.recipeId
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({ userRecipeId: data.id })
                    alert('Recipe Bookmarked :)')
                })
            })
        })
    }

    handleRemoveBookMark = () => {
        // debugger
        fetch(`http://localhost:3000/user_recipes/${this.props.userRecipeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            alert('Successfully remove recipe from list')
        })
    }

    toggleLike = () => this.setState(prevState => {
        return{
            liked: !prevState.liked
        }
    })

    getAnalyzedInstruction = () => {
        fetch(`http://localhost:3000/getrecipeinstruction?sourceUrl=${this.state.currentRecipe.sourceUrl}`)
        .then(resp => resp.json())
        .then(data => this.setState({ currentRecipe: data }))
    }

    updateServings = (servings) => this.setState({ servings })

    // set ingredient measurements (standard/metric units)
    unitConversion = (unit) => this.setState({ unit })

    render(){
        const changeColor = this.state.liked ? 'white' : 'grey'
        const changeBackground = this.state.liked ? 'red' : 'rgb(220, 215, 215)'
        return(
            <div  className='recipe-details'>
                {/* render servings amount and measurement unit for ingredient */}
                <Row className='title-row'>
                        
                            <Col className='back-btn-holder' xs={2}>
                                <Button onClick={this.props.handleBackButton} className='back-btn'>❮</Button> 
                            </Col> 
                            <Col xs={7}>
                                <h1 className='recipe-title'>
                            {`  ${this.state.currentRecipe.title}  `} </h1>
                            </Col>

                            <Col xs={2}>
                                <h5 className='prepTime'>{this.state.currentRecipe.readyInMinutes} minutes</h5>
                            </Col>
                        
                    </Row>

                    <Row style={{ width: '100%' }}>
                        <Col xs={7}>
                            <div>
                                {/* render servings amount and measurement unit for ingredient */}
                                <Row>
                                    <Col>
                                        {/* render unit toggle button and servings amount */}
                                        <AmountUnit currentRecipe={this.state.currentRecipe} unitConversion={this.unitConversion} updateServings={this.updateServings} servings={this.state.servings}/>
                                    </Col>
                                </Row>
                
                                {/* recipe photo and bookmark button */}
                                <Card style={{ width: '40rem' }} className="text-center recipe-card">
                                    <Card.Img variant="top" src={this.state.recipeImage} />

                                    <Card.Body>
                                        {this.props.userId ? 
                                            <button 
                                                onClick={() => {
                                                    this.toggleLike()
                                                    this.state.liked ?this.handleRemoveBookMark() : this.handleBookmark(this.state)
                                                }} 
                                                className='like-btn'
                                                style={{ background: changeBackground }}
                                            >
                                                <i className="fa fa-heart" style={{ color: changeColor }}></i>
                                            </button>
                                            : 
                                            <h5>Please log in to unlock extra functionality.</h5> 
                                        }
                                    </Card.Body>

                                </Card>
                            </div>
                        </Col>

                        <Col xs={5}>
                            {/* recipe's details including ingredients and instruction */}
                            {this.state.currentRecipe.length !== 0 ? 
                                <DetailsTab
                                    unit={this.state.unit}
                                    ingredients={this.state.currentRecipe.extendedIngredients} 
                                    // check if analyzed instruction exist
                                    instruction={this.state.currentRecipe.analyzedInstructions.length === 0 ?
                                        this.getAnalyzedInstruction() : 
                                        this.state.currentRecipe.analyzedInstructions
                                    } 
                                    servings={this.state.servings}
                                    OGservings={this.state.OGservings}
                                /> : null
                            }
                        </Col>
                </Row>
            </div>
        )
    }
}

