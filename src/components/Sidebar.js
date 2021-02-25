import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import './Navbar.css'

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

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
