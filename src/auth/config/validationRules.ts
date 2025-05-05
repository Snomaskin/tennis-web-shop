const passwordPattern = { 
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 
  message: "Password must contain both letters and numbers and be longer than 6 characters." 
};

const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "Incorrect email format. Please try again."
};

export const validationRules = {
  signup: {
    name: { required: "Name is required" },
    email: { 
      required: "Email is required",
      pattern: emailPattern,
     },
    password: { 
      required: "Password is required",
      pattern: passwordPattern,
     },
    favFood: { 
      required: "Favorite food is required",
      pattern: {
        value: /^pizza$/i, 
        message: "Favorite food must be Pizza!"}
     },
  },
  login: {
    email: { 
      required: "Email is required",
      pattern:  emailPattern,
     },
    password: { 
      required: "Password is required",
      pattern: passwordPattern,
     },
  },
};