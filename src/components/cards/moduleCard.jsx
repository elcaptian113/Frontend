import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Card.css';

function ModuleCard(props) {
    
    return(
        //<Link to={"/content/" + props.moduleId}>
        <Link to={"/content"}>
        <Card hoverable style={{flex: '200px'}} key={props.id}>
            <Card.Body>
                <Card.Title>{props.subjectName}</Card.Title>
                <Card.Text>Chapter {props.chapterNumber}</Card.Text>
                <Card.Text>Module {props.moduleNumber}</Card.Text>
                <Card.Title>{props.moduleName}</Card.Title>
            </Card.Body>
        </Card>
        </Link>
    )
}

export default ModuleCard;