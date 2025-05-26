import { useForm } from "react-hook-form";
import { useAuth, type SignupFields } from "../AuthContext";
import { validationRules } from "../config/validationRules"
import { InputWithError } from "../../components/utilComponents/InputWithError/InputWithError";
import { FadeInOut } from "../../components/utilComponents/FadeInOut";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase"; 


export const SignupForm = ( {onReturn}: { onReturn: () => void } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFields>();
  const { signup } = useAuth();
  const [signupMessage, setSigupMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignupFields) => {
    const signupResult = await signup(data);
    setSigupMessage(signupResult);
  };


useEffect(() => {
  const writeTest = async () => {
    try {
      await setDoc(doc(firestore, "testCollection", "testDoc"), {
        hello: "world"
      });
    } catch (err) {
    }
  };
  writeTest();
}, []);
  return (
    <FadeInOut className="auth-form-wrapper">
      <button className="return-btn" onClick={onReturn}>{"<"}</button>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign up</h2>
        
        <InputWithError
          label="Name:"
          type="text"
          error={errors.name?.message}
          register={register("name", validationRules.signup.name)}
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

        <div className="auth-form-footer">
          <button className="register-btn" type="submit">Register</button>
          {signupMessage && (
            <div className="login-signup-msg">
              {signupMessage}
            </div>
          )}
        </div>
      </form>
    </FadeInOut>
  )
}