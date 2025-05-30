type SetBoolean = React.Dispatch<React.SetStateAction<boolean>>;

function showModal(setIsOpen: SetBoolean, setIsVisible: SetBoolean, closeDelay: number){
  setIsOpen(true);
  setTimeout(() => {
    setIsVisible(true);
  }, closeDelay);
};

function hideModal(
  setIsOpen: SetBoolean, 
  setIsVisible: SetBoolean,  
  animationDelay: number = 0,
  closeDelay: number,
  onClose?: () => void,
  ) {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsOpen(false);
        onClose && onClose();
      }, closeDelay);
    }, animationDelay);
};

export { showModal, hideModal };