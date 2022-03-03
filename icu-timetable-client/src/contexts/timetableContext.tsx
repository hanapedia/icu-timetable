import { CourseUiProps } from 'components/timetable/courseUi';
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';
import {
  convertScheduleToCoord,
  CourseCellColors,
  getUnits,
  TESTTimetableData,
} from 'res';
import { Timetable } from 'services/firebase/firestore';

type TimetableData = {
  year: number;
  term: string;
  timetable: Timetable;
};

type TimetableContextData = {
  timetableData: TimetableData;
  setTimetableData: Dispatch<SetStateAction<TimetableData>>;
  mapCourses: (timetable: Timetable) => CourseUiProps[];
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  // editTimetable: (timetableData: TimetableData) => void;
};

const TimetableContext = createContext<TimetableContextData>(
  {} as TimetableContextData
);

const TimetableProvider: FC = ({ children }) => {
  const [timetableData, setTimetableData] = useState<TimetableData>(
    TESTTimetableData as TimetableData
  );
  const [editMode, setEditMode] = useState<boolean>(true);

  // converts all the courses in timetable to coordinates
  const mapCourses = (timetable: Timetable) => {
    const { xUnit, yUnit } = getUnits(timetable.sat, timetable.eigth);
    const courseUiProps: CourseUiProps[] = timetable.courses.flatMap(
      (courseDocShort, index) =>
        convertScheduleToCoord(
          courseDocShort,
          xUnit,
          yUnit,
          CourseCellColors[index]
        )
    );

    return courseUiProps;
  };
  return (
    <TimetableContext.Provider
      value={{
        timetableData,
        setTimetableData,
        mapCourses,
        editMode,
        setEditMode,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};

export type { TimetableContextData, TimetableData };
export { TimetableProvider, TimetableContext };
