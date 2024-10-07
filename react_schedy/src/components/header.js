import React from 'react';
import '../styles/homePage.css';

const Header = (props) => {
    return (
        <div className="buttons-g">
            <div>
                <text className='headerText'>{props.text}</text>
            </div>
        </div>
    );
};

export default Header;
