import React from 'react';
import '../styles/homePage.css';

const SpecialPara = (props) => {
    return (
        <div className="buttons-p">
            <div className="pStyle">
                <text className='noSpecialP' >{props.noSpecial}</text>
                <text className='specialP' data-text={props.special} >{props.special}</text>
            </div>
        </div>
    );
};

export default SpecialPara;
