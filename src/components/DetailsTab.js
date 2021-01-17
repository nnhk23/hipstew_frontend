import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DetailsTab = ({ ingredients, instruction }) => {

    const [key, setKey] = useState('ingredients')

    return(
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >

            <Tab eventKey="ingredients" title="Ingredients">
                {/* render ingrdients */}
                <ListGroup variant="flush">
                    {ingredients.map(ingredient => 
                        <ListGroup.Item>
                            <Row>
                                <Col>{` ${ingredient["measures"]["us"].amount} ${ingredient["measures"]["us"].unitLong}`}</Col>
                                
                                <Col>{ingredient.name}</Col>

                                <Col> <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt='ingredient-pic' /> </Col>
                            </Row>
                        </ListGroup.Item>)
                    }
                </ListGroup>
            </Tab>

            <Tab eventKey="instruction" title="Instruction">
                {/* render instruction */}
                <ListGroup variant="flush">
                    {instruction[0].steps.map(step => 
                        <ListGroup.Item>
                            <h2>Step {step.number}:</h2>
                            <p>{step.step}</p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Tab>

        </Tabs>
    )
}

export default DetailsTab