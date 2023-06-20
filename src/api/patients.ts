import { Patient } from "../model/types";

const headers = new Headers({
   "Authorization": `Basic ${btoa(`${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`)}`,
   'Content-Type': 'application/json',
 })
 
export function fetchPatients() {
   return fetch("https://mobile.digistat.it/CandidateApi/Patient/GetList",  {
      headers,
   });
}

export function  fetchPatient(id:string) {
   return fetch(`https://mobile.digistat.it/CandidateApi/Patient/Get/${id}`,  {
      headers,
   });
}

export async function postPatient(patient: Patient) {
   return await fetch(`https://mobile.digistat.it/CandidateApi/Patient/Update`,  {
      method: 'POST',
      headers,
      body: JSON.stringify(patient),
   });
}