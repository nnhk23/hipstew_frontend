import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'

import DetailsTab from './DetailsTab'
import AmountUnit from './AmountUnit'
import '../css/UserRecipeDetails.css'

export default class UserRecipeDetails extends React.Component {

    state={
        currentRecipe: [],
        recipeImage: '',
        unit: 'us',
        servings: null,
        OGservings: null
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ currentRecipe: data, recipeImage: data.image, servings: data.servings, OGservings: data.servings })})
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

    handleBackButton = () => this.props.history.push('/userrecipes')

    render(){
        return(
            <div id='user-recipe' className='user-recipe-details'>
                {this.state.currentRecipe.length !== 0 ? 
                    <>

                        <Row className='title-row'>
                            
                                <Col xs={2}>
                                    <Button variant='danger' onClick={this.handleBackButton} className='back-btn'>❮</Button> 
                                </Col> 
                                <Col xs={7}>
                                    <h1 className='recipe-title'>
                                {`  ${this.state.currentRecipe.title}  `} </h1>
                                </Col>

                                <Col xs={2}>
                                    <h5 className='prepTime'>{this.state.currentRecipe.readyInMinutes} minutes</h5>
                                </Col>
                           
                        </Row>

                        <Row style={{ width: '1300px' }}>
                            <Col xs={7}>
                                <div className='amount-unit'>
                                    {/* render servings amount and measurement unit for ingredient */}
                                    <Row>
                                        <Col>
                                            <AmountUnit unitConversion={this.unitConversion} updateServings={this.updateServings} servings={this.state.servings}/>
                                        </Col>
                                    </Row>
                                    

                                    {/* recipe photo and bookmark button */}
                                    <Card style={{ width: '40rem' }} className="text-center recipe-card">
                                        <Card.Img variant="top" src={this.state.recipeImage} />

                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col><h3>Diets: </h3></Col>
                                                        {this.state.currentRecipe.diets.map( diet => <Col>{diet}</Col> )}
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
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
                    </> : null
                }
            </div>
        )
    }
}