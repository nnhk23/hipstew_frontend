import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class TopNav extends React.Component {
    render(){
        return(
            <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">Hipstew</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Log In</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>

                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link onClick={this.props.handleLogout}>Sign Out</Nav.Link>
                        <Nav.Link href="/userrecipes">Bookmark Recipes</Nav.Link>
                    </Nav>
                </Navbar>
                {/* render logo, log in / log out - profile - recipe button conditionally */}
            </>
        )
    }
}