const passwordPattern = { 
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 
  message: "Password must contain both letters and numbers and be longer than 6 characters." 
};

export const validationRules = {
  signup: {
    username: { required: "Username is required" },
    password: { 
      required: "Password is required",
      pattern: passwordPattern,
     },
    favFood: { required: "Favorite Food is required" },
  },
  login: {
    username: { required: "Username is required" },
    password: { 
      required: "Password is required",
      pattern: passwordPattern,
     },
  },
};