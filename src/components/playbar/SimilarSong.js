import { IoIosPlayCircle } from "react-icons/io";
import styled from "styled-components";



const SimilarSong = ({ data, musicTracks, setMusicTracks, setAlertOn }) => {
  return (
    <StyledSimilarSong>
      {data.map((el, i) => {
        const musicTracksId = musicTracks.map((el) => el.songId);
        const songPlay = () => {
          fetch(`http://13.125.174.118:8000/play/addsongs/song/${el.songId}`, {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((data) => {

              const song = data[0];
              if (musicTracksId.includes(song.songId) === false) {
                setMusicTracks([song, ...musicTracks]);
                setAlertOn("현재 재생목록에 추가되었습니다.");
              } else setAlertOn("이미 현재 재생목록에 있는 곡입니다.");
            });
        };
        return (
          <div className="similar-song-inner-box" key={el.songId}>
            <div className="song-info flex-center" onClick={() => songPlay()}>
              <img src={el.albumCover} alt="album cover" className="cover" />
              <div className="title-and-artist">
                <div className="title">{el.songTitle}</div>
                <div className="artist">{el.songArtist}</div>
              </div>
            </div>
            <IoIosPlayCircle className="play" onClick={() => songPlay()} />
          </div>
        );
      })}
    </StyledSimilarSong>
  );
};

export default SimilarSong;


const StyledSimilarSong = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  .similar-song-inner-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 630px;

    .song-info {
      padding: 10px 0;
      cursor: pointer;

      .cover {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 20px;
        background-size: cover;
      }

      .title-and-artist {
        .title {
        }
        .artist {
          margin-top: 10px;
          color: #849898;
          font-size: 14px;
        }
      }
    }

    .play {
      margin-right: 5px;
      color: #85a0a0;
      transform: scale(1.75);
      cursor: pointer;
    }
  }
`;