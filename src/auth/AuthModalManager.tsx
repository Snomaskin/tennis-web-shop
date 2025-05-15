import { SignupModal } from "./modals/SignupModal";
import { LoginModal } from "./modals/LoginModal";
import { useAuth } from "./AuthContext";
import { useState } from "react"
import { StandardModal } from "../components/utilComponents/StandardModal/StandardModal";
import { FadeInOut } from "../components/utilComponents/FadeInOut";
import "./authModalStyles.css"


export const AuthModalManager = ({ onClose }: { onClose: () => void }) => {
  const [selectedFrom, setSelectedForm] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  return (
    <StandardModal
      autoHideCondition={isLoggedIn}
      hideDelay={2500}
      onClose={onClose}
    >
      {!selectedFrom && (
        <FadeInOut className="auth-form-wrapper">
          <div className="auth-form">
            <h3 className="auth-landing-msg">
              New user? <p/>
                <button className="register-btn" onClick={() => setSelectedForm('signup')}>
                  Sign up
                </button><p/><br/> 
              Returning user? <p/>
                <button className="login-btn" onClick={() => setSelectedForm('login')}>
                  Log in
                </button>
            </h3>
          </div>
        </FadeInOut>
      )}
      {selectedFrom === 'login' ? <LoginModal onReturn={() => setSelectedForm(null)} /> : null}
      {selectedFrom === 'signup' ? <SignupModal onReturn={() => setSelectedForm(null)} /> : null}
    </StandardModal>

  );
}