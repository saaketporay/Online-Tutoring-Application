import { redirect, json } from "react-router-dom";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
import axios from "axios";

export const userInfoAction: ActionFunction = async ({request, params}) => {
  const data = await request.formData();
  const studentInfo = Object.fromEntries(data);
  console.log(studentInfo)
  const method = `${params.userId ? 'patch' : 'post'}`;
  const url = `/user/${params.userId || 'register'}`;
  const response = await axios({
    method: method,
    url: url,
    data: studentInfo
  });
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status
    });
  }
  return redirect("/dashboard");
};

export const dashboardLoader: LoaderFunction = async () => {
  return null;
}

export const deleteAppointmentAction: ActionFunction = async ({request}) => {
  const data = await request.formData();
  const appointmentInfo = Object.fromEntries(data);
  const response = await axios.delete('/appointment/delete', appointmentInfo)
  if (response.status != 200) {
    throw json({
      ...response.data,
      "status": response.status
    });
  }
  return {
    errors: true
  };
}
