import './login.css'
import { useRef, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import api from '../api/api';
import { Alert, Container, Form, Button } from 'react-bootstrap';





const LinkPage = () => {
    const nav = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [parent, setParent] = useState('');
    const [student, setStudent] = useState('');
    const [status, setStatus] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const userid = localStorage.getItem('userid');
    const auth = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('usertype');

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitData = async(idol) => {
        try{
            let response = await addIdol(idol);

            if (response){
                setSuccess(true)
            }
        }
        catch (e){
            setError(e.message);
        }  
    }

    const submitrequest= (e) => {
        e.preventDefault();

        setSuccess(false);
        setError('');

        if (student){
            let request = {
                parent: userid,
                student: student,
                status: 'pending',
            };

            submitData(request);
        }
        else{
            setError('Student account ID must be present!')
        }
        }

        return (
                <div className='link-request'>
                <h1>Linked Learning Accounts</h1>
                <Container>
                    <Alert show={success} variant='success'>
                        <Alert.Heading>Request has been made!</Alert.Heading>
                    </Alert>
                    <Alert show={error} variant="danger">
                        <Alert.Heading>An Error has Occurred</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </Container>
    
                <Container>
                    <Form onSubmit={submitrequest}>
                        <Form.Group className ='mb-4' controlId='idolName'>
                            <Form.Label>Student Account ID</Form.Label>
                            <Form.Control type = "text" placeholder='' onChange={e => setStudent(e.target.value)} required/>
                            <Button variant='success' type='submit'>
                            Make Request
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>    
            </div>
        )
        
    
}

export default LinkPage