import React from 'react';
import CalcBlock from '../UI/CalcBlock/CalcBlock';
import CalcButton from '../UI/CalcButton/CalcButton';
import './CalcOperations.scss';

const operations = ['/', 'x', '-', '+'];

function CalcOperations() {
  return (
    <CalcBlock>
      <div className="operations">
        {operations.map((item) => (
          <CalcButton key={item}>{item}</CalcButton>
        ))}
      </div>
    </CalcBlock>
  );
}

export default CalcOperations;
