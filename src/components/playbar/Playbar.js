import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiPlayListFill } from "react-icons/ri";
import { HiOutlineHeart, HiHeart } from "react-icons/hi"; // player like
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // expanded player like
import { VscNewFolder } from "react-icons/vsc";
import { BiShuffle } from "react-icons/bi";
import MyPlayList from "./MyPlayList";
import MusicPlayer from "./MusicPlayer";
import PlayList from "./PlayList";
import styled from "styled-components";




const Playbar = ({
  trackIndex,
  setTrackIndex,
  musicTracks,
  setMusicTracks,
  isLogin,
  isExpandedClicked,
  setIsExpandedClicked,
  setAlertOn,
  isLiked,
  setIsLiked,
}) => {
  const [isMyPlayListClicked, setIsMyPlayListClicked] = useState(false); // 재생목록에 추가할 때
  const [isGetMyPlayListClicked, setIsGetMyPlayListClicked] = useState(false); // 내 재생목록 가져올 때
  const [isMoreMenuClicked, setIsMoreMenuClicked] = useState(false); // 더보기 클릭
  const [isAddManySongs, setIsAddManySongs] = useState(false); // 편집 탭에서 음악 여러개 추가할 때
  const [checkedList, setCheckedList] = useState([]); // 선택된 곡들의 아이디 배열

  // 곡 변경될 때마다 데이터 보냄 (토큰, 곡 ID), voucher 없으면 플리에서 곡 삭제시킴
  useEffect(() => {
    if (musicTracks.length !== 0) {
      fetch(`http://13.125.174.118:8000/${musicTracks[trackIndex].songId}`, {
        method: "PATCH",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.canPlay === "0") setMusicTracks([]);
          else {
            if (data.isLiked === "1") setIsLiked(true);
            else setIsLiked(false);
          }
        });
    } else if (musicTracks.length === 0) setIsLiked(false);
  }, [trackIndex, musicTracks]);



  // checkedList 변경 시 마다 출력 (삭제 예정)
  useEffect(() => {
  }, [checkedList]);

  return (
    <StyledPlaybar>
      {!isLogin ? (
        <div className="playbar-inner-box flex-center">
          <p className="warning">
            로그인 후 음악 재생 서비스를 이용하실 수 있습니다.
          </p>
          <Link to="/login" className="login">
            로그인
          </Link>
          <Link to="/signup" className="signup">
            회원가입
          </Link>
        </div>
      ) : (
        <div
          className={
            isExpandedClicked
              ? "expanded-player-inner-box flex-center"
              : "playbar-inner-box flex-center"
          }
        >
          {!isExpandedClicked || (
            <img
              src="/Images/down-arrow.png"
              alt="close"
              className="close"
              onClick={() => {
                setIsExpandedClicked(!isExpandedClicked);
                setIsGetMyPlayListClicked(false);
              }}
            />
          )}
          <div className="song-info-box flex-center">
            <img
              src={
                musicTracks.length === 0
                  ? "/Images/nothing.png"
                  : musicTracks[trackIndex].albumCover
              }
              alt="album cover"
              className="cover"
            />
            <div className="song-info-wrapper">
              <div className="title">
                {musicTracks.length === 0
                  ? "재생목록이 비어있습니다"
                  : musicTracks[trackIndex].songTitle}
              </div>
              <div className="artist">
                {musicTracks.length === 0
                  ? "--"
                  : musicTracks[trackIndex].songArtist}
              </div>

              {!isExpandedClicked || (
                <div className="like-and-add">
                  {isLiked ? (
                    <IoMdHeart
                      className="like"
                      size="32"
                      onClick={() => {
                        fetch(
                          `http://13.125.174.118:8000/users/like/${musicTracks[trackIndex].songId}`,
                          {
                            method: "PATCH",
                            headers: {
                              Authorization: sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            setIsLiked(false);
                          });
                      }}
                    />
                  ) : (
                    <IoMdHeartEmpty
                      className="like"
                      size="32"
                      onClick={() => {
                        fetch(
                          `http://13.125.174.118:8000/${musicTracks[trackIndex].songId}`,
                          {
                            method: "PATCH",
                            headers: {
                              Authorization: sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            setIsLiked(true);
                          });
                      }}
                    />
                  )}
                  <VscNewFolder
                    className="add-play-list"
                    size="30"
                    onClick={() => {
                      if (
                        JSON.parse(sessionStorage.getItem("tracks")).length !==
                        0
                      ) {
                        setIsMyPlayListClicked(true);
                        setIsGetMyPlayListClicked(false);
                        setCheckedList([musicTracks[trackIndex].songId]);
                      }
                    }}
                  />
                </div>
              )}
              {!isExpandedClicked || (
                <BiShuffle
                  size="35.1"
                  className="expanded-shuffle"
                  onClick={() => {
                    if (
                      JSON.parse(sessionStorage.getItem("tracks")).length !== 0
                    ) {
                      const randomTracks = [...musicTracks].sort(
                        () => Math.random() - 0.5
                      );
                      if (randomTracks[0] === musicTracks[0]) {
                        let lastIndex = randomTracks.length - 1;
                        let randomValue = Math.floor(
                          Math.random() * (lastIndex - 1) + 1
                        );
                        const temp = randomTracks[0];
                        randomTracks[0] = randomTracks[lastIndex];
                        randomTracks[lastIndex] = temp;
                      }
                      setMusicTracks(randomTracks);
                    }
                  }}
                />
              )}
            </div>
          </div>

          <MusicPlayer
            trackIndex={trackIndex}
            musicTracks={musicTracks}
            setTrackIndex={setTrackIndex}
            isExpandedClicked={isExpandedClicked}
            setMusicTracks={setMusicTracks}
          ></MusicPlayer>
          {isExpandedClicked || isLiked ? (
            <HiHeart
              className="like"
              size="32"
              onClick={() => {
                fetch(
                  `http://13.125.174.118:8000/users/like/${musicTracks[trackIndex].songId}`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: sessionStorage.getItem("token"),
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setIsLiked(false);
                  });
              }}
            />
          ) : (
            <HiOutlineHeart
              className="like"
              size="32"
              onClick={() => {
                fetch(
                  `http://13.125.174.118:8000/users/like/${musicTracks[trackIndex].songId}`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: sessionStorage.getItem("token"),
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setIsLiked(true);
                  });
              }}
            />
          )}

          {isExpandedClicked || (
            <RiPlayListFill
              className="playlist"
              onClick={() => setIsExpandedClicked(!isExpandedClicked)}
            />
          )}

          {isExpandedClicked || (
            <BiShuffle
              size="35.1"
              className="shuffle"
              onClick={() => {
                if (JSON.parse(sessionStorage.getItem("tracks")).length !== 0) {
                  const randomTracks = [...musicTracks].sort(
                    () => Math.random() - 0.5
                  );
                  if (randomTracks[0] === musicTracks[0]) {
                    let lastIndex = randomTracks.length - 1;
                    let randomValue = Math.floor(
                      Math.random() * (lastIndex - 1) + 1
                    );
                    const temp = randomTracks[0];
                    randomTracks[0] = randomTracks[lastIndex];
                    randomTracks[lastIndex] = temp;
                  }
                  setMusicTracks(randomTracks);
                }
              }}
            />
          )}

          {!isExpandedClicked || (
            <PlayList
              musicTracks={musicTracks}
              setMusicTracks={setMusicTracks}
              setTrackIndex={setTrackIndex}
              trackIndex={trackIndex}
              isMyPlayListClicked={isMyPlayListClicked}
              setIsMyPlayListClicked={setIsMyPlayListClicked}
              setIsGetMyPlayListClicked={setIsGetMyPlayListClicked}
              isMoreMenuClicked={isMoreMenuClicked}
              setIsMoreMenuClicked={setIsMoreMenuClicked}
              isAddManySongs={isAddManySongs}
              setIsAddManySongs={setIsAddManySongs}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              setAlertOn={setAlertOn}
            />
          )}

          <MyPlayList
            isMyPlayListClicked={isMyPlayListClicked}
            setIsMyPlayListClicked={setIsMyPlayListClicked}
            isGetMyPlayListClicked={isGetMyPlayListClicked}
            setIsGetMyPlayListClicked={setIsGetMyPlayListClicked}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            setAlertOn={setAlertOn}
            musicTracks={musicTracks}
            setMusicTracks={setMusicTracks}
          />
        </div>
      )}
    </StyledPlaybar>
  );
};

