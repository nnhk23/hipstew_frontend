import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../css/ChatBotRecipes.css'

export default class ChatBotRecipes extends React.Component{

    render(){

        const { recipes } = this.props
        console.log(recipes, 'from chatbotrecipes')

        return(
            <div>
                <Row>
                    <Col>
                        <h5>Stewy</h5>
                    </Col>

                    <Col>
                        <h5>Here are some recipes for you.</h5>
                    </Col> 
                </Row>

                <Row className='chatbot-recipe-result'>
                    <Col xs={12} style= {{display: 'inline-flex', flexWrap: 'wrap', margin: 'auto'}}>
                        {recipes.map(recipe => 
                                <Card style={{ width: '19rem', height: '20rem', 'margin-right': '5px' }}>
                                    <Card.Img variant="top" src={recipe.image} />

                                    <Card.Body>
                                        <Card.Title id={recipe.id} >{recipe.title}</Card.Title>
                                    </Card.Body>

                                </Card>
                            )
                        }
                    </Col>
                </Row>
            </div>
            
        )
    }
}
