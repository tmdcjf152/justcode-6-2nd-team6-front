import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import styled from "styled-components";
import "react-h5-audio-player/lib/styles.css";



const MusicPlayer = ({
  trackIndex,
  setTrackIndex,
  musicTracks,
  setMusicTracks,
  isExpandedClicked,
}) => {
  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  const player = useRef();

  useEffect(() => {
    setTimeout(() => player.current.audio.current.pause(), 10);
  }, []);

  return (
    <StyledMusicPlayer>
      <div
        className={
          isExpandedClicked
            ? "expand-player-inner-box"
            : "music-player-inner-box"
        }
      >
        <AudioPlayer
          src={musicTracks.length === 0 ? "" : musicTracks[trackIndex].content}
          showSkipControls={true}
          showJumpControls={false}
          layout={isExpandedClicked ? "stack" : "stacked-reverse"}
          volume={0.5}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
          ref={player}
        />
      </div>
    </StyledMusicPlayer>
  );
};

export default MusicPlayer;

const StyledMusicPlayer = styled.div`
  .music-player-inner-box {
    position: relative;
    width: 30vw;

    .rhap_container {
      outline: none;
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;

      .rhap_controls-section {
        padding-bottom: 10px;
      }

      .rhap_time {
        color: #a0a0a0;
        font-size: 13px;
        font-weight: 700;
      }

      .rhap_volume-container {
        position: fixed;
        right: 170px;
        bottom: 47px;
        width: 100px;
      }

      .rhap_progress-bar {
        height: 6px;
      }

      .rhap_progress-indicator {
        display: none;
      }

      .rhap_progress-bar-show-download {
        background-color: #222222;
      }

      .rhap_download-progress {
        background-color: #323232;
      }

      .rhap_progress-filled {
        background-color: #3f3fff;
      }

      .rhap_main-controls {
        margin-right: 28px;
      }

      .rhap_volume-indicator {
        background-color: #3f3fff;
      }

      .rhap_volume-bar {
        background-color: #323232;
      }

      .rhap_main-controls-button {
        color: white;
        transform: scale(1.1);
        &:hover {
          filter: invert(25%) sepia(1%) saturate(2589%) hue-rotate(343deg)
            brightness(103%) contrast(83%);
          transition: 0s ease-out;
        }
      }

      .rhap_play-pause-button {
        transform: scale(1.1);
        margin: 0px 30px;
      }

      .rhap_repeat-button {
        color: #545454;
        transform: scale(1.1);
        &:hover {
          color: #1b1b1b;
          transition: 0s ease-out;
        }
      }
    }
  }

  .expand-player-inner-box {
    position: relative;
    width: 680px;

    .rhap_container {
      outline: none;
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;

      .rhap_volume-container {
        position: absolute;
        left: 20px;
        bottom: -30px;
        width: 110px;
      }

      .rhap_controls-section {
        margin: 50px 0;
      }

      .rhap_time {
        color: #a0a0a0;
        font-size: 13px;
        font-weight: 700;
      }

      .rhap_progress-bar {
        height: 7px;
      }

      .rhap_progress-indicator {
        display: none;
      }

      .rhap_progress-bar-show-download {
        background-color: #222222;
      }

      .rhap_download-progress {
        background-color: #323232;
      }

      .rhap_progress-filled {
        background-color: #3f3fff;
      }

      .rhap_volume-indicator {
        background-color: #3f3fff;
      }

      .rhap_volume-bar {
        background-color: #323232;
      }

      .rhap_main-controls-button {
        color: white;
        transform: scale(1.5);
        &:hover {
          filter: invert(25%) sepia(1%) saturate(2589%) hue-rotate(343deg)
            brightness(103%) contrast(83%);
          transition: 0s ease-out;
        }
      }

      .rhap_play-pause-button {
        transform: scale(1.5);
        margin: 0px 50px;
      }

      .rhap_main-controls {
        margin-left: 27.5px;
      }

      .rhap_repeat-button {
        position: absolute;
        left: 150px;
        transform: scale(1.35);
        &:hover {
          color: #3d3d3f;
          transition: 0s ease-out;
        }
      }
    }
  }
`;