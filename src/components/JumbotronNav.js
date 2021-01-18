import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default class JumbotronNav extends React.Component {
    state={
        ingredient: ''
    }

    handleChange = (e) => {
        this.setState({ ingredient: e.target.value})
    }

    render(){
        return(
            <div>
                <Jumbotron>
                    <h3>{this.props.name ? `Welcome, ${this.props.name}` : null}</h3>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="mb-2 "
                            id="inlineFormInputName2"
                            placeholder="Ingredient name (beef, tomato, etc)"
                            value={this.state.ingredient}
                            onChange={this.handleChange}
                        />

                        <InputGroup.Append>                          
                            <Button variant='outline-primary' type="submit" className="mb-2" onClick={(e) => this.props.handleSubmit(e, this.state.ingredient)}>
                                Submit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Jumbotron>
            </div>
        )
    }
}