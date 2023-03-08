import CalcButton from '../UI/CalcButton/CalcButton';
import './CalcDigits.scss';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

function CalcDigits() {
  return (
      <div className="digits">
        {digits.map((item) => {
          if (item === '0') {
            return (
              <CalcButton key={item} className="calc-button digits__zero">
                {item}
              </CalcButton>
            );
          }
          return <CalcButton key={item}>{item}</CalcButton>;
        })}
      </div>
  );
}

export default CalcDigits;
