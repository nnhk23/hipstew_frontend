import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import RecipeDetails from './RecipeDetails'
import '../css/ChatBotRecipes.css'

export default class ChatBotRecipes extends React.Component{

    render(){

        const { recipes, speak } = this.props

        return(
            <div>
                <Row>
                    <Col>
                        <h5 style={{ fontWeight: 'bold', color: '#225f5f' }} >Stewy</h5>
                    </Col>

                    {recipes.length !== 0 ?
                        <Col>
                            <h5>Here are some recipes for you.</h5>
                        </Col> 
                        :
                        <Col>
                            <h5>Sorry, there is no more recipe for this keyword..</h5>
                            {speak('Sorry, there is no more recipe for this keyword.')}
                        </Col>
                    }
                    
                </Row>

                <Row className='chatbot-recipe-result'>
                    <Col xs={12} style= {{display: 'inline-flex', flexWrap: 'wrap', margin: 'auto'}}>
                        {recipes.map(recipe => 
                                <Card style={{ width: '19rem', height: '20rem', marginRight: '5px' }}>
                                    <Card.Img variant="top" src={recipe.image} />

                                    <Card.Body>
                                        <Card.Title 
                                        // onClick={this.handleClick} 
                                        id={recipe.id} >{recipe.title}</Card.Title>
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
