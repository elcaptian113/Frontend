import { useState } from "react";
import {Card} from 'react-bootstrap';
import ReactCardFlip from "react-card-flip";
import './Card.css';



function ContentCard(props) {
    const [flip, setFlip] = useState(false);

    
    return(
        <a onClick={() => setFlip(!flip)}>
        <ReactCardFlip isFlipped={flip}
            flipDirection="horizontal">
            <div>
                <Card hoverable style={{width: '100%'}} key={props.id}>
                <Card.Body>
                    <Card.Title>{props.heading}</Card.Title>
                    <Card.Text>academic text</Card.Text>
                    <Card.Text>{props.academic}</Card.Text>
                </Card.Body>
                </Card>
            </div>
            <div>
                <Card hoverable style={{width: '100%'}} key={props.id}>
                <Card.Body>
                    <Card.Title>{props.heading}</Card.Title>
                    <Card.Text>translated text</Card.Text>
                    <Card.Text>{props.translated}</Card.Text>
                </Card.Body>
                </Card>
            </div>
        </ReactCardFlip>
        </a>        
    )
}

export default ContentCard;