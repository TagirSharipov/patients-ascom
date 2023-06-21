import { useEffect, useState } from "react";
import { Patient } from "../../model/types";
import style from './PatientForm.module.css';
import { fetchPatient, postPatient } from "../../api/patients";
import { Link, useParams } from "react-router-dom";
import Table from "../Table/Table";

const PatientForm = () => {
   const [patient, setUserData] = useState<Patient | undefined>(undefined);

   const [loading, setLoading] = useState(false);
   let params = useParams();
   
   useEffect( () => {
      setLoading(true);

      if (params.id) fetchPatient(params.id)
      .then((res: any) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });

   }, [params.id]);

   const handleChange = (field: string, value: string) => {
      setUserData( prev => ({...prev, [field]: value} as Patient));
   }

   const submit = async () => {
      setLoading(true);
      if (patient) await postPatient(patient);
      setLoading(false);
   }
   if (loading) return <div>Loading...</div>;

   return <div >
      <Link to='/' className={style.link}>&larr;Back</Link>
      {patient && <form className={style.wrapper}>
         <div className={style.inputWrapper}>
            <label htmlFor="lastname" className={style.label}>Family Name</label>
            <input type="text" id="lastname" className={style.textInput} defaultValue={patient.familyName} onChange={e => handleChange('familyName', e.target.value)}/>
         </div>
         <div className={style.inputWrapper}>
            <label htmlFor="firstname" className={style.label}>Given Name</label>
            <input type="text" id="firstname" className={style.textInput} defaultValue={patient.givenName} onChange={e => handleChange('givenName', e.target.value)} />
         </div>
         <div className={style.inputWrapper}>
            <label htmlFor="sex" className={style.label}>Sex</label>
            <select  className={style.select} id="sex" defaultValue={patient.sex} onChange={e => handleChange('sex', e.target.value)} >
               <option value="M">Male</option>
               <option value="F">Female</option>
            </select>
         </div>
         <div className={style.controls}>
            <button type="button" className={style.button} onClick={submit}>Save</button>
         </div>
      
      </form>}

      <Table
         columns={Object.keys(patient?.parameters[0] || {}).filter( f => f !== 'id')}
         rows={patient?.parameters.map(p => [p.name, p.value, p.alarm ? 'Yes':'No']) || [[]]}
      />
   </div>
     
}

export default PatientForm;