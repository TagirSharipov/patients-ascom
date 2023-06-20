import { Patient, Sorting } from "./types";

export const sortPatientRecords = (a: Patient, b: Patient, sorting: Sorting) => {
   let x, y;
   
   if (sorting.field === 'birthDate') { x = new Date(a.birthDate); y = new Date(b.birthDate); }
   else if (sorting.field === 'parameters') { x = a.parameters.length; y = b.parameters.length; }
   else {
      x = a[sorting.field as keyof Patient]; 
      y = b[sorting.field as keyof Patient];
   }
   
   const res = sorting.order === 'asc' ? -1 : 1;
 
   if (x !== undefined && y !== undefined) {
     if (x > y) return res;
     if (x < y) return -res;
   }
   return 0;
 };

 export const formatDate = (s:string) :string => {
   return new Intl.DateTimeFormat('en-US').format(new Date(s))
 }