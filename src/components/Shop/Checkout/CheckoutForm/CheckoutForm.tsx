import { useForm, FieldError } from "react-hook-form";
import { PaymentInfo, ShippingInfo, useCheckout } from "../CheckoutContext";
import { CheckoutBtns } from "../CheckoutBtns/CheckoutBtns";
import { validationRules } from "./validationRules";
import "./CheckoutForm.css";


type FormTypes = "shipping" | "payment";

export const CheckoutForm = ({ formType }: { formType: FormTypes }) => {
  const { paymentInfo, updatePaymentInfo, shippingInfo, updateShippingInfo, nextStep } = useCheckout();
  
  const isShippingForm = (formType: FormTypes): formType is 'shipping' => { 
    return formType === 'shipping'; 
  };
  
  const initialData = isShippingForm(formType) ? shippingInfo : paymentInfo;
  const formTitle = isShippingForm(formType) ? "Shipping Info" : "Payment Info";
  
  type FormData = typeof initialData;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: initialData
  });
  
  const onSubmit = (data: FormData) => {
    if (isShippingForm(formType)) {
      updateShippingInfo(data as ShippingInfo);
    } else {
      updatePaymentInfo(data as PaymentInfo);
    }
    nextStep();
  };
  
  const getValidationRules = (field: string) => {
    const rules = formType === 'shipping' ? validationRules.shipping : validationRules.payment;
    return (rules as any)[field] || {};
  };

  return (
    <div className="form-wrapper">
      <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{formTitle}</h2>
        
        {Object.keys(initialData).map((field) => {
          const fieldError = errors[field as keyof FormData] as FieldError | undefined;
          
          return (
            <div className="form-field" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type="text"
                {...register(field as keyof FormData, getValidationRules(field))}
              />
              {fieldError && (
                <div className="error">
                  {fieldError.message}
                </div>
              )}
            </div>
          );
        })}
        
        <CheckoutBtns onSubmit={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};