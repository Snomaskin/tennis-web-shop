export const FETCH_CONFIG = {
  API: {
      BASE_URL: "",
      TIMEOUT: 5000,
      CACHE_DURATION: 1000 * 60 * 5,
  },
  ENDPOINTS: {
      LOGIN: "/login",
      REGISTER: "/register",
  },
  FETCH_OPTIONS: {
      method: "POST",
     headers: { "Content-Type": "application/json" },
  }
};