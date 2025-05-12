import { useForm, FieldError } from "react-hook-form";
import { useCheckout } from "../CheckoutContext";
import { CheckoutBtns } from "../CheckoutBtns/CheckoutBtns";
import { validationRules } from "./validationRules";
import { ShippingInfo, PaymentInfo } from "../../types";
import { InputWithError } from "../../../utilComponents/InputWithError/InputWithError";
import { FormTypes, FormFieldKey, autofillPayment, autofillShipping, forms } from "./formTypes";
import "./CheckoutForm.css";


export const CheckoutForm = ({ formType }: { formType: FormTypes }) => {
  const { paymentInfo, updatePaymentInfo, shippingInfo, updateShippingInfo, nextStep } = useCheckout();
  
  const isShippingForm = (formType: FormTypes): formType is 'shipping' => { 
    return formType === 'shipping'; 
  };
  
  const initialData = isShippingForm(formType) ? shippingInfo : paymentInfo;
  const formTitle = isShippingForm(formType) ? "Shipping" : "Payment";
  
  type FormData = typeof initialData;
  
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>({defaultValues: initialData});
  
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
        <button type="button" className="autofill-btn" onClick={() => reset(formType === "shipping" ? autofillShipping : autofillPayment)}>
          Autofill
        </button>
        
        {(Object.keys(forms[formType]) as FormFieldKey<typeof formType>[]).map((field) => {
          const fieldError = errors[field as keyof FormData] as FieldError | undefined;
          const { label, id } = forms[formType][field];
          
          return (
            <InputWithError 
              label={label}
              key={id} 
              type="text"
              error={fieldError?.message} 
              register={register(field as keyof FormData, getValidationRules(field))} 
            />
          );
        })}
        
        <CheckoutBtns onSubmit={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};