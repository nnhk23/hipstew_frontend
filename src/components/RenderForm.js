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
        this.props.handleSubmit(this.state)
    }

    componentDidMount() {
        if (localStorage.getItem('jwt')) {
          fetch('http://localhost:3000/getuser', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
          })
          .then(res => res.json())
          .then(data => this.setState({
                username: data.user.username,
                name: data.user.name
            }))
        }
      }

    render(){
        return(
            <div>
                {/* render login/signup form depend on button */}
                <Form onSubmit={this.handleSubmit}>
                    <h1>{this.props.name === "SignUp" ? "Sign up" : this.props.name === 'Update' ? "Update Profile" : "Log In"}</h1>
                    {/* render name field conditionally */}
                    {this.props.name !== "Login" ?
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
                        {this.props.name === "Update" ? 
                            <Form.Control 
                                type="text" 
                                name="username" 
                                value={this.state.username} 
                                onChange={this.handleChange} 
                                readOnly
                            /> : 
                            <Form.Control 
                                type="text" 
                                name="username" 
                                value={this.state.username} 
                                onChange={this.handleChange} 
                            />
                        }
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

                    {this.props.name === 'Update' ? 
                        <>
                            <Button type="submit" className="mb-2">Update</Button> 
                            <Button type="submit" className="mb-2">Delete Account</Button> 
                        </>
                        :
                        <Button type="submit" className="mb-2">
                            {this.props.name === "SignUp" ? "Sign Up" : "Log In"}
                        </Button>
                    }

                    {/* {this.props.name === 'Update' ? <Button type="submit" className="mb-2">Update</Button> : null} */}
                </Form>
            </div>
        )
    }
}