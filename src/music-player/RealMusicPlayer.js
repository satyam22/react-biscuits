import React, { useState, useEffect, useRef } from "react";
import "./styles/index.css";
import ProgressBar from "../components/ProgressBar";

const tracksSrc = ["cute", "creativeminds", "punky", "sexy", "summer"];

const totalTracks = tracksSrc.length;

const RealMusicPlayer = () => {
  const [track, setTrack] = useState({ trackNo: 0, playing: "paused" });
  const [trackPercent, setTrackPercent] = useState(0);

  let player = useRef({});
  const url = `tracks/${tracksSrc[track.trackNo]}.mp3`;
  useEffect(() => {
    player.src = url;
    if (track.playing === "playing") {
      player.play();
    }
    if (track.playing === "paused") {
      player.pause();
    }
    if (track.playing === "stopped") {
      player.pause();
      player.currentTime = 0;
    }
  }, [track]);

  useEffect(() => {
    player.addEventListener("timeupdate", (e) => {
      const {target:{currentTime,duration}={}} = e
      let percent = (currentTime*100/duration).toPrecision(2)
      if(isNaN(percent)) {
        percent = 0
      }
      console.log(percent)
      setTrackPercent(percent);
    });
    return () => {
      player.removeEventListener("timeupdate", () => {});
    };
  }, []);
  const togglePlay = () =>
    setTrack({
      ...track,
      playing: track.playing === "playing" ? "paused" : "playing",
    });
  const stopPlay = () =>
    setTrack({
      ...track,
      playing: "stopped",
    });

  const prevSong = () =>
    setTrack({
      trackNo: (track.trackNo - 1 + totalTracks) % totalTracks,
      playing: "playing",
    });
  const nextSong = () =>
    setTrack({
      trackNo: (track.trackNo + 1) % totalTracks,
      playing: "playing",
    });
  return (
    <div className="music-player">
      <h1> Music Player </h1>
      <div className={`music-container ${track.playing === 'playing' ? 'play': ''}`}>
          <div className={`music-info `}>
              <h4 className="title">{tracksSrc[track.trackNo]}</h4>
              <ProgressBar percentage= {trackPercent}/>
          </div>
        <audio ref={(ref) => (player = ref)} />
        <div className="img-container">
        <img src={`posters/${tracksSrc[track.trackNo]}.jpg`} alt="music-cover" />
        </div>
        <div className="controls">
          <button onClick={prevSong} className="control-btn">
            <i className="fa fa-backward" />
          </button>
          <button onClick={togglePlay} className="control-btn control-btn-big">
            <i
              className={`fa ${
                track.playing === "playing" ? "fa-pause" : "fa-play"
              }`}
            />
          </button>
          <button onClick={stopPlay} className="control-btn">
            <i className={`fa fa-stop`} />
          </button>
          <button onClick={nextSong} className="control-btn">
            <i className="fa fa-forward" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealMusicPlayer;
