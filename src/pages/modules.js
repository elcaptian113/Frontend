import './login.css'
import {Alert, Container, CardGroup} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getModuleByChapter  } from '../actions/content';
import ModuleCard from '../components/cards/moduleCard';


function ModulesPage(){
    const {chapterId} = useParams();
    let [modules, setModules] = useState([]);
    const [error, setError] = useState(null);

    const auth = localStorage.getItem('loggedIn');

    const nav = useNavigate();

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])


    useEffect(() => {
        if(modules.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getModuleByChapter(chapterId);
                    setModules(data);
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[modules])

    if (modules){
        return(
           <div className='module-index'>
                <Container>                  
                        <h1>Modules</h1>
                        <CardGroup>
                            {
                                modules.map((module) => {
                                    return <ModuleCard 
                                        key={module.moduleid}
                                        moduleId={module.moduleid}
                                        subjectName={module.subject.name}
                                        chapterNumber={module.chapter.chapter_number}
                                        moduleNumber={module.module_number}
                                        moduleName={module.module_name}
                                    />
                                })
                            }
                        </CardGroup>
                </Container>
            </div>
      );
    }
    else if (error || modules.length === 0){
        return(
           <div className='module-index'>
                <Container>
                    <h1>Modules</h1>
                    <Alert variant="danger">
                        <Alert.Heading>An error hass Occurred</Alert.Heading>
                        <p>{(error !== null) ? error: "Modules Cannot Be Found."}</p>
                    </Alert>
               </Container>
            </div>
      );
    }
}

export default ModulesPage;