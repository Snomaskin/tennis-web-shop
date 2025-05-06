import { UseFormRegisterReturn } from "react-hook-form";
import classNames from "classnames";
import "./InputWithError.css";


interface InputWithError extends React.InputHTMLAttributes<HTMLInputElement>  {
  label: string,
  error?: string,
  register: UseFormRegisterReturn,
};

export const InputWithError = ({ label, error, register, ...rest }: InputWithError) => (
  <div className="input-group">
    <label className="input-label">
      {label}
      <div className="input-wrapper">
        <input {...register} {...rest} className={classNames("input-field", {
          "input-error": error, 
        })}/>
        {error && (
          <span className="error-icon" data-tooltip={error}>
            ⚠️
          </span>
        )}
      </div>
    </label>
  </div>
);