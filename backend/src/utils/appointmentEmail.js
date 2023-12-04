const { appointmentEmail } = require("./mailer.js"); 

function formatDateTime(dateString) {
    const date = new Date(dateString);

    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    let year = date.getFullYear().toString().slice(-2); // Get last two digits of year

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');

    let minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day}/${year} at ${hours}:${minutes} ${ampm}`;
}

const sendAppointmentEmail = async (email, student, tutor_id, date_time, meeting_title, meeting_desc, tutor_email) => {
    if (!email) {
      throw new Error("Email is required");
    }
  
    const emailSubject = "Your Appointment Has Been Scheduled!";
    const emailBody = `Hello!

We're excited to inform you that your appointment has been successfully scheduled! Here are the details for your reference:

You, ${student}, have an upcoming appointment with our tutor ${tutor_id}. This session is scheduled for ${formatDateTime(date_time)}. The focus of the meeting will be on "${meeting_title}", where we will cover "${meeting_desc}".`;

    try {
      await appointmentEmail(email, tutor_email, emailSubject, emailBody);
    } catch (error) {
      console.error(error);
      throw new Error("Error sending appointment email");
    }
};


module.exports = { sendAppointmentEmail };
