const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/mes" // development api
    : "http://192.168.42.27/api/mes"; // production api

export { apiUrl };
