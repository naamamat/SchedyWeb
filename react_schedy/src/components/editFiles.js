
import React from 'react';
import '../styles/styleShift.css';
import picUser1 from '../pic/user1.png';
import picUser2 from '../pic/user2.png';
import picUser3 from '../pic/user3.png';
import picUser4 from '../pic/user4.png';
import picUser5 from '../pic/user5.png';
import DownloadButtons from './downloadButtons';
import UserTable from './userTable';
import Navbar from './navbar';


function Shift() {

  return (
    <div className="container">
      <Navbar />

      <section className="main">
        <div className="center-header">
          <h1 className="header">- Upload Files -</h1>
          <DownloadButtons></DownloadButtons>
        </div>

        <section className="attendance">
          <div className="attendance-list">
            <table className="table">
              <thead>
                <tr>
                  <th>Shift</th>
                  <th>Position</th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">12</h1>
                      <h4 className="Font-small">Sunday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">13</h1>
                      <h4 className="Font-small">Monday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">14</h1>
                      <h4 className="Font-small">Tuesday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">15</h1>
                      <h4 className="Font-small">Thursday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">16</h1>
                      <h4 className="Font-small">Friday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="td-day">
                      <h1 className="Font-big">17</h1>
                      <h4 className="Font-small">Saturday</h4>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>07:00-11:30</td>
                  <td>Service and Info</td>
                  <td>
                    <UserTable name="Badan John" picture={picUser1} />
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <UserTable name="Badan John" picture={picUser2} />
                  </td>
                  <td></td>
                  <td>
                    <UserTable name="Badan John" picture={picUser3} />
                  </td>
                </tr>
                <tr>
                  <td>07:00-11:30</td>
                  <td>Service and Info</td>
                  <td></td>
                  <td>
                    <UserTable name="Badan John" picture={picUser1} />
                  </td>
                  <td>
                    <UserTable name="Badan John" picture={picUser2} />
                  </td>
                  <td>
                    <UserTable name="Badan John" picture={picUser4} />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>07:00-11:30</td>
                  <td>Service and Info</td>
                  <td></td>
                  <td>
                    <UserTable name="Badan John" picture={picUser5} />
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <UserTable name="Badan John" picture={picUser4} />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Shift;
