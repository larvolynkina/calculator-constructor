import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './index.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
  modifier?: string;
}

function Button({ textContent, modifier, ...restProps }: ButtonProps) {
  return (
    <button
      className={cn('button', {
        [`button--${modifier}`]: modifier,
      })}
      type="button"
      {...restProps}
    >
      {textContent}
    </button>
  );
}

Button.defaultProps = {
  modifier: '',
};

export default Button;
