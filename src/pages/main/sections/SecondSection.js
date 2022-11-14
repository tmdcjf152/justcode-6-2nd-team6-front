import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";



const SecondSection = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
  albumList,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };

  const countryArr = [
    { name: "종합", content: albumList.slice(0, 10) },
    {
      name: "국내",
      content: albumList.filter((country) => country.scope.includes("국내")),
    },
    {
      name: "해외",
      content: albumList.filter((country) => country.scope.includes("해외")),
    },
  ];

  return (
    <StyledSection>
      <section className="second-section-inner-box">
        {/*오늘 발매 음악 정보 */}
        <div className="second-section-info-box">
          {/*오늘 발매 음악 제목 */}
          <div className="second-section-title-box">
            <h3 className="second-section-title">
              <Link to="/detail" className="second-section-title-link">
                <span className="second-section-today-music">
                  최신 발매 음악
                </span>
                <img
                  alt="오늘 발매 음악"
                  className="second-section-today-music-icon"
                  src="/Images/next.png"
                />
              </Link>
            </h3>
          </div>
          {/*오늘 발매 음악 장르 */}
          <div className="second-section-genre">
            <ul className="second-section-genre-title">
              {countryArr.map((el, index) => {
                return (
                  <li
                    key={index}
                    className={currentTab === index ? "on" : "off"}
                    onClick={() => selectTabHandler(index)}
                  >
                    {el.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/*최신 발매 음악 정보 끝 */}
        <div className="second-section-album-inner-box">
          <div className="second-section-album-wrap">
            {/*앨범리스트*/}
            {countryArr[currentTab].content.map((el) => {
              return (
                <div key={el.albumId} className="second-section-album-box">
                  <div className="second-section-album-list">
                    <Link
                      to={`/detail/album/${el.albumId}/details`}
                      className="second-section-album-link"
                    >
                      <div className="second-section-album-img-box">
                        <img
                          alt="앨범 표지"
                          className="second-section-album-cover"
                          src={el.albumCover}
                        />
                      </div>
                    </Link>
                    <button
                      alt="플레이 버튼"
                      className="second-section-play-button"
                      type="button"
                      onClick={() => {
                        fetch(
                          `http://13.125.174.118:8000/play/addsongs/albumtrack/${el.albumId}`,
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
                      <BsFillPlayFill className="second-section-play-button-icon" />
                    </button>
                  </div>
                  <Link
                    to={`/detail/album/${el.albumId}/details`}
                    className="second-section-album-song-link"
                  >
                    <span className="second-section-song">{el.albumTitle}</span>
                  </Link>
                  <Link
                    to={`/detail/artist/${el.artistId}/songs`}
                    className="second-section-album-singer-link"
                  >
                    <span className="second-section-album-singer">
                      {el.artist}
                    </span>
                  </Link>
                </div>
              );
            })}
            {/*앨범리스트 끝*/}
          </div>
        </div>
      </section>
    </StyledSection>
  );
};

export default SecondSection;

const StyledSection = styled.section`
  width: 100%;
  margin: 50px auto;
  display: block;
  font-family: "NanumBarunGothic", sans-serif;

  section.second-section-inner-box {
    div.second-section-info-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    div.second-section-genre {
      width: 130px;
    }
    ul.second-section-genre-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      li.on {
        font-size: large;
        font-weight: 550;
        cursor: pointer;
        color: #3f3fff;
      }

      li.off {
        font-size: large;
        font-weight: 550;

        &:hover {
          cursor: pointer;
          color: #3f3fff;
        }
      }
    }

    /* 발매 음악 앨범 리스트 */
    div.second-section-album-inner-box {
      width: 1080px;
      margin: 30px 0;

      div.second-section-info-box {
      }
    }

    /* 발매 음악 앨범 타이틀 */
    div.second-section-title-box {
      width: 200px;

      h3.second-section-title {
        width: 100%;
        display: inline-block;
        font-size: 26px;
      }

      a.second-section-title-link {
        font-weight: 600;
        color: black;

        &:hover {
          cursor: pointer;
          color: #3f3fff;
        }
      }

      .second-section-today-music-icon {
        width: 26px;
        height: 24px;
        margin-bottom: 2px;
        margin-left: 8px;
        text-indent: 100%;
        vertical-align: middle;
      }
    }

    /* 최신 발매 음악 앨범 리스트 */

    div.second-section-album-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    div.second-section-album-box {
      width: 192px;
      background-clip: content-box;
      margin-bottom: 20px;

      div.second-section-album-list {
        position: relative;
        margin-bottom: 10px;
      }

      /* 발매 음악 앨범 리스트 앨범 링크 */
      a.second-section-album-link {
        position: relative;
        z-index: auto;

        div.second-section-album-img-box {
          position: relative;
        }
      }

      img.second-section-album-cover {
        width: 192px;
        height: 192px;
        border-radius: 7px;
      }

      /* 발매 음악 앨범 리스트 재생 버튼 */
      button.second-section-play-button {
        position: absolute;
        z-index: auto;
        right: -5px;
        bottom: -1px;
        border: none;
        background: none;

        .second-section-play-button-icon {
          width: 55px;
          height: 55px;
          color: white;

          &:hover {
            cursor: pointer;
            color: #3f3fff;
          }
        }
      }
    }
    a.second-section-album-song-link {
      display: block;
      margin-bottom: 8px;
      margin-left: 5px;
      color: black;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    a.second-section-album-singer-link {
      color: #999999;
      margin-left: 5px;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }
  }
`;