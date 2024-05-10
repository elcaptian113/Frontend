import './login.css'
import { useRef, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axiosMain from '../api/axios';



const LOGIN_URL = '/login';

const Login = () => {
    const nav = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const auth = localStorage.getItem('loggedIn');

    useEffect(() => {
        if ( auth == "1"){
            nav('/profile');
        }
    })

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosMain.post(LOGIN_URL,
                
                JSON.stringify({ username: user, password: pwd }),
                {
                    
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            
            const userid = response?.data?.userid;
            const username = response?.data?.username;
            const usertype = response?.data?.usertype;
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            
            localStorage.setItem('userid', userid);
            localStorage.setItem('username', username);
            localStorage.setItem('usertype', usertype);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('loggedIn', 1)

            setUser('');
            setPwd('');
            nav('/profile');
            window.location.reload(false);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

        return (
            <>
                <center>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
    
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="btnSign">Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
                </center>
            </>
        )
        
    
}

export default Login