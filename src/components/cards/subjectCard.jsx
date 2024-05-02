import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Card.css';

function SubjectCard(props) {
    
    return(
        <Link to={"/chapters/" + props.subjectId}>
        <Card hoverable style={{flex: '200px'}} key={props.subjectd}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>Number of Chapters:</Card.Text>
                <Card.Text>{props.chapters}</Card.Text>
            </Card.Body>
        </Card>
        </Link>
    )
}

export default SubjectCard;