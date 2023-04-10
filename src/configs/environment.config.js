const dev = {
  REDIRECT_URL: "http://localhost:3000",
  API_BASE_URL: "http://ebrrarfoodapp-001-site7.gtempurl.com/api",
  MEETING_BASE_URL: "https://localhost:4443",
};

const prod = {
  MEETING_BASE_URL: "http://ebrrarfoodapp-001-site7.gtempurl.com/api",
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    default:
      return dev;
  }
};

export const env = getEnv();
