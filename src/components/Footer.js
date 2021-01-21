import React from 'react'
import Nav from 'react-bootstrap/Nav'
import '../css/Footer.css'

export default class Footer extends React.Component {
    render(){
        return(
            <div className='footer'>
                {/* render social media links and name  */}
                <Nav className="justify-content-center nav-bar" activeKey="/home">
                    
                    <Nav.Item>
                        <Nav.Link target="_blank" href="https://www.facebook.com/GoukiTan"><img className='fb-logo' src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Facebook_svg-128.png' alt='fb-logo'/></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link target="_blank" href='https://dev.to/kimmese'><img className='dev-logo'  src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/84_Dev_logo_logos-128.png' alt='dev-logo'/></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link target="_blank" href='https://www.instagram.com/itmekimmese/'><img className='ig-logo' src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-128.png' alt='ig-logo'/></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link target="_blank" href='https://github.com/nnhk23'><img className='git-logo' src='https://cdn1.iconfinder.com/data/icons/logotypes/32/github-128.png' alt='git-logo'/></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link target="_blank" href='https://www.linkedin.com/in/kim-nguyen-0623'><img className='linkedin-logo' src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Linkedin_svg-128.png' alt='linkedin-logo'/></Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
        )
    }
}