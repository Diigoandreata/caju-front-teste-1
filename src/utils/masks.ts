export const removeMask = (value = "") =>
  value?.replace(/[^a-zA-Z0-9]|[\s]/g, "");
