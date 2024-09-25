
// import React, { useState, useEffect, useRef } from 'react';
// import Navbar from './navbar';
// import Header from './header';
// import '../styles/workersList.css';
// import axiosInstance from '../context/axios';
// import { ORG_ID } from '../consts';
// import { useUserContext } from '../context/UserProvider.jsx';
// import User from '../pic/userRed.png';

// const WorkersList = () => {
//     const { user } = useUserContext();
//     const [workers, setWorkers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOrder, setSortOrder] = useState(true);
//     const tableRef = useRef(null);

//     useEffect(() => {
//         // Fetch workers data
//         const getWorkers = () => {
//             axiosInstance.get(`/${ORG_ID}/schedule`).then(res => {
//                 setWorkers(res.data?.schedule || []);
//             });
//         };
//         getWorkers();
//     }, []);

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value.toLowerCase());
//     };

//     const sortData = (column) => {
//         const sortedWorkers = [...workers].sort((a, b) => {
//             const first = a[column].toLowerCase();
//             const second = b[column].toLowerCase();
//             return sortOrder ? first.localeCompare(second) : second.localeCompare(first);
//         });
//         setWorkers(sortedWorkers);
//         setSortOrder(!sortOrder);
//     };

//     const exportToCSV = () => {
//         const headers = ['Id', 'Customer', 'Location', 'Order Date', 'Status', 'Amount'];
//         const csvRows = [headers.join(',')];

//         workers.forEach((worker) => {
//             const values = [
//                 worker.id,
//                 worker.customer,
//                 worker.location,
//                 worker.orderDate,
//                 worker.status,
//                 worker.amount
//             ];
//             csvRows.push(values.join(','));
//         });

//         const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
//         const url = URL.createObjectURL(csvData);
//         const a = document.createElement('a');
//         a.setAttribute('href', url);
//         a.setAttribute('download', 'workers.csv');
//         a.click();
//     };

//     const filteredWorkers = workers.filter(worker =>
//         Object.values(worker).some(val =>
//             String(val).toLowerCase().includes(searchTerm)
//         )
//     );

//     return (
//         <div className="container">
//             <Navbar />
//             <section className="main"> 
//             <Header text="Welcome to Schedy's Life!" />



// <main class="table" id="customers_table">
//         <section class="table__header">
//             <h1>Customer's Orders</h1>
//             <div class="input-group">
//                 <input type="search" placeholder="Search Data..."/>
//                 <img src={User} alt=""/>
//             </div>
//             <div class="export__file">
//                 <label for="export-file" class="export__file-btn" title="Export File"></label>
//                 <input type="checkbox" id="export-file"/>
//                 <div class="export__file-options">
//                     <label>Export As &nbsp; &#10140;</label>
//                     <label for="export-file" id="toPDF">PDF <img src={User} alt=""/></label>
//                     <label for="export-file" id="toJSON">JSON <img src={User} alt=""/></label>
//                     <label for="export-file" id="toCSV">CSV <img src={User} alt=""/></label>
//                     <label for="export-file" id="toEXCEL">EXCEL <img src={User} alt=""/></label>
//                 </div>
//             </div>
//         </section>
//         <section class="table__body">
//             <table>
//                 <thead>
//                     <tr>
//                         <th> Id <span class="icon-arrow">&UpArrow;</span></th>
//                         <th> Customer <span class="icon-arrow">&UpArrow;</span></th>
//                         <th> Location <span class="icon-arrow">&UpArrow;</span></th>
//                         <th> Order Date <span class="icon-arrow">&UpArrow;</span></th>
//                         <th> Status <span class="icon-arrow">&UpArrow;</span></th>
//                         <th> Amount <span class="icon-arrow">&UpArrow;</span></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td> 1 </td>
//                         <td> <img src={User} alt=""/>Zinzu Chan Lee</td>
//                         <td> Seoul </td>
//                         <td> 17 Dec, 2022 </td>
//                         <td>
//                             <p class="status delivered">Delivered</p>
//                         </td>
//                         <td> <strong> $128.90 </strong></td>
//                     </tr>
//                     <tr>
//                         <td> 2 </td>
//                         <td><img src={User} alt=""/> Jeet Saru </td>
//                         <td> Kathmandu </td>
//                         <td> 27 Aug, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$5350.50</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 3</td>
//                         <td><img src={User} alt=""/> Sonal Gharti </td>
//                         <td> Tokyo </td>
//                         <td> 14 Mar, 2023 </td>
//                         <td>
//                             <p class="status shipped">Shipped</p>
//                         </td>
//                         <td> <strong>$210.40</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 4</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> New Delhi </td>
//                         <td> 25 May, 2023 </td>
//                         <td>
//                             <p class="status delivered">Delivered</p>
//                         </td>
//                         <td> <strong>$149.70</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 5</td>
//                         <td><img src={User} alt=""/> Sarita Limbu </td>
//                         <td> Paris </td>
//                         <td> 23 Apr, 2023 </td>
//                         <td>
//                             <p class="status pending">Pending</p>
//                         </td>
//                         <td> <strong>$399.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 6</td>
//                         <td><img src={User} alt=""/> Alex Gonley </td>
//                         <td> London </td>
//                         <td> 23 Apr, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$399.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 7</td>
//                         <td><img src={User} alt=""/> Jeet Saru </td>
//                         <td> New York </td>
//                         <td> 20 May, 2023 </td>
//                         <td>
//                             <p class="status delivered">Delivered</p>
//                         </td>
//                         <td> <strong>$399.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 8</td>
//                         <td><img src={User} alt=""/> Aayat Ali Khan </td>
//                         <td> Islamabad </td>
//                         <td> 30 Feb, 2023 </td>
//                         <td>
//                             <p class="status pending">Pending</p>
//                         </td>
//                         <td> <strong>$149.70</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 9</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> Dhaka </td>
//                         <td> 22 Dec, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$249.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 9</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> Dhaka </td>
//                         <td> 22 Dec, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$249.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 9</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> Dhaka </td>
//                         <td> 22 Dec, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$249.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 9</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> Dhaka </td>
//                         <td> 22 Dec, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$249.99</strong> </td>
//                     </tr>
//                     <tr>
//                         <td> 9</td>
//                         <td><img src={User} alt=""/> Alson GC </td>
//                         <td> Dhaka </td>
//                         <td> 22 Dec, 2023 </td>
//                         <td>
//                             <p class="status cancelled">Cancelled</p>
//                         </td>
//                         <td> <strong>$249.99</strong> </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </section>
//     </main>




