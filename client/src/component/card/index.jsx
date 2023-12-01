import React from 'react';
import './index.scss';
import Button from '../button';

const Card = (props) => {
    return (
        <div className={`card ${props.variant}`} style={{ ...props.style }}>
            <h3 className="title">{props.title}</h3>
            <p className="description">{props.description}</p>
            <div className="buttons">
                <Button 
                    variant={props.variant || "primary"}
                    text="Edit"
                    onClick={() => props.onEdit()}
                    style={{ marginTop: 15 }}
                />
                <Button 
                    variant={props.variant || "primary"}
                    text="Delete"
                    onClick={() => props.onDelete()}
                    style={{ marginTop: 15 }}
                />
            </div>
        </div>
    );
};

export default Card;