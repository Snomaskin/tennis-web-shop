import { useForm } from "react-hook-form";
import { useAuth, type LoginFields } from "../AuthContext";
import { validationRules } from "../config/validationRules";
import { InputWithError } from "../../components/utilComponents/InputWithError/InputWithError";


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

        <InputWithError
          label="Email:"
          type="text"
          error={errors.email?.message}
          register={register("email", validationRules.login.email)}
        />
        
        <InputWithError
          label="Password:"
          type="password"
          error={errors.password?.message}
          register={register("password")}
        />

        <button className="login-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}