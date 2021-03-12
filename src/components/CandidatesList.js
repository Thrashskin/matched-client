import React from 'react';
import { Link } from 'react-router-dom'
import AuthService from './auth/auth-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import './CandidatesList.css'

export default class CandidatesList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            candidates: []
        }

        this.service = new AuthService();

    }

    componentDidMount() {
        let { offerID } = this.props.parentProps.match.params
        this.service.getCandidates(offerID)
            .then(response => {
                //console.log(response)
                this.setState({
                    candidates: response
                })
            })
            .catch(error => console.log(error))
    }



    render() {
        //console.log(this.props.parentProps.match.params.offerID)
        return (
            <div className='candidates-wraper'>
                <NavigationBar />
                <div style={{ float: 'left' }}>
                    <Sidebar />
                </div>
                <div className='candidates-content'>
                    <ul className='candidates-list'>
                        {this.state.candidates.map((candidate, index) => {
                            //this.singleCandidate(candidate)
                            let formattedStack = candidate.stack.join(", ");
                            console.log(formattedStack)
                            return (
                                <li key={index} className='individual-candidate'>
                                    <Link to={`/Seeker/${candidate._id}`}><h4>{`${candidate.name} ${candidate.lastName} `}</h4></Link>
                                    <p>{`Stack: ${formattedStack}`}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
