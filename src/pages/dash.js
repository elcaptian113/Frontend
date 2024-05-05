import './login.css'
import { useEffect, useState } from 'react';
import {Container, Button} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import all from '../images/admin overview.JPG'
import view1 from '../images/view 1.JPG'
import view2 from '../images/view 2.JPG'
import view3 from '../images/view 3.JPG'



function Dash(){

    const nav = useNavigate();

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
    
        return(
            <div className='home-index'>
                 <Container>
                     <h1>Geek to Me usage trends</h1>
                     <br></br>
                     <img src={all} alt="Logo" class="responsive" />
                     <img src={view1} alt="Logo" class="responsive" />
                     <img src={view2} alt="Logo" class="responsive" />
                     <img src={view3} alt="Logo" class="responsive" />            
                                 
                                 
                </Container>
             </div>
     );

}

export default Dash;