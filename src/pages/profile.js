import { useContext } from 'react';
import {Container, Button} from 'react-bootstrap';
import AuthContext from '../context/AuthProvider';
import { Logout } from '../actions.js/action';
import { useNavigate} from 'react-router-dom';
import useAuth from '../context/auth/useAuth';



function Profile(){
    const {  auth, setAuth } = useContext(AuthContext);
    const {auth: {username}} = useAuth();

    const nav = useNavigate();

    const logout = (e) => {

        let user = auth.username
        let response = Logout(user);
        setAuth({});
        if (response){
            nav('/');
            window.location.reload(false);
        }
    }
    console.log(auth.username);
    return(
           <div className='home-index'>
                <Container>
                    <h1>Logged In Successfull</h1>
                    <br></br>
                                
                                <p>Welcome!</p>
                                <Button variant="danger" onClick={logout}>Logout</Button>
               </Container>
            </div>
    );  
}

export default Profile;