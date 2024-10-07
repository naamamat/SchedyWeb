import React from 'react';
import '../styles/homePage.css';

const Paragraph = (props) => {
    return (
        <div className="buttons-p">
            <div className="pStyle">
                <text className='regularText'>{props.text}</text>
            </div>
        </div>
    );
};

export default Paragraph;
