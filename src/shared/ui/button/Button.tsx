import { ButtonHTMLAttributes } from 'react';
import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
  className?: string;
}

function Button({ textContent, className, ...restProps }: ButtonProps) {
  return (
    <button className={className} type="button" {...restProps}>
      {textContent}
    </button>
  );
}

Button.defaultProps = {
  className: 'button',
};

export default Button;
