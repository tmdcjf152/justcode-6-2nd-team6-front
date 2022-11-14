import React, { useState, useEffect, useRef } from "react";
import { Fade } from "react-reveal";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MylistTrack from "./MylistTrack";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import axios from "axios";
import Loading from "../../../components/Loading";



const MylistDetail = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
  isExpandedClicked,
}) => {
  const params = useParams();
  const [playlistInfo, setPlaylistInfo] = useState({
    playlistId: 0,
    characterId: 0,
    playlistTitle: "제목",
    playlistSongsCount: 0,
    createdDate: "--",
    songId: 0,
    albumImage: "/Images/nothing.png",
  });
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isTitleEditClicked, setIsTitleEditClicked] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [isMyPlayListClicked, setIsMyPlayListClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isTitleEditClicked !== false) inputRef.current.focus();
  }, [isTitleEditClicked]);

  useEffect(() => {
    fetch(`http://3.34.53.252:8000/detail/mylist/${params.id}`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setPlaylistInfo(data.playlistInfo[0]);
        setPlaylistSongs(data.playlistSongs);
        setTitleValue(data.playlistInfo[0].playlistTitle);
      });
  }, [isEditClicked, isExpandedClicked, isSended]);

  return (
    <Fade>
      {!loading ? (
        <Loading />
      ) : (
        <StyledDetail>
          <section className="playlist-detail-inner-box">
            {/* 상세 페이지 썸네일 */}
            <div className="playlist-detail-wrap">
              <div className="playlist-detail-inner">
                <div className="playlist-detail-cover">
                  <img
                    alt="앨범 표지"
                    className="playlist-detail-cover-img"
                    src={
                      playlistInfo.albumImage == null
                        ? "/Images/nothing.png"
                        : playlistInfo.albumImage
                    }
                  />
                  <button
                    title="앨범 듣기"
                    className="playlist-detail-play hover"
                  >
                    <BsFillPlayFill
                      className="playlist-detail-play-icon"
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
                              const musicTracksId = musicTracks.map(
                                (el) => el.songId
                              );
                              const filteredNewTracks = plData.filter(
                                (el, i) =>
                                  musicTracksId.includes(el.songId) === false
                              );
                              setMusicTracks([
                                ...filteredNewTracks,
                                ...musicTracks,
                              ]);
                              setAlertOn(
                                "현재 재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                              );
                            })
                            .catch(() => {
                              if (sessionStorage.getItem("token") !== null)
                                setAlertOn(
                                  "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                                );
                            });
                        }
                      }}
                    />
                  </button>
                </div>
              </div>
              {/* 상세 페이지 앨범 제목 및 가수 */}
              <div className="playlist-detail-inner-box">
                {isTitleEditClicked ? (
                  <div className="title-edit-box">
                    <input
                      type="text"
                      className="input"
                      placeholder="내 리스트 이름을 입력해주세요"
                      value={titleValue}
                      ref={inputRef}
                      maxLength="16"
                      onChange={(e) => {
                        setTitleValue(e.target.value);
                      }}
                    />
                    <div className="cancel-and-confirm">
                      <div
                        className="cancel"
                        onClick={() => setIsTitleEditClicked(false)}
                      >
                        취소
                      </div>
                      <div
                        className="confirm"
                        onClick={() => {
                          if (titleValue.length !== 0) {
                            axios({
                              url: `http://3.34.53.252:8000/detail/mylist/${params.id}
                        `,
                              method: "PATCH",
                              headers: {
                                Authorization: sessionStorage.getItem("token"),
                              },
                              data: {
                                newTitle: titleValue,
                              },
                            }).then((res) => {
                              setIsSended(!isSended);
                              setIsTitleEditClicked(false);
                            });
                          }
                        }}
                      >
                        확인
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="playlist-detail-title flex-center">
                    {playlistInfo.playlistTitle}
                    <HiPencil
                      className="pencil hover"
                      onClick={() => setIsTitleEditClicked(true)}
                    />
                  </div>
                )}
                <div className="playlist-detail-kind">
                  총{" "}
                  {playlistInfo.playlistSongsCount === null
                    ? 0
                    : playlistInfo.playlistSongsCount}
                  곡
                </div>
                <div className="playlist-detail-date">
                  {playlistInfo.createdDate}
                </div>
              </div>
            </div>
            {/* 상세 페이지 상세정보와 수록곡 */}
          </section>
          <MylistTrack
            playlistSongs={playlistSongs}
            setPlaylistSongs={setPlaylistSongs}
            musicTracks={musicTracks}
            setMusicTracks={setMusicTracks}
            setAlertOn={setAlertOn}
            isMyPlayListClicked={isMyPlayListClicked}
            setIsMyPlayListClicked={setIsMyPlayListClicked}
            isEditClicked={isEditClicked}
            setIsEditClicked={setIsEditClicked}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </StyledDetail>
      )}
    </Fade>
  );
};

