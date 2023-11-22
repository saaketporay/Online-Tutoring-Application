export const getReadableDateTime = (dateTime: string, duration: number) => {
  // Convert SQL's TIME data type to a JS Date object to a readable date format: Friday, October 27th, 2023, 1:19am, 20m
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const suffixMap = new Map([
    ['1', 'st'],
    ['2', 'nd'],
    ['3', 'rd'],
  ]);

  // Split dateTime (formatted like YYYY-MM-DD hh:mm:ss) into an array of strings based on dashes, spaces, or colons
  // Split dateTime (formatted as an ISO string) into an array of numbers based on anything that's not a number
  const t = dateTime.split(/\D+/).map((str) => +str);
  // Create a new Date object based on the year, month, day, etc, values from t
  const m = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
  // Get the day as a number in the range 1-31
  const day = m.getDate();
  // Select the appropriate suffix for the numerical day
  const suffix =
    (suffixMap.has(day.toString()) ? suffixMap.get(day.toString()) : 'th') ||
    '';
  // Get the hour as a number in the range 0-23
  const hour = m.getHours();
  // Convert hour to a human-readable 12-hour value
  const modifiedHour =
    hour === 0 || hour === 11 ? 12 : hour < 11 ? hour : hour - 12;
  // Get the minutes as a number in the range 0-59
  const minutes = m.getMinutes();
  // Convert minutes to a double-digit zeros if it's a 0
  const modifiedMinutes = minutes === 0 ? '00' : minutes;
  // Check whether an 'am' or 'pm' should be present
  const am = hour < 11;
  // Construct the human-readable date time value to display in the available timeslots autocomplete
  const readable_date_time = `${weekday[m.getDay()]}, ${
    month[m.getMonth()]
  } ${day}${suffix}, ${m.getFullYear()} - ${modifiedHour}:${modifiedMinutes}${
    am ? 'am' : 'pm'
  }, ${duration}m`;

  return readable_date_time;
};
