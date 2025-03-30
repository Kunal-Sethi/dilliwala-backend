// Validity check utility function

const validateFields = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (!(field in fields) || fields[field] === "") {
      return `${field} is required.`;
    }

    return null;
  }
};

export { validateFields };
