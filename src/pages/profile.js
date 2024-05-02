import './login.css'
import { useEffect } from 'react';
import {Container, Button} from 'react-bootstrap';
import { Logout } from '../actions/logout';
import { useNavigate} from 'react-router-dom';




function Profile(){

    const nav = useNavigate();

    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('usertype');

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])

    useEffect(() => {
        if ( role == 'ADMIN'){
            nav('/home');
        }
    }, [])

    

        return(
            <div className='home-index'>
                 <Container>
                     <h1>Logged In Successfull</h1>
                     <br></br>
                                 
                                 <p>Welcome {username}!</p>
                                 
                </Container>
             </div>
     );

}

export default Profile;