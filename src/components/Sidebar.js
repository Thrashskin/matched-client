import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../logo_white.png'
import './Sidebar.css'

const sideBarLinks = "sideBarLinks";

export default class Sidebar extends React.Component {

    constructor() {
        super();

        this.state = {
            userInSession: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        
        if (this.state.userInSession.kind === 'Company') {
            return (
                <Navbar bg="dark" variant="secondary" className='sidebar-custom'>
                    <Nav className="col-md-12 d-none d-md-block bg-dark sidebar sidebar-container">
                        <Nav.Item className='navs-text'><Nav.Link href="/offers"  bsPrefix={sideBarLinks}>Offers</Nav.Link></Nav.Item>
                        <br/><br/>
                        <Nav.Item className='navs-text'><Nav.Link href="/offers/add-offer"  bsPrefix={sideBarLinks}>New Offer</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>
    );
        } else {
            return (
                <Navbar bg="dark" variant="secondary" className='sidebar-custom'>
                    <Nav className="col-md-12 d-none d-md-block bg-dark sidebar sidebar-container">
                        <Nav.Item className='navs-text'><Nav.Link href="/applications"  bsPrefix={sideBarLinks}>Jobs</Nav.Link></Nav.Item>
                        <br/><br/>
                        <Nav.Item className='navs-text'><Nav.Link href="/saved"  bsPrefix={sideBarLinks}>Saved</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar>
    );
        }
        
    }
}
