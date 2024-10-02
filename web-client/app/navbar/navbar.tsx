"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {
  //initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);

      return () => unsubscribe();
    });
  }, []);
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          width={50}
          height={50}
          src="/liftlens-logo.png"
          alt="Lift Lens Logo"
        ></Image>
      </Link>
      {user && <Upload></Upload>}
      <SignIn user={user} />
    </nav>
  );
}
