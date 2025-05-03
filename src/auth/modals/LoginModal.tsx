import { useForm } from "react-hook-form";
import type { LoginFields } from "../AuthContext";


export const LoginModal = ( {onReturn}: { onReturn: () => void } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();

  return (
    <div className="auth-form-wrapper">
      <button className="return-btn" onClick={onReturn}>{"<"}</button>
      <form className="auth-form">
        <h2>Log in</h2>
        
        <label htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          type="text"
          {...register("username", {required: "Username is required."})}
        />
        {errors.username && (
          <div className="form-error">{errors.username.message}</div>
        )}

        <label htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="text"
          {...register("password", {required: "Password is required."})}
        />
        {errors.password && (
          <div className="form-error">{errors.password.message}</div>
        )}

        <button className="login-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}