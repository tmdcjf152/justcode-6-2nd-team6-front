import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiFolderAddLine } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import styled from "styled-components";



const SongDetail = ({ musicTracks, setMusicTracks, setAlertOn }) => {
  const [songData, setSongData] = useState([]);
  const params = useParams();


  useEffect(() => {
    fetch(`http://3.34.53.252:8000/detail/track/${params.songId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setSongData(data[0]);

      });
  }, []);
  return (
    <StyledSong>
      <section className="album-detail-inner-box">
        <div className="album-detail-wrap">
          <div className="album-detail-inner">
            <h2 className="hidden"> 컨텐츠 상세보기</h2>
            <div className="album-detail-cover">
              <img
                alt="앨범 표지"
                className="album-detail-cover-img"
                src={songData.albumCover}
              />
              <button
                title="앨범 듣기"
                className="album-detail-play hover"
                onClick={() => {
                  if (songData.songTitle !== null) {
                    fetch(
                      `http://3.34.53.252:8000/play/addsongs/song/${params.songId}`,
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
                <BsFillPlayFill className="album-detail-play-icon" />
              </button>
            </div>
          </div>
          {/* 상세 페이지 앨범 제목 및 가수 */}
          <div className="album-detail-inner-box">
            <div className="album-detail-title">{songData.songTitle}</div>
            <Link
              to={`/detail/artist/${songData.artistId}/songs`}
              className="album-detail-singer"
            >
              <span className="hover">{songData.songArtist}</span>
              <img
                alt="아티스트"
                className="album-detail-icon-next"
                src="/Images/next.png"
              />
            </Link>
            <Link
              to={`/detail/album/${songData.albumId}/details`}
              className="album-name"
            >
              <span className="hover">{songData.albumTitle}</span>
              <img
                alt="앨범"
                className="album-icon-next"
                src="/Images/next.png"
              />
            </Link>
            <div className="album-detail-icon">
              <RiPlayListAddFill className="album-detail-icon-list hover" />
              <RiFolderAddLine className="album-detail-icon-folder hover" />
              <BsSuitHeart className="album-detail-icon-like hover" />
              <AiOutlineStop className="album-detail-icon-dislike hover" />
            </div>
          </div>
        </div>
      </section>
      <div className="detail-info-inner-box">
        {/* 상세 페이지 탭 */}
        <div className="album-detail-page-tab">
          <div className="focus-on">상세정보</div>
        </div>
        <div className="detail-info-wrap">
          <ul className="detail-info-list-box">
            <li className="detail-info-list">
              <span className="detail-info-album-name">곡명</span>
              <span className="stick" />
              <span className="detail-info-album-singer">
                {songData.songTitle}
              </span>
            </li>
            <li className="detail-info-list">
              <span className="detail-info-album-name">작곡</span>
              <span className="stick" />
              <span className="detail-info-album-singer">
                {songData.musicBy}
              </span>
            </li>
            <li className="detail-info-list">
              <span className="detail-info-album-name">작사</span>
              <span className="stick" />
              <span className="detail-info-album-singer">
                {songData.lyricsBy}
              </span>
            </li>
            <li className="detail-info-list">
              <span className="detail-info-album-name">편곡</span>
              <span className="stick" />
              <span className="detail-info-album-singer">
                {songData.musicBy}
              </span>
            </li>
            <li className="lyrics">{songData.lyrics}</li>
          </ul>
        </div>
      </div>
    </StyledSong>
  );
};

export default SongDetail;

const StyledSong = styled.section`
  padding-top: 40px;
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
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 15px;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .album-detail-singer {
      display: block;
      font-size: 22px;
      margin-bottom: 15px;
      color: #444444;

      img.album-detail-icon-next {
        width: 12px;
        height: 12px;
        padding-left: 3px;
      }
    }

    .album-name {
      display: block;
      margin-bottom: 35px;
      font-size: 18px;
      color: #9aa0a7;

      img.album-icon-next {
        width: 12px;
        height: 12px;
        padding-left: 3px;
        color: #9aa0a7;
      }
    }

    .album-detail-icon-list,
    .album-detail-icon-like {
      width: 22px;
      height: 22px;
      color: #9aa0a7;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .album-detail-icon-dislike {
      width: 22px;
      height: 22px;
      color: #9aa0a7;
      margin-left: 20px;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .album-detail-icon-folder {
      width: 22px;
      height: 22px;
      margin: 0 20px;
      color: #9aa0a7;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }
  }

  div.album-detail-page-tab {
    margin-top: 10px;
  }

  .focus-on {
    height: 35px;
    width: 100px;
    margin-bottom: 30px;
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

  .album-detail-page-tab-btn {
    font-family: "NanumBarunGothic", sans-serif;
    background: none;
    border: none;
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
  }

  div.detail-info-inner-box {
    padding-left: 40px;

    div.detail-info-wrap {
      overflow: hidden;
      white-space: pre-wrap;

      ul.detail-info-list-box {
        font-size: 18px;
        color: #3d3d3d;

        li.detail-info-list {
          padding: 15px 0;
        }

        span.detail-info-album-name {
          font-weight: 600;
        }

        span.stick {
          padding: 0 15px;
        }

        .lyrics {
          width: 250px;
          margin-top: 40px;
          line-height: 2;
        }
      }
    }
  }
`;