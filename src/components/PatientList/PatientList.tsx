import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Parameter, Patient, Sorting } from '../../model/types';
import { fetchPatients } from '../../api/patients';
import { formatDate, sortPatientRecords } from '../../model/utils';
import SortingButtons from '../SortingButtons/SortingButtons';
import style from './PatientList.module.css';

import Table from '../Table/Table';

const header = {
  familyName: 'Family Name',
  givenName: 'Given Name',
  sex: 'Sex',
  birthDate: 'Birth Date',
  parameters: 'Parameters',
  hasAlarm: 'Alarm',
};

const PatientList = () => {
  const [patientList, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState<Sorting>({
    field: undefined,
    order: undefined,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchPatients()
      .then((res: any) => res.json())
      .then((data) => {
        setPatients(data.map((p: Patient) => ({
            ...p,
            hasAlarm: p.parameters.find((param: Parameter) => param.alarm)?.alarm ? 'Yes' : 'No',
            birthDate: formatDate(p.birthDate),
          }))
        );
      })
      .catch((err) => console.log(err))//TODO set error in state
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  let lines = filter
    ? patientList.filter(
        (p) =>
          p.familyName.toLowerCase().indexOf(filter) >= 0 ||
          p.givenName.toLowerCase().indexOf(filter) >= 0 ||
          p.birthDate.indexOf(filter) >= 0
      )
    : patientList;

  if (sorting.field) lines.sort((a, b) => sortPatientRecords(a, b, sorting));

  const rows = lines.map((p, i) => [
    p.familyName,
    p.givenName,
    p.sex,
    p.birthDate,
    p.parameters.length,
    <span className={p.hasAlarm ? style.red : ''}>{p.hasAlarm}</span>,
    <Link to={`/patient/${p.id}`} className={style.link}>Edit</Link>,
  ]);

  const columns = Object.entries(header).map(([field, title]) => [
      <div key={field}>
        {title}
        <SortingButtons 
          field={field} 
          handler={(s: Sorting) => setSorting(s)} 
          active={sorting.field === field ? sorting.order : undefined}
        />
      </div>
  ]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className={style.container}>
      <input
        type="text"
        id="filter"
        className={style.filter}
        onChange={(e) => filterHandler(e)}
        placeholder='Type something to filter...'
        autoComplete='off'

      />
      <span className={style.tooltip}>Family Name, Given Name and BirthDate</span>
      <Table rows={rows} columns={columns}/>
    </div>
  );

};

export default PatientList;
