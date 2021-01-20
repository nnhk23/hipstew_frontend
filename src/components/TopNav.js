import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../css/TopNav.css'


export default class TopNav extends React.Component {
    render(){
        return(
            <div className='top-nav-bg'>
                <Navbar bg="light" variant="light">
                    <Nav.Link href="/"><img className='hipstew-logo' src='https://www.brandbucket.com/sites/default/files/logo_uploads/187362/large_hipstew.png' alt='Hipstew-logo' /></Nav.Link>
                    <Nav className="mr-auto">
                        {!this.props.user ? 
                            <>
                                <Nav.Link className='user-btns' href="/login">Log In</Nav.Link>
                                <Nav.Link className='user-btns' href="/signup">Sign Up</Nav.Link>
                            </> 
                            :
                            <>
                                <Nav.Link href="/editprofile">Update Profile</Nav.Link>
                                <Nav.Link href="/userrecipes">Bookmark Recipes</Nav.Link>
                                <Nav.Link href="/useringredients">Favorite Ingredients</Nav.Link>
                                <Nav.Link className='user-btns' onClick={this.props.handleLogout}>Sign Out</Nav.Link>
                            </>                    
                        }
                    </Nav>
                </Navbar>
                {/* render logo, log in / log out - profile - recipe button conditionally */}
            </div>
        )
    }
}