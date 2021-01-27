import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../css/App.css'

export default class RenderForm extends React.Component {
    state={
        username: '',
        name: '',
        id: '',
        password: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // debugger
        if(e.nativeEvent.submitter.textContent !== 'Delete Account'){
            if(this.state.password === ''){
                alert("Password can't be blank!")
            } else {
                this.props.handleSubmit(this.state)
            }
        }  else {
            this.props.handleDelete()
        } 
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
                name: data.user.name,
                id: data.user.id
            }))
        }
      }

    render(){
        return(
            <div className='form'>
                {/* render login/signup form depend on button */}
                <Form onSubmit={this.handleSubmit} className='form-content'>
                    <h1>{this.props.name === "SignUp" ? "Sign up" : this.props.name === 'Update' ? "Update Profile" : "Log In"}</h1>
                    {/* render name field conditionally */}
                    {this.props.name !== "Login" ?
                        <Form.Group >
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                id='form-input-field' 
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
                                id='form-input-field'
                                type="text" 
                                name="username" 
                                value={this.state.username} 
                                onChange={this.handleChange} 
                                readOnly
                            /> : 
                            <Form.Control 
                                id='form-input-field'
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
                            id='form-input-field'
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                        />
                    </Form.Group>

                    {this.props.name === 'Update' ? 
                        <>
                            <Button type="submit" className="mb-2">Update</Button> 
                            <Button type="submit" className="mb-2" variant="danger">Delete Account</Button> 
                        </>
                        :
                        <Button type="submit" className="mb-2">
                            {this.props.name === "SignUp" ? "Sign Up" : "Log In"}
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}