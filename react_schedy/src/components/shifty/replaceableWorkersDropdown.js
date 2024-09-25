// import React, { useState, useRef, useEffect } from 'react';
// import picUser3 from '../../pic/user3.png';
// import Pic from '../../context/workerPic.js'


// export const ReplaceableWorkersDropdown = ({ replaceableWorkers, children, onEdit }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleSelect = (option) => {
//     onEdit?.(option);
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="custom-dropdown" ref={dropdownRef} onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer"}}>
//       {children}
//       {isOpen && (
//         <div className="dropdown-menu">
//           {!!replaceableWorkers?.length && replaceableWorkers.map((worker) => {
//             const {id, fullName} = worker;
//             return (
//             <div key={`${id}-${fullName}`} className="dropdown-option" onClick={() => handleSelect(worker)}>
//             <div className="td-person">
//               <span>{fullName}</span>
//               {/* <img src={picUser3} alt={fullName} /> */}
//               <Pic id={id} />
//             </div>
//           </div>
//           )})}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from 'react';
import picUser3 from '../../pic/user3.png';
import Pic from '../../context/workerPic.js';

export const ReplaceableWorkersDropdown = ({ replaceableWorkers, children, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for filtering by fullName
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onEdit?.(option);
    setIsOpen(false); // Close the dropdown when an option is selected
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown only if clicking outside the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown without closing when interacting inside
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent click events from bubbling up and closing the dropdown
    setIsOpen(!isOpen);
  };

  // Filter the workers based on the search term
  const filteredWorkers = replaceableWorkers?.filter((worker) =>
    worker.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-dropdown" ref={dropdownRef} onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
      {children}

      {isOpen && (
        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
          {/* Add input field for search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="dropdown-search"
            style={{ marginBottom: '10px', width: '100%', background:'#854a51', color:'white' }}
          />

          {/* Display filtered workers */}
          {!!filteredWorkers?.length ? (
            filteredWorkers.map((worker) => {
              const { id, fullName } = worker;
              return (
                <div key={`${id}-${fullName}`} className="dropdown-option" onClick={() => handleSelect(worker)}>
                  <div className="td-person">
                    <span>{fullName}</span>
                    <Pic id={id} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dropdown-option">No workers found</div>
          )}
        </div>
      )}
    </div>
  );
};
