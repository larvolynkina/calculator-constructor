import { MAX_DISPLAY_VALUE_LENGTH } from './const';

export function replaceCommaWithDot(value: string) {
  return value.replace(',', '.');
}

export function replaceDotWithComma(value: string) {
  return value.replace('.', ',');
}

export function roundResult(result: number | string): number | string {
  let roundedResult: string | number = 0;
  const resultString = result.toString();
  if (typeof result === 'number' && resultString.length > MAX_DISPLAY_VALUE_LENGTH) {
    if (resultString.includes('e')) {
      return result;
    }
    if (resultString.includes('.')) {
      const digitsAfterComma = resultString.split('.')[1].length;
      const precision: number = digitsAfterComma - (resultString.length - MAX_DISPLAY_VALUE_LENGTH);
      roundedResult = result.toFixed(precision);
      return +roundedResult;
    }
    return result;
  }
  return result;
}

export function calculateResultWithFirstOperand(operand: number, displayValue: string, operator: string | null) {
  let result: number | string = 0;
  const firstOperandToNumber = +replaceCommaWithDot(operand.toString());
  const currentValueToNumber = +replaceCommaWithDot(displayValue);
  if (operator === '+') {
    result = firstOperandToNumber + currentValueToNumber;
  }
  if (operator === '-') {
    result = firstOperandToNumber - currentValueToNumber;
  }
  if (operator === 'x') {
    result = firstOperandToNumber * currentValueToNumber;
  }
  if (operator === '/') {
    if (currentValueToNumber === 0) {
      result = 'Не определено';
    } else {
      result = firstOperandToNumber / currentValueToNumber;
    }
  }
  const roundedResult = roundResult(result);
  return { result, roundedResult };
}
