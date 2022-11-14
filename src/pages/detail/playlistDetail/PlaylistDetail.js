import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fade } from "react-reveal";
import { BsFillPlayFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiFolderAddLine } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import Loading from "../../../components/Loading";
import DetailList from "./DetailList";
import styled from "styled-components";





const PlaylistDetail = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
}) => {
  const params = useParams();
  const playlistId = params.playlistId;

  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [playlistSong, setPlaylistSong] = useState([]);
  const [isMyPlayListClicked, setIsMyPlayListClicked] = useState(false);
  const [isSelectClicked, setIsSelectClicked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://3.34.53.252:8000/detail/playlist/${playlistId}`)
      .then((res) => res.json())

      .then((data) => {
        setLoading(true);
        setPlaylistInfo(data.playlistInfo[0]);
        setPlaylistSong(data.playlistSongs);
      });
    setIsSelectClicked(false);
  }, [playlistId]);

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
                <h2 className="hidden"> 컨텐츠 상세보기</h2>
                <div className="playlist-detail-cover">
                  <img
                    alt="앨범 표지"
                    className="playlist-detail-cover-img"
                    src={playlistInfo.albumImage}
                  />
                  <button
                    title="앨범 듣기"
                    className="playlist-detail-play hover"
                    onClick={() => {
                      if (playlistSong[0].songTitle !== null) {
                        fetch(
                          `http://3.34.53.252:8000/play/addsongs/playlist/${params.playlistId}`,
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
                          .catch((err) => {
                            if (sessionStorage.getItem("token") !== null)
                              setAlertOn(
                                "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                              );
                          });
                      }
                    }}
                  >
                    <BsFillPlayFill className="playlist-detail-play-icon" />
                  </button>
                </div>
              </div>
              {/* 상세 페이지 앨범 제목 및 가수 */}
              <div className="playlist-detail-inner-box">
                <div className="playlist-detail-title">
                  {playlistInfo.playlistTitle}
                </div>
                <div className="playlist-detail-kind">
                  총 {playlistInfo.playlistSongsCount}곡
                </div>
                <div className="playlist-detail-date">
                  {playlistInfo.createdDate}
                </div>
                <div className="playlist-detail-icon">
                  <RiPlayListAddFill className="playlist-detail-icon-list hover" />
                  <RiFolderAddLine className="playlist-detail-icon-folder hover" />
                  <BsSuitHeart className="playlist-detail-icon-like hover" />
                </div>
              </div>
            </div>
            {/* 상세 페이지 탭 */}
            <div className="playlist-detail-page-tab">
              <button type="button" className="playlist-detail-page-song">
                곡
              </button>
            </div>
          </section>
          {/* 상세 페이지 상세정보와 수록곡 */}
          <DetailList
            playlistSong={playlistSong}
            setPlaylistSong={setPlaylistSong}
            musicTracks={musicTracks}
            setMusicTracks={setMusicTracks}
            setAlertOn={setAlertOn}
            isMyPlayListClicked={isMyPlayListClicked}
            setIsMyPlayListClicked={setIsMyPlayListClicked}
            isSelectClicked={isSelectClicked}
            setIsSelectClicked={setIsSelectClicked}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </StyledDetail>
      )}
    </Fade>
  );
};

export default PlaylistDetail;

const StyledDetail = styled.div`
  width: 100%;
  min-width: 765px;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  font-family: "NanumBarunGothic", sans-serif;

  /* a, button에 호버 주기 */
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

    div.playlist-detail-wrap {
      width: 1100px;
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

      &:hover {
        cursor: pointer;
        color: #3f3fff;
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
