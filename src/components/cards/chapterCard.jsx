import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Card.css';

function ChapterCard(props) {
    
    return(
        <Link to={"/modules/" + props.chapterId}>
        <Card hoverable style={{flex: '200px'}} key={props.id}>
            <Card.Body>
                <Card.Title>{props.subjectName}</Card.Title>
                <Card.Text>Chapter {props.chapterNumber}</Card.Text>
                <Card.Title>{props.chapterName}</Card.Title>
                <Card.Text>Number of modules:</Card.Text>
                <Card.Text>{props.modules}</Card.Text>
            </Card.Body>
        </Card>
        </Link>
    )
}

export default ChapterCard;