import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPlay } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineMore, AiOutlineCheck } from "react-icons/ai";
import { VscNewFolder, VscTrash } from "react-icons/vsc";
import { BiMicrophone } from "react-icons/bi";
import { IoDiscOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMusic } from "react-icons/fi";
import MyPlayList from "../../../components/playbar/MyPlayList";
import styled from "styled-components";





const MylistTrack = ({
  playlistSongs,
  setPlaylistSongs,
  musicTracks,
  setMusicTracks,
  setIsLiked,
  setAlertOn,
  isMyPlayListClicked,
  setIsMyPlayListClicked,
  isEditClicked,
  setIsEditClicked,
  checkedList,
  setCheckedList,
}) => {
  const params = useParams();
  const [isMoreMenuClicked, setIsMoreMenuClicked] = useState(false);
  const [isGetMyPlayListClicked, setIsGetMyPlayListClicked] = useState(false); // 오류 안뜨게하는 용도

  const onCheckedElement = (checked, item) => {
    if (checked === false) {
      setCheckedList([...checkedList, item]);
    } else if (checked === true) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }

  };

  return (
    <StyledTrack>
      <div className="mylist-track-inner-box">
        <div className="list-first-menu">
          <div
            className="play-all flex-center hover"
            onClick={() => {
              if (playlistSongs[0].songTitle !== null) {
                fetch(
                  `http://3.34.53.252:8000/play/addsongs/playlist/${params.id}`,
                  {
                    headers: {
                      Authorization: sessionStorage.getItem("token"),
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((plData) => {
                    const musicTracksId = musicTracks.map((el) => el.songId);
                    const filteredNewTracks = plData.filter(
                      (el, i) => musicTracksId.includes(el.songId) === false
                    );
                    setMusicTracks([...filteredNewTracks, ...musicTracks]);
                    setAlertOn(
                      "현재 재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                    );
                  })
                  .catch((err) => {
                    if (sessionStorage.getItem("token") !== null)
                      setAlertOn(
                        "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                      );
                  });
              }
            }}
          >
            <BsPlay size="18" />
            전체듣기
          </div>

          <p
            className="edit hover"
            onClick={() => {
              setIsEditClicked(!isEditClicked);
              setCheckedList([]);
            }}
          >
            {isEditClicked ? "완료" : "편집"}
          </p>
        </div>

        <div className="list-second-menu">
          <div className="song-info flex-center">
            <input
              name="전체 곡 선택하기"
              className="select-all-checkbox"
              type="checkbox"
              disabled={isEditClicked ? false : true}
              checked={
                playlistSongs.length === checkedList.length ? true : false
              }
              onClick={() => {
                if (checkedList.length < playlistSongs.length) {
                  setCheckedList(playlistSongs.map((el) => el.songId));
                } else setCheckedList([]);
              }}
            />
            <p className="song-album">곡/앨범</p>
            <p className="artist">아티스트</p>
          </div>
          {isEditClicked || (
            <div className="menu-box flex-center">
              <p className="menu flex-center">듣기</p>
              <p className="menu flex-center">내 리스트</p>
              <p className="menu flex-center">더보기</p>
            </div>
          )}
        </div>

        {playlistSongs.length === 0 || playlistSongs[0].songId === null || (
          <SongBar
            playlistSongs={playlistSongs}
            setPlaylistSongs={setPlaylistSongs}
            musicTracks={musicTracks}
            setMusicTracks={setMusicTracks}
            isEditClicked={isEditClicked}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            onCheckedElement={onCheckedElement}
            isMoreMenuClicked={isMoreMenuClicked}
            setIsMoreMenuClicked={setIsMoreMenuClicked}
            setIsLiked={setIsLiked}
            setIsMyPlayListClicked={setIsMyPlayListClicked}
            setAlertOn={setAlertOn}
          />
        )}

        {!isEditClicked || checkedList.length === 0 || (
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
                    fetch(
                      `http://3.34.53.252:8000/play/addsongs/playlist/${params.id}`,
                      {
                        headers: {
                          Authorization: sessionStorage.getItem("token"),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((plData) => {
                        const selectedPlData = plData.filter(
                          (el, i) => checkedList.includes(el.songId) === true
                        );
                        const musicTracksId = musicTracks.map(
                          (el) => el.songId
                        );
                        const filteredSelectedPlData = selectedPlData.filter(
                          (el, i) => musicTracksId.includes(el.songId) === false
                        );
                        setMusicTracks([
                          ...filteredSelectedPlData,
                          ...musicTracks,
                        ]);
                        setAlertOn(
                          "재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                        );
                        setCheckedList([]);
                      })
                      .catch((err) => {
                        if (sessionStorage.getItem("token") !== null)
                          setAlertOn(
                            "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                          );
                      });
                  }}
                >
                  <BsFillPlayFill className="icon" size="18" />
                  <div className="text">듣기</div>
                </div>
              </div>
              <div className="edit-box">
                <div
                  className="wrapper"
                  onClick={() => {
                    axios({
                      url: `http://3.34.53.252:8000/detail/mylist/${params.id}`,
                      method: "DELETE",
                      headers: {
                        Authorization: sessionStorage.getItem("token"),
                      },
                      data: {
                        songId: checkedList,
                      },
                    }).then((res) => {

                      setCheckedList([]);
                      setIsEditClicked(false);
                    });
                  }}
                >
                  <VscTrash className="icon" />
                  <div className="text">삭제</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <MyPlayList
          isMyPlayListClicked={isMyPlayListClicked}
          setIsMyPlayListClicked={setIsMyPlayListClicked}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          setIsGetMyPlayListClicked={setIsGetMyPlayListClicked}
          setAlertOn={setAlertOn}
        />
      </div>
    </StyledTrack>
  );
};

const SongBar = ({
  playlistSongs,
  setPlaylistSongs,
  musicTracks,
  setMusicTracks,
  isEditClicked,
  checkedList,
  setCheckedList,
  onCheckedElement,
  isMoreMenuClicked,
  setIsMoreMenuClicked,
  setIsLiked,
  setIsMyPlayListClicked,
  setAlertOn,
}) => {
  const musicTracksId = musicTracks.map((el) => el.songId);
  const navigate = useNavigate();
  return playlistSongs.map((el, i) => {
    const songPlay = () => {
      fetch(`http://3.34.53.252:8000/play/addsongs/song/${el.songId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "Need Voucher")
            setAlertOn(
              "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
            );
          else if (data !== "Error: Invaild Access") {
            const song = data[0];
            if (musicTracksId.includes(song.songId) === false) {
              setMusicTracks([song, ...musicTracks]);
              setAlertOn("현재 재생목록에 추가되었습니다.");
            } else setAlertOn("이미 현재 재생목록에 있는 곡입니다.");
          }
        });
    };

    return (
      <div key={el.songId} className="song-bar flex-center">
        <div
          className="song-info flex-center"
          onClick={() => {
            if (isEditClicked === true)
              onCheckedElement(checkedList.includes(el.songId), el.songId);
          }}
        >
          <input
            name="곡 선택하기"
            className="checkbox"
            type="checkbox"
            disabled={isEditClicked ? false : true}
            checked={
              checkedList.includes(el.songId) && isEditClicked ? true : false
            }
            onChange={() => {
              onCheckedElement(checkedList.includes(el.songId), el.songId);
            }}
          />
          <div className="album-n-title">
            <img src={el.albumImage} alt="앨범커버" className="album-cover" />
            <div className="wrapper">
              <p
                className="title hover"
                onClick={() => {
                  if (isEditClicked === false) songPlay();
                }}
              >
                {el.songTitle}
              </p>
              <Link
                to={`/detail/album/${el.albumId}/details`}
                className="album-title"
              >
                {el.albumTitle}
              </Link>
            </div>
          </div>
          <Link
            to={`/detail/artist/${el.atsId}/songs`}
            className="artist hover"
          >
            {el.artist}
          </Link>
        </div>
        {isEditClicked || (
          <div className="menu-box flex-center">
            <div className="menu flex-center hover" onClick={() => songPlay()}>
              <BsFillPlayFill size="30" />
            </div>
            <div
              className="menu flex-center hover"
              onClick={() => {
                setCheckedList([el.songId]);
                setIsMyPlayListClicked(true);
              }}
            >
              <VscNewFolder size="25" />
            </div>
            <div
              className="menu flex-center hover"
              onClick={() => {
                setCheckedList([el.songId]);
                if (el.songId === checkedList[0])
                  setIsMoreMenuClicked(!isMoreMenuClicked);
                else setIsMoreMenuClicked(true);
              }}
            >
              <AiOutlineMore size="30" />
            </div>
            {el.songId !== checkedList[0] || !isMoreMenuClicked || (
              <div className="more-menu-list">
                <div
                  className="more-menu"
                  onClick={() => {
                    navigate(`/detail/album/${el.albumId}/details`);
                  }}
                >
                  <FiMusic className="icon" />곡 정보
                </div>
                <div
                  className="more-menu"
                  onClick={() => {
                    navigate(`/detail/album/${el.albumId}/details`);
                  }}
                >
                  <IoDiscOutline className="icon" />
                  앨범 정보
                </div>
                <div
                  className="more-menu"
                  onClick={() => {
                    navigate(`/detail/artist/${el.atsId}/songs`);
                  }}
                >
                  <BiMicrophone className="icon" />
                  아티스트 정보
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  });
};

export default MylistTrack;

const StyledTrack = styled.div`
  padding-top: 40px;

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hover {
    cursor: pointer;
    &:hover {
      color: #3f3fff;
    }
  }

  .mylist-track-inner-box {
    margin-bottom: 40px;
    .list-first-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 35px;
      font-size: 14px;

      .play-all {
        margin-left: 10px;
      }

      .edit {
        margin-right: 10px;
      }
    }

    .list-second-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid #ebebeb;
      border-bottom: 2px solid #ebebeb;
      color: #a0a0a0;
      font-size: 14px;

      .song-info {
        .select-all-checkbox {
          margin: 12.5px 35px 12.5px 12.5px;
        }
        .song-album {
          width: 600px;
        }
        .artist {
          width: auto;
        }
      }
      .menu-box {
        .menu {
          width: 75px;
        }
      }
    }

    .song-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebebeb;

      .song-info {
        .checkbox {
          margin: 12.5px 35px 12.5px 12.5px;
        }
        .album-n-title {
          display: flex;
          align-items: center;
          width: 600px;
          cursor: pointer;

          .album-cover {
            width: 60px;
            border-radius: 3px;
            margin: 10px 20px 10px 0;
            cursor: pointer;
          }

          .wrapper {
            .title {
              margin-bottom: 10px;
            }
            .album-title {
              color: #969696;
              font-size: 14px;
            }
          }
        }
        .artist {
          width: auto;
          color: black;
        }
      }

      .menu-box {
        position: relative;
        .menu {
          width: 75px;
        }

        .more-menu-list {
          position: absolute;
          right: 0;
          top: 35px;
          padding: 10px 0;
          border-radius: 3px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
          background-color: white;
          z-index: 1;
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
    }

    .edit-container {
      display: flex;
      position: fixed;
      bottom: 200px;
      right: calc(50% - 150px);
      width: 300px;
      border-radius: 5px;
      background-color: #3f3fff;
      color: white;

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