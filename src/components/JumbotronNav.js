import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
                    <Form >
                        <Row>
                            <Col>
                                <Form.Control
                                    className="mb-2 mr-sm-2"
                                    id="inlineFormInputName2"
                                    placeholder="Ingredient name (beef, tomato, etc)"
                                    value={this.state.ingredient}
                                    onChange={this.handleChange}
                                />
                            </Col>

                            <Col>
                                <Button type="submit" className="mb-2" onClick={(e) => this.props.handleSubmit(e, this.state.ingredient)}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}