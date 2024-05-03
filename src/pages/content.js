import { useEffect } from 'react';
import './login.css'
import {Container} from 'react-bootstrap';



function ContentPage(){

        const auth = localStorage.getItem('loggedIn');

        useEffect(() => {
                if ( auth !== '1'){
                nav('/');
                }
        }, [])
    
        return(
           <div className='module-index'>
                <Container>                  
                        <h1>Content</h1>
                        
                </Container>
            </div>
      );
    
}

export default ContentPage;