import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ChatBotRecipes from './ChatBotRecipes'
import '../css/ChatBot.css'


export default class ChatBot extends React.Component {

    state={
        userInput: '',
        instruction: false,
        dish: '',
        ingredients: '',
        recipes: [],
        botReply: null,
        userHistory: [],
        botHistory: []
    }

    handleChange = (e) => this.setState({ userInput: e.target.value})

    onKeyUp = (e) => {
        if(e.key === "Enter"){
            this.setState(prevState => {
                return{ 
                    userHistory: [...prevState.userHistory, e.target.value], 
                    recipes: [],
                    userInput: ''
                }
            })

            this.getData()
        }
    }

    getData = () => {
        // check if this.state.userInput has 'recipe' / 'food trivia' / 'joke' / a number in it
        // 1. 'recipe' : fetch data from `http://localhost:3000/detectfood?userInput=${this.state.userInput}` to extract food/ingredients
        // 2. 'food trivia' : fetch data from "http://localhost:3000/foodtrivia"
        // 3. 'food joke' : fetch data from "http://localhost:3000/foodjokes"
        // 4. a number in it : fetch data from "http://localhost:3000/quickanswer"

        let userInput = this.state.userInput

        if(userInput.includes('recipe')){
            this.detectFoodInText()
        } else if (userInput.includes('food trivia')){
            this.getFoodTrivia()
        } else if (userInput.includes('food joke')){
            this.getFoodJoke()
        } else {
            const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

            for(let i=0; i < nums.length; i++){
                if (userInput.includes(nums[i])){
                    return this.getUnitConversion()
                }
            }
        }
        
    }

    detectFoodInText = () => {
        fetch(`http://localhost:3000/detectfood?userInput=${this.state.userInput}`)
        .then(resp => resp.json())
        .then(data => {
            // only get 1 dish out of user's input
            let dish = data.annotations.filter(annotation => annotation.tag === "dish")[0].annotation

            // get all ingredients in user's input in a format: ingre 1, ingre 2
            let ingredients = data.annotations.filter(annotation => annotation.tag === "ingredient").map(ing => ing.annotation).join(', ')

            // set state then get recipes from api
            this.setState({ dish, ingredients }, () => {
                fetch(`http://localhost:3000/complexrecipesearch?ingredients=${this.state.ingredients}&dish=${this.state.dish}`)
                .then(resp => resp.json())
                .then(data => {
                    this.setState(prevState => {
                        return{ recipes: data.results, botHistory: [...prevState.botHistory, data.results] }
                    })
                })
            })
        })
    }

    getFoodTrivia = () => {
        fetch("http://localhost:3000/foodtrivia")
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState(prevState => {
                return{ 
                    botReply: data.text, 
                    botHistory: [...prevState.botHistory, data.results] 
                }
            })
        })
    }

    getFoodJoke = () => {
        fetch("http://localhost:3000/foodjokes")
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState(prevState => {
                return{ 
                    botReply: data.text, 
                    botHistory: [...prevState.botHistory, data.results] 
                }
            })
        })
    }

    getUnitConversion = () => {
        fetch(`http://localhost:3000/quickanswer?userInput=${this.state.userInput}`)
        .then(resp => resp.json())
        .then(data => {
            debugger
        })
    }

    handleClick = (e) => {
        debugger
        // control instruction block
        this.setState(prevState => {
            return{ instruction: !prevState.instruction }
        })
    }

    render(){
        return(
            <>
                <h4>Render Chatbot</h4>

                <div className='human-input'>
                    <InputGroup className="mb-3" style={{width: "600px", margin: "auto"}}>

                        <Form.Control
                            className="mb-2 "
                            id="humanInput"
                            type="text" 
                            placeholder="Ask me something"
                            value={this.state.userInput}
                            onChange={this.handleChange} 
                            onKeyPress={this.onKeyUp}
                        />

                        <InputGroup.Append>                          
                            <Button 
                                variant='primary' 
                                type="submit" 
                                className="mb-2" 
                                onClick={this.handleClick}>
                                What can I say?
                            </Button>
                        </InputGroup.Append>

                    </InputGroup>
                </div>

                {this.state.instruction ? 
                    <div className='chatbot-instruction'>
                        <h1>render examples</h1>
                    </div> : null
                }

                <div className='conversation-box'>
                    <div className='bot-response'>
                        {this.state.botHistory.length !== 0 ?
                            this.state.recipes.length !== 0 ? 
                                <ChatBotRecipes recipes={this.state.recipes} />
                                : this.state.botReply ? 
                                <Row>
                                    <Col>
                                        <h6>Hippy</h6>
                                    </Col>
                
                                    <Col>
                                        <h6>{this.state.botReply}</h6>
                                    </Col>
                                </Row> : null

                            : null
                        }
                    </div>

                    {this.state.userHistory.length !== 0 ? 
                        this.state.userHistory.map(userInput => 
                            <div className='user-text'>
                                <Row>
                                    <Col>
                                        <h5>You</h5>
                                    </Col>

                                    <Col>
                                        <h6>{userInput}</h6>
                                    </Col>            
                                </Row>
                                
                            </div>
                        ) : null
                    }
                    
                </div>
                    
            </>
        )
    }
}