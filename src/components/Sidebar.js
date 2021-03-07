import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../logo_white.png'
import './Sidebar.css'

const customClass = "myCustomNavLink";

export default class Sidebar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="secondary" className='sidebar-custom'>
                <Nav className="col-md-12 d-none d-md-block bg-dark sidebar sidebar-container">
                    <Nav.Item className='navs-text'><Nav.Link href="/offers"  bsPrefix={customClass}>Published offers</Nav.Link></Nav.Item>
                    <Nav.Item className='navs-text'><Nav.Link href="/offers/add-offer"  bsPrefix={customClass}>New Offer</Nav.Link></Nav.Item>
                    <Nav.Item className='navs-text'><Nav.Link href="/applications"  bsPrefix={customClass}>My Applications</Nav.Link></Nav.Item>
                    <Nav.Item className='navs-text'><Nav.Link href="/saved"  bsPrefix={customClass}>My Saved Offers</Nav.Link></Nav.Item>
                </Nav>
            </Navbar>


            

        );
    }
}
