import React from 'react';
import '../styles/homePage.css';

const ParaPic = (props) => {
    return (
        <div className="buttons-p">
            <div className="headerStyle">
                <img className='picHeader' src={props.content}/>
            </div>
        </div>
    );
};

export default ParaPic;