//              </section> 
//         </div>
//     );
// };

// export default WorkersList;



import React, { useState, useEffect, useRef } from 'react';
import Navbar from './navbar';
import Header from './header';
import '../styles/workersList.css';
import axiosInstance from '../context/axios';
import { ORG_ID } from '../consts';
import { useUserContext } from '../context/UserProvider.jsx';
import User from '../pic/userRed.png'; // Placeholder image

const WorkersList = () => {
    const { user } = useUserContext();
    const [workers, setWorkers] = useState([]);

    // Mock data for users
    const users = [
        [
            [1, "Zinzu Chan Lee", "Seoul", "17 Dec, 2022", "Delivered", "$128.90"],
            [2, "Jeet Saru", "Kathmandu", "27 Aug, 2023", "Cancelled", "$5350.50"],
            [3, "Sonal Gharti", "Tokyo", "14 Mar, 2023", "Shipped", "$210.40"],
            [4, "Alson GC", "New Delhi", "25 May, 2023", "Delivered", "$149.70"],
            [5, "Sarita Limbu", "Paris", "23 Apr, 2023", "Pending", "$399.99"],
            [6, "Alex Gonley", "London", "23 Apr, 2023", "Cancelled", "$399.99"],
            [7, "Jeet Saru", "New York", "20 May, 2023", "Delivered", "$399.99"],
            [8, "Aayat Ali Khan", "Islamabad", "30 Feb, 2023", "Pending", "$149.70"],
            [9, "Alson GC", "Dhaka", "22 Dec, 2023", "Cancelled", "$249.99"]
        ]
    ];

    // Sort, search and export functionalities as before

    return (
        <div className="container">
            <Navbar />
            <section className="main"> 
                <Header text="Welcome to Schedy's Life!" />

                <main className="table" id="customers_table">
                    <section className="table__header">
                        <h1>Customer's Orders</h1>
                        <div className="input-group">
                        <input type="search" placeholder="Search Data..."/>
                            {/* <input 
                                type="search" 
                                placeholder="Search Data..." 
                                // onChange={handleSearch} 
                            /> */}
                            <img src={User} alt="User Icon" />
                        </div>
                    </section>

                    <section className="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id <span className="icon-arrow">&UpArrow;</span></th>
                                    <th>Customer <span className="icon-arrow">&UpArrow;</span></th>
                                    <th>Location <span className="icon-arrow">&UpArrow;</span></th>
                                    <th>Order Date <span className="icon-arrow">&UpArrow;</span></th>
                                    <th>Status <span className="icon-arrow">&UpArrow;</span></th>
                                    <th>Amount <span className="icon-arrow">&UpArrow;</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users[0].map((user) => (
                                    <tr key={user[0]}>
                                        <td>{user[0]}</td>
                                        <td><img src={User} alt=""/> {user[1]} </td>
                                        <td>{user[2]}</td>
                                        <td>{user[3]}</td>
                                        <td><p className={`status ${user[4].toLowerCase()}`}>{user[4]}</p></td>
                                        <td><strong>{user[5]}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </section>
        </div>
    );
};

export default WorkersList;
