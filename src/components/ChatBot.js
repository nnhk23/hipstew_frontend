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
        userHistory: [],
        botHistory: [],
        recipeAmount: 0
    }

    handleChange = (e) => this.setState({ userInput: e.target.value })

    onKeyUp = (e) => {
        if(e.key === "Enter"){
            this.setState(prevState => {
                return{ 
                    userHistory: [e.target.value, ...prevState.userHistory],
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
        // 5. default messages.


        // accept only a string of words, space and digits
        let text = this.state.userInput.toLowerCase().replace(/[^\w\s\d]/gi, "");

        // grab only number in text
        let num = this.state.userInput.toLowerCase().replace(/[^\d]/gi, "");

        if(text.includes('recipe')){
            this.detectFoodInText()
        } else if (text.includes('food trivia')){
            this.getFoodTrivia()
        } else if (text.includes('food joke')){
            this.getFoodJoke()
        } else if (text.includes('more')){

            if (this.state.recipeAmount === 18){
                // notice user that this is the end of result
                this.setState(prevState => {
                    return{ 
                        recipeAmount: 19, 
                        botHistory: ['Sorry, there is no more recipe for this keyword..', ...prevState.botHistory]
                    }
                })
            } else {
                // save previous results to bot history and update recipe amount
                this.setState(prevState => {
                    return{ recipeAmount: prevState.recipeAmount + 9 }
                }, () => this.state.recipeAmount !== 0 ? this.setState(prevState => {
                        return{ botHistory: [prevState.recipes.slice(prevState.recipeAmount, prevState.recipeAmount+9), ...prevState.botHistory] }
                    }) : null
                )
            }

        } else if (text.includes('substitution') || text.includes('substitute') || text.includes('alternative')) {
            return this.getSubstitution(text)
        } else if (num.length !== 0) {
            return this.getUnitConversion()
        } else {
            // default case if nothing matches
            this.matchReply(text)
        }
    }
        

    detectFoodInText = () => {
        fetch(`http://localhost:3000/detectfood?userInput=${this.state.userInput}`)
        .then(resp => resp.json())
        .then(data => {
            // only get 1 dish out of user's input
            let dish = data.annotations.filter(annotation => annotation.tag === "dish").length !== 0 ? data.annotations.filter(annotation => annotation.tag === "dish")[0].annotation : ''

            // get all ingredients in user's input in a format: ingre 1, ingre 2
            let ingredients = data.annotations.filter(annotation => annotation.tag === "ingredient").map(ing => ing.annotation).join(', ')

            // set state then get recipes from api
            this.setState({ dish, ingredients }, () => {
                fetch(`http://localhost:3000/complexrecipesearch?ingredients=${this.state.ingredients}&dish=${this.state.dish}`)
                .then(resp => resp.json())
                .then(data => {
                    this.setState(prevState => {
                        return{ 
                            recipes: data.results,
                            botHistory: [data.results.slice(this.state.recipeAmount, this.state.recipeAmount+9), ...prevState.botHistory] 
                        }
                    })
                })
            })
        })
    }

    getFoodTrivia = () => {
        fetch("http://localhost:3000/foodtrivia")
        .then(resp => resp.json())
        .then(data => {
            this.setState(prevState => {
                return{ 
                    botHistory: [data.text, ...prevState.botHistory] 
                }
            })
        })
    }

    getFoodJoke = () => {
        fetch("http://localhost:3000/foodjokes")
        .then(resp => resp.json())
        .then(data => {
            this.setState(prevState => {
                return{ 
                    botHistory: [data.text, ...prevState.botHistory] 
                }
            })
        })
    }

    getUnitConversion = () => {
        fetch(`http://localhost:3000/quickanswer?userInput=${this.state.userInput}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState(prevState => {
                return{ 
                    botHistory: [ data.answer, ...prevState.botHistory] 
                }
            })
        })
    }

    getSubstitution = (text) => {
       
        let input
        if(text.includes('alternative')){
            input = text.replace(/alternative/gi, "")
        } else if (text.includes('substitution')){
            input = text.replace(/substitution/gi, "")
        } else {
            input = text.replace(/substitute/gi, "")
        }
        debugger
        fetch(`http://localhost:3000/getsubstitution?userInput=${input.replace(" ", "")}`)
        .then(resp => resp.json())
        .then(data => {
            let response

            if(data.error){
                response = data.error
            } else {
                response = data.substitutes[0]
            }
            debugger
            this.setState(prevState => {
                return{ 
                    botHistory: [ response, ...prevState.botHistory] 
                }
            })
        })
    }

    matchReply = (text) => {
        const trigger = [
            ["hi", "hey", "hello"],
            ["how are you", "how are things"],
            ["what is going on", "what is up"],
            ["happy", "good", "well", "fantastic", "cool"],
            ["bad", "bored", "tired", "sad"],
            ["thanks", "thank you"],
            ["bye", "good bye", "goodbye"],
            ["your name"]
        ];
            
        const reply = [
            ["Hello!", "Hi!", "Hey!", "Hi there!"],
            [
                "Fine... how are you?",
                "Pretty well, how are you?",
                "Fantastic, how are you?"
            ],
            [
                "Nothing much",
                "Exciting things!"
            ],
            ["Glad to hear it"],
            ["Why?", "Cheer up buddy"],
            ["You're welcome", "No problem"],
            ["Goodbye", "See you later"],
            [
                "My name is Stewy. Very nice to meet you :)",
                "You can call me Stewy :). Nice to meet you!"
            ]
        ];
        
        const alternative = [
            "Same",
            "Go on...",
            "Try again",
            "I'm listening...",
            "Bro..."
        ];

        const robot = [
            "It me",
            "Wassup",
            "Whatchu up to, fellow human?"
        ]

        let botMsg

        if(this.generateReply(trigger, reply, text)){
            botMsg = this.generateReply(trigger, reply, text)
        } else if (text.match(/stewy/gi)){
            botMsg = robot[Math.floor(Math.random() * robot.length)]
        } else (
            botMsg = alternative[Math.floor(Math.random() * alternative.length)]
        )

        this.setState(prevState => {
            return{ 
                botHistory: [botMsg, ...prevState.botHistory] 
            }
        })
        
    }

    generateReply = (trigger, reply, text) => {
        let item;
        let items;
        for (let x = 0; x < trigger.length; x++) {
            for (let y = 0; y < reply.length; y++) {
                if (text.includes(trigger[x][y])) {
                    items = reply[x];
                    item = items[Math.floor(Math.random() * items.length)];
                }
            }
        }
        return item;
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
            <div className='chatbot'>
                <h4>Let's Chat About Food</h4>

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

                {/* iterate through userHistory => render matching pair of userInput and botReply */}

                {this.state.userHistory.length !== 0 ? 
                    this.state.userHistory.map((userInput, indx) => 
                        <div className='conversation-box'>

                            <div className='user-text'>
                                <Row>
                                    <Col>
                                        <h5 id='user-input'>You</h5>
                                    </Col>

                                    <Col>
                                        <h5 id='user-input'>{userInput}</h5>
                                    </Col>            
                                </Row>
                                
                            </div>
                    
                            <div className='bot-response'>
                                {this.state.botHistory.length !== 0 ?
                                    typeof this.state.botHistory[indx] === "string" ? 
                                        <Row>
                                            <Col>
                                                <h5 id='bot-answer'>Stewy</h5>
                                            </Col>
                        
                                            <Col>
                                                <h5 id='bot-answer'>{this.state.botHistory[indx]}</h5>
                                            </Col>
                                        </Row> : 
                                        Array.isArray(this.state.botHistory[indx]) ?
                                            <ChatBotRecipes 
                                                recipes={this.state.botHistory[indx]} 
                                                key={indx}
                                            /> : null
                                    : null
                                }
                            </div>
                            
                        </div>  
                    ) : null
                }   
            </div>
        )
    }
}