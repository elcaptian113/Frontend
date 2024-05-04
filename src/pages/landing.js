import './login.css'
import logo from '../images/logo.JPG'
import {Container} from 'react-bootstrap';



function LandingPage(){
    
        return(
           <div className='module-index'>
                <Container>                  
                <img src={logo} alt="Logo" />
                <br /><br />
                <p>Welcome to Geek to Me, where "it's all geek to me" is more than just a catchy phrase—it's our mission.</p>
                <p>We understand that academic subjects can sometimes feel like a foreign language, leaving students </p>
                <p>feeling lost in a sea of complex terms and theories. That's why we've created an innovative e-learning </p>
                <p>platform that bridges the gap between academic jargon and everyday language.</p>
                <br />
                <p>At Geek to Me, we believe that true understanding comes from clarity and comprehension. That's why</p>
                <p>we provide standard revision content for academic subjects such as GCSE and A-levels, alongside </p>
                <p>translations into easy-to-understand everyday language. By studying both texts simultaneously, </p>
                <p>students gain a deeper understanding of the material while retaining information more effectively.</p>
                <br />
                <p>But we don't stop there. We recognize the importance of parental involvement in education, which is </p>
                <p>why we offer a unique Parent-Student Link Account feature. Parents can connect with their child's account,</p>
                <p>allowing them to track learning progress and activities. This not only empowers parents to better support </p>
                <p>their child's education but also offers them the opportunity to enhance their own knowledge and </p>
                <p>understanding along the way.</p>
                <br />
                <p>At Geek to Me, we're not just here to help students succeed academically—</p>
                <p>we're here to empower them and their families on their learning journey. </p>
                <p>Welcome aboard, where geek is the new cool, and understanding is the </p>
                <p>ultimate superpower!</p>                         
                </Container>
            </div>
      );
    
}

export default LandingPage;