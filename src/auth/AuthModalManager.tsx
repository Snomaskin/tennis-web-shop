import { SignupModal } from "./modals/SignupModal";
import { LoginModal } from "./modals/LoginModal";
import { useAuth } from "./AuthContext";
import { showModal, hideModal } from "../utils/setModalVisibility";
import { useState, useEffect } from "react"
import classNames from "classnames";
import Modal from "react-modal";
import "./authModalStyles.css"


export const AuthModalManager = ({ onClose }: { onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFrom, setSelectedForm] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    showModal(setIsOpen, setIsVisible, 50);
  }, []);

  useEffect(() => {
    if (isLoggedIn){
      hideModal(setIsOpen, setIsVisible, 2500, 400, onClose);
    };
  }, [isLoggedIn]);

  const closePopUp = () => {
    hideModal(setIsOpen, setIsVisible, 0, 400, onClose);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closePopUp}
      className={classNames('auth-popup-content', {
        'visible': isVisible,

      })}
      overlayClassName={classNames('auth-popup-overlay', {
        'visible': isVisible,
      })}
      ariaHideApp={false}
    >
      <div className='auth-popup-close' onClick={() => closePopUp()}>X</div>
      {!selectedFrom && (
        <div className="auth-form-wrapper">
          <div className="auth-form">
            <h3 className="auth-ladning-msg">
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
        </div>
      )}
      {selectedFrom === 'login' ? <LoginModal onReturn={() => setSelectedForm(null)} /> : null}
      {selectedFrom === 'signup' ? <SignupModal onReturn={() => setSelectedForm(null)} /> : null}

    </Modal>
  );
}