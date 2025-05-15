import { StandardModal } from "../../utilComponents/StandardModal/StandardModal";


interface PromoPopupProps {
  header: string | undefined, 
  text: string | undefined, 
  promotions: React.ReactNode[],
};

export const PromoPopup = ({ header, text, promotions }: PromoPopupProps) => {

  return (
    <StandardModal>
      <div className="promo-wrapper">
        <div className='promo-header'>
          {header && <h2 className='promo-header-text'>{header}</h2>}
        </div>
        {text && <p>{text}</p>}
        {promotions && (   
          <div className="promo-products">
            {promotions}
          </div>
        )}
      </div>
    </StandardModal>
  );
}