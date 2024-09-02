const express = require('express');
const cors = require('cors');
const { nextSunday, endOfWeek, startOfDay } = require('date-fns');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Workers } = require('./schema/worker');
const { Shift } = require('./schema/shift');
const { processShift } = require('./processShift');
const { validateId } = require('./users');
const { createUser } = require('./users'); // Adjust the path accordingly
const { Schedule } = require('./schema/schedule');
const { User } = require('./schema/user');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
const { jwtSecret } = require('./consts');

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

mongoose.connect(mongoURL).then(() => console.log("Mongo connected")).catch(err => console.log("Error in mongo: ", err));

function closestFutureSunday(date) {
    // Get the next Sunday
    let nextSun = nextSunday(date);

    // If the next Sunday is the same as the given date, add 7 days to get the next Sunday
    if (nextSun.getDate() === date.getDate()) {
        nextSun.setDate(nextSun.getDate() + 7);
    }

    return startOfDay(nextSun);
}

// const authenticateToken = (req, res, next) => {
//     const token = req.headers.cookie.split('=')[1]

//     if (!token) {
//       return res.sendStatus(401); // unauthorized if no token provided
//     }
//     try {
//         const decoded = jwt.verify(token, jwtSecret);
//         req.user = decoded;
//         next();
//     } catch (e) {
//         console.error('JWT verification error:', e);
//         return res.sendStatus(403);
//     }
//   };

// app.get('/api/user', authenticateToken, async (req, res) => {
//     const { userId } = req.user;
//     const user = await User.findOne({ userId});
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({ user });
// });

// app.get('/api/logout', authenticateToken, async (req, res) => {
//     res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
//     res.status(200).send({ message: 'Logged out successfully' });
// });

app.post('/api/login', async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields: username and password' });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password })

        if (!user) throw new Error("This user does not exists");
        const { firstName, lastName, photo, userId } = user.toObject();
        const userObject = { email, firstName, lastName, photo, userId };
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
        res.send({ user: userObject })
    }
    catch (error) {
        console.log("error", error)
        res.status(400).send({ error: error.toString() });
    }

})

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, id: userId, password, photo } = req.body
    try {
        if (!validateId(userId)) {
            throw new Error("Id is not valid, please use numbers.");
        }

        const data = { userId, firstName, lastName, email, password, photo };

        const emailCheck = await User.findOne({ email });
        if (emailCheck) throw new Error("Email already exists");

        const userIdCheck = await User.findOne({ userId });
        if (userIdCheck)  throw new Error("User ID already exists");

        const user = await createUser(data)
        res.json({ user });

    } catch (error) {
        console.log('Error inserting user:', error);
        res.status(400).send({ error: error.toString() });
    }
})



// upload the csv files to the server and create a schedule
app.post('/api/:org_id/schedule', async (req, res) => {
    const { workerFile, shiftFile } = req.body;
    const { org_id } = req.params;
    if (!workerFile || !shiftFile) {
        res.status(400).send('Please provide both worker and shift files');
    }
    if (!org_id) {
        res.status(400).send('Please provide organization id');
    }
    // Get the first day of the next week
    const today = new Date();
    const nextStartOfWeek = closestFutureSunday(today);
    const nextEndOfWeek = endOfWeek(nextStartOfWeek, { weekStartsOn: 0 }); // saturday

    // try to fetch the current data, if exists - update, otherwise insert new
    try {
        // { id, fullNames, skill1, skill2, skill3 }

        const workers = workerFile.filter((i) => i.worker_id)
            .map(({ worker_id, name, ...rest }) => ({ id: worker_id, fullName: name, skills: Object.values(rest).filter((i) => i) }))

        await Workers.insertMany([{ organizationId: org_id, workers }]);

        await Shift.insertMany([{
            organizationId: org_id,
            shifts: shiftFile,
            weekStart: nextStartOfWeek,
            weekEnd: nextEndOfWeek
        }]);

        const processedSchedule = await processShift(shiftFile, workers, org_id, nextStartOfWeek);
        await Schedule.insertMany(processedSchedule);

        res.send({ schedule: processedSchedule })
    } catch (e) {
        console.log('Error in inserting files: ', e);
        res.status(500).send('Error in inserting files');
    }
});

// get the current schedule from server
app.get('/api/:org_id/schedule', async (req, res) => {
    const { week } = req.query;
    const { org_id } = req.params;
    if (!org_id) {
        res.status(400).send('Please provide organization id');
    }
    let filterByWeek = nextSunday(new Date());
    if (week) {
        filterByWeek = new Date(week);
    }
    filterByWeek = startOfDay(filterByWeek)

    const schedule = await Schedule.find({ organizationId: org_id, week: filterByWeek }).sort({ weekStart: -1, shiftStartTime: 1 });
    res.send({ schedule });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
