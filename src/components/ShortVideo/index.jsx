import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  IoMdPause,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";

import styles from "./styles.module.scss";
import ProgressBar from "./ProgressBar";
import FeedbackButtons from "./FeedbackButtons";

const ShortVideo = ({
  video,
  mute,
  setMute,
  playingVideo,
  setPlayingVideo,
}) => {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(video.id === playingVideo);

  const scrollToVideo = useCallback(
    (direction) => {
      const offset = direction === "up" ? -1 : 1;
      const nextVideoId = Number(video.id) + offset;
      const nextVideoElement = document.getElementById(nextVideoId);
      if (nextVideoElement) {
        nextVideoElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    [video.id]
  );

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target.id !== playingVideo &&
            entry.target.paused
          ) {
            setPlay(true);
            setPlayingVideo(entry.target.id);
            return;
          }
          if (!entry.isIntersecting) {
            setPlay(false);
            return;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }
    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, [playingVideo, setPlayingVideo]);

  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  return (
    <div className={styles.video_container}>
      <div className={styles.video}>
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          id={video.id}
          autoFocus
          autoPlay={play}
          loop={video.id === playingVideo}
          onClick={(event) => {
            event.stopPropagation();
            setPlay(!play);
          }}
          className={styles.video_player}
          muted={mute}
        />

        <div className={styles.video_actions}>
          <div className={styles.play_pause}>
            {play ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setPlay(false);
                }}
              >
                <IoMdPause size={24} />
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setPlay(true);
                }}
              >
                <IoMdPlay size={24} />
              </button>
            )}
          </div>
          <div className={styles.volume}>
            {mute ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMute(false);
                }}
              >
                <IoMdVolumeOff size={24} />
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMute(true);
                }}
              >
                <IoMdVolumeHigh size={24} />
              </button>
            )}
          </div>
        </div>

        <FeedbackButtons />

        <div className={styles.video_details}>
          <div className={styles.video_creator_details}>
            <img src={video.thumbnailUrl} alt={video.author} />
            <p>{video.author}</p>
            <button>Subscribe</button>
          </div>
          <p>{video.title}</p>
          <p>{video.description}</p>

          <ProgressBar videoRef={videoRef} id={video.id} />
        </div>
      </div>

      <div className={styles.scroll_actions}>
        <button onClick={() => scrollToVideo("up")}>
          <FaArrowUp />
        </button>
        <button onClick={scrollToVideo}>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default ShortVideo;
