import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../logo_white.png'
import BackEndService from './auth/backend-service'
import './NavigationBar.css'

const navsLinks = "navsLinks";
const logOutButton = "logout-button";

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.service = new BackEndService();
    }

    logOut = () => {
       if (this.props !== undefined ) {this.service.logout()
        .then(() => {
            localStorage.clear();
            window.location.reload(true);
        })
        .catch(error => console.log(error))} else {console.log('props are undefined')}
    }

    
    render() {
        return (
                <Navbar bg="dark" variant="secondary" className='navbar-border'>
                    <Navbar.Brand href="/"><img className='logo-navbar' src={logo} /></Navbar.Brand>
                    
                    <Nav className="ml-auto">
                        <Nav.Item className='navs-text'><Nav.Link href="/"  bsPrefix={navsLinks}>Home</Nav.Link></Nav.Item>
                        <Nav.Item className='navs-text'><Nav.Link href="/profile"  bsPrefix={navsLinks}>My Profile</Nav.Link></Nav.Item>
                        <Nav.Item className='navs-text'><Nav.Link href="/messages"  bsPrefix={navsLinks}>My messages</Nav.Link></Nav.Item>
                        <Nav.Item className='navs-text'><Nav.Link href="/login" bsPrefix={logOutButton} onClick={() => this.logOut()}>Logout</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>

        )
    }
}
