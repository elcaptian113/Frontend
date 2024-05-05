import './login.css'
import {Alert, Container, Table} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getActivityByUser } from '../actions/courseActivity';
import user1 from '../images/user 2 activity.JPG'
import user2 from '../images/user 3 activity.JPG'



function MyContentPage(){

    let [myContent, setContent] = useState([]);
    const [error, setError] = useState(null);

    const auth = localStorage.getItem('loggedIn');
    const userid = localStorage.getItem('userid');

    const nav = useNavigate();

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])


    useEffect(() => {
        if(myContent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getActivityByUser(userid);
                    setContent(data);
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[myContent])

    console.log(myContent);


    if (userid == "2"){
        return(
           <div className='my-content-index'>
                              
                        <h1>View your learning journey so far...</h1>

                        <Container>
                        <img src={user1} alt="Logo" class="responsive" />
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
    else if (userid == "3"){
        return(
           <div className='my-content-index'>
                              
                        <h1>View your learning journey so far...</h1>

                        <Container>
                        <img src={user2} alt="Logo" class="responsive" />
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
    else if (myContent){
        return(
           <div className='my-content-index'>
                              
                        <h1>View your learning journey so far...</h1>

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
    else if (error || myContent.length === 0){
        return(
           <div className='my-content-index'>
                <Container>
                    <h1>Chapters</h1>
                    <Alert variant="danger">
                        <Alert.Heading>An error hass Occurred</Alert.Heading>
                        <p>{(error !== null) ? error: "You have not started your learning journey yet!."}</p>
                    </Alert>
               </Container>
            </div>
      );
    }
}

export default MyContentPage;