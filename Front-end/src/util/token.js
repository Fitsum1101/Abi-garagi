export const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null;
  } catch (error) {
    console.error("Error retrieving token from localStorage:", error);
    return null;
  }
};
