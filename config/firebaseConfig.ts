import {
  initializeApp,
  cert,
  getApps,
  App,
  AppOptions,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

const getFirebaseConfig = (): AppOptions => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.warn("⚠️ Missing Firebase environment variables — using mock mode for tests");
    return { credential: cert({ projectId: "test", clientEmail: "test@test.com", privateKey: "fake-key" } as ServiceAccount) };
  }

  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  return { credential: cert(serviceAccount) };
};

const initializeFirebaseAdmin = (): App => {
  const existingApp = getApps()[0];
  return existingApp ? existingApp : initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
