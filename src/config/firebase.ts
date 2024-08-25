import "dotenv"
import { initializeApp } from "firebase/app";

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.API_AUTH_DOMAIN,
    projectId: process.env.API_PROJECT_ID,
    storageBucket: process.env.API_STORAGE_BUCKET,
    messageSenderId: process.env.API_MESSAGE_SENDER_ID,
    appId: process.env.API_APP_ID,
    measurementId: process.env.API_MEASUREMENT_ID
};

export const firebase = initializeApp(config);