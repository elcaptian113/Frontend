import { useEffect } from 'react';
import {Container, Button} from 'react-bootstrap';
import { Logout } from '../actions.js/action';
import { useNavigate} from 'react-router-dom';




function Profile(){

    const nav = useNavigate();

    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('loggedIn');

    useEffect(() => {
        if ( auth !== 1){
            nav('/');
        }
    }, [])

    const logout = (e) => {

        let user = username;
        let response = Logout(user);
        localStorage.clear();
        if (response){
            nav('/');
            window.location.reload(false);
        }
    }
    

        return(
            <div className='home-index'>
                 <Container>
                     <h1>Logged In Successfull</h1>
                     <br></br>
                                 
                                 <p>Welcome {username}!</p>
                                 <Button variant="danger" onClick={logout}>Logout</Button>
                </Container>
             </div>
     );

}

export default Profile;