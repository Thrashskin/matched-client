import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import './Navbar.css'

export default class Sidebar extends React.Component {

    render() {

        return (
            <Navbar bg="light" variant="dark">
                <Nav className="mr-auto">
                <Link to="/offers">Published offers</Link>
                <br/>
                <Link to="/offers/add-offer">New Offer</Link>
                <br/>
                <Link to="/offers">My Offers</Link>
                </Nav>
                {/* <Form inline>
                </Form> */}
            </Navbar>
        )
    }
}
