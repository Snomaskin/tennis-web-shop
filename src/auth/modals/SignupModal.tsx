import { useForm } from "react-hook-form";
import { useAuth, type SignupFields } from "../AuthContext";
import { validationRules } from "../config/validationRules"



export const SignupModal = ( {onReturn}: { onReturn: () => void } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFields>();
  const { signup } = useAuth();

  const onSubmit = (data: SignupFields) => {
    signup(data);
  };
  
  return (
    <div className="auth-form-wrapper">
      <button className="return-btn" onClick={onReturn}>{"<"}</button>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign up</h2>

        <label htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          type="text"
          {...register("username", validationRules.signup.username)}
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
          {...register("password", validationRules.signup.password)}
        />
        {errors.password && (
          <div className="form-error">{errors.password.message}</div>
        )}

        <label htmlFor="favFood">
          Favorite Food:
        </label>
        <input
          id="favFood"
          type="text"
          {...register("favFood", validationRules.signup.favFood)}
        />
        {errors.favFood && (
          <div className="form-error">{errors.favFood.message}</div>
        )}

        <button className="register-btn" type="submit">Register</button>
      </form>
    </div>
  )
}