export default Playbar;

const StyledPlaybar = styled.div`
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shuffle {
    position: absolute;
    right: 35.65%;
    top: 23px;
    color: #545454;
    transform: scale(0.82);
    cursor: pointer;

    &:hover {
      color: #181818;
    }
  }

  .expanded-shuffle {
    position: absolute;
    right: 110px;
    top: 158px;
    color: #868686;
    z-index: 1;
    cursor: pointer;

    &:hover {
      color: #3b3b3c;
    }
  }

  .playbar-inner-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: black;
    color: white;
    z-index: 10;
    font-family: "NanumBarunGothic", sans-serif;

    .warning {
      font-size: 18px;
      font-weight: 700;
    }

    .login {
      margin: 0px 20px;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid white;
      color: white;
      cursor: pointer;
    }

    .signup {
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid white;
      color: white;
      cursor: pointer;
    }

    .song-info-box {
      position: fixed;
      left: 30px;

      .cover {
        width: 72px;
        height: 72px;
        margin-right: 20px;
        border-radius: 5px;
      }

      .song-info-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;

        .title {
          font-size: 20px;
        }
        .artist {
          margin-top: 15px;
          font-size: 15px;
          color: #849898;
        }
      }
    }

    .like {
      position: fixed;
      right: 115px;
      width: 25px;
      height: 25px;
      color: #545454;
      transform: scale(1.3);
      cursor: pointer;
      &:hover {
        color: #1b1b1b;
      }
    }

    .playlist {
      position: fixed;
      right: 50px;
      width: 35px;
      height: 35px;
      color: #545454;
      transform: scale(1.2);
      cursor: pointer;

      &:hover {
        color: #1b1b1b;
      }
    }
  }

  // 확장된 플레이어 css

  .expanded-player-inner-box {
    position: fixed;
    bottom: 0;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #262626;
    color: white;
    z-index: 10;
    overflow-y: auto;
    font-family: "NanumBarunGothic", sans-serif;

    &::-webkit-scrollbar {
      display: none;
    }

    .close {
      position: fixed;
      top: 50px;
      left: 50px;
      width: 40px;
      height: 40px;
      filter: invert(84%) sepia(41%) saturate(1%) hue-rotate(91deg)
        brightness(96%) contrast(94%);
      cursor: pointer;

      &:hover {
        filter: invert(35%) sepia(0%) saturate(0%) hue-rotate(119deg)
          brightness(96%) contrast(87%);
      }
    }

    .song-info-box {
      position: relative;
      display: flex;
      flex-direction: column;
      .cover {
        width: 420px;
        height: 420px;
        margin: 140px 0 80px 0;
        border-radius: 10px;
      }
      .song-info-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 650px;
        margin-bottom: 20px;
        .title {
          font-size: 26px;
          font-weight: 900;
        }
        .artist {
          margin-top: 15px;
          font-size: 15px;
          color: #849898;
        }
      }

      .like-and-add {
        position: absolute;
        top: 20px;
        right: 0;
        color: #868686;

        .like {
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            color: #3d3d3f;
          }
        }

        .add-play-list {
          cursor: pointer;
          &:hover {
            color: #3d3d3f;
          }
        }
      }
    }
    .only-members {
      padding: 10px 0 50px 0;
      font-size: 22px;
      font-weight: 700;
    }
  }
`;