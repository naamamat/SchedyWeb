// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ timePosition, weekUser }) {
//   return (
//     <tr>
//       <td>{timePosition[0]}</td>
//       <td>{timePosition[1]}</td>
//       <td> <UserTable name={weekUser[0][0]} picture={weekUser[0][1]} /></td>
//       <td> <UserTable name={weekUser[1][0]} picture={weekUser[1][1]} /></td>
//       <td> <UserTable name={weekUser[2][0]} picture={weekUser[2][1]} /></td>
//       <td> <UserTable name={weekUser[3][0]} picture={weekUser[3][1]} /></td>
//       <td> <UserTable name={weekUser[4][0]} picture={weekUser[4][1]} /></td>
//       <td> <UserTable name={weekUser[5][0]} picture={weekUser[5][1]} /></td>
//       <td> <UserTable name={weekUser[6][0]} picture={weekUser[6][1]} /></td>
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   timePosition: PropTypes.string.isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default RowTable;














// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(index, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, index) => (
//         <td key={`user-${index}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             onEdit={(value) => onEdit(index, 'weekUser', [value, user[1]])}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;









// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ rowIndex, timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(index, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, index) => (
//         <td key={`user-${index}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             onEdit={(value) => onEdit(index, 'weekUser', value)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   rowIndex: PropTypes.number.isRequired,
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;












// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ rowIndex, timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(rowIndex, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, index) => (
//         <td key={`user-${index}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             position={timePosition[1]} // Pass the position for generating dropdown options
//             onEdit={(value) => onEdit(rowIndex, index, 'weekUser', value)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   rowIndex: PropTypes.number.isRequired,
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;













// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ rowIndex, timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(rowIndex, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, index) => (
//         <td key={`user-${index}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             position={timePosition[1]} // Pass the position for generating dropdown options
//             onEdit={(value) => onEdit(rowIndex, index, 'weekUser', value)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   rowIndex: PropTypes.number.isRequired,
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;












// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ rowIndex, timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(rowIndex, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, index) => (
//         <td key={`user-${index}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             position={timePosition[1] || "default"} // Ensure position is valid
//             onEdit={(value) => onEdit(rowIndex, index, 'weekUser', value)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   rowIndex: PropTypes.number.isRequired,
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;

















// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ rowIndex, timePosition, weekUser, onEdit }) {
//   return (
//     <tr>
//       {timePosition.map((time, index) => (
//         <td
//           key={`time-${index}`}
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => onEdit(rowIndex, 'timePosition', e.target.innerText)}
//         >
//           {time}
//         </td>
//       ))}
//       {weekUser.map((user, colIndex) => (
//         <td key={`user-${colIndex}`}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             position={timePosition[1] || "default"} // Ensure position is valid
//             onEdit={(value) => onEdit(rowIndex, colIndex, 'weekUser', value)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   rowIndex: PropTypes.number.isRequired,
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;








//GOOD VERSION!!!
// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ timePosition, weekUser, rowIndex, onEdit }) {
//   return (
//     <tr>
//       <td>{timePosition[0]}</td>
//       <td>{timePosition[1]}</td>
//       {weekUser.map((user, colIndex) => (
//         <td key={colIndex}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             pos={timePosition[1]}
//             onEdit={(newValue) => onEdit(rowIndex, colIndex, newValue)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   rowIndex: PropTypes.number.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;









// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTable from './userTable';

// function RowTable({ timePosition, weekUser, rowIndex, onEdit }) {
//   return (
//     <tr>
//       <td>{timePosition[0]}</td>
//       <td>{timePosition[1]}</td>
//       {weekUser.map((user, colIndex) => (
//         <td key={colIndex}>
//           <UserTable
//             name={user[0]}
//             picture={user[1]}
//             pos={timePosition[1] || "default"} // Ensure position is valid
//             onEdit={(newValue) => onEdit(rowIndex, colIndex, newValue)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   rowIndex: PropTypes.number.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;





// import React from 'react';
// import PropTypes from 'prop-types';
// import UserTableOptions from './userTableOptions';

// function RowTable({ timePosition, weekUser, rowIndex, onEdit }) {
//   return (
//     <tr>
//       <td>{timePosition[0]}</td>
//       <td>{timePosition[1]}</td>
//       {weekUser.map((user, colIndex) => (
//         <td key={colIndex} className="clickable-td">
//           <UserTableOptions
//             name={user[0]}
//             picture={user[1]}
//             pos={timePosition[1] || "default"} // Ensure position is valid
//             onEdit={(newValue) => onEdit(rowIndex, colIndex, newValue)}
//           />
//         </td>
//       ))}
//     </tr>
//   );
// }

// RowTable.propTypes = {
//   timePosition: PropTypes.arrayOf(PropTypes.string).isRequired,
//   weekUser: PropTypes.arrayOf(PropTypes.array).isRequired,
//   rowIndex: PropTypes.number.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default RowTable;


