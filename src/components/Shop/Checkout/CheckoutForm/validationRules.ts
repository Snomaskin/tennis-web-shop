export const validationRules = {
    shipping: {
      name: { required: "Name is required" },
      address: { required: "Address is required" },
      city: { required: "City is required" },
      zipCode: { 
        required: "ZIP code is required",
        pattern: { value: /^\d{3}\s?\d{2}$/, message: "Invalid ZIP code format" }
      },
      country: { required: "Country is required" }
    },
    payment: {
      cardNumber: { 
        required: "Card number is required",
        pattern: { value: /^\d{16}$/, message: "Card number must be 16 digits" }
      },
      cardHolder: { required: "Card holder name is required" },
      expiryDate: { 
        required: "Expiry date is required",
        pattern: { value: /^(0[1-9]|1[0-2])\s*\/\s*\d{2}(\d{2})?$/, message: "Format must be MM/YY" }
      },
      cvv: { 
        required: "CVV is required",
        pattern: { value: /^\d{3,4}$/, message: "CVV must be 3 or 4 digits" }
      }
    }
  };