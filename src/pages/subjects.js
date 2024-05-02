import './login.css'
import {Alert, Container, CardGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getSubjects } from '../actions/content';
import SubjectCard from '../components/cards/subjectCard';


function SubjectsPage(){
    
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(subjects.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getSubjects();
                    setSubjects(data);
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[subjects])

    if (subjects.length > 0){
        return(
           <div className='subject-index'>
                <Container>
                    <h1>Subjects</h1>
                    <CardGroup>
                        {
                            subjects.map((subject) => {
                                return <SubjectCard 
                                    key={subject.subjectid}
                                    subjectId={subject.subjectid}
                                    name={subject.name}
                                    chapters={subject.number_of_chapters}
                                />
                            })
                        }
                    </CardGroup>
                </Container>
            </div>
      );
    }
    else if (error || subjects.length === 0){
        return(
           <div className='subject-index'>
                <Container>
                    <h1>Subjects</h1>
                    <Alert variant="danger">
                        <Alert.Heading>An error hass Occurred</Alert.Heading>
                        <p>{(error !== null) ? error: "There are currently no subjects available."}</p>
                    </Alert>
               </Container>
            </div>
      );
    }
}

export default SubjectsPage;