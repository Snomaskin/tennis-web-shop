import { useForm } from "react-hook-form";
import { useAuth, type LoginFields } from "../AuthContext";
import { validationRules } from "../config/validationRules";
import { InputWithError } from "../../components/utilComponents/InputWithError/InputWithError";
import { useState } from "react";
import { FadeInOut } from "../../components/utilComponents/FadeInOut";


export const LoginModal = ({ onReturn }: { onReturn: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();
  const { login } = useAuth();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);


  const onSubmit = async (credentials: LoginFields) => {
    const loginResult = await login(credentials);
    if (loginResult) {
      setLoginMessage(loginResult);
    } else {
      setLoginMessage(null);
    };
  };

  return (
    <FadeInOut className="auth-form-wrapper">
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

        <div className="auth-form-footer">
          <button className="login-btn" type="submit">Continue</button>
          {loginMessage && (
            <div className="login-signup-msg">
              {loginMessage}
            </div>
          )}
        </div>
      </form>
    </FadeInOut>
  );
}