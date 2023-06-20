export interface Patient {
   id: number,
   familyName: string,
   givenName: string,
   birthDate: string,
   sex: string,
   parameters: Parameter[],
   hasAlarm?: boolean,
}

export interface Parameter {
   id: number,
   name: string
   value: string,
   alarm: boolean,
}

export interface Sorting {
   field: string | undefined;
   order: 'asc' | 'desc' | undefined;
 }