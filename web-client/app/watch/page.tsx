"use client";
import styles from "./watch.module.css";
import { useSearchParams } from "next/navigation";

export default function Watch() {
  const videoPrefix =
    "https://storage.googleapis.com/lift-lens-processed-videos/";
  const videoSrc = useSearchParams().get("v");

  return (
    <div className={styles.container}>
      <h1>Watch Page</h1>
      {
        <video
          className={styles.videoContainer}
          controls
          src={videoPrefix + videoSrc}
        />
      }
      <button className={styles.deleteButton}>Delete Video</button>
    </div>
  );
}
