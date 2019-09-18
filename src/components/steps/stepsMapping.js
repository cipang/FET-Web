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
  "0": <Step0 step={0}/>,
  "1": <StepSubject step={1}/>,
  "2": <StepTeacher step={2}/>,
  "3": <StepStudent step={3}/>,
  "4": <StepTag step={4}/>,
  "5": <StepActivity step={5}/>,
  "6": <StepBuilding step={6}/>,
  "7": <StepRoom step={7}/>,
  "8": <StepEditAndExport step={8}/>,
};
