// import React, { useEffect, useState } from "react";
// import '../../styles/styleShift.css';
// import TableWorkersList from './tableWorkersList';
// import Navbar from '../navbar';
// import Header from '../header';
// import axiosInstance from "../../context/axios";
// import { ORG_ID, SERVER_URL } from "../../consts";

// async function getWorkers() {
//   try {
//     console.log("bring workerss")
//     const workers = await axiosInstance.get(`/${ORG_ID}/workers`);

//     console.log(workers);
//     return workers;
//   } catch (error) {
//     console.log("blablas")
//     console.log("Error fetching workers:", error);
//     return null;
//   }
// }



// // function async getWorkers() {
// //     const workers = await axiosInstance.get(`/${ORG_ID}/workers`);
// //     console.log(workers)
// //     return workers
// //   // const workersData = {
// //   //   organizationId: "12345",
// //   //   workers: [
// //   //     {
// //   //       id: "1",
// //   //       fullName: "John Doe",
// //   //       skills: ["Cooking", "Cleaning", "Driving"],
// //   //     },
// //   //     {
// //   //       id: "2",
// //   //       fullName: "Jane Smith",
// //   //       skills: ["Coding", "Design", "Marketing"],
// //   //     },
// //   //     {
// //   //       id: "3",
// //   //       fullName: "Alice Johnson",
// //   //       skills: ["Project Management", "Team Leadership", "Communication"],
// //   //     },
// //   //     {
// //   //       id: "4",
// //   //       fullName: "Bob Lee",
// //   //       skills: ["Data Analysis", "Machine Learning", "Python"],
// //   //     },
// //   //     {
// //   //       id: "5",
// //   //       fullName: "Charlie Brown",
// //   //       skills: ["Writing", "Editing", "Content Creation"],
// //   //     },
// //   //     {
// //   //       id: "1",
// //   //       fullName: "John Doe",
// //   //       skills: ["Cooking", "Cleaning", "Driving"],
// //   //     },
// //   //     {
// //   //       id: "2",
// //   //       fullName: "Jane Smith",
// //   //       skills: ["Coding", "Design", "Marketing"],
// //   //     },
// //   //     {
// //   //       id: "3",
// //   //       fullName: "Alice Johnson",
// //   //       skills: ["Project Management", "Team Leadership", "Communication"],
// //   //     },
// //   //     {
// //   //       id: "4",
// //   //       fullName: "Bob Lee",
// //   //       skills: ["Data Analysis", "Machine Learning", "Python"],
// //   //     },
// //   //     {
// //   //       id: "5",
// //   //       fullName: "Charlie Brown",
// //   //       skills: ["Writing", "Editing", "Content Creation"],
// //   //     },
// //   //   ],
// //   // };
// //   // return workersData;
// // };

// function WorkersList() {
//   const [error, setError] = useState(false);
//   const [workers, setWorkers] = useState({ workers: [] }); // Ensure workers state is initialized properly

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       try {
//         const workersData = await getWorkers();
//         setWorkers(workersData); // Set workers data to state
//       } catch (err) {
//         setError(true); // Handle errors
//       }
//     };
//     fetchWorkers();
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />

//       <section className="main">
//         <Header text="My Shifts" />

//         <section className="attendance">
//           <div className="workersList">
//             {error ? (
//               <p>Error while fetching data. Please try again later...</p>
//             ) : (
//               <TableWorkersList workers={workers} setWorkers={setWorkers} />
//             )}
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// }

// export default WorkersList;

























import React, { useEffect, useState } from "react";
import '../../styles/styleShift.css';
import TableWorkersList from './tableWorkersList';
import Navbar from '../navbar';
import Header from '../header';
import axiosInstance from "../../context/axios";
import { useUserContext } from "../../context/UserProvider";

async function getWorkers(orgId) {
  try {

    const response = await axiosInstance.get(`/${orgId}/workers`);
    console.log("workers before processing:", response);
    const workers = response.data?.workers;
    console.log("workers after processing:", workers);

    return workers;
  } catch (error) {
    console.log("Error fetching workers:", error);
    return null;
  }
}

function handleProcessAgain(){
  console.log("kkk")
}


// function WorkersList() {
//   const { user } = useUserContext();
//   const [error, setError] = useState(false);
//   const [workers, setWorkers] = useState({ workers: [] }); // Ensure workers state is initialized properly

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       try {
//         const workersData = await getWorkers(user.orgId);
//         setWorkers(workersData); // Set workers data to state
//       } catch (err) {
//         setError(true); // Handle errors
//       }
//     };
//     fetchWorkers();
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />

//       <section className="main">
//         <Header text="My Workers" />



//         <div className="buttons-s">
//         <div className="filter-section">
//             <div>
//       <button  onClick={() => handleProcessAgain()}> Process Again</button>
//             </div>
//         </div>
          
//         <div className="filter-section">
//                       <div>
//               <label>Worker: </label>
//               <input
//                 type="text"
//                 // value={filterFullName}
//                 // onChange={(e) => setFilterFullName(e.target.value)}
//               />
//             </div>
//         </div>

//             </div>






//         <section className="attendance">
//           <div className="workersList">
//             {error ? (
//               <p>Error while fetching data. Please try again later...</p>
//             ) : (
//               <TableWorkersList workers={workers} setWorkers={setWorkers} />
//             )}
//           </div>
//         </section>
//       </section>

//     </div>
//   );
// }

// export default WorkersList;



function WorkersList() {
  const { user } = useUserContext();
  const [error, setError] = useState(false);
  const [workers, setWorkers] = useState({ workers: [] });
  const [filterFullName, setFilterFullName] = useState(''); // Add state for filtering

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersData = await getWorkers(user.orgId);
        setWorkers(workersData); // Set workers data to state
      } catch (err) {
        setError(true);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <section className="main">
        <Header text="My Workers" />
        <div className="buttons-s">
          <div className="filter-section">
            <div>
              <button onClick={() => handleProcessAgain()}>Process Again</button>
            </div>
          </div>

          <div className="filter-section">
            <div>
              <label>Worker: </label>
              <input
                type="text"
                value={filterFullName}
                onChange={(e) => setFilterFullName(e.target.value)} // Handle input change
              />
            </div>
          </div>
        </div>

        <section className="attendance">
          <div className="workersList">
            {error ? (
              <p>Error while fetching data. Please try again later...</p>
            ) : (
              <TableWorkersList workers={workers} setWorkers={setWorkers} filterFullName={filterFullName} />
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default WorkersList;
