import { ReactNode } from "react";
import ReactModal from "react-modal";
import Modal from "react-modal";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { showModal, hideModal } from "../../../utils/setModalVisibility";
import "./StandardModal.css"


interface StandardModalProps {
  style?: ReactModal.Styles;
  children: ReactNode;
  hideDelay?: number;
  autoHideCondition?: any;
  onClose?: () => void;
}

export const StandardModal = ({ style, children, hideDelay, autoHideCondition, onClose }: StandardModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    showModal(setIsOpen, setIsVisible, 50);
  }, []);

  useEffect(() => {
    if (autoHideCondition) {
      hideModal(setIsOpen, setIsVisible, hideDelay, 400, onClose)
    }
  }, [autoHideCondition]);

  const closeModal = () => {
    hideModal(setIsOpen, setIsVisible, 0, 400, onClose)
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={classNames("modal-content", {
        'visible': isVisible, })}
      overlayClassName={classNames("modal-overlay", {
        'visible': isVisible, })}
      style={style}
      ariaHideApp={false}
    >
      <div className='modal-close-btn' onClick={() => closeModal()}>X</div>
      {children}
    </Modal>
  );
}