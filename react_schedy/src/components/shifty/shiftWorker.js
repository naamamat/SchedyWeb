

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { nextSunday, endOfWeek, format, addDays, startOfDay, subDays } from 'date-fns';
import '../../styles/styleShift.css';
import TableShiftWorker from './tableShiftWorker';
import Navbar from '../navbar';
import axiosInstance from "../../context/axios";
import Header from '../header';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas
import { useUserContext } from "../../context/UserProvider";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


// Group schedule data by time and skill
const groupByTimeAndSkill = (schedule) => {
  return schedule.reduce((original, row) => {
    const key = `${row.shiftStartTime}-${row.shiftEndTime}-${row.skill}`;
    if (!original[key]) {
      original[key] = {
        id: row._id,
        skill: row.skill,
        startTime: row.shiftStartTime,
        endTime: row.shiftEndTime,
        replaceableWorkers: row.replaceableWorkers,
      };
    }
    if (!original[key][row.shiftDate]) {
      original[key][row.shiftDate] = [];
    }
    original[key][row.shiftDate].push(...row.workers);
    return original;
  }, {});
};

const getCurrentWeekSchedule = (week, orgId) => {
  return axiosInstance.get(`/${orgId}/schedule`, { params: { week } }).then(res => res.data?.schedule);
};

const getReplaceableAPI = (week, orgId) => {
  return axiosInstance.get(`/${orgId}/replaceableWorkers`, { params: { week }}).then(res => res.data?.replaceableWorkers)
}


const thisSunday = nextSunday(new Date());