export default MylistDetail;

const StyledDetail = styled.div`
  width: 100%;
  min-width: 765px;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  font-family: "NanumBarunGothic", sans-serif;

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hover {
    &:hover {
      color: #3f3fff;
      cursor: pointer;
    }
  }

  section.playlist-detail-inner-box {
    height: 100%;
    padding: 95px 80px 40px;
    background-color: #fff;

    .title-edit-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding-bottom: 30px;
      border-bottom: 1px solid #f2f2f2;

      .input {
        width: 700px;
        padding: 15px 0;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1.5px solid black;
        font-family: "NanumBarunGothic", sans-serif;
        font-size: 30px;
        font-weight: 700;

        &:focus {
          outline: none;
        }
      }

      .cancel-and-confirm {
        display: flex;
        font-size: 18px;
        font-weight: 700;

        .cancel {
          margin: 0 10px;
          cursor: pointer;
        }

        .confirm {
          margin-right: 10px;

          color: #3f3fff;
          cursor: pointer;
        }
      }
    }

    div.playlist-detail-wrap {
      display: flex;
      flex-direction: row;
      padding-top: 40px;
    }
  }

  /* 앨범 트랙 커버 이미지*/
  div.playlist-detail-inner {
    position: static;

    div.playlist-detail-cover {
      position: relative;
      width: 240px;
      height: 240px;
      border-radius: 6px;
    }
  }

  img.playlist-detail-cover-img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: auto;
    border-radius: 6px;

    &:hover {
      filter: brightness(70%);
    }
  }

  button.playlist-detail-play {
    width: 55px;
    height: 55px;
    z-index: auto;
    position: absolute;
    bottom: 6px;
    right: 1px;
    padding: 0;
    border: none;
    background: none;
    color: white;

    .playlist-detail-play-icon {
      width: 100%;
      height: 100%;
    }
  }

  div.playlist-detail-inner-box {
    margin: auto 30px;

    div.playlist-detail-title {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 30px;

      .pencil {
        margin-left: 10px;
      }
    }

    div.playlist-detail-singer {
      font-size: 20px;
      margin-bottom: 40px;
      color: #444444;

      img.playlist-detail-icon-next {
        width: 12px;
        height: 12px;
        padding-left: 3px;
      }
    }

    div.playlist-detail-kind {
      font-size: 16px;
      margin-bottom: 12px;
    }

    div.playlist-detail-date {
      font-size: 16px;
      margin-bottom: 40px;
      color: #969ca7;
    }

    .playlist-detail-icon-list,
    .playlist-detail-icon-like {
      width: 25px;
      height: 25px;
      color: #3d3d3d;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .playlist-detail-icon-folder {
      width: 25px;
      height: 25px;
      margin: 0 20px;
      color: #3d3d3d;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }
  }

  div.playlist-detail-page-tab {
    margin-top: 50px;
  }

  ul.playlist-detail-page-tab-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .focus-on {
      height: 35px;
      width: 100px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #3f3fff;
      border: none;
      border-radius: 100px;
      font-size: 17px;
      cursor: pointer;
    }

    .focus-off {
      height: 35px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      background-color: none;
      border: none;
      border-radius: 100px;
      font-size: 17px;
      cursor: pointer;
    }
  }

  li.playlist-detail-page-tab-stick {
    margin: 0 10px;
  }

  button.playlist-detail-page-song {
    height: 30px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #3f3fff;
    border: none;
    border-radius: 100px;
    font-size: 17px;
    cursor: pointer;
  }
`;