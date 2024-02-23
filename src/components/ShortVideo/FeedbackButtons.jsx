import React, { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";

import styles from "./styles.module.scss";

export default function FeedbackButtons() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setDisliked(false);
    setLiked((prevLiked) => !prevLiked);
  };

  const handleDislike = () => {
    setLiked(false);
    setDisliked((prevDisliked) => !prevDisliked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(video.videoUrl);
  };

  const handleComment = () => {};
  return (
    <div className={styles.buttons}>
      <div className={styles.like}>
        <button
          title="like"
          onClick={handleLike}
          aria-label="like"
          className={`${styles.like_button} ${liked ? styles.liked : ""}`}
        >
          <FaThumbsUp size={24} />
        </button>
        <span>{liked ?? "Like"}</span>
      </div>

      <div className={styles.dislike}>
        <button
          title="dislike"
          onClick={handleDislike}
          aria-label="dislike"
          className={`${styles.dislike_button} ${
            disliked ? styles.disliked : ""
          }`}
        >
          <FaThumbsDown size={24} />
        </button>
        <span>Dislike</span>
      </div>

      <div className={styles.comment}>
        <button title="Comment" aria-label="Comment" onClick={handleComment}>
          <MdInsertComment size={24} />
        </button>
        <span>0</span>
      </div>

      <div className={styles.share}>
        <button title="Share" onClick={handleShare} aria-label="Share">
          <RiShareForwardFill size={24} />
        </button>
        <span>Share</span>
      </div>
    </div>
  );
}
