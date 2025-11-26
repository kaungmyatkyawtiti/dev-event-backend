import "dotenv/config";

export const serverPort = process.env.SERVER_PORT || 3000;
export const mongodbUri = process.env.MONGODB_URI || "";
export const dbUsername = process.env.DB_USERNAME || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const tokenSecret = process.env.TOKEN_SECRET || "";
export const publicKey = process.env.PUBLIC_KEY || "";
export const privateKey = process.env.PRIVATE_KEY || "";
export const urlEndpoint = process.env.URL_ENDPOINT || "";
// export const accessSecret = process.env.ACCESS_TOKEN_SECRET;
// export const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
// export const logEnabled = process.env.LOG_ENABLED; 
