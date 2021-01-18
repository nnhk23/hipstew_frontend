import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import DetailsTab from './DetailsTab'
import AmountUnit from './AmountUnit'

export default class UserRecipeDetails extends React.Component {

    state={
        currentRecipe: [],
        recipeImage: '',
        unit: 'us'
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => this.setState({ currentRecipe: data, recipeImage: data.image }))
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
                <h1> {this.state.currentRecipe.title} </h1>
                <Row>
                    <Col>
                        <div>
                            {/* render servings amount and measurement unit for ingredient */}
                            <AmountUnit currentRecipe={this.state.currentRecipe} unitConversion={this.unitConversion} />

                            {/* recipe photo and bookmark button */}
                            <Card style={{ width: '40rem' }} className="text-center">
                                <Card.Img variant="top" src={this.state.recipeImage} />

                                <Card.Body>
                                    <Button variant='outline-danger' onClick={this.props.handleDelete}>Remove</Button>
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