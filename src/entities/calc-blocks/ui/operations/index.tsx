import React from 'react';
import Button from 'shared/ui/button';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';


const operations = ['/', 'x', '-', '+'];

function Operations() {
  const calcState = useAppSelector(calcModel.selectState);
  const dispatch = useAppDispatch();

  function handleOperationsClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    calcModel.processOperatorInput(event, dispatch, calcState);
  }

  return (
    <div className="operations">
      {operations.map((item) => (
        <Button onClick={(event) => handleOperationsClick(event)} key={item} textContent={item} />
      ))}
    </div>
  );
}

export default Operations;
