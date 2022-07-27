import { getAuth, signOut } from "config/firebase/firebase";

const handleSignout = async () => {
  const auth = getAuth();

  await signOut(auth)
    .then(() => {
      return Promise.resolve("success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return Promise.reject(`${errorCode}: ${errorMessage}`);
    });
};

export default handleSignout;
