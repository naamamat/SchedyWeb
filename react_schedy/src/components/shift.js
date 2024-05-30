
// import React from "react";
// import '../styles/styleShift.css';
// import picUser1 from '../pic/user1.png';
// import picUser2 from '../pic/user2.png';
// import picUser3 from '../pic/user3.png';
// import picUser4 from '../pic/user4.png';
// import picUser5 from '../pic/user5.png';
// import TableShift from './tableShift.js';
// import Navbar from './navbar';

// function Shift() {

//   // Define the data
//   const days = [11, 12, 13, 14, 15, 16, 17];
//   const timePos = [["11:00-11:30", "service"],["12:00-12:30", "service"],["", "math"]];
//   const users = [
//     [
//         ["Badan John", picUser1],
//         [null, null],
//         ["Badan John", picUser3],
//         [null, null],
//         ["Badan John", picUser5],
//         ["Badan John", picUser1],
//         [null, null]
//     ], 
//     [
//         ["Badan John", picUser2],
//         [null, null],
//         ["Badan John", picUser1],
//         ["Badan John", picUser4],
//         [null,null],
//         [null, null],
//         [null, null]
//     ],
//     [

//         [null, null],
//         ["Badan John", picUser1],
//         [null,null],
//         ["Badan John", picUser5],
//         [null, null],
//         ["Badan John", picUser2],
//         [null, null]
//     ]

//   ];
//   const rows = [];

//   // Combine timePos and users into rows
//   for (let i = 0; i < timePos.length; i++) {
//     rows.push([timePos[i], users[i]]);
//     rows.push([timePos[i], users[i]]);
//     rows.push([timePos[i], users[i]]);
//     rows.push([timePos[i], users[i]]);
//   }

//   // Combine days and rows into tableArray
//   const tableArray = [days, rows];

//   return (
//     <div className="container">
//       <Navbar />

//       <section className="main">
//         <div className="center-header">
//           <h1 className="header">-Shift -</h1>
//           <div className="choose-section">
//             <button>Previous Week</button>
//             <span> May 2024 </span>
//             <button>Next Week</button>
//           </div>
//         </div>

//         <section className="attendance">
//           <div className="attendance-list">
//             <TableShift tableArray={tableArray} />
//           </div>
//         </section>
//       </section>

//       <nav className="shift-users">
//         <div className="users-hed">
//           <h2>Shift</h2>
//           <h3>Current placement</h3>
//         </div>
//         {/* Add current placement details */}

//         <div className="users-hed">
//           <h3>Options placement:</h3>
//         </div>
//         <ul>
//           {/* Add options placement list items */}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Shift;











import React from "react";
import '../styles/styleShift.css';
import picUser1 from '../pic/user1.png';
import picUser2 from '../pic/user2.png';
import picUser3 from '../pic/user3.png';
import picUser4 from '../pic/user4.png';
import picUser5 from '../pic/user5.png';
import TableShift from './tableShift';
import Navbar from './navbar';

function Shift() {
  // Define the data
  const days = [11, 12, 13, 14, 15, 16, 17];
  const timePos = [["11:00-11:30", "service"], ["12:00-12:30", "service"], ["", "math"]];
  const users = [
    [
      ["Badan John", picUser1],
      [null, null],
      ["Badan John", picUser3],
      [null, null],
      ["Badan John", picUser5],
      ["Badan John", picUser1],
      [null, null]
    ], 
    [
      ["Badan John", picUser2],
      [null, null],
      ["Badan John", picUser1],
      ["Badan John", picUser4],
      [null,null],
      [null, null],
      [null, null]
    ],
    [
      [null, null],
      ["Badan John", picUser1],
      [null,null],
      ["Badan John", picUser5],
      [null, null],
      ["Badan John", picUser2],
      [null, null]
    ]
  ];
  const rows = [];

  // Combine timePos and users into rows
  for (let i = 0; i < timePos.length; i++) {
    rows.push([timePos[i], users[i]]);
  }

  // Combine days and rows into tableArray
  const tableArray = [days, rows];

  return (
    <div className="container">
      <Navbar />

      <section className="main">
        <div className="center-header">
          <h1 className="header">-Shift -</h1>
          <div className="choose-section">
            <button>Previous Week</button>
            <span> May 2024 </span>
            <button>Next Week</button>
          </div>
        </div>

        <section className="attendance">
          <div className="attendance-list">
            <TableShift tableArray={tableArray} />
          </div>
        </section>
      </section>

      <nav className="shift-users">
        <div className="users-hed">
          <h2>Shift</h2>
          <h3>Current placement</h3>
        </div>
        {/* Add current placement details */}

        <div className="users-hed">
          <h3>Options placement:</h3>
        </div>
        <ul>
          {/* Add options placement list items */}
        </ul>
      </nav>
    </div>
  );
}

export default Shift;
