import './login.css'
import { useEffect, useState } from 'react';
import {Container, Button} from 'react-bootstrap';
import { getUsers } from '../actions/users';
import { useNavigate} from 'react-router-dom';




function Home(){

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
        if ( role !== 'ADMIN'){
            nav('/profile');
        }
    }, [])
    
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
                     <h1>Admin Home</h1>
                     <br></br>
                                 
                                 <p>Welcome {username}!</p>
                                 
                </Container>
             </div>
     );

}

export default Home;