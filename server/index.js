const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
const { getUser, logout, login, register, editUser } = require('./api/auth');
const { getSchedule, createSchedule, findReplaceableWorkersForShchedule, generateNewScheduleAfterChanges } = require('./api/schdeule');
const { authenticateToken } = require('./middleware/auth');
const { replaceWorker, addWorker, removeWorker, getWorkers, changeUserName, changeSkill, addNewWorker, removeWorkerList} = require('./api/workers');
const {getShifts, changeShiftDate, changeShiftStartTime,changeShiftEndTime, changeNumberOfWorkers, changeSkillShift, changeCostPerWorker, removeShift, addShift } = require('./api/shifts')
const sendEmail = require('./api/sendEmail');

const app = express();
const port = 8082;
const DB_NAME = 'schedy';

const mongoURL = `mongodb://localhost:27017/${DB_NAME}`;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,

}));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(mongoURL)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log("Error in mongo: ", err));

app.get('/api/user', authenticateToken, getUser);

app.put('/api/user', authenticateToken, editUser)

app.get('/api/logout', authenticateToken, logout);

app.post('/api/login', login)

app.post('/api/register', register)

// upload the csv files to the server and create a schedule
app.post('/api/:org_id/schedule', createSchedule);

// get the current schedule from server
app.get('/api/:org_id/schedule',  getSchedule);

app.get('/api/:orgId/generateNewScheduleAfterChanges', generateNewScheduleAfterChanges);


app.get('/api/:org_id/workers', getWorkers);

app.post('/api/:org_id/changeUserName', changeUserName);
app.post('/api/:org_id/changeUserSkill', changeSkill);
app.post('/api/:org_id/addNewWorker', addNewWorker);
app.post('/api/:org_id/removeWorkerList', removeWorkerList);

app.get('/api/:org_id/shifts', getShifts);
app.post('/api/:orgId/changeShiftDate', changeShiftDate);
app.post('/api/:orgId/changeShiftStartTime',changeShiftStartTime);
app.post('/api/:orgId/changeShiftEndTime', changeShiftEndTime);
app.post('/api/:orgId/changeNumberOfWorkers',changeNumberOfWorkers);
app.post('/api/:orgId/changeSkillShift',changeSkillShift);
app.post('/api/:orgId/changeCostPerWorker',changeCostPerWorker);
app.post('/api/:orgId/removeShift', removeShift);
app.post('/api/:orgId/addNewShift', addShift);

app.post('/api/removeWorker', removeWorker)

app.post('/api/addWorker', addWorker)

app.post('/api/replace', replaceWorker )

app.get('/api/:org_id/replaceableWorkers', findReplaceableWorkersForShchedule)

app.post('/api/sendEmail', sendEmail);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
