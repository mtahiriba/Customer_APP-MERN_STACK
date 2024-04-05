const validateCustomerForm = (values) => {
  const errors = {};

  // Validate Username
  if (!values.username) {
    errors.username = "Username is required";
  }

  // Validate Name
  if (!values.name) {
    errors.name = "Name is required";
  }

  // Validate Email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export { validateCustomerForm };