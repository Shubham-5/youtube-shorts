import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export default function ProgressBar({ videoRef, id }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const video = videoRef.current;
      if (video) {
        const currentTime = video.currentTime;
        const duration = Number(video.duration);
        setProgress((currentTime / duration) * 100);
      }
    };

    const video = videoRef.current;

    if (video) {
      video.addEventListener("timeupdate", updateProgress);
      return () => video.removeEventListener("timeupdate", updateProgress);
    }
  }, [id]);

  return (
    <div className={styles.progress_container}>
      <div
        className={styles.progress_bar}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
