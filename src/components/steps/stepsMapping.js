import React from 'react';
import Step0 from './Step0';
import StepSubject from './StepSubject';
import StepTeacher from './StepTeacher';
import StepStudent from './StepStudent';
import StepTag from './StepTag';
import StepActivity from './StepActivity';
import StepBuilding from './StepBuilding';
import StepRoom from './StepRoom';
import StepEditAndExport from './StepEditAndExport';

export const stepsMapping = {
  "0": {
          object: <Step0 step={0}/>,
          description:"Name and time."
       },
  "1": {
          object: <StepBuilding step={1}/>,
          description:"Add buildings."
       },
  "2": {
          object: <StepRoom step={2}/>,
          description:"Add rooms."
       },
  "3": {
          object: <StepSubject step={3}/>,
          description:"Add subjects."
       },
  "4": {
          object: <StepTeacher step={4}/>,
          description:"Add teachers."
       },
  "5": {
          object: <StepStudent step={5}/>,
          description:"Add students in years(groups)."
       },
  "6": {
          object: <StepTag step={6}/>,
          description:"Add activity tags."
       },
  "7": {
          object: <StepActivity step={7}/>,
          description:"Add activities and generate final timetables."
       },
  "8": {
          object: <StepEditAndExport step={8}/>,
          description:"Edit and export timetables."
       },
};
