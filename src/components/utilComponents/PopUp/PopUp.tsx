import Modal from 'react-modal';
import { showModal, hideModal } from '../../../utils/setModalVisibility';
import { ReactNode, useState, useEffect } from "react";
import classNames from 'classnames';
import "./PopUp.css";

interface PopUpProps {
  header?: string;
  text?: string;
  promotions?: ReactNode[];
};

export const PopUp = ({ header, text, promotions }: PopUpProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const smallScreen = window.innerWidth <= 700;
  if (smallScreen) return null;

  useEffect(() => {
    showModal(setIsOpen, setIsVisible, 50);
  }, []);

  const closePopUp = () => {
    hideModal(setIsOpen, setIsVisible, 0, 400)
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closePopUp}
      className={classNames('popup-content', {
        'visible': isVisible,
        'small-screen': smallScreen
      })}
      overlayClassName={classNames('popup-overlay', {
        'visible': isVisible
      })}
      ariaHideApp={false}
    >
      <div className='popup-header'>
        {header && <h2 className='popup-header-text'>{header}</h2>}
        <span className='popup-close' onClick={() => closePopUp()}>X</span>
      </div>
      {text && <p>{text}</p>}
      {promotions && (   
        <div className={classNames('promotion-products', {
          'small-screen': smallScreen
        })}>
          {promotions}
        </div>
      )}
    </Modal>
  );
};