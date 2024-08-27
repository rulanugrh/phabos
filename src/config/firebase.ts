import dotenv from "dotenv"
import { initializeApp } from "firebase-admin/app";
import { getFirestore  } from "firebase-admin/firestore"
import { credential } from "firebase-admin";
dotenv.config()

const fileKey = require('../../config/key.json')

initializeApp({
    credential: credential.cert(fileKey)
});
export const firestore = getFirestore();
