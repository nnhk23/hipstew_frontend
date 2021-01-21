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
        OGservings: null
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => this.setState({ currentRecipe: data, recipeImage: data.image, servings: data.servings, OGservings: data.servings }))
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
            // debugger
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
                    alert('Recipe Bookmarked :)')
                })
            })
        })
        
        

    }

    getAnalyzedInstruction = () => {
        fetch(`http://localhost:3000/getrecipeinstruction?sourceUrl=${this.state.currentRecipe.sourceUrl}`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState({ currentRecipe: data })
        })
    }

    updateServings = (servings) => this.setState({ servings })

    // set ingredient measurements (standard/metric units)
    unitConversion = (unit) => this.setState({ unit })

    render(){
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

                    <Row style={{ width: '1400px' }}>
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
                                            // <Button variant="danger" onClick={() => this.handleBookmark(this.state)}>Bookmark</Button> 
                                            <button onClick={() => this.handleBookmark(this.state)} className='like-btn'>
                                                <i className="fa fa-heart" style={{ color: "grey" }}></i>
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

