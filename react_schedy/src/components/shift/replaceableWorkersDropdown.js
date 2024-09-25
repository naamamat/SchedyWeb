import React, { useState, useRef, useEffect } from 'react';
import picUser3 from '../../pic/user3.png';


export const ReplaceableWorkersDropdown = ({ replaceableWorkers, children, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onEdit?.(option);
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

  return (
    <div className="custom-dropdown" ref={dropdownRef} onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer"}}>
      {children}
      {isOpen && (
        <div className="dropdown-menu">
          {replaceableWorkers?.length > 0 && replaceableWorkers?.map((worker) => {
            const {id, fullName} = worker;
            return (
            <div key={`${id}-${fullName}`} className="dropdown-option" onClick={() => handleSelect(worker)}>
            <div className="td-person">
              <span>{fullName}</span>
              <img src={picUser3} alt={fullName} />
            </div>
          </div>
          )})}
        </div>
      )}
    </div>
  );
}
