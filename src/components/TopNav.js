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
                    <Nav className="ml-auto top-nav-btn">
                        {!this.props.user ? 
                            <>
                                <Nav.Link className='user-btns login-btn' href="/login">LOG IN</Nav.Link>
                                <Nav.Link className='user-btns signup-btn' href="/signup">SIGN UP</Nav.Link>
                            </> 
                            :
                            <>
                                <Nav.Link href="/editprofile">PROFILE</Nav.Link>
                                <Nav.Link href="/userrecipes">RECIPES LIST</Nav.Link>
                                <Nav.Link href="/useringredients">YOUR FRIDGE</Nav.Link>
                                <Nav.Link href="/chatbot">CHAT BOT</Nav.Link>
                                <Nav.Link className='user-btns logout-btn' onClick={this.props.handleLogout}>SIGN OUT</Nav.Link>
                            </>                    
                        }
                    </Nav>
                </Navbar>
                {/* render logo, log in / log out - profile - recipe button conditionally */}
            </div>
        )
    }
}