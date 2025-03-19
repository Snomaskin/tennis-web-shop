import { FormEvent, useState } from "react";
import { PaymentInfo, ShippingInfo, useCheckout } from "../CheckoutContext";
import { CheckoutBtns } from "../CheckoutBtns/CheckoutBtns";
import "./CheckoutForm.css";


type FormTypes = "shipping" | "payment";
type FormDataType = ShippingInfo | PaymentInfo;

export const CheckoutForm = ({ formType }: { formType: FormTypes }) => {
    const { paymentInfo, updatePaymentInfo, shippingInfo, updateShippingInfo, nextStep } = useCheckout();

    const initialData = formType === "shipping" ? shippingInfo : paymentInfo;
    const [formData, setFormData] = useState<FormDataType>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (formType === "shipping") {
            updateShippingInfo(formData as ShippingInfo);
        } else {
            updatePaymentInfo(formData as PaymentInfo);
        }

        nextStep();
    };

    const fieldsToDisplay = formType === "shipping" ? shippingInfo : paymentInfo;
    const formTitle = formType === "shipping" ? "Shipping Info" : "Payment Info";

    return (
        <div className="form-wrapper">
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>{formTitle}</h2>
                {Object.keys(fieldsToDisplay).map((field) => (
                    <div className="form-field" key={field}>
                        <label htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={(formData as any)[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <CheckoutBtns onSubmit={handleSubmit} />
            </form>
        </div>
    );
};