import { useForm } from "react-hook-form";
import { useAuth, type LoginFields } from "../AuthContext";
import { validationRules } from "../config/validationRules";


export const LoginModal = ( {onReturn}: { onReturn: () => void } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();
  const { login } = useAuth();

  const onSubmit = (credentials: LoginFields) => {
    login(credentials);
  };

  return (
    <div className="auth-form-wrapper">
      <button className="return-btn" onClick={onReturn}>{"<"}</button>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log in</h2>
        
        <label htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="text"
          {...register("email", validationRules.login.email)}
        />
        {errors.email && (
          <div className="form-error">{errors.email.message}</div>
        )}

        <label htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="text"
          {...register("password")}
        />
        {errors.password && (
          <div className="form-error">{errors.password.message}</div>
        )}

        <button className="login-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}