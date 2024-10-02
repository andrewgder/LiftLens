import * as functions from "firebase-functions";

// prettier-ignore
import {initializeApp} from "firebase-admin/app";
// prettier-ignore
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
// prettier-ignore
import {Storage} from "@google-cloud/storage";
// prettier-ignore
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "lift-lens-raw-videos";

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };
  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
});

export const generateUploadUrl = onCall(
  // prettier-ignore
  {maxInstances: 1},
  async (request) => {
    // check if the user is authenticated
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated"
      );
    }

    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucketName);
    // Generate a unique filename for upload
    const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    // Get a v4 signed URL for uploading file
    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    // prettier-ignore
    return {url, fileName};
  }
);