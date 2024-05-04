import './login.css'
import {Container} from 'react-bootstrap';



function UA(){
    
        return(
           <div className='module-index'>
                <Container>                  
                        <h1>Unauthorized</h1>
                        <h2>You have attempted to access a restricted area</h2>
                        
                </Container>
            </div>
      );
    
}

export default UA;