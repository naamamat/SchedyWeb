import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import picUser1 from '../../pic/user1.png';
import picUser2 from '../../pic/user2.png';
import picUser3 from '../../pic/user3.png';

// Define your user options
const userOptions = {
  "service": [
    { name: "service 1", picture: picUser1 },
    { name: "service 2", picture: picUser2 },
    { name: "service 3", picture: picUser3 }
  ],
  "default": [
    { name: "math 1", picture: picUser1 },
    { name: "math 2", picture: picUser2 },
    { name: "math 3", picture: picUser3 }
  ]
};

function UserTableOptions({ name, picture = picUser1, pos, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ name, picture });
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    onEdit?.([option.name, option.picture]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateOptions = () => {
    return userOptions[pos].map(option => (
      <div key={option.name} className="dropdown-option" onClick={() => handleSelect(option)}>
        <div className="td-person">
          <span>{option.name}</span>
          <img src={option.picture} alt={option.name} />
        </div>
      </div>
    ));
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
      <div className="td-person">
        <span>{selected.name || ''}</span>
        {selected.picture ? (
          <img src={selected.picture} alt={selected.name} />
        ) : null}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {generateOptions()}
        </div>
      )}
    </div>
  );
}

UserTableOptions.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  pos: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserTableOptions;

