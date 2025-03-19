import { createContext, useContext, useState, ReactNode } from "react";


export type CheckoutStep = 'summary' | 'shipping' | 'payment' | 'review' | 'confirmation';

export type ShippingInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export type PaymentInfo = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

interface CheckoutContextType {
  currentStep: CheckoutStep;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  updateShippingInfo: (info: Partial<ShippingInfo>) => void;
  updatePaymentInfo: (info: Partial<PaymentInfo>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: CheckoutStep) => void;
  resetCheckout: () => void;
}

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const defaultShippingInfo: ShippingInfo = {
  name: "",
  address: "",
  city: "",
  zipCode: "",
  country: ""
};

const defaultPaymentInfo: PaymentInfo = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: ""
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('summary');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(defaultShippingInfo);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(defaultPaymentInfo);
  
  const updateShippingInfo = (info: Partial<ShippingInfo>) => {
    setShippingInfo(prev => ({ ...prev, ...info }));
  };

  const updatePaymentInfo = (info: Partial<PaymentInfo>) => {
    setPaymentInfo(prev => ({ ...prev, ...info }));
  };

  const nextStep = () => {
    switch (currentStep) {
      case 'summary':
        setCurrentStep('shipping');
        break;
      case 'shipping':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('review');
        break;
      case 'review':
        setCurrentStep('confirmation');
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'shipping':
        setCurrentStep('summary');
        break;
      case 'payment':
        setCurrentStep('shipping');
        break;
      case 'review':
        setCurrentStep('payment');
        break;
    }
  };

  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
  };
  const resetCheckout = () => {
    setCurrentStep('summary');
    setShippingInfo(defaultShippingInfo);
    setPaymentInfo(defaultPaymentInfo);
  };

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        shippingInfo,
        paymentInfo,
        updateShippingInfo,
        updatePaymentInfo,
        nextStep,
        prevStep,
        goToStep,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};