const ShiftWorker = () => {
  const location = useLocation();
  const { fullName } = location.state || {};
  const { id } = useParams();
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(`Hi ${fullName}, good week!`);



  // Now you can use `id` to fetch worker data or for other purposes.



const form = useRef();
  const { user } = useUserContext();
  const [replaceableWorkers, setReplaceableWorkers] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(thisSunday);
  const [schedule, setSchedule] = useState({});
  const [error, setError] = useState();
  const [filterId, setFilterId] = useState('');
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPosition, setSelectedPosition] = useState('');
  const [availablePositions, setAvailablePositions] = useState([]);
  const [loading, setLoading] = useState()

  const { startOfTheWeek, endOfTheWeek } = useMemo(() => {
    const startOfTheWeek = currentWeek;
    const endOfTheWeek = endOfWeek(startOfTheWeek, { weekStartsOn: 0 });
    return { startOfTheWeek, endOfTheWeek };
  }, [currentWeek]);

  const daysInTheWeek = useMemo(() =>
    [...Array(7).keys()].map((i) => startOfDay(addDays(startOfTheWeek, i)).toISOString()), [startOfTheWeek]);

  useEffect(()=> {
    Promise.all([refreshSchedule(), getReplaceableWorkers()])
    setTimeout(()=> {
      if (!replaceableWorkers?.[0]?.replaceableWorkers || !replaceableWorkers[0]?.replaceableWorkers?.length)
        getReplaceableWorkers();
    }, 2500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentWeek])


  const getReplaceableWorkers = useCallback(() => {
    getReplaceableAPI(currentWeek?.toISOString(), user?.orgId).then((schedule)=> {
      setReplaceableWorkers(schedule);
      if (schedule?.length > 0) {
        const groupedSchedule = groupByTimeAndSkill(schedule);
        setSchedule(groupedSchedule);
        setAvailablePositions([...new Set(schedule.map(shift => shift.skill))]);
      }
    }).catch((err)=> {
      console.log("Could not get replaceable workers", err)
    })
  }, [currentWeek, user])

  const refreshSchedule = useCallback(() => {
    setError(null);
    getCurrentWeekSchedule(currentWeek?.toISOString(),  user?.orgId).then((schedule) => {
      if (schedule) {
        const groupedSchedule = groupByTimeAndSkill(schedule);
        setSchedule(groupedSchedule);
        setAvailablePositions([...new Set(schedule.map(shift => shift.skill))]);
      }
    }).catch((err) => {
      console.log("err", err);
      setError(err);
    });
  }, [currentWeek, user]);

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handlePositionFilterChange = (event) => {
    setSelectedPosition(event.target.value);
  };





const generateP = async () => {


  const input = document.getElementById('pdf-content'); // ID of the container to capture

  // Temporarily remove any height or overflow constraints so that the entire content is rendered
  const originalHeight = input.style.height;
  const originalOverflow = input.style.overflow;
  const originalMaxHeight = input.style.maxHeight;

  input.style.height = 'auto'; // Ensure the container height is auto to capture full content
  input.style.overflow = 'visible'; // Ensure overflow content is fully visible
  input.style.maxHeight = 'none'; // Disable any max height settings

  // Use html2canvas to capture the full content of the container
  const canvas = await html2canvas(input, { scrollY: -window.scrollY, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF (A4 size)

  const pageWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
  const pageHeight = pdf.internal.pageSize.getHeight(); // Height of the PDF page

  const imgWidth = pageWidth - 20; // Set the image width (leaving a margin)
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the proportional image height

  let heightLeft = imgHeight;
  let position = 30; // Start the image lower to leave space for the header (30 mm from the top)

  // Add the header
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Hello, ${fullName}!`, 10, 20);

  pdf.setLineWidth(0.5);
  pdf.line(10, 25, 200, 25); // Draw a line

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Here are your shift dates: ${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`, 10, 40);
  pdf.text("Happy scheduling!", 10, 55);

  pdf.setLineWidth(0.2);
  pdf.line(10, 65, 200, 65); // Another line

  position = 70; // Reset position

  // Add the first image to the PDF
  pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight - position;

  // Add additional pages if the content exceeds one page
  while (heightLeft > 0) {
      pdf.addPage(); // Create a new page
      position = heightLeft - imgHeight + 30;
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 30;
  }

  // Save the PDF as a file
  pdf.save("Schedy-shifts.pdf");


  // Restore the original styles
  input.style.height = originalHeight;
  input.style.overflow = originalOverflow;
  input.style.maxHeight = originalMaxHeight;


};






  const generatePDF = async () => {
    const input = document.getElementById('pdf-content'); // ID of the container to capture

    // Temporarily remove any height or overflow constraints so that the entire content is rendered
    const originalHeight = input.style.height;
    const originalOverflow = input.style.overflow;
    const originalMaxHeight = input.style.maxHeight; // If there is a max height restriction

    input.style.height = 'auto'; // Ensure the container height is auto to capture full content
    input.style.overflow = 'visible'; // Ensure overflow content is fully visible
    input.style.maxHeight = 'none'; // Disable any max height settings

    // Use html2canvas to capture the full content of the container
    const canvas = await html2canvas(input, { scrollY: -window.scrollY, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF (A4 size)

    const pageWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
    const pageHeight = pdf.internal.pageSize.getHeight(); // Height of the PDF page

    const imgWidth = pageWidth - 20; // Set the image width (leaving a margin)
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the proportional image height

    let heightLeft = imgHeight;
    let position = 30; // Start the image lower to leave space for the header (30 mm from the top)


    // Add the header
    pdf.setFontSize(22); // Set font size for the header
    pdf.setFont("helvetica", "bold"); // Use Helvetica Bold as a fallback for a sleek look
    pdf.text(`Hello, ${fullName}!`, 10, 20); // Positioned 10mm from the left, 20mm from the top

    // Add a line for separation
    pdf.setLineWidth(0.5); // Set the line thickness
    pdf.line(10, 25, 200, 25); // Draw a line (from x=10, y=25 to x=200, y=25)

    // Add the body text
    pdf.setFontSize(16); // Set font size for the body
    pdf.setFont("helvetica", "normal"); // Set font back to normal
    pdf.text(`Here are your shift dates: ${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`, 10, 40); // Positioned 10mm from the left, 40mm from the top
    pdf.text("Happy scheduling!", 10, 55); // Additional message below

    // Optionally, add another line at the bottom or a signature line
    pdf.setLineWidth(0.2);
    pdf.line(10, 65, 200, 65); // A subtle line beneath the body


    position = 70; // Reset position for the new page

    // Add the first image to the PDF
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - position;

    // Add additional pages if the content exceeds one page
    while (heightLeft > 0) {
      pdf.addPage(); // Create a new page
      
      position = heightLeft - imgHeight + 30; // Maintain the header space
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 30; // Adjust for the next page
    }

    // Restore the original styles after PDF generation
    input.style.height = originalHeight;
    input.style.overflow = originalOverflow;
    input.style.maxHeight = originalMaxHeight;

    // Return the PDF as a base64 string
    return pdf.output('datauristring');
  };



  const sendEmail = async (e) => {

    setLoading(true)

    e.preventDefault();
    const pdfBase64 = await generatePDF(); // Generate the PDF and get its base64 string
    const emailData = {
      pdfBase64,
      toEmail: email, 
      message:message,
    };

    try {

      const response = await axiosInstance.post('/sendEmail', emailData); // Directly send emailData
      setLoading(false)
      alert("Email sent successfully! :)")
    } catch (error) {
      console.log('Error sending email to server:', error);
      alert("Error sending email :(")
      setLoading(false)
      return null;
    }
  };



  return (
    <div className="container">
      <Navbar />

      <section className="main" > {/* ID added to capture the content */}
        <Header text={fullName + "'s shifts"} />
              {/* Add button to generate PDF */}


        <div className="buttons-s">

        <div className="filter-section">
            <div>
      <button onClick={generateP}>Download PDF</button>
            </div>
          </div>
          <div className="filter-section">
            <div>
              <button className="btnFont" onClick={() => setCurrentWeek(thisSunday)}>Next week</button>
            </div>
            <div>
              <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))}>👈</button>

              <span>{`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`}</span>

              <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))}>👉</button>
            </div>

            <div>
              <label>Sort by Shift Time: </label>
              <button onClick={() => handleSortOrderChange("asc")}>☝️</button>
              <button onClick={() => handleSortOrderChange("desc")}>👇</button>
            </div>


          </div>

          <div className="filter-section">
            <form ref={form} onSubmit={sendEmail}>
              <div className="longText">
        <label>Mail To: </label>
        <input type="email"  name="user_email" placeholder={fullName + "@gmail.com"}  onChange={(e)=> setEmail(e.target.value)} value={email}/>
              </div>
              <div className="longText">
        <label>Message: </label>
        <input type="message"  name="message" placeholder={"hi " +fullName+", good week! "} onChange={(e)=> setMessage(e.target.value)} value={message}/>
              </div>
              <div className="input-button">

        <input type="submit" disabled={loading} value={loading  ? "Uploading..." : "Send📨"} />
              </div>

      </form>



          </div>
        </div>

        <section className="attendance" id="pdf-content">
          <div className="attendance-list">
            {error ? (
              <p>Error while fetching data. Please try again later...</p>
            ) : (
              <TableShiftWorker
                schedule={schedule}
                days={daysInTheWeek}
                filterId={id}
                sortOrder={sortOrder}
                selectedPosition={selectedPosition}
                refreshSchedule={refreshSchedule}
              />
            )}
          </div>
        </section>
      </section>


    </div>
  );
}

export default ShiftWorker;


// 1. created a schedule
// 2. on the background, created a replaceable workers
// 4. we went to the UI, and requested the schedule and the replaceable workers
// 5. but, the replaceable workers were not ready yet
