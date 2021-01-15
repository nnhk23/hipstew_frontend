import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class RenderForm extends React.Component {
    state={
        username: '',
        password: '',
        name: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.handleSubmit(this.state)
    }

    render(){
        return(
            <div>
                {/* render login/signup form depend on button */}
                <Form onSubmit={this.handleSubmit}>
                    <h1>{this.props.name === "SignUp" ? "Sign up" : "Log In"}</h1>
                    {this.props.name === "SignUp" ?
                        <Form.Group >
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} 
                            />
                        </Form.Group> : null
                    }

                    <Form.Group >
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                        />
                    </Form.Group>

                    <Button 
                        type="submit" 
                        className="mb-2">
                        {this.props.name === "SignUp" ? "Sign up" : "Log In"}
                    </Button>
                </Form>
            </div>
        )
    }
}