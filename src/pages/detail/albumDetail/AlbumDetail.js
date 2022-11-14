import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-reveal";
import { BsFillPlayFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiFolderAddLine } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import Loading from "../../../components/Loading";
import DetailInfo from "./DetailInfo";
import DetailTrack from "./DetailTrack";
import styled from "styled-components";



const AlbumDetail = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
}) => {
  const [isMyPlayListClicked, setIsMyPlayListClicked] = useState(false);
  const [isSelectClicked, setIsSelectClicked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [albumInfo, setAlbumInfo] = useState([]);
  const params = useParams();
  const albumId = params.albumId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://13.125.174.118:8000/detail/album/${albumId}/details`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setAlbumInfo(data[0]);
      });
  }, [albumId]);

  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };

  const tabArr = [
    {
      name: "상세정보",
      content: <DetailInfo albumInfo={albumInfo} />,
    },
    {
      name: "수록곡",
      content: (
        <DetailTrack
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
      ),
    },
  ];

  return (
    <Fade>
      {!loading ? (
        <Loading />
      ) : (
        <StyledDetail>
          <section className="album-detail-inner-box">
            {/* 상세 페이지 썸네일 */}
            <div className="album-detail-wrap">
              <div className="album-detail-inner">
                <h2 className="hidden"> 컨텐츠 상세보기</h2>
                <div className="album-detail-cover">
                  <img
                    alt="앨범 표지"
                    className="album-detail-cover-img"
                    src={albumInfo.albumImage}
                  />
                  <button
                    title="앨범 듣기"
                    className="album-detail-play hover"
                    onClick={() => {
                      fetch(
                        `http://3.34.53.252:8000/play/addsongs/albumtrack/${params.albumId}`,
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
                    }}
                  >
                    <BsFillPlayFill className="album-detail-play-icon" />
                  </button>
                </div>
              </div>
              {/* 상세 페이지 앨범 제목 및 가수 */}
              <div className="album-detail-inner-box">
                <div className="album-detail-title">{albumInfo.albumTitle}</div>
                <div className="album-detail-singer">
                  <span className="hover">{albumInfo.artist}</span>
                  <img
                    alt="아티스트"
                    className="album-detail-icon-next"
                    src="/Images/next.png"
                  />
                </div>
                <div className="album-detail-kind">{albumInfo.albumType}</div>
                <div className="album-detail-date">
                  {albumInfo.albumReleaseDate}
                </div>
                <div className="album-detail-icon">
                  <RiPlayListAddFill className="album-detail-icon-list hover" />
                  <RiFolderAddLine className="album-detail-icon-folder hover" />
                  <BsSuitHeart className="album-detail-icon-like hover" />
                </div>
              </div>
            </div>
            {/* 상세 페이지 탭 */}
            <div className="album-detail-page-tab">
              <ul className="album-detail-page-tab-box">
                {tabArr.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        currentTab === index ? "focus-on" : "focus-off"
                      }
                      onClick={() => selectTabHandler(index)}
                    >
                      {el.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          {/* 상세 페이지 상세정보와 수록곡 */}
          <div>{tabArr[currentTab].content}</div>
        </StyledDetail>
      )}
    </Fade>
  );
};

export default AlbumDetail;

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

  section.album-detail-inner-box {
    height: 100%;
    padding: 95px 80px 40px;
    background-color: #fff;

    div.album-detail-wrap {
      width: 600px;
      display: flex;
      flex-direction: row;
      padding-top: 40px;
    }
  }

  /* 앨범 트랙 커버 이미지*/
  div.album-detail-inner {
    position: static;

    div.album-detail-cover {
      position: relative;
      width: 240px;
      height: 240px;
      border-radius: 6px;
    }
  }

  img.album-detail-cover-img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: auto;
    border-radius: 6px;

    &:hover {
      filter: brightness(70%);
    }
  }

  button.album-detail-play {
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

    .album-detail-play-icon {
      width: 100%;
      height: 100%;
    }
  }

  div.album-detail-inner-box {
    margin: auto 30px;

    div.album-detail-title {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 25px;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    div.album-detail-singer {
      font-size: 20px;
      margin-bottom: 35px;
      color: #444444;

      img.album-detail-icon-next {
        width: 12px;
        height: 12px;
        padding-left: 3px;
      }
    }

    div.album-detail-kind {
      font-size: 15px;
      margin-bottom: 10px;
    }

    div.album-detail-date {
      font-size: 15px;
      margin-bottom: 20px;
      color: #969ca7;
    }

    .album-detail-icon-list,
    .album-detail-icon-like {
      width: 25px;
      height: 25px;
      color: #3d3d3d;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .album-detail-icon-folder {
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

  div.album-detail-page-tab {
    margin-top: 50px;
  }

  ul.album-detail-page-tab-box {
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

  li.album-detail-page-tab-stick {
    margin: 0 10px;
  }

  .album-detail-page-tab-btn {
    font-family: "NanumBarunGothic", sans-serif;
    background: none;
    border: none;
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
  }
`;