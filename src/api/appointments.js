import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

export const fetchAppointments = () => axios.get(API_URL).then(res => res.data);
export const addAppointmentAPI = (data) => axios.post(API_URL, data).then(res => res.data);
export const updateAppointmentAPI = (id, updates) => axios.put(`${API_URL}/${id}`, updates).then(res => res.data);
export const deleteAppointmentAPI = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
