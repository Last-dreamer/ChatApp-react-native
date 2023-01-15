import { getFirebaseConfig } from "../firebase_helper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getDatabase, child, set } from "firebase/database";
import { authenticate } from "../../store/authSlice";

export const signUp = async (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const app = getFirebaseConfig();
    const auth = getAuth(app);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, stsTokenManager } = result.user;
      const { accessToken } = stsTokenManager;
      const data = await createUser(email, firstName, lastName, uid);

      dispatch(authenticate({ token: accessToken, userData: data }));

      console.log("testing result:" + data);
    } catch (error) {
      // console.log(error.code);

      let errorCode = error.code;
      let message = "something went wrong";
      if (errorCode === "auth/weak-password") {
        message = "Password must be atleast 6 characters long";
      } else if (errorCode === "auth/email-already-in-use") {
        message = "Email is already in use";
      }
      throw new Error(message);
    }
  };
};

const createUser = async (email, firstName, lastName, userId) => {
  const firstLast = `${firstName} ${lastName}`;
  let userData = {
    firstName,
    lastName,
    firstLast,
    email,
    userId,
  };
  const refDb = ref(getDatabase());
  const childRef = child(refDb, `user/${userId}`);
  await set(childRef, userData);
  return userData;
};
