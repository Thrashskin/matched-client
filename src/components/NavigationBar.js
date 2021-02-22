import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export default class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <br/>
                <Link to="/profile">My Profile</Link>
                </Nav>
                <Form inline>
                </Form>
            </Navbar>
        )
    }
}
