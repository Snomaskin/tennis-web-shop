import { useForm } from "react-hook-form";
import type { RegisterFields } from "../AuthContext";


export const RegisterModal = ( {onReturn}: { onReturn: () => void } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFields>();
  
  return (
    <div className="auth-form-wrapper">
      <button className="return-btn" onClick={onReturn}>{"<"}</button>
      <form className="auth-form">
        <h2>Sign up</h2>

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

        <label htmlFor="favFood">
          Favorite Food:
        </label>
        <input
          id="favFood"
          type="text"
          {...register("favFood", {required: "Favorite Food is required."})}
        />
        {errors.favFood && (
          <div className="form-error">{errors.favFood.message}</div>
        )}
        
        <button className="register-btn" type="submit">Register</button>
      </form>
    </div>
  )
}