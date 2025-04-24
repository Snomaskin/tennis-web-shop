import Modal from 'react-modal';
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
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closePopUp = () => {
    setIsFading(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setIsFading(false);
    }, 400);
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closePopUp}
      className={classNames('popup-content', {
        'fading': isFading
      })}
      overlayClassName={classNames('popup-overlay', {
        'fading': isFading
      })}
      ariaHideApp={false}
    >
      <div className='popup-header'>
        {header && <h2 className='popup-header-text'>{header}</h2>}
        <span className='popup-close' onClick={() => closePopUp()}>X</span>
      </div>
      {text && <p>{text}</p>}
      {promotions && <div className='promotion-products'>{promotions}</div>}
    </Modal>
  )
};