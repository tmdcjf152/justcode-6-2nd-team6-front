import { useState, useEffect, useRef } from "react";
import { IoSearchSharp, IoFileTrayOutline } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { BiMicrophone } from "react-icons/bi";
import { FiMusic, FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { VscNewFolder, VscTrash } from "react-icons/vsc";
import SimilarSong from "./SimilarSong";
import PlayListMusic from "./PlayListMusic";
import styled from "styled-components";


const PlayList = ({
  musicTracks,
  setMusicTracks,
  setTrackIndex,
  trackIndex,
  isMyPlayListClicked,
  setIsMyPlayListClicked,
  setIsGetMyPlayListClicked,
  isMoreMenuClicked,
  setIsMoreMenuClicked,
  checkedList,
  setCheckedList,
  setAlertOn,
}) => {
  const [isPlayListClicked, setIsPlayListClicked] = useState(true);
  const [isArtistClicked, setIsArtistClicked] = useState(false);
  const [isSimilarClicked, setIsSimilarClicked] = useState(false);
  const [isPlayListOpened, setIsPlayListOpened] = useState(true);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sameArtistsMusic, setSameArtistsMusic] = useState([]);
  const [sameGenreMusic, setSameGenreMusic] = useState([]);

  useEffect(() => {
    if (musicTracks.length !== 0) {
      fetch(
        `http://13.125.174.118:8000/play/addsongs/artist/${musicTracks[trackIndex].songId}`,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {

          if (data.message !== "Need Voucher") setSameArtistsMusic(data);
        });

      fetch(
        `http://13.125.174.118:8000/play/addsongs/genre/${musicTracks[trackIndex].songId}`,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message !== "Need Voucher") setSameGenreMusic(data);
        });
    }
  }, [trackIndex, musicTracks]);

  const onCheckedElement = (checked, item) => {
    if (checked === false) {
      setCheckedList([...checkedList, item]);
    } else if (checked === true) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }

  };

  const inputRef = useRef();

  useEffect(() => {
    if (isSearchClicked !== false) inputRef.current.focus();
  }, [isSearchClicked]);

  const filteredTracks = musicTracks.map((el) => {
    if (
      el.songTitle
        .replace(/(\s*)/g, "")
        .toUpperCase()
        .includes(inputValue.replace(/(\s*)/g, "").toUpperCase())
    ) {
      return el;
    } else
      return {
        songId: el.key,
        songTitle: "none",
        songArtist: "none",
        albumCover: "",
        content: "",
      };
  });

  return (
    <StyledPlayList>
      <div className="play-list-inner-box flex-center">
        <div className="menu-list">
          <div
            className={
              isPlayListClicked
                ? "selected-menu flex-center"
                : "menu flex-center"
            }
            onClick={() => {
              setIsPlayListClicked(true);
              setIsArtistClicked(false);
              setIsSimilarClicked(false);
              setIsSearchClicked(false);
              setIsMoreMenuClicked(false);
            }}
          >
            <RiPlayListFill className="icon" size="20" />
            재생목록
          </div>
          <div
            className={
              isArtistClicked ? "selected-menu flex-center" : "menu flex-center"
            }
            onClick={() => {
              setIsPlayListClicked(false);
              setIsArtistClicked(true);
              setIsSimilarClicked(false);
              setIsSearchClicked(false);
              setIsMoreMenuClicked(false);
            }}
          >
            <BiMicrophone className="icon" size="20" />
            아티스트
          </div>
          <div
            className={
              isSimilarClicked
                ? "selected-menu flex-center"
                : "menu flex-center"
            }
            onClick={() => {
              setIsPlayListClicked(false);
              setIsArtistClicked(false);
              setIsSimilarClicked(true);
              setIsSearchClicked(false);
              setIsMoreMenuClicked(false);
            }}
          >
            <FiMusic className="icon" size="20" />
            유사곡
          </div>
        </div>
        {isSearchClicked || !isPlayListClicked || (
          <div className="play-list-menu flex-center">
            <div className="menu-wrapper flex-center">
              <div
                className="menu flex-center"
                onClick={() => {
                  if (isEditClicked === false) {
                    // 검색
                    setIsSearchClicked(true);
                    setIsEditClicked(false);
                  } else {
                    // 편집 (전체선택)
                    if (checkedList.length < musicTracks.length) {
                      setCheckedList(musicTracks.map((el) => el.songId));
                    } else setCheckedList([]);
                  }
                  setIsMoreMenuClicked(false);
                }}
              >
                {isEditClicked ? (
                  <AiOutlineCheck size="18" className="icon" />
                ) : (
                  <IoSearchSharp size="18" className="icon" />
                )}
                {isEditClicked ? "전체선택" : "검색"}
              </div>

              {!isPlayListClicked || isEditClicked || (
                <div
                  className="menu flex-center"
                  onClick={() => {
                    setIsMyPlayListClicked(true);
                    setIsGetMyPlayListClicked(true);
                    setIsMoreMenuClicked(false);
                  }}
                >
                  <IoFileTrayOutline size="18" className="icon" />내 리스트
                  가져오기
                </div>
              )}
            </div>

            {!isPlayListClicked || (
              <div
                className="menu flex-center"
                onClick={() => {
                  setIsMoreMenuClicked(false);
                  setIsEditClicked(!isEditClicked);
                  setCheckedList([]);
                }}
              >
                {isEditClicked || <FiEdit size="18" className="icon" />}
                {isEditClicked ? "완료" : "편집"}
              </div>
            )}
          </div>
        )}
        {!isSearchClicked || (
          <div className="play-list-search flex-center">
            <div className="input-box">
              <IoSearchSharp size="20" />
              <input
                type="text"
                placeholder="곡 제목으로 검색해 주세요"
                autoComplete="off"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <MdOutlineCancel
                className="delete"
                onClick={() => {
                  setInputValue("");
                }}
              />
            </div>

            <div className="cancel" onClick={() => setIsSearchClicked(false)}>
              취소
            </div>
          </div>
        )}
        <div className="music-container flex-center">
          <div className="play-list-title">
            <div className="title">
              {isPlayListClicked
                ? "현재 재생목록"
                : isArtistClicked
                  ? "같은 아티스트의 음악"
                  : "같은 장르의 음악"}
            </div>
            {isPlayListOpened
              ? !isPlayListClicked || (
                <BsChevronUp
                  className="button"
                  onClick={() => {
                    setIsPlayListOpened(!isPlayListOpened);
                    setIsMoreMenuClicked(false);
                  }}
                />
              )
              : !isPlayListClicked || (
                <BsChevronDown
                  className="button"
                  onClick={() => setIsPlayListOpened(!isPlayListOpened)}
                />
              )}
          </div>
          {/* 재생목록 & 검색된 재생 목록 */}
          {!isPlayListOpened ||
            musicTracks.length === 0 ||
            !isPlayListClicked || (
              <div className="play-list-music-container">
                {isSearchClicked ? (
                  <PlayListMusic
                    musicTracks={filteredTracks}
                    setMusicTracks={setMusicTracks}
                    trackIndex={trackIndex}
                    setTrackIndex={setTrackIndex}
                    setIsMyPlayListClicked={setIsMyPlayListClicked}
                    isMoreMenuClicked={isMoreMenuClicked}
                    setIsMoreMenuClicked={setIsMoreMenuClicked}
                    isEditClicked={isEditClicked}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    onCheckedElement={onCheckedElement}
                  />
                ) : (
                  <PlayListMusic
                    musicTracks={musicTracks}
                    setMusicTracks={setMusicTracks}
                    trackIndex={trackIndex}
                    setTrackIndex={setTrackIndex}
                    setIsMyPlayListClicked={setIsMyPlayListClicked}
                    isMoreMenuClicked={isMoreMenuClicked}
                    setIsMoreMenuClicked={setIsMoreMenuClicked}
                    isEditClicked={isEditClicked}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    onCheckedElement={onCheckedElement}
                  />
                )}
              </div>
            )}
          {/* 아티스트 & 유사곡 */}
          {!isArtistClicked ||
            sameArtistsMusic.length === 0 ||
            musicTracks.length === 0 || (
              <SimilarSong
                data={sameArtistsMusic}
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
                setAlertOn={setAlertOn}
              />
            )}
          {!isSimilarClicked ||
            sameGenreMusic.length === 0 ||
            musicTracks.length === 0 || (
              <SimilarSong
                data={sameGenreMusic}
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
                setAlertOn={setAlertOn}
              />
            )}
        </div>
        {!isEditClicked || checkedList.length == 0 || (
          <div className="edit-inner-box">
            <div className="edit-container">
              <div className="edit-box">
                <div className="checklist-counter">{checkedList.length}</div>
                <div
                  className="wrapper"
                  onClick={() => {
                    setCheckedList([]);
                  }}
                >
                  <AiOutlineCheck className="icon" />
                  <div className="text">선택해제</div>
                </div>
              </div>
              <div className="edit-box">
                <div
                  className="wrapper"
                  onClick={() => {
                    setIsMyPlayListClicked(true);
                  }}
                >
                  <VscNewFolder className="icon" />
                  <div className="text">내 리스트</div>
                </div>
              </div>
              <div className="edit-box">
                <div
                  className="wrapper"
                  onClick={() => {
                    setMusicTracks(
                      musicTracks.filter((el, i) => {
                        return !checkedList.includes(el.songId);
                      })
                    );
                    setCheckedList([]);
                    setTrackIndex(0);
                  }}
                >
                  <VscTrash className="icon" />
                  <div className="text">삭제</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledPlayList>
  );
};

export default PlayList;

const StyledPlayList = styled.div`
  .play-list-inner-box {
    flex-direction: column;
    width: 670px;
    padding: 90px 0 30px 0;
    font-size: 18px;

    .menu-list {
      display: flex;
      .menu {
        height: 50px;
        width: calc(670px / 3);
        border-bottom: 3px solid #464646;
        cursor: pointer;
      }
      .selected-menu {
        height: 50px;
        width: calc(670px / 3);
        border-bottom: 3px solid;
        cursor: pointer;
      }
      .icon {
        margin-right: 10px;
      }
    }

    .play-list-menu {
      justify-content: space-between;
      margin-top: 30px;
      height: 40px;
      width: 670px;
      color: #85a0a0;
      font-size: 16px;

      .menu {
        margin: 0 10px;
        cursor: pointer;

        .icon {
          margin-right: 5px;
        }
      }
    }

    .play-list-search {
      position: relative;
      justify-content: space-between;
      margin-top: 30px;
      height: 40px;
      width: 670px;
      color: #85a0a0;
      font-size: 16px;

      .input-box {
        input[type="text"] {
          position: relative;
          left: -17px;
          width: 500px;
          height: 40px;
          border-radius: 100px;
          padding: 10px;
          padding-left: 40px;
          border: none;
          background-color: #313131;
          color: white;
          font-family: "NanumBarunGothic", sans-serif;
          font-size: 16px;
        }

        svg {
          position: relative;
          top: 5.5px;
          left: 15px;
          z-index: 3;
        }
      }

      .delete {
        margin-left: -15px;
        color: #757575;
        transform: scale(1.1);
        cursor: pointer;

        &:hover {
          color: #353535;
        }
      }

      .cancel {
        margin: 0 10px;
        cursor: pointer;
      }
    }

    .music-container {
      flex-direction: column;
      justify-content: flex-start;
      width: 670px;
      margin-top: 15px;
      border-radius: 7.5px;
      background-color: #181818;

      .play-list-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 22.5px;
        font-size: 18px;
        border-bottom: 1px solid #262626;

        .button {
          color: #85a0a0;
          transform: scale(1.25);
          cursor: pointer;
        }
      }

      .play-list-music-container {
        margin: 10px 0;
      }
    }

    .edit-container {
      display: flex;
      position: fixed;
      bottom: 50px;
      right: calc(50% - 150px);
      width: 300px;
      border-radius: 5px;
      background-color: #3f3fff;

      .edit-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 33.3%;
        cursor: pointer;
        font-size: 14px;

        &:nth-of-type(2) {
          .wrapper {
            border-right: 2px solid #5252ff;
            border-left: 2px solid #5252ff;
          }
        }

        .checklist-counter {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 90px;
          left: 15px;
          width: 40px;
          height: 40px;
          border: 3px solid #3f3fff;
          border-radius: 100%;
          background-color: white;
          color: #3f3fff;
          font-weight: 700;
          z-index: 1;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 30px 0;

          .icon {
            margin-bottom: 20px;
            transform: scale(1.75);
          }
        }
      }
    }
  }
`;