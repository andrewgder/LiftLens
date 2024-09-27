import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import styles from "./sign-in.module.css";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <Fragment>
      {user ? (
        <button onClick={signOut} className={styles.signin}>
          Sign Out
        </button>
      ) : (
        <button onClick={signInWithGoogle} className={styles.signin}>
          Sign In
        </button>
      )}
    </Fragment>
  );
}
