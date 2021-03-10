import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import AuthService from './auth/auth-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'

export default class CompanyWelcome extends React.Component {

    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ float: 'left' }}>
                    <Sidebar />
                </div>
                <div>
                    <h1>Welcome!</h1>
                </div>
            </div>


        );
    }
}
