import { RegisterModal } from "./modals/RegisterModal";
import { LoginModal } from "./modals/LoginModal";
import { useState, useEffect } from "react"
import classNames from "classnames";
import Modal from "react-modal";
import "./authModalStyles.css"


export const AuthModalManager = ({ onClose }: { onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFrom, setSelectedForm] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, []);

  const closePopUp = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closePopUp}
      className={classNames('auth-popup-content', {
        'visible': isVisible
      })}
      overlayClassName={classNames('popup-overlay', {
        'visible': isVisible
      })}
      ariaHideApp={false}
    >
      <div className='auth-popup-close' onClick={() => closePopUp()}>X</div>
      {!selectedFrom && (
        <div className="auth-form-wrapper">
          <div className="auth-form">
          <h3 className="auth-ladning-msg">Already signed up? <br/>Click 'Log in'.<p/> New user? <br/> Click 'Sign up'.</h3>
          <div className="login-register-btns">
            <button className="register-btn" onClick={() => setSelectedForm('register')}>Sign up</button>
            <button className="login-btn" onClick={() => setSelectedForm('login')}>Log in</button>
          </div>
        </div>
        </div>
      )}
      {selectedFrom === 'login' ? <LoginModal onReturn={() => setSelectedForm(null)} /> : null}
      {selectedFrom == 'register' ? <RegisterModal onReturn={() => setSelectedForm(null)} /> : null}

    </Modal>
  );
}