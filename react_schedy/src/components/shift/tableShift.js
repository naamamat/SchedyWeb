import React  from 'react';
import { format } from 'date-fns';
import UserTableOptions from './userTableOptions';

// Object.keys({1: a, 2: b, 3: c}) => ["1", "2", "3"]
// Object.values({1: a, 2: b, 3: c}) => ["a",b", "c"]
// Object.entries({1: a, 2: b, 3: c}) => [["1", "a"], ["2", "b"], ["3", "c"]]
// Object.entries({`${start}-{end}-{skill}}) => [["startednskill", [schedules]],...]

function TableShift({ schedule, days }) {

  // const handleEdit = (rowIndex, colIndex, newValue) => {
  //   const updatedRows = tableRows.map((row, rIndex) => {
  //     if (rIndex === rowIndex) {
  //       const newWeekUser = row[1].map((user, uIndex) => {
  //         if (uIndex === colIndex) {
  //           return newValue;
  //         }
  //         return user;
  //       });
  //       return [row[0], newWeekUser];
  //     }
  //     return row;
  //   });
  //   setTableRows(updatedRows);
  // };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Shift</th>
          <th>Position</th>
          {days.map((day, index) => (
            <th key={index}>
              <div className="td-day">
                <h1 className="Font-big">{format(new Date(day), 'd')}</h1>
                <h4 className="Font-small">
                  {format(day, 'EEEE')}
                </h4>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(schedule).map(([key, rowData], index) => (
          <tr key={key}>
            <td>{rowData.startTime} - {rowData.endTime}</td>
            <td>{rowData.skill}</td>
            {days.map((day) => (
              <td key={`${day}-${key}`} >
                {rowData[day]?.map((worker) => (
                  <UserTableOptions
                    key={worker.id}
                    name={worker.fullName}
                    // picture={user[1]}
                    pos={"default"} // Ensure position is valid
                    // onEdit={(newValue) => handleEdit(rowIndex, colIndex, newValue)}
                  />))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/*
{
    "_id": "6687c7502f9895708d80110c",
    "organizationId": "12345",
    "week": "2024-07-06T21:00:00.000Z",
    "shiftDate": "2024-07-07T21:00:00.000Z",
    "shiftStartTime": "06:00",
    "shiftEndTime": "17:00",
    "workers": [
        {
            "id": "15",
            "fullName": "Worker15",
            "skills": [
                "skill3",
                "skill4"
            ],
            "_id": "6687c7502f9895708d80110d"
        },
        {
            "id": "31",
            "fullName": "Worker31",
            "skills": [
                "skill8",
                "skill10",
                "skill3"
            ],
            "_id": "6687c7502f9895708d80110e"
        },
        {
            "id": "35",
            "fullName": "Worker35",
            "skills": [
                "skill6",
                "skill7",
                "skill3"
            ],
            "_id": "6687c7502f9895708d80110f"
        }
    ],
    "replaceableWorkers": [],
    "skill": "skill3",
    "__v": 0
}

*/
TableShift.propTypes = {
};

export default TableShift;


