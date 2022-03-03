import { TimetableData } from 'contexts/timetableContext';

const TESTTimetableData: TimetableData = {
  year: 2022,
  term: 'Spring',
  timetable: {
    courses: [
      {
        eName: 'Teaching Practicum in IB World School',
        jName: 'IB認定校での教育実習',
        courseDocId: '2020W32106',
        schedule: { W: [2], M: [2] },
      },
      {
        eName: 'Global Sociology',
        jName: '国際社会学',
        courseDocId: '2020W31288',
        schedule: { TU: [1, 2, 3] },
      },
    ],
    sat: false,
    eigth: false,
  },
};

export { TESTTimetableData };
