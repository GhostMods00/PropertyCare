export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return {
      isValid: password.length >= 6,
      message: password.length < 6 ? 'Password must be at least 6 characters long' : ''
    };
  };