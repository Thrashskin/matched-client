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

    if (props.userInSession.kind === 'Seeker') {
        
        let techStack = []

        if (props.userInSession.stack) {
            techStack = [props.userInSession.stack.map((technology, index) => {
                return <li key={index}>{technology}</li>
            })]
        }

        return (
            <div>
                <h1>{`${props.userInSession.name} ${props.userInSession.lastName}`}</h1>
                <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
                <p>LinkedIn: {props.userInSession.linkedIn}</p>
                <p>gitHub: {props.userInSession.gitHub}</p>
                {
                    (props.userInSession.stack) ? 
                    <div>
                        <p>Technologies:</p>
                        <br />
                        <ul>
                            {[techStack]}
                        </ul>
                    </div>
                    :
                    null
                }
                
            </div>
        )
    } else {

        let offers = []

        if (props.userInSession.stack) {
            offers = [props.userInSession.offers.map((offer, index) => {
                return <Offer key={index} title={offer.title} candidates={offer.candidates.length} />
            })]
        }
        return (
            <div>
                <h1>{props.userInSession.name}</h1>
                <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
                {
                    (props.userInSession.ofers) ? 
                    <div>
                        <p>Offers:</p>
                        <br />
                        <ul>
                            {[offers]}
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
        );
    }

}