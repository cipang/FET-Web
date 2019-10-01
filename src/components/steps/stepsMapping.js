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

export const stepsMappingDescriptions = {
  "0": {
          description:"Name and time."
       },
  "1": {
          description:"Add buildings."
       },
  "2": {
          description:"Add rooms."
       },
  "3": {
          description:"Add subjects."
       },
  "4": {
          description:"Add teachers."
       },
  "5": {
          description:"Add students in years(groups)."
       },
  "6": {
          description:"Add activity tags."
       },
  "7": {
          description:"Add activities and generate final timetables."
       }
};

export const stepsMappingObjects = {
  "0": {
          object: <Step0 step={0}/>,
       },
  "1": {
          object: <StepBuilding step={1}/>,
       },
  "2": {
          object: <StepRoom step={2}/>,
       },
  "3": {
          object: <StepSubject step={3}/>,
       },
  "4": {
          object: <StepTeacher step={4}/>,
       },
  "5": {
          object: <StepStudent step={5}/>,
       },
  "6": {
          object: <StepTag step={6}/>,
       },
  "7": {
          object: <StepActivity step={7}/>,
       },
  "8": {
          object: <StepEditAndExport step={8}/>,
       },
};
