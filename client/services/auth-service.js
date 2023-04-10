import apiInstance from "../http";

export const signup = async (email, password) => {
  try {
    return await apiInstance.post("/signup", { email, password });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (email, password) => {
  try {
    return await apiInstance.post("/signin", { email, password });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    return await apiInstance.post("/logout");
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async () => {
  try {
    return await apiInstance.get("/refresh");
  } catch (error) {
    console.log(error);
  }
};

