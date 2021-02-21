import React from 'react'
import {Link} from 'react-router-dom'

export default function UserDetails(props) {

    let Offer = (props) => {
        return (
            <div>
                <h2>Title: {props.title} </h2>
                <p>Applications: {props.candidates}</p>
            </div>
        );
    }

    let techStack = [props.userInSession.stack.map((technology, index) => {
        return <li key={index}>{technology}</li>
    })]
    let offers = [props.userInSession.offers.map((offer, index) => {
        return <Offer title={offer.title} candidates={offer.candidates.length} />
    })]

    if (props.userInSession.kind === 'Seeker') {
        return (
            <div>
                <h1>{`${props.userInSession.name} ${props.userInSession.lastName}`}</h1>
                <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
                <p>LinkedIn: {props.userInSession.linkedIn}</p>
                <p>gitHub: {props.userInSession.gitHub}</p>
                <p>Technologies:</p>
                <br />
                <ul>
                    {[techStack]}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{props.userInSession.name}</h1>
                <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
                <p>Offers:</p>
                <ul>
                    {[offers]}
                </ul>
                <Link to='/profile/edit'>Edit profile</Link>
            </div>
        );
    }

}