import CalcButton from '../UI/CalcButton/CalcButton';
import './CalcOperations.scss';

const operations = ['/', 'x', '-', '+'];

function CalcOperations() {
  return (
    <div className="operations">
      {operations.map((item) => (
        <CalcButton key={item}>{item}</CalcButton>
      ))}
    </div>
  );
}

export default CalcOperations;
