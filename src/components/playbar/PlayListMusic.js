import { AiOutlineMore } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { IoDiscOutline } from "react-icons/io5";
import { VscNewFolder, VscTrash } from "react-icons/vsc";
import { MdEqualizer } from "react-icons/md";
import { FiMusic } from "react-icons/fi";
import styled from "styled-components";



const PlayListMusic = ({
  musicTracks,
  setMusicTracks,
  trackIndex,
  setTrackIndex,
  setIsMyPlayListClicked,
  isMoreMenuClicked,
  setIsMoreMenuClicked,
  isEditClicked,
  checkedList,
  setCheckedList,
  onCheckedElement,
}) => {
  const mapMusic = musicTracks.map((el, i) => {
    if (el.content !== "")
      return (
        <div className="play-list-music-inner-box" key={el.songId}>
          <div
            className="song-info flex-center"
            onClick={() => {
              if (isEditClicked === false) setTrackIndex(i);
              else if (isEditClicked === true)
                onCheckedElement(checkedList.includes(el.songId), el.songId);
              setIsMoreMenuClicked(false);
            }}
          >
            {!isEditClicked || (
              <input
                type="checkbox"
                className="checkbox"
                value={el.songId}
                checked={checkedList.includes(el.songId) ? true : false}
                onChange={() => { }}
              />
            )}
            <div
              style={{
                backgroundImage:
                  trackIndex === i
                    ? "linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(" +
                    el.albumCover +
                    ")"
                    : "url(" + el.albumCover + ")",
              }}
              className={
                trackIndex === i
                  ? "playingCover flex-center"
                  : "cover flex-center"
              }
            >
              {trackIndex !== i || <MdEqualizer size="22" />}
            </div>
            <div
              className={
                trackIndex === i
                  ? "playing-title-and-artist"
                  : "title-and-artist"
              }
            >
              <div className="title">{el.songTitle}</div>
              <div className="artist">{el.songArtist}</div>
            </div>
          </div>

          <div className="icons">
            {isEditClicked ? (
              <VscTrash
                className="more"
                onClick={() => {
                  setMusicTracks(
                    musicTracks.filter((mel, i) => el.songId !== mel.songId)
                  );
                  setCheckedList(
                    checkedList.filter((cel, i) => el.songId !== cel)
                  );
                }}
              />
            ) : (
              <>
                <VscNewFolder
                  className="add-play-list"
                  onClick={() => {
                    setCheckedList([el.songId]);
                    setIsMyPlayListClicked(true);
                    setIsMoreMenuClicked(false);
                  }}
                />
                <AiOutlineMore
                  className="more"
                  onClick={() => {
                    setCheckedList([el.songId]);
                    if (el.songId === checkedList[0])
                      setIsMoreMenuClicked(!isMoreMenuClicked);
                    else setIsMoreMenuClicked(true);
                  }}
                />
              </>
            )}
            {el.songId !== checkedList[0] || !isMoreMenuClicked || (
              <div className="more-menu-list">
                <div
                  className="more-menu"
                  onClick={() => {
   
                  }}
                >
                  <FiMusic className="icon" />곡 정보
                </div>
                <div className="more-menu">
                  <IoDiscOutline className="icon" />
                  앨범 정보
                </div>
                <div className="more-menu">
                  <BiMicrophone className="icon" />
                  아티스트 정보
                </div>
              </div>
            )}
          </div>
        </div>
      );
  });

  return <StyledPlayListMusic>{mapMusic}</StyledPlayListMusic>;
};

export default PlayListMusic;

const StyledPlayListMusic = styled.div`
  display: flex;
  flex-direction: column;

  .play-list-music-inner-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 630px;

    .song-info {
      padding: 10px 0;
      cursor: pointer;

      .checkbox {
        margin-right: 20px;
      }
      .cover {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 20px;
        background-size: cover;
      }

      .playingCover {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 20px;
        color: #3f3fff;
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

    .playing-title-and-artist {
      color: #3f3fff;
      .title {
      }
      .artist {
        margin-top: 10px;
        color: #3f3fff;
        font-size: 14px;
      }
    }
  }

  .icons {
    position: relative;
    color: #85a0a0;

    .add-play-list {
      transform: scale(1.5);
      margin-right: 30px;
      cursor: pointer;
    }

    .more {
      transform: scale(1.5);
      cursor: pointer;
    }

    .more-menu-list {
      position: absolute;
      right: 0;
      top: 35px;
      padding: 10px 0;
      border-radius: 3px;
      background-color: white;
      z-index: 30;

      .more-menu {
        display: flex;
        align-items: center;
        padding: 15px;
        width: 180px;
        height: 40px;
        color: black;
        font-size: 15px;
        cursor: pointer;

        &:hover {
          color: #3f3fff;
          background-color: #f5f5f5;
        }

        .icon {
          margin-right: 10px;
          transform: scale(1.25);
        }
      }
    }
  }
`;