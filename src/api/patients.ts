import { Patient } from "../model/types";

const headers = new Headers({
   "Authorization": `Basic ${btoa(`${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`)}`,
   'Content-Type': 'application/json',
 })

export function fetchPatients() {
   return fetch(`${process.env.REACT_APP_API}Patient/GetList`, {
      headers,
   });
}

export function  fetchPatient(id:string) {
   return fetch(`${process.env.REACT_APP_API}Patient/Get/${id}`,  {
      headers,
   });
}

export async function postPatient(patient: Patient) {
   return await fetch(`${process.env.REACT_APP_API}Patient/Update`,  {
      method: 'POST',
      headers,
      body: JSON.stringify(patient),
   });
}