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
                                <Nav.Link href="/editprofile"><img className='icon' src='https://img.icons8.com/dusk/64/000000/test-account.png' alt='profile-icon' /></Nav.Link>

                                <Nav.Link href="/userrecipes"><img className='icon' src='https://img.icons8.com/dusk/64/000000/restaurant.png' alt='cookbook-icon' /></Nav.Link>

                                <Nav.Link href="/useringredients"><img className='icon' src='https://img.icons8.com/dusk/64/000000/fridge.png' alt='fridge-icon' /></Nav.Link>

                                <Nav.Link href="/chatbot"><img className='icon' src='https://img.icons8.com/dusk/64/000000/bot--v1.png' alt='chatbot-icon' /></Nav.Link>
                                
                                <Nav.Link className='user-btns logout-btn' onClick={this.props.handleLogout}><img className='icon' src='https://img.icons8.com/dusk/64/000000/logout-rounded.png' alt='logout-icon' /></Nav.Link>
                            </>                    
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}