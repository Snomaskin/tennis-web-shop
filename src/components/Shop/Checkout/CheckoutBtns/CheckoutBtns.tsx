import { useCheckout } from "../CheckoutContext"
import { FormEvent } from "react";
import "./CheckoutBtns.css"


export const CheckoutBtns = ({ onSubmit }: { onSubmit?: (e: FormEvent) => void }) => {
    const { currentStep, nextStep, prevStep } = useCheckout();

    const stepLabels: Record<string, { prev?: string; next: string }> = {
        summary: { next: 'To Shipping' },
        shipping: { prev: 'Previous', next: 'To Payment' },
        payment: { prev: 'Previous', next: 'Review Order' },
        review: { prev: 'Previous', next: 'Place Order' }
    };

    return (
        <div className="checkout-btns">
            {stepLabels[currentStep].prev && (
                <button className="prev-btn" onClick={prevStep}>
                    {stepLabels[currentStep].prev}
                </button>
            )}
            <button onClick={onSubmit ? onSubmit : nextStep} className="next-btn">
                {stepLabels[currentStep].next}
            </button>
        </div>
    );
};
