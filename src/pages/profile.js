import { useEffect, useState } from 'react';
import {Container, Button} from 'react-bootstrap';
import { Logout, getUsers } from '../actions.js/action';
import { useNavigate} from 'react-router-dom';




function Profile(){

    const nav = useNavigate();

    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('loggedIn');

    useEffect(() => {
        if ( auth !== '1'){
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
    
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(users.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getUsers();
                    setUsers(data);
                    console.log(data)
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[users])

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