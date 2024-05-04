import { useEffect, useState } from 'react';
import './login.css'
import {CardGroup, Container} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { addActivity } from '../actions/courseActivity';
import { getContent } from '../actions/content';
import ContentCard from '../components/cards/contentcard';



function ContentPage(){
        const {moduleid} = useParams();
        let [content, setContent] = useState([]);
        const [error, setError] = useState(null);
        const auth = localStorage.getItem('loggedIn');
        const userid = localStorage.getItem('userid');
        const nav = useNavigate();

        useEffect(() => {
                if ( auth !== '1'){
                nav('/');
                }
        }, [])

        const createActivity = async(user) => {
                await addActivity(user); 
             }

        useEffect(() => {

                let user = {
                        userid: userid,
                        moduleid: moduleid,
                    };

                createActivity(user);
                
        }, [])

        useEffect(() => {
                if(content.length <=0){
                    const fetchData = async () => {
                        try{
                            let data = await getContent(moduleid);
                            setContent(data);
                        }
                        catch (e) {
                            setError(e.message);
                        }
                    }
        
                    fetchData();
                }
            },[content])


    
        return(
           <div className='module-index'>
                <Container>                  
                        <h1>Click cards to translate text</h1>
                        <CardGroup>
                            {
                                content.map((text) => {
                                    return <ContentCard 
                                        key={text.id}
                                        heading={text.heading}
                                        academic={text.academic}
                                        translated={text.translated}
                                    />
                                })
                            }
                        </CardGroup>
                        
                </Container>
            </div>
      );
    
}

export default ContentPage;