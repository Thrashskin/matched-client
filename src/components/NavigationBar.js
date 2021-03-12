import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logout from './auth/Logout'
import logo from '../logo_white.png'
import Button from 'react-bootstrap/Button';
import AuthService from './auth/auth-service'
import './NavigationBar.css'

const navsLinks = "navsLinks";
const logOutButton = "logout-button";

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.service = new AuthService();
        console.log(props)
    }

    logOut = () => {
       if (this.props !== undefined ) {this.service.logout()
        .then(() => {
            console.log('LOGOUT')
            localStorage.clear();
            window.location.reload(true);
            // console.log(this.props.props.history)
            //this.props.history.push("/login")
            // this.forceUpdate()
            
        })
        .catch(error => console.log(error))} else {console.log('props are undefined')}
    }

    
    render() {
        console.log(this.props.props)
        return (
                <Navbar bg="dark" variant="secondary" className='navbar-border'>
                    {/* <Navbar.Brand href="#home">Logo</Navbar.Brand> */}
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
