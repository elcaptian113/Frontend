import './login.css'
import {Alert, Container, CardGroup} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getChapterBySubject  } from '../actions/content';
import ChapterCard from '../components/cards/chapterCard';



function ChaptersPage(){
    const {subjectId} = useParams();
    let [chapters, setChapters] = useState([]);
    const [error, setError] = useState(null);

    const auth = localStorage.getItem('loggedIn');

    useEffect(() => {
        if ( auth !== '1'){
            nav('/');
        }
    }, [])


    useEffect(() => {
        if(chapters.length <=0){
            const fetchData = async () => {
                try{
                    let data = await getChapterBySubject(subjectId);
                    setChapters(data);
                }
                catch (e) {
                    setError(e.message);
                }
            }

            fetchData();
        }
    },[chapters])

    if (chapters){
        return(
           <div className='chapter-index'>
                              
                        <h1>Chapters</h1>
                        <CardGroup>
                            {
                                chapters.map((chapter) => {
                                    return <ChapterCard 
                                        key={chapter.chapterid}
                                        chapterId={chapter.chapterid}
                                        subjectName={chapter.subject.name}
                                        chapterNumber={chapter.chapter_number}
                                        chapterName={chapter.chapter_name}
                                        modules={chapter.number_of_modules}
                                    />
                                })
                            }
                        </CardGroup>
                
            </div>
      );
    }
    else if (error || chapters.length === 0){
        return(
           <div className='chapter-index'>
                <Container>
                    <h1>Chapters</h1>
                    <Alert variant="danger">
                        <Alert.Heading>An error hass Occurred</Alert.Heading>
                        <p>{(error !== null) ? error: "Chapters Cannot Be Found."}</p>
                    </Alert>
               </Container>
            </div>
      );
    }
}

export default ChaptersPage;