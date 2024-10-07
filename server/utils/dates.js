const { nextSunday, startOfDay } = require('date-fns');

function closestFutureSunday(date) {
    // Get the next Sunday
    let nextSun = nextSunday(date);

    // If the next Sunday is the same as the given date, add 7 days to get the next Sunday
    if (nextSun.getDate() === date.getDate()) {
        nextSun.setDate(nextSun.getDate() + 7);
    }

    return startOfDay(nextSun);
}

module.exports = { closestFutureSunday };
