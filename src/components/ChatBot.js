import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ChatBotRecipes from './ChatBotRecipes'
import '../css/ChatBot.css'

import styled, {keyframes} from 'styled-components'
import { fadeInLeft, fadeInDown } from 'react-animations'

const FadeInLeft = styled.div`animation: 1s ${keyframes`${fadeInLeft}`}`
const FadeInDown = styled.div`animation: 1s ${keyframes`${fadeInDown}`}`


export default class ChatBot extends React.Component {

    state={
        userInput: '',
        instruction: false,
        dish: '',
        ingredients: '',
        recipes: [],
        userHistory: [],
        botHistory: [],
        recipeAmount: 0,
        botReply: '',
        userTranscript: ''
    }

    componentDidMount() {
        localStorage.setItem('transcript', '')
    }

    handleChange = (e) => this.setState({ userInput: e.target.value })

    onKeyUp = (e) => {
        if(e.key === "Enter"){
            this.setState(prevState => {
                return{ 
                    userHistory: [e.target.value, ...prevState.userHistory],
                    userInput: '',
                    botReply: ''
                }
            })

            this.getData()
        }
    }

    getData = (transcript) => {
        // check if this.state.userInput has 'recipe' / 'food trivia' / 'joke' / a number in it
        // 1. 'recipe' : fetch data from `http://localhost:3000/detectfood?userInput=${this.state.userInput}` to extract food/ingredients
        // 2. 'food trivia' : fetch data from "http://localhost:3000/foodtrivia"
        // 3. 'food joke' : fetch data from "http://localhost:3000/foodjokes"
        // 4. a number in it : fetch data from "http://localhost:3000/quickanswer"
        // 5. default messages.


        // accept only a string of words, space and digits
        let text = transcript ? transcript : this.state.userInput.toLowerCase().replace(/[^\w\s\d]/gi, "");

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
        .then(data => this.setState(prevState => {
                return{ 
                    botHistory: [data.text, ...prevState.botHistory],
                    botReply: data.text
                }
            }, () => this.speak(this.state.botReply))
        )
    }

    getFoodJoke = () => {
        fetch("http://localhost:3000/foodjokes")
        .then(resp => resp.json())
        .then(data => this.setState(prevState => {
                return{ 
                    botHistory: [data.text, ...prevState.botHistory],
                    botReply: data.text
                }
            }, () => this.speak(this.state.botReply))
        )
    }

    getUnitConversion = () => {
        fetch(`http://localhost:3000/quickanswer?userInput=${this.state.userInput}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState(prevState => {
                return{ 
                    botHistory: [ data.answer, ...prevState.botHistory],
                    botReply: data.answer
                }
            }, () => this.speak(this.state.botReply))
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
        // debugger
        fetch(`http://localhost:3000/getsubstitution?userInput=${input.replace(" ", "")}`)
        .then(resp => resp.json())
        .then(data => {
            let response

            if(data.error){
                response = data.error
            } else {
                response = data.substitutes[0]
            }
            this.setState(prevState => {
                return{ 
                    botHistory: [ response, ...prevState.botHistory],
                    botReply: response
                }
            }, () => this.speak(this.state.botReply))
        })
    }

    matchReply = (text) => {
        const trigger = [
            ["hi", "hey", "hello"],
            ["how are you", "how are things", "how you doing"],
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
            ["Glad to hear it", "Yayyy!! That's the spirit!"],
            ["There is always a rainbow after the rain!", "Cheer up buddy!"],
            ["You're welcome", "No problem"],
            ["Goodbye, it was a nice talk", "See you later", "Thank you for talking to me!"],
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
                    botHistory: [botMsg, ...prevState.botHistory],
                    botReply: botMsg
                }
            }, () => this.speak(this.state.botReply))
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

    // control instruction block
    handleClick = () => this.setState(prevState => { return{ instruction: !prevState.instruction } })

