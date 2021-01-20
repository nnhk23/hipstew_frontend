import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import FoodBg from '../images/rachel-park-hrlvr2ZlUNk-unsplash.jpg'

import '../css/JumbotronNav.css'

export default class JumbotronNav extends React.Component {
    state={
        ingredient: '',
        radioValue: 'recipe'
    }

    handleChange = (e) => {
        this.setState({ ingredient: e.target.value})
    }

    handleToggle = (radioValue) => this.setState({ radioValue })

    render(){

        const radios = [
            {name: 'Recipe', value: 'recipe'},
            {name: 'Ingredient', value: 'ingredient'}
        ]

        return(
            <div className='jumbotron-holder'>
                {/* <div className=''> */}
                <Jumbotron className='jumbotron-card'>
                        <h3 className='greeting'>{this.props.name ? `Welcome, ${this.props.name}` : null}</h3>
                        <InputGroup className="mb-3">
                            <Form.Control
                                className="mb-2 "
                                id="inlineFormInputName2"
                                placeholder="Ingredient name (beef, tomato, etc)"
                                value={this.state.ingredient}
                                onChange={this.handleChange}
                            />

                            <ToggleButtonGroup 
                                type="checkbox" 
                                value={this.state.radioValue}
                                className='toggleBtn'
                            >
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={radio.value}
                                        checked={this.state.radioValue === radio.value}
                                        onChange={(e) => this.handleToggle(e.target.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>

                            <InputGroup.Append>                          
                                <Button variant='primary' type="submit" className="mb-2" onClick={(e) => this.props.handleSubmit(e, this.state.ingredient, this.state.radioValue )}>
                                    Submit
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    {/* </div> */}
                </Jumbotron>
            </div>
        )
    }
}