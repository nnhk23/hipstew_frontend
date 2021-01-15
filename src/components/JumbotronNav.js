import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class JumbotronNav extends React.Component {
    render(){
        return(
            <div>
                <Jumbotron>
                    {console.log(this.props.name)}
                    <h3>{this.props.name ? `Welcome, ${this.props.name}` : null}</h3>
                    <Form >
                        <Form.Control
                        className="mb-2 mr-sm-2"
                        id="inlineFormInputName2"
                        placeholder="Ingredient name (beef, tomato, etc)"
                        />
                        <Button type="submit" className="mb-2">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}