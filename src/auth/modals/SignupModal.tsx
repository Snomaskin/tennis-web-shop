import { useForm } from "react-hook-form";
import { useAuth, type SignupFields } from "../AuthContext";
import { validationRules } from "../config/validationRules"
import { InputWithError } from "../../components/utilComponents/InputWithError/InputWithError";


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
        
        <InputWithError
          label="Name:"
          type="text"
          error={errors.name?.message}
          register={register("password", validationRules.signup.name)}
        />

        <InputWithError
          label="Email:"
          type="text"
          error={errors.email?.message}
          register={register("email", validationRules.signup.email)}
        />

        <InputWithError
          label="Password:"
          type="password"
          error={errors.password?.message}
          register={register("password", validationRules.signup.password)}
        />

        <InputWithError
          label="Favorite Food:"
          type="text"
          error={errors.favFood?.message}
          register={register("favFood", validationRules.signup.favFood)}
        />

        <button className="register-btn" type="submit">Register</button>
      </form>
    </div>
  )
}