import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import DetailsTab from './DetailsTab'
import AmountUnit from './AmountUnit'

export default class RecipeDetails extends React.Component  {

    state = {
        currentRecipe: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState({ currentRecipe: data })
        })
    }

    handleBookmark = (e) => {
        debugger
        // post request to create UserRecipe
    }

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
                            <AmountUnit currentRecipe={this.state.currentRecipe} />
                            {/* <ButtonGroup>
                                <DropdownButton 
                                    id="dropdown-success-button" 
                                    title={`${this.state.currentRecipe.servings} Servings`}
                                    variant="success"
                                    size="sm"
                                >
                                    <Dropdown.Item href="#/action-1">{`${this.state.currentRecipe.servings} Servings`}</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">{`${this.state.currentRecipe.servings} Servings`}</Dropdown.Item>
                                </DropdownButton>

                                <Button size="sm" >US Unit</Button>
                                <Button size="sm" >Metric Unit</Button>
                            </ButtonGroup> */}

                            {/* recipe photo and bookmark button */}
                            <Card style={{ width: '40rem' }} className="text-center">
                                <Card.Img variant="top" src={this.state.currentRecipe.image} />

                                <Card.Body>
                                    <Button variant="danger" onClick={this.handleBookmark}>Bookmark</Button>
                                </Card.Body>

                            </Card>
                        </div>
                    </Col>

                    <Col>
                        {/* recipe's details including ingredients and instruction */}
                        {this.state.currentRecipe.length !== 0 ? <DetailsTab ingredients={this.state.currentRecipe.extendedIngredients} instruction={this.state.currentRecipe.analyzedInstructions} /> : null}
                    </Col>
                </Row>
            </div>
        )
    }
}
