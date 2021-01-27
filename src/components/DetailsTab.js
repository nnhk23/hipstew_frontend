import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DetailsTab = ({ ingredients, instruction, unit, servings, OGservings }) => {

    const [key, setKey] = useState('ingredients')

    const equipments = instruction ? instruction[0].steps.map(step => step.equipment) : []

    return(
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {setKey(k)}}
        >

            <Tab eventKey="ingredients" title="Ingredients">
                {/* render ingrdients */}
                <ListGroup variant="flush">
                    {ingredients.map(ingredient => 
                        <ListGroup.Item>
                            <Row>
                                <Col>{` ${Math.ceil(ingredient["measures"][unit].amount / OGservings)*servings} ${ingredient["measures"][unit].unitLong}`}</Col>
                                
                                <Col>{ingredient.name}</Col>

                                <Col> <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt='ingredient-pic' /> </Col>
                            </Row>
                        </ListGroup.Item>)
                    }
                </ListGroup>
            </Tab>

            <Tab eventKey="cookwares" title="Cookwares" style={{ height: 'auto' }}>
                {/* render cookware */}
                <ListGroup variant="flush">
                    {equipments.length !== 0 ?
                        equipments.map((equipmentArr, idx) => 
                            <div>
                                {equipmentArr.length !== 0 ?
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={2} style={{ color: '#6b351ca6' }}> 
                                                <h2>{idx+1}</h2> 
                                            </Col>   

                                            <Col>
                                                {equipmentArr.map(equipment => 
                                                    <Row>
                                                        <Col>{equipment.name}</Col>
                                                        <Col><img src={`https://spoonacular.com/cdn/equipment_100x100/${equipment.image}`} alt='equipment-img' /></Col>
                                                    </Row>
                                                )}
                                            </Col>
                                        </Row> 
                                    </ListGroup.Item> : null
                                }
                            </div>) : <h5>No equipment required</h5>
                    }
                </ListGroup>
            </Tab>


            <Tab eventKey="instruction" title="Instruction">
                {/* render instruction */}
                <ListGroup variant="flush">
                    {instruction ? instruction[0].steps.map(step => 
                        <ListGroup.Item>
                            <Row>
                                <Col xs={2} style={{ color: '#6b351ca6' }}> <h2>{step.number}</h2> </Col>                            
                                <Col> <p style={{ textAlign: 'left' }}>{step.step}</p> </Col>
                            </Row>
                        </ListGroup.Item>
                    ) : null}
                </ListGroup>
            </Tab>

        </Tabs>
    )
}

export default DetailsTab