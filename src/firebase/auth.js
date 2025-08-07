import { auth } from "./firebase.Config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

const signInAnon = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        signInAnonymously(auth)
          .then((res) => resolve(res.user))
          .catch((err) => reject(err));
      }
    });
  });
};

export { signInAnon };
