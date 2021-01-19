import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import DetailsTab from './DetailsTab'
import AmountUnit from './AmountUnit'

export default class RecipeDetails extends React.Component  {

    state = {
        currentRecipe: [],
        recipeImage: '',
        recipeId: null,
        unit: 'us'
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => this.setState({ currentRecipe: data, recipeImage: data.image }))
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

    // set ingredient measurements (standard/metric units)
    unitConversion = (unit) => this.setState({ unit })

    render(){
        return(
            <div>
                <div>
                    <Button onClick={this.props.handleBackButton}>Back</Button>
                    <h1> {this.state.currentRecipe.title} </h1>
                </div>
                <Row>
                    <Col>
                        <div>
                            {/* render servings amount and measurement unit for ingredient */}
                            <AmountUnit currentRecipe={this.state.currentRecipe} unitConversion={this.unitConversion} />

                            {/* recipe photo and bookmark button */}
                            <Card style={{ width: '40rem' }} className="text-center">
                                <Card.Img variant="top" src={this.state.recipeImage} />

                                <Card.Body>
                                    <Button variant="danger" onClick={() => this.handleBookmark(this.state)}>Bookmark</Button>
                                </Card.Body>

                            </Card>
                        </div>
                    </Col>

                    <Col>
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
                            /> : null
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