    botAnswer = (indx) => {

        if (this.state.botHistory.length !== 0) {
            if (typeof this.state.botHistory[indx] === "string") {
                return <Row>
                    <Col>
                        <h5 style={{ fontWeight: 'bold' }} id='bot-answer'>Stewy</h5>
                    </Col>

                    <Col>
                        <h5 id='bot-answer'>{this.state.botHistory[indx]}</h5>
                    </Col>
                </Row>
            } else if (Array.isArray(this.state.botHistory[indx])){
                return <ChatBotRecipes user={this.props.user} recipes={this.state.botHistory[indx]} key={indx} /> 
            }
        }
    }

    speak = (string) => {
        const u = new SpeechSynthesisUtterance();
        const allVoices = speechSynthesis.getVoices();
        u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
        u.text = string;
        u.lang = "en-US";
        u.volume = 1;
        u.rate = 1;
        u.pitch = 1;
        speechSynthesis.speak(u);
    }

    handleVoice = (recognition) => {
        recognition.start()

        recognition.onresult = function (event) {
            const resultIndx = event.resultIndex
            const transcript = event.results[resultIndx][0].transcript
            localStorage.setItem('transcript', transcript)
        }

        let userTranscript

        setTimeout(() => {
            userTranscript = localStorage.getItem('transcript')
        }, 3000);  

        setTimeout(() => {
            if(userTranscript.length !== 0){
                this.saveUserTranscript(userTranscript)
            }
        }, 4000);
    }

    saveUserTranscript = (transcript) => {
        this.setState(prevState => {
            return{ 
                userHistory: [transcript, ...prevState.userHistory]
            }
        }, () => this.getData(transcript))
    }

    render(){

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';

        return(
            <div className='chatbot'>
                <h4>Let's Chat About Food</h4>

                <div className='human-input'>
                    <InputGroup className="mb-3" style={{ width: "600px", margin: "auto" }}>

                        <Form.Control
                            className="mb-2"
                            id="humanInput"
                            type="text" 
                            placeholder="Ask me something"
                            value={this.state.userInput}
                            onChange={this.handleChange} 
                            onKeyPress={this.onKeyUp}
                        />
                        
                        <InputGroup.Append>                          
                            <img 
                                src='https://www.flaticon.com/svg/vstatic/svg/876/876329.svg?token=exp=1611619862~hmac=931152e6facf3222b9d625f47671a299'
                                alt='microphone-icon'
                                variant='info' 
                                type="submit" 
                                className="mb-2 voice-chat-btn" 
                                onClick={() => this.handleVoice(recognition)}
                            />
                        </InputGroup.Append>

                        <InputGroup.Append>                          
                            <Button 
                                variant='info' 
                                type="submit" 
                                className="mb-2" 
                                onClick={this.handleClick}
                            >
                                What can I say?
                            </Button>
                        </InputGroup.Append>

                    </InputGroup>
                </div>

                {this.state.instruction ? 
                    <FadeInLeft>
                        <div className='chatbot-instruction' >
                            <h1>How to use chat bot:</h1>
                            <ul className='bot-instruction'>
                                <li>Say ‘pizza recipes’ or ‘cheesecake recipes with strawberry’ to look up recipes.</li>
                                <li>Say ‘more’ to load more results.</li>
                                <li>Say ‘food trivia’ to get random food facts.</li>
                                <li>Say ‘tell me a food joke’ to get random food jokes.</li>
                                <li>Say ‘2 lbs to grams’ to get unit conversion.</li>
                                <li>Say ‘butter substitution’ or ‘what is a substitute for flour’ or ‘butter alternative’ to find food substitutes.</li>
                            </ul>
                        </div>
                    </FadeInLeft> : null
                }

                {/* iterate through userHistory => render matching pair of userInput and botReply */}

                {this.state.userHistory.length !== 0 ? 
                    this.state.userHistory.map((userInput, indx) => 
                        <FadeInDown>
                            <div className='conversation-box'>

                                <div className='bot-response'>
                                    {this.botAnswer(indx)}
                                </div>

                                <div className='user-text'>
                                    <Row>
                                        <Col>
                                            <h5 style={{ fontWeight: 'bold' }} id='user-input'>You</h5>
                                        </Col>

                                        <Col>
                                            <h5 id='user-input'>{userInput}</h5>
                                        </Col>            
                                    </Row>
                                    
                                </div>
                        
                            </div>  
                        </FadeInDown>
                    ) : null
                }   
            </div>
        )
    }
}