import './login.css'
import {Alert, Container, Table} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getActivityByUser } from '../actions/courseActivity';



function LinkContentPage(){

    let [myContent, setContent] = useState([]);
    let [linkName, setLinkName] = useState('');
    const [error, setError] = useState(null);

    const auth = localStorage.getItem('loggedIn');
    const {userid} = useParams();

    const nav = useNavigate();

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
        else if (userid !== localStorage.getItem('student') && localStorage.getItem('userid') !== localStorage.getItem('parent')){
            nav('/');
        }
    }, [])

    useEffect(() => {
        if (userid !== localStorage.getItem('student')){
            nav('/UA');
        }
        localStorage.removeItem('student')
    }, [])


    useEffect(() => {
        if(myContent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getActivityByUser(userid);
                    setContent(data);
                    setLinkName(data[0].user.first_name);
                }
                catch (e) {
                    setError("Student has not started their learning journey yet!");
                }
            }

            fetchData();
        }
    },[myContent])

    if (error){
        return(
           <div className='my-content-index'>
                <Container>
                    <Alert variant="danger">
                        <Alert.Heading>An error has Occurred</Alert.Heading>
                        <p>{(error !== null) ? error: "Student has not started their learning journey yet!."}</p>
                    </Alert>
               </Container>
            </div>
      );
    }
    else if (myContent){
        return(
           <div className='my-content-index'>
                              
                        <h1>View {linkName}'s learning journey so far...</h1>

                        <Container>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                        <th>Subject:</th>
                                        <th>Chapter:</th>
                                        <th>Module:</th>
                                        <th>Date Accessed</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                myContent.map((request) => (
                                                        <tr key={request.id}>
                                                        <td>{request.module.chapter.subject.name}</td>
                                                        <td>{request.module.chapter.chapter_name}</td>
                                                        <td>{request.module.module_name}</td>
                                                        <td>{request.date}</td>
                                                        </tr>
                                                ))
                                        }
                                        
                                </tbody>
                                </Table> 
                            </Container>
                        
                
            </div>
      );
    }
}

export default LinkContentPage;