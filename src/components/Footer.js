import React from 'react'
import Nav from 'react-bootstrap/Nav'

export default class Footer extends React.Component {
    render(){
        return(
            <div>
                {/* render social media links and name  */}
                <Nav className="justify-content-end" activeKey="/home">
                    
                    <Nav.Item>
                    <Nav.Link href="#igLink">Facebook</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                    <Nav.Link eventKey="link-1">Email</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                    <Nav.Link eventKey="link-2">IG</Nav.Link>
                    </Nav.Item>

                </Nav>
            </div>
        )
    }
}