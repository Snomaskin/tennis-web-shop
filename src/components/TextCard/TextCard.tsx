import "./TextCard.css";


export interface TextPageType {
  outerText?: {
    title?: string;
    p1?: string;
    p2?: string;
    p3?: string;
  };
  innerText?: {
    title?: string;
    p1?: string;
    p2?: string;
    p3?: string;
  };
};

export const TextPage = ({ outerText, innerText }: TextPageType) => {
  return (
    <div className="text-page-wrapper">
    <div className="text-card">
      {outerText?.title && <h1>{outerText.title}</h1>}
      {outerText && <div className="outer-text">
        {outerText?.p1 && <p>{outerText.p1}</p>}
        {outerText?.p2 && <p>{outerText.p2}</p>}
        {outerText?.p3 && <p>{outerText.p3}</p>}
      </div>}

      {innerText && <div className="inner-text">
      {innerText?.title && <h2>{innerText.title}</h2>}
        {innerText?.p1 && <p>{innerText.p1}</p>}
        {innerText?.p2 && <p>{innerText.p2}</p>}
        {innerText?.p3 && <p>{innerText.p3}</p>}
      </div>
      }
    </div>
    </div>
  );
};