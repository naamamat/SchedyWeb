// import React from 'react';
// import PropTypes from 'prop-types';

// function UserTable({ name, picture }) {
//   if (!name || !picture) {
//     return null;
//   }

//   return (
//     <div className="td-person">
//       <img src={picture} alt={`${name}`} />
//       <span>{name}</span>
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
// };

// export default UserTable;






// import React from 'react';
// import PropTypes from 'prop-types';

// function UserTable({ name, picture, onEdit }) {
//   if (!name || !picture) {
//     return null;
//   }

//   return (
//     <div className="td-person">
//       <span
//         contentEditable
//         suppressContentEditableWarning
//         onBlur={(e) => onEdit(e.target.innerText)}
//       >
//         {name}
//       </span>
//       <img src={picture} alt={`${name}`} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;











// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// function UserTable({ name, picture, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     onEdit(e.target.value);
//     setIsEditing(false);
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         <option value="mosh1">mosh1</option>
//         <option value="mosh2">mosh2</option>
//         <option value="mosh3">mosh3</option>
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;






// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// function UserTable({ name, picture, position, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     onEdit(e.target.value);
//     setIsEditing(false);
//   };

//   const generateOptions = () => {
//     return (
//       <>
//         <option value={`${position}1`}>{`${position}1`}</option>
//         <option value={`${position}2`}>{`${position}2`}</option>
//         <option value={`${position}3`}>{`${position}3`}</option>
//       </>
//     );
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         {generateOptions()}
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   position: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;


















// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import picUser1 from '../pic/user1.png';
// import picUser2 from '../pic/user2.png';
// import picUser3 from '../pic/user3.png';

// // Add your custom options here
// const userOptions = {
//   "service": [
//     { name: "service 1", picture: picUser1 },
//     { name: "service 2", picture: picUser2 },
//     { name: "service 3", picture: picUser3 }
//   ],
//   // Add other positions as needed
//   "math": [
//     { name: "math 1", picture: picUser1 },
//     { name: "math 2", picture: picUser2 },
//     { name: "math 3", picture: picUser3 }
//   ]
// };

// function UserTable({ name, picture, position, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     const selectedOption = userOptions[position].find(option => option.name === e.target.value);
//     onEdit([selectedOption.name, selectedOption.picture]);
//     setIsEditing(false);
//   };

//   const generateOptions = () => {
//     return userOptions[position].map(option => (
//       <option key={option.name} value={option.name}>
//         {option.name}
//       </option>
//     ));
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         {generateOptions()}
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   position: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;






















// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import picUser1 from '../pic/user1.png';
// import picUser2 from '../pic/user2.png';
// import picUser3 from '../pic/user3.png';

// // Add your custom options here
// const userOptions = {
//   "service": [
//     { name: "service 1", picture: picUser1 },
//     { name: "service 2", picture: picUser2 },
//     { name: "service 3", picture: picUser3 }
//   ],
//   // Add other positions as needed
//   "math": [
//     { name: "math 1", picture: picUser1 },
//     { name: "math 2", picture: picUser2 },
//     { name: "math 3", picture: picUser3 }
//   ]
// };

// function UserTable({ name, picture, position, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     const selectedOption = userOptions[position].find(option => option.name === e.target.value);
//     onEdit([selectedOption.name, selectedOption.picture]);
//     setIsEditing(false);
//   };

//   const generateOptions = () => {
//     if (!userOptions[position]) {
//       return (
//         <>
//           <option value="">No options available</option>
//         </>
//       );
//     }

//     return userOptions[position].map(option => (
//       <option key={option.name} value={option.name}>
//         {option.name}
//       </option>
//     ));
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         {generateOptions()}
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   position: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;









// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import picUser1 from '../pic/user1.png';
// import picUser2 from '../pic/user2.png';
// import picUser3 from '../pic/user3.png';

// // Add your custom options here
// const userOptions = {
//   "service": [
//     { name: "service 1", picture: picUser1 },
//     { name: "service 2", picture: picUser2 },
//     { name: "service 3", picture: picUser3 }
//   ],
//   // Add other positions as needed
//   "math": [
//     { name: "math 1", picture: picUser1 },
//     { name: "math 2", picture: picUser2 },
//     { name: "math 3", picture: picUser3 }
//   ]
// };

// function UserTable({ name, picture, position, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     const selectedOption = userOptions[position].find(option => option.name === e.target.value);
//     onEdit([selectedOption.name, selectedOption.picture]);
//     setIsEditing(false);
//   };

//   const generateOptions = () => {
//     if (!userOptions[position]) {
//       return (
//         <>
//           <option value="">No options available</option>
//         </>
//       );
//     }

//     return userOptions[position].map(option => (
//       <option key={option.name} value={option.name}>
//         {option.name}
//       </option>
//     ));
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         {generateOptions()}
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   position: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;


















//good vresion!!!
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import picUser1 from '../pic/user1.png';
// import picUser2 from '../pic/user2.png';
// import picUser3 from '../pic/user3.png';

// const userOptions = {
//   "service": [
//     { name: "service 1", picture: picUser1 },
//     { name: "service 2", picture: picUser2 },
//     { name: "service 3", picture: picUser3 }
//   ],
//   "math": [
//     { name: "math 1", picture: picUser1 },
//     { name: "math 2", picture: picUser2 },
//     { name: "math 3", picture: picUser3 }
//   ]
// };

// function UserTable({ name, picture, pos, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSelectChange = (e) => {
//     const selectedOption = userOptions[pos].find(option => option.name === e.target.value);
//     onEdit([selectedOption.name, selectedOption.picture]);
//     setIsEditing(false);
//   };

//   const generateOptions = () => {
//     return userOptions[pos].map(option => (
//       <option key={option.name} value={option.name}>
//         {option.name}
//       </option>
//     ));
//   };

//   if (isEditing) {
//     return (
//       <select onChange={handleSelectChange} value={name}>
//         {generateOptions()}
//       </select>
//     );
//   }

//   return (
//     <div className="td-person" onClick={() => setIsEditing(true)}>
//       <span>{name}</span>
//       <img src={picture} alt={name} />
//     </div>
//   );
// }

// UserTable.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   pos: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default UserTable;











import React from 'react';
import PropTypes from 'prop-types';
import UserTableOptions from './userTableOptions';

function UserTable({ name, picture, pos, onEdit }) {
  return (
    <UserTableOptions name={name} picture={picture} pos={pos} onEdit={onEdit} />
  );
}

UserTable.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserTable;
