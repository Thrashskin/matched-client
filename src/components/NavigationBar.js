import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logout from './auth/Logout'
import logo from '../logo_white.png'
import './NavigationBar.css'

const customClass = "myCustomNavLink";

export default class NavigationBar extends React.Component {
    render() {
        return (
                <Navbar bg="dark" variant="secondary" className='navbar-border'>
                    {/* <Navbar.Brand href="#home">Logo</Navbar.Brand> */}
                    <Navbar.Brand href="/"><img src={logo} /></Navbar.Brand>
                    
                    <Nav className="ml-auto">
                        <Nav.Item className='navs-text'><Nav.Link href="/"  bsPrefix={customClass}>Home</Nav.Link></Nav.Item>
                        <Nav.Item className='navs-text'><Nav.Link href="/profile"  bsPrefix={customClass}>My Profile</Nav.Link></Nav.Item>
                        <Nav.Item className='navs-text'><Nav.Link href="/messages"  bsPrefix={customClass}>My messages</Nav.Link></Nav.Item>
                        <Logout logUserOut={() => this.logOutUser()} />
                    </Nav>
                </Navbar>

        )
    }
}
