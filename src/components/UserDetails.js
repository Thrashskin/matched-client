import React from 'react';
import AuthService from './auth/auth-service';

export default class UserDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }

        this.service = new AuthService();
        this.kind = this.state.user.kind
        this._id = this.state.user._id
    }

    async componentDidMount() {
        const response = await this.service.getProfile(this.kind, this._id);
        await this.setState(response)
        await console.log(this.state)
    }

    // async componentDidUpdate() {
    //     const response = await this.service.getProfile(this.kind, this._id);
    //     await this.setState(response)
    //     await console.log(this.state)
    // }

    
     render() {

        if (this.state.user.kind === 'Seeker') {
        
            let techStack = []
    
            if (this.state.user.stack) {
                techStack = [this.state.user.stack.map((technology, index) => {
                    return <li key={index}>{technology}</li>
                })]
            }
    
            return (
                <div>
                    <h1>{`${this.state.user.name} ${this.state.user.lastName}`}</h1>
                    <p>Location: {`${this.state.user.city}, ${this.state.user.country}`}</p>
                    <p>LinkedIn: {this.state.user.linkedIn}</p>
                    <p>gitHub: {this.state.user.gitHub}</p>
                    {
                        (this.state.user.stack) ? 
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
            );
        } else {
    
            return (
                <div>
                    <h1>{this.state.user.name}</h1>
                    <p>Location: {`${this.state.user.city}, ${this.state.user.country}`}</p>
                    <p>{`${this.state.user.description}`}</p>
                </div>
            );
        }
    }
}

















// export default function UserDetails(props) {

//     let service = new AuthService();
//     let { kind, _id } = props.userInSession;

//     let userInSession = service.getProfile(kind, _id)
//     .then(response => {
//         return response
//     })
//     .catch(error => console.log(error))

//     if (props.userInSession.kind === 'Seeker') {
        
//         let techStack = []

//         if (props.userInSession.stack) {
//             techStack = [props.userInSession.stack.map((technology, index) => {
//                 return <li key={index}>{technology}</li>
//             })]
//         }

//         return (
//             <div>
//                 <h1>{`${props.userInSession.name} ${props.userInSession.lastName}`}</h1>
//                 <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
//                 <p>LinkedIn: {props.userInSession.linkedIn}</p>
//                 <p>gitHub: {props.userInSession.gitHub}</p>
//                 {
//                     (props.userInSession.stack) ? 
//                     <div>
//                         <p>Technologies:</p>
//                         <br />
//                         <ul>
//                             {[techStack]}
//                         </ul>
//                     </div>
//                     :
//                     null
//                 }
                
//             </div>
//         )
//     } else {

//         // let offers = []

//         // if (props.userInSession.stack) {
//         //     offers = [props.userInSession.offers.map((offer, index) => {
//         //         return <Offer key={index} title={offer.title} candidates={offer.candidates.length} />
//         //     })]
//         // }
//         return (
//             <div>
//                 <h1>{props.userInSession.name}</h1>
//                 <p>Location: {`${props.userInSession.city}, ${props.userInSession.country}`}</p>
//                 {/* {
//                     (props.userInSession.ofers) ? 
//                     <div>
//                         <p>Offers:</p>
//                         <br />
//                         <ul>
//                             {[offers]}
//                         </ul>
//                     </div>
//                     :
//                     null
//                 } */}
//             </div>
//         );
//     }

// }