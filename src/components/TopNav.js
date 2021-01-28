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
                                <Nav.Link href="/editprofile"><img className='icon' src='https://www.flaticon.com/svg/vstatic/svg/1250/1250744.svg?token=exp=1611706518~hmac=590107b5ecf6bb4f1c54a439fabeebe4' alt='profile-icon' /></Nav.Link>

                                <Nav.Link href="/userrecipes"><img className='icon' src='https://www.flaticon.com/svg/vstatic/svg/3565/3565462.svg?token=exp=1611706620~hmac=d1bf8d47e6da5a8a1b950665b7a3d144' alt='cookbook-icon' /></Nav.Link>

                                <Nav.Link href="/useringredients"><img className='icon' src='https://www.flaticon.com/svg/vstatic/svg/1414/1414444.svg?token=exp=1611706354~hmac=025af073cfb57cfdef11737bd95450de' alt='fridge-icon' /></Nav.Link>

                                <Nav.Link href="/chatbot"><img className='icon' src='https://www.flaticon.com/svg/vstatic/svg/2728/2728212.svg?token=exp=1611706278~hmac=6db3a2dc51fa839e489717d809828070' alt='chatbot-icon' /></Nav.Link>
                                
                                <Nav.Link className='user-btns logout-btn' onClick={this.props.handleLogout}><img className='icon' src='https://www.flaticon.com/svg/vstatic/svg/159/159707.svg?token=exp=1611706751~hmac=aebe8324e84ebb12d788177d87669e32' alt='logout-icon' /></Nav.Link>
                            </>                    
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}