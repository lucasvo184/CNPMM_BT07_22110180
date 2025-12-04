import { forwardRef } from 'react';
import { InputProps } from '../../types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `cart-input-${Math.random().toString(36).substr(2, 9)}`;
    
    const wrapperClasses = [
      'cart-input-wrapper',
      fullWidth ? 'cart-input-wrapper--full-width' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'cart-input',
      error ? 'cart-input--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="cart-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="cart-input-error" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="cart-input-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

