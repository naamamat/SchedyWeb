
// import React from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, index) => (
//           <RowTable key={index} timePosition={row[0]} weekUser={row[1]} />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;













// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;
//   const [tableRows, setTableRows] = useState(rows);

//   const handleEdit = (rowIndex, colIndex, field, value) => {
//     const updatedRows = tableRows.map((row, rIndex) => {
//       if (rIndex === rowIndex) {
//         if (field === 'timePosition') {
//           row[0][colIndex] = value;
//         } else if (field === 'weekUser') {
//           row[1][colIndex] = value;
//         }
//       }
//       return row;
//     });
//     setTableRows(updatedRows);
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableRows.map((row, rowIndex) => (
//           <RowTable
//             key={rowIndex}
//             timePosition={row[0]}
//             weekUser={row[1]}
//             onEdit={(colIndex, field, value) => handleEdit(rowIndex, colIndex, field, value)}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;












// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;
//   const [tableRows, setTableRows] = useState(rows);

//   const handleEdit = (rowIndex, colIndex, field, value) => {
//     const updatedRows = tableRows.map((row, rIndex) => {
//       if (rIndex === rowIndex) {
//         if (field === 'timePosition') {
//           row[0][colIndex] = value;
//         } else if (field === 'weekUser') {
//           row[1][colIndex][0] = value;
//         }
//       }
//       return row;
//     });
//     setTableRows(updatedRows);
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableRows.map((row, rowIndex) => (
//           <RowTable
//             key={rowIndex}
//             rowIndex={rowIndex}
//             timePosition={row[0]}
//             weekUser={row[1]}
//             onEdit={(colIndex, field, value) => handleEdit(rowIndex, colIndex, field, value)}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;










// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;
//   const [tableRows, setTableRows] = useState(rows);

//   const handleEdit = (rowIndex, colIndex, field, value) => {
//     const updatedRows = tableRows.map((row, rIndex) => {
//       if (rIndex === rowIndex) {
//         if (field === 'timePosition') {
//           row[0][colIndex] = value;
//         } else if (field === 'weekUser') {
//           row[1][colIndex][0] = value;
//         }
//       }
//       return row;
//     });
//     setTableRows(updatedRows);
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableRows.map((row, rowIndex) => (
//           <RowTable
//             key={rowIndex}
//             rowIndex={rowIndex}
//             timePosition={row[0]}
//             weekUser={row[1]}
//             onEdit={(colIndex, field, value) => handleEdit(rowIndex, colIndex, field, value)}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;













// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;
//   const [tableRows, setTableRows] = useState(rows);

//   const handleEdit = (rowIndex, colIndex, field, value) => {
//     const updatedRows = tableRows.map((row, rIndex) => {
//       if (rIndex === rowIndex) {
//         if (field === 'timePosition') {
//           row[0][colIndex] = value;
//         } else if (field === 'weekUser') {
//           row[1][colIndex][0] = value;
//         }
//       }
//       return row;
//     });
//     setTableRows(updatedRows);
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableRows.map((row, rowIndex) => (
//           <RowTable
//             key={rowIndex}
//             rowIndex={rowIndex}
//             timePosition={row[0]}
//             weekUser={row[1]}
//             onEdit={(colIndex, field, value) => handleEdit(rowIndex, colIndex, field, value)}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;









// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RowTable from './rowTable';

// function TableShift({ tableArray }) {
//   const [days, rows] = tableArray;
//   const [tableRows, setTableRows] = useState(rows);

//   const handleEdit = (rowIndex, colIndex, field, value) => {
//     const updatedRows = tableRows.map((row, rIndex) => {
//       if (rIndex === rowIndex) {
//         if (field === 'timePosition') {
//           row[0][colIndex] = value;
//         } else if (field === 'weekUser') {
//           row[1][colIndex] = value;
//         }
//       }
//       return row;
//     });
//     setTableRows(updatedRows);
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Shift</th>
//           <th>Position</th>
//           {days.map((day, index) => (
//             <th key={index}>
//               <div className="td-day">
//                 <h1 className="Font-big">{day}</h1>
//                 <h4 className="Font-small">
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableRows.map((row, rowIndex) => (
//           <RowTable
//             key={rowIndex}
//             rowIndex={rowIndex}
//             timePosition={row[0]}
//             weekUser={row[1]}
//             onEdit={(colIndex, field, value) => handleEdit(rowIndex, colIndex, field, value)}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableShift.propTypes = {
//   tableArray: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
//   ).isRequired,
// };

// export default TableShift;







import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RowTable from './rowTable';

function TableShift({ tableArray }) {
  const [days, rows] = tableArray;
  const [tableRows, setTableRows] = useState(rows);

  const handleEdit = (rowIndex, colIndex, newValue) => {
    const updatedRows = tableRows.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const newWeekUser = row[1].map((user, uIndex) => {
          if (uIndex === colIndex) {
            return newValue;
          }
          return user;
        });
        return [row[0], newWeekUser];
      }
      return row;
    });
    setTableRows(updatedRows);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Shift</th>
          <th>Position</th>
          {days.map((day, index) => (
            <th key={index}>
              <div className="td-day">
                <h1 className="Font-big">{day}</h1>
                <h4 className="Font-small">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index]}
                </h4>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <RowTable
            key={index}
            timePosition={row[0]}
            weekUser={row[1]}
            rowIndex={index}
            onEdit={handleEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

TableShift.propTypes = {
  tableArray: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
  ).isRequired,
};

export default TableShift;


