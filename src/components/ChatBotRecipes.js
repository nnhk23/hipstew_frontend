import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class ChatBotRecipes extends React.Component{

    render(){

        const { recipes } = this.props
        console.log(recipes, 'from chatbotrecipes')

        return(
            <div className='recipe-card' >
                <Row>
                    <Col>
                        <h6>Stewy</h6>
                    </Col>

                    <Col>
                        <h6>Here are some recipes for you.</h6>
                    </Col> 
                </Row>

                <Row>
                    <Col style= {{display: 'inline-flex', 'flex-wrap': 'wrap', margin: 'auto'}}>
                        {recipes.map(recipe => 
                                <Card style={{ width: '19rem', height: '20rem' }}>
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
