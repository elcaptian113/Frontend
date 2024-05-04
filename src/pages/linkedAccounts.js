import './login.css'
import { useRef, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Alert, Container, Form, Button, InputGroup, Table } from 'react-bootstrap';
import { createRequest, getLinkByParentP, getLinkByParentA, getLinkByStudentA, getLinkByStudentP, deleteRequest, approveRequest } from '../actions/linkedAccounts';





const LinkPage = () => {
    const nav = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [parent, setParent] = useState('');
    const [student, setStudent] = useState('');
    const [status, setStatus] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pendingParent, setPendingParent] = useState([]);
    const [approvedParent, setApprovedParent ] = useState([]);
    const [pendingStudent, setPendingStudent] = useState([]);
    const [approvedStudent, setApprovedStudent] = useState([]);
    const [ppReq, setPPReq] = useState(false);
    const [apReq, setAPReq] = useState(false);
    const [psReq, setPSReq] = useState(false);
    const [asReq, setASReq] = useState(false);

    const userid = localStorage.getItem('userid');
    const auth = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('usertype');


    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])

    
    
    useEffect(() => {
        if(role == 'parent' && pendingParent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getLinkByParentP(userid);
                    setPendingParent(data);
                    setPPReq(true);
                }
                catch (e) {
                        if(!e == 400){
                                setError(e.message);
                        }
                }
            }

            fetchData();
        }
    },[pendingParent])

    useEffect(() => {
        if(role == 'parent' && approvedParent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getLinkByParentA(userid);
                    setApprovedParent(data);
                    setAPReq(true);
                }
                catch (e) {
                        if(!e == 400){
                                setError(e.message);
                        }
                }
            }

            fetchData();
        }
    },[approvedParent])



    useEffect(() => {
        if(role == 'student' && approvedStudent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getLinkByStudentA(userid);
                    setApprovedStudent(data);
                    setASReq(true);
                }
                catch (e) {
                        if(!e == 400){
                                setError(e.message);
                        }
                }
            }

            fetchData();
        }
    },[approvedStudent])

    useEffect(() => {
        if(role == 'student' && pendingStudent.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getLinkByStudentP(userid);
                    setPendingStudent(data);
                    setPSReq(true);
                }
                catch (e) {
                        if(!e == 400){
                                setError(e.message);
                        }
                }
            }

            fetchData();
        }
    },[pendingStudent])

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitData = async(request) => {
        try{
            let response = await createRequest(request);

            if (response){
                setSuccess(true)
                window.location.reload(false);
            }
        }
        catch (e){
            setError(e.message);
        }  
    }

    const submitUpdate = async(request) => {
        try{
            let response = await approveRequest(request);

            if (response){
                setSuccess(true)
                window.location.reload(false);
            }
        }
        catch (e){
            setError(e.message);
        }  
    }

    const declineRequest = async(id) => {
       await deleteRequest(id);
       window.location.reload(false); 
    }
 

    const submitupdate = (parent,id) => {



            let request = {
                id: id,
                parentid: parent,
                studentid: userid,
                status: "approved",
            };


            submitUpdate(request);
        
        }     

        const viewStudent = (student) => {
            localStorage.setItem('student', student);

            nav('/linkContent/' + student);

        }

        const submitrequest= (e) => {
                e.preventDefault();
        
                setSuccess(false);
                setError('');
        
                if (student){
                    let request = {
                        parentid: userid,
                        studentid: student,
                        status: "pending",
                    };
        
                    submitData(request);
                }
                else{
                    setError('Student account ID must be present!')
                }
                } 

        if(role == 'parent'){
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
                            <Form autoComplete="off" onSubmit={submitrequest}>
                                <Form.Group className ='mb-4' controlId='friendRequest'>
                                <InputGroup>
                                        <InputGroup.Text>Student Account ID</InputGroup.Text>
                                        <Form.Control type = "text" placeholder='' onChange={e => setStudent(e.target.value)} required/>
                                        <Button variant='success' type='submit'>Make Request</Button>
                                </InputGroup>
                                </Form.Group>
                            </Form>
                        </Container>
                        <h2>Requests</h2>
                        <>
                        { ppReq ? (
                                
                                <Container>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Request Status</th>
                                        <th>Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                pendingParent.map((request) => (
                                                        <tr key={request.id}>
                                                        <td>{request.studentid}</td>
                                                        <td>{request.user.first_name}</td>
                                                        <td>{request.user.last_name}</td>
                                                        <td>{request.user.username}</td>
                                                        <td>{request.status}</td>
                                                        <td>
                                                        <button  class="btn btn-danger" onClick={() => declineRequest(request.linkid)}>Delete</button>
                                                        </td>
                                                        </tr>
                                                ))
                                        }
                                        
                                </tbody>
                                </Table> 
                                </Container>
                        ):(<p>You have no active requests.</p>)}
                        <h2>Active Links</h2>
                        { apReq ? (
                                <Container>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Request Status</th>
                                        <th>Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                approvedParent.map((request) => (
                                                        <tr key={request.id}>
                                                        <td>{request.studentid}</td>
                                                        <td>{request.user.first_name}</td>
                                                        <td>{request.user.last_name}</td>
                                                        <td>{request.user.username}</td>
                                                        <td>{request.status}</td>
                                                        <td>
                                                            <button class="btn btn-success" onClick={() => viewStudent(request.studentid)} >View</button>
                                                        </td>
                                                        </tr>
                                                ))
                                        }
                                        
                                </tbody>
                                </Table> 
                                </Container>
                        ):(<p>You have no accounts linked to yours.</p>)}
        
                        </>
                           
                    </div>
                )
        }
        else if (role == 'student'){
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
            
                        <>
                        { psReq ? (
                                <Container>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Request Status</th>
                                        <th>Action Required</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                pendingStudent.map((request) => (
                                                        <tr key={request.id}>
                                                        <td>{request.parentid}</td>
                                                        <td>{request.user.first_name}</td>
                                                        <td>{request.user.last_name}</td>
                                                        <td>{request.user.username}</td>
                                                        <td>{request.status}</td>
                                                        <td>
                                                        <button class="btn btn-success" onClick={() => submitupdate(request.parentid, request.linkid)}>Approve</button>
                                                        <button class="btn btn-danger" onClick={() => declineRequest(request.linkid)} >Delete</button>
                                                        </td>
                                                        </tr>
                                                ))
                                        }
                                        
                                </tbody>
                                </Table> 
                                </Container>
                        ):(<p>You have no active requests.</p>)}
                        { asReq ? (
                                <Container>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Request Status</th>
                                        <th>Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                approvedStudent.map((request) => (
                                                        <tr key={request.id}>
                                                        <td>{request.parentid}</td>
                                                        <td>{request.user.first_name}</td>
                                                        <td>{request.user.last_name}</td>
                                                        <td>{request.user.username}</td>
                                                        <td>{request.status}</td>
                                                        <td><button class="btn btn-danger" onClick={() => declineRequest(request.linkid)}>Delete</button></td>
                                                        </tr>
                                                ))
                                        }
                                        
                                </tbody>
                                </Table> 
                                </Container>
                        ):(<p>You have no accounts linked to yours.</p>)}
        
                        </>
                           
                    </div>
                )
        }
        else {
                <div className='link-request'>
                        <h1>Unauthorized</h1>
                </div>
        }
        
    
}

export default LinkPage