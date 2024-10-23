const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Example usage:
export const isValidEmail = (email:string) => emailRegex.test(email);