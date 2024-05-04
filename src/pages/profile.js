import './login.css'
import { useEffect, useState } from 'react';
import {Container, Button, Table} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { getByUserId } from '../actions/users';
import { getLatestByUser } from '../actions/courseActivity';




function Profile(){

    const nav = useNavigate();
    let [profile, setProfile] = useState([]);
    const [error, setError] = useState(null);
    const userid = localStorage.getItem('userid');
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

    useEffect(() => {
        if(profile.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getByUserId(userid);
                    setProfile(data);
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[profile])    

        return(
            <div className='home-index'>
                 <Container>
                     <h1>Welcome {username}!</h1>
                     <br></br>
                    <left><h2>Account Information</h2></left>
                    <Container>
                                <Table striped bordered hover size="sm">
                                <tbody>
                                <tr>
                                    <th>User ID:</th>
                                    <td>{profile.userid}</td>
                                </tr>
                                <tr>
                                    <th>Username:</th>
                                    <td>{profile.username}</td>
                                </tr>
                                <tr>
                                    <th>First Name:</th>
                                    <td>{profile.first_name}</td>
                                </tr>
                                <tr>
                                    <th>Last Name:</th>
                                    <td>{profile.last_name}</td>
                                </tr>
                                <tr>
                                    <th>Birthday:</th>
                                    <td>{profile.dob}</td>
                                </tr>
                                <tr>
                                    <th>Account Type:</th>
                                    <td>{profile.usertype}</td>
                                </tr>
                                <tr>
                                    <th>Date Joined:</th>
                                    <td>{profile.date_joined}</td>
                                </tr>
                                </tbody>
                                </Table> 
                                </Container>              
                                 
                </Container>
             </div>
     );

}

export default Profile;