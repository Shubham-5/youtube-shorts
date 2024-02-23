import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import ShortVideo from "../ShortVideo";

import styles from "./styles.module.scss";
import data from "../../data.json";

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [page, setPage] = useState(0);
  const [mute, setMute] = useState(true);

  const getVideos = async (currentPage) => {
    try {
      setVideos((prevVideos) => {
        const filteredVideos = data.filter(
          (video) => !prevVideos.some((v) => v.id === video.id)
        );
        return [...prevVideos, ...filteredVideos];
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVideos(page);
  }, [page]);

  useEffect(() => {
    setPlayingVideo(videos?.length ? videos[0].id : null);
  }, [videos]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      {videos.length ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={handleNextPage}
          hasMore={true}
          loader={<span className="loader"></span>}
          endMessage={<p className="end-message">You have reached the end!</p>}
          onScroll={() => {
            scrollBy(0, -1);
          }}
          className={styles.video_list}
        >
          {playingVideo &&
            videos.map((video) => (
              <ShortVideo
                key={video.postId}
                video={video}
                mute={mute}
                setMute={setMute}
                playingVideo={playingVideo}
                setPlayingVideo={setPlayingVideo}
              />
            ))}
        </InfiniteScroll>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Shorts;
