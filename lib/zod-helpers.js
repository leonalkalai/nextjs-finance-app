// utils/zod-helpers.js
export function flattenFieldErrors(zodError) {
  const errors = {};

  zodError.issues.forEach((issue) => {
    const fieldName = issue.path[0];
    if (fieldName) {
      errors[fieldName] = errors[fieldName] || [];
      errors[fieldName].push(issue.message);
    }
  });

  return errors;
}

