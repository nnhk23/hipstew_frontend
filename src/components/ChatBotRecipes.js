import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class ChatBotRecipes extends React.Component{

    // state = {
    //     currentRecipeSet: []
    // }

    // componentDidMount(){
    //     this.setState({ 
    //             currentRecipeSet: this.props.recipes.slice(this.props.recipeAmount, this.props.recipeAmount+9) 
    //         }, () => this.props.saveHistory(this.state.currentRecipeSet)
    //     )
        
    // }

    render(){

        const { recipes, recipeAmount } = this.props

        return(
            <div className='recipe-card' >
                <Row>
                    <Col>
                        <h6>Hippy</h6>
                    </Col>

                    {recipeAmount !== 19 ?
                        <Col>
                            <h6>Here are some recipes for you.</h6>
                        </Col> 
                        :
                        <Col>
                            <h6>Sorry, there is no more result for this keyword.</h6>
                        </Col> 
                    }
                </Row>

                <Row>
                    <Col style= {{display: 'inline-flex', 'flex-wrap': 'wrap', margin: 'auto'}}>
                        {recipeAmount !== 19 ? 
                            recipes.slice(recipeAmount, recipeAmount+9).map(recipe => 
                                <Card style={{ width: '19rem', height: '20rem' }}>
                                    <Card.Img variant="top" src={recipe.image} />

                                    <Card.Body>
                                        <Card.Title id={recipe.id} >{recipe.title}</Card.Title>
                                    </Card.Body>

                                </Card>
                            ) 
                            : null
                        }
                    </Col>
                </Row>
            </div>
            
        )
    }
}
