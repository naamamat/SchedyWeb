
import React from 'react';
import '../styles/styleButtonDown.css';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


function DownloadButtons(props) {

    const handleDownloadShift = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Next Week Schedule');
    
        // Add header row
        const headerRow = worksheet.addRow(['Date', 'Beginning time', 'End time', 'Skill', 'Demand']);
    
        // Calculate the dates for the next week starting from Sunday
        const today = new Date();
        const nextSunday = new Date(today.setDate(today.getDate() + (7 - today.getDay())));
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(nextSunday);
          date.setDate(nextSunday.getDate() + i);
          return date.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
        });
    
        // Add date rows
        dates.forEach(date => {
          worksheet.addRow([date, '', '', '', '']);
        });
    


        // Define common font style
        const commonFont = { name: 'Assistant', size: 12 };


        // Style the header
        headerRow.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '854a51' }
          };
          cell.font = { ...commonFont, color: { argb: 'FFFFFF' }, bold: true };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
    
        // Style the data rows
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            row.eachCell(cell => {

            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.font = { ...commonFont };

              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
            });
          }
        });
    
        // Auto size columns
        worksheet.columns.forEach(column => {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, cell => {
            const columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength;
        });

    // Save the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Shift_Schedule.xlsx');
  };





  const handleDownloadRoles = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Company Roles');

    // Add header row
    const headerRow = worksheet.addRow(['ID', 'Name','Email', 'Skill1', 'Skill2', 'Skill3']);


    for (let index = 0; index < 5; index++) {
        worksheet.addRow(['', '','', '', '', '']);   
    }

    // Define common font style
    const commonFont = { name: 'Assistant', size: 12 };


    // Style the header
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '854a51' }
      };
      cell.font = { ...commonFont, color: { argb: 'FFFFFF' }, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Style the data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        row.eachCell(cell => {

        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { ...commonFont };

          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    // Auto size columns
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, cell => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

// Save the file
const buffer = await workbook.xlsx.writeBuffer();
const blob = new Blob([buffer], { type: 'application/octet-stream' });
saveAs(blob, 'Roles_Schedule.xlsx');
};



  return (
    
<div className="buttons-p">
  <div >
      <text className='regularText'>{props.text}</text>



  <div class="radio-tile-group">

    <div class="input-container">
        <input id="walk" type="radio" name="radio" onClick={handleDownloadShift} />
        <div class="radio-tile">
            <ion-icon name="walk"></ion-icon>
            <label for="walk" >SHIFT</label>
        </div>
    </div>

    <div class="input-container">
        <input id="bike" type="radio" name="radio" onClick={handleDownloadRoles}/>
        <div class="radio-tile">
          <ion-icon name="bicycle"></ion-icon>
          <label for="bike">ROLES</label>
        </div>
    </div>
  </div>
  </div>
</div>
    

  );
}

export default DownloadButtons;
