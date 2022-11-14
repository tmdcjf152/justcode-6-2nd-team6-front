import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsPlay } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { VscNewFolder } from "react-icons/vsc";
import { AiOutlineMore, AiOutlineCheck } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { FiMusic } from "react-icons/fi";
import { IoDiscOutline } from "react-icons/io5";
import MyPlayList from "../../../components/playbar/MyPlayList";
import Loading from "../../../components/Loading";



const ArtistTrack = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
  isMyPlayListClicked,
  setIsMyPlayListClicked,
  isSelectClicked,
  setIsSelectClicked,
  checkedList,
  setCheckedList,
}) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const [sortType, setSortType] = useState([
    { id: 1, name: "최신순", selected: false },
    { id: 2, name: "인기순", selected: false },
    { id: 3, name: "가나다순", selected: false },
  ]);
  const [songsData, setSongsData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [isMoreMenuClicked, setIsMoreMenuClicked] = useState(false);
  const [isGetMyPlayListClicked, setIsGetMyPlayListClicked] = useState(false); // 오류 안뜨게하는 용도
  const musicTracksId = musicTracks.map((el) => el.songId);

  const onCheckedElement = (checked, item) => {
    if (checked === false) {
      setCheckedList([...checkedList, item]);
    } else if (checked === true) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }

  };

  const sortHandler = (e) => {
    const arr = sortType.map((data) => {
      return data.id === Number(e.target.type)
        ? { id: data.id, name: data.name, selected: true }
        : { id: data.id, name: data.name, selected: false };
    });
    setSortType(arr);

    const selectedName = arr.filter((result) => {
      return result.selected;
    })[0].name;
    const newArr = songsData.filter((data) => {
      return !data.includes("sortType=");
    });

    if (selectedName == "최신순") {
      setSongsData(() => [...newArr, "sortType=RECENT"]);
    } else if (selectedName == "인기순") {
      return setSongsData(() => [...newArr, "sortType=POPULARITY"]);
    } else if (selectedName == "가나다순") {
      return setSongsData(() => [...newArr, "sortType=WORD"]);
    }
  };




  useEffect(() => {
    const queryString =
      songsData.length == 0
        ? "?sortType=WORD&roleType=ALL"
        : "?" + songsData.join("&");

    fetch(
      `http://13.125.174.118:8000/detail/artist/${params.artistId}/songs${queryString}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setTrackData(data.artistSongs);
      });
  }, [songsData]);

  return !loading ? (
    <Loading />
  ) : (
    <StyledTrack>
      <div className="artist-track-inner-box">
        <div className="artist-track-whole-box">
          <button
            className="artist-track-whole-play-btn"
            type="button"
            onClick={() => {
              if (trackData[0].songTitle !== null) {
                fetch(
                  `http://3.34.53.252:8000/play/addsongs/artist/${trackData[0].songId}`,
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
            <BsPlay className="artist-track-whole-icon" />
            <span className="artist-track-whole-play">전체듣기</span>
          </button>
          <div className="artist-track-head-wrap">
            <span className="artist-track-stick" />

          </div>
        </div>
        {/* 수록곡 정보 */}
        <div className="artist-track-list-box">
          <p
            className="edit hover"
            onClick={() => {
              setIsSelectClicked(!isSelectClicked);
              setCheckedList([]);
            }}
          >
            {isSelectClicked ? "완료" : "선택"}
          </p>
          <table className="artist-track-list-table">
            <caption>곡 목록</caption>
            <colgroup>
              <col width="42" data-cell="체크박스" />
              <col width="*" data-cell="곡/앨범" />
              <col width="250" data-cell="아티스트" />
              <col width="70" data-cell="듣기" />
              <col width="75" data-cell="재생목록" />
              <col width="70" data-cell="더보기" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <input
                    name="전체 곡 선택하기"
                    className="artist-track-list-all-checkbox"
                    type="checkbox"
                    disabled={isSelectClicked ? false : true}
                    checked={
                      trackData.length === checkedList.length ? true : false
                    }
                    onClick={() => {
                      if (checkedList.length < trackData.length) {
                        setCheckedList(trackData.map((el) => el.songId));
                      } else setCheckedList([]);
                    }}
                  />
                </th>
                <th scope="col" className="artist-track-list-info">
                  곡/앨범
                </th>
                <th scope="col" className="artist-track-list-artist">
                  아티스트
                </th>
                <th scope="col" className="artist-track-list-icon">
                  {" "}
                  듣기{" "}
                </th>
                <th scope="col" className="artist-track-list-icon">
                  {" "}
                  내 리스트{" "}
                </th>
                <th scope="col" className="artist-track-list-icon">
                  {" "}
                  더보기{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {trackData.map((el) => {
                const songPlay = () => {
                  fetch(
                    `http://3.34.53.252:8000/play/addsongs/song/${el.songId}`,
                    {
                      headers: {
                        Authorization: sessionStorage.getItem("token"),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((el) => {
                      if (el.message == "Need Voucher")
                        setAlertOn(
                          "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                        );
                      else if (el !== "Error: Invaild Access") {

                        const song = el[0];
                        if (musicTracksId.includes(song.songId) === false) {
                          setMusicTracks([song, ...musicTracks]);
                          setAlertOn("현재 재생목록에 추가되었습니다.");
                        } else
                          setAlertOn("이미 현재 재생목록에 있는 곡입니다.");
                      }
                    });
                };
                return (
                  <tr key={el.songId}>
                    <td
                      className="artist-track-list-select"
                      onClick={() => {
                        if (isSelectClicked === true)
                          onCheckedElement(
                            checkedList.includes(el.songId),
                            el.songId
                          );
                      }}
                    >
                      <input
                        name="곡 선택하기"
                        className="artist-track-list-checkbox"
                        type="checkbox"
                        disabled={isSelectClicked ? false : true}
                        checked={
                          checkedList.includes(el.songId) && isSelectClicked
                            ? true
                            : false
                        }
                        onChange={() => {
                          onCheckedElement(
                            checkedList.includes(el.songId),
                            el.songId
                          );
                        }}
                      />
                    </td>
                    {/* 수록곡 곡/앨범 */}
                    <td className="artist-track-list-info-wrap">
                      <div className="artist-track-list-info-box">
                        <div className="artist-track-list-info-thumb">
                          <Link
                            to={`/detail/album/${el.albumId}/details`}
                            className="artist-track-list-info-album"
                          >
                            <img
                              alt="앨범 이미지"
                              src={el.albumImage}
                              className="artist-track-list-info-img"
                            />
                          </Link>
                        </div>
                        <div className="artist-track-list-info-txt-area">
                          <div
                            className="artist-track-list-song"
                            onClick={() => {
                              if (isSelectClicked === false) songPlay();
                            }}
                          >
                            {" "}
                            {el.songTitle}{" "}
                          </div>
                          <div className="artist-track-list-album-box">
                            <Link
                              to={`/detail/album/${el.albumId}/details`}
                              className="artist-track-list-album-link"
                            >
                              <div className="artist-track-list-album">
                                {" "}
                                {el.albumTitle}{" "}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* 수록곡 아티스트 */}
                    <td className="artist-track-list-artist-box">
                      <Link to="#" className="artist-track-list-artist">
                        <span className="artist-track-artist">
                          {el.artistName}
                        </span>
                      </Link>
                    </td>
                    {/* 수록곡 아이콘 */}
                    {isSelectClicked || (
                      <>
                        <td className="artist-track-list-icon">
                          <button
                            type="button"
                            className="artist-track-icon-listen"
                            onClick={() => songPlay()}
                          >
                            <BsFillPlayFill className="artist-track-icon-listen-icon" />
                          </button>
                        </td>
                        <td className="artist-track-list-icon">
                          <button
                            type="button"
                            className="artist-track-icon-listen"
                            onClick={() => {
                              setCheckedList([el.songId]);
                              setIsMyPlayListClicked(true);
                            }}
                          >
                            <VscNewFolder className="artist-track-icon-listen-icon" />
                          </button>
                        </td>
                        <td className="artist-track-list-icon">
                          <button
                            type="button"
                            className="artist-track-icon-listen"
                            onClick={() => {
                              setCheckedList([el.songId]);
                              if (el.songId === checkedList[0])
                                setIsMoreMenuClicked(!isMoreMenuClicked);
                              else setIsMoreMenuClicked(true);
                            }}
                          >
                            <AiOutlineMore className="artist-track-icon-listen-icon" />
                          </button>
                          {el.songId !== checkedList[0] || !isMoreMenuClicked || (
                            <div className="more-menu-list">
                              <Link
                                className="more-menu"
                                to={`/detail/track/${el.songId}`}
                              >
                                <FiMusic className="icon" />곡 정보
                              </Link>
                              <Link
                                to={`/detail/album/${el.albumId}/details`}
                                className="more-menu"
                              >
                                <IoDiscOutline className="icon" />
                                앨범 정보
                              </Link>
                              <Link
                                to={`/detail/artist/${el.artistId}/songs`}
                                className="more-menu"
                              >
                                <BiMicrophone className="icon" />
                                아티스트 정보
                              </Link>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* 모달 창 */}
        {!isSelectClicked || checkedList.length === 0 || (
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
                      `http://3.34.53.252:8000/play/addsongs/artist/${trackData[0].songId}`,
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

export default ArtistTrack;

const StyledLi = styled.li`
  color: ${(props) => (props.selected ? "#3f3fff" : "black")};
`;

const StyledTrack = styled.div`
  div.artist-track-inner-box {
    div.artist-track-whole-box {
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    button.artist-track-whole-play-btn {
      display: flex;
      align-items: flex-end;
      background: none;
      border: none;

      &:hover {
        cursor: pointer;
        color: #3f3fff;
      }
    }

    .edit {
      margin-top: 40px;
      font-size: 14px;
    }

    .artist-track-whole-icon {
      width: 17px;
      height: 17px;
    }

    span.artist-track-whole-play {
      font-size: 14px;
    }

    div.artist-track-head-wrap {
      color: #333;
      display: flex;

      ul {
        display: flex;

        ${StyledLi} {
          margin-right: 15px;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: #3f3fff;
          }
        }
      }
    }

    span.artist-track-stick {
      position: relative;
      margin-right: 15px;

      ::after {
        position: absolute;
        top: 3px;
        left: 0;
        display: block;
        width: 1px;
        height: 8px;
        background-color: #dcdcdc;
        content: "";
      }
    }
  }

  table.artist-track-list-table {
    min-width: 100%;
    max-width: none;
    width: auto;
    border-collapse: collapse;
    table-layout: fixed;
    text-indent: initial;
    border-spacing: 2px;
    font-family: "NanumBarunGothic", sans-serif;

    caption {
      margin: 5px 0;
      color: transparent;
      text-indent: 100%;
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
    }

    thead {
      display: table-header-group;
      vertical-align: middle;
      border-color: inherit;
    }

    tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    th {
      height: 40px;
      display: table-cell;
      vertical-align: inherit;
      white-space: nowrap;
      text-align: left;
      color: #a0a0a0;
      font-size: 15px;
      font-weight: 500;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
    }

    th.artist-track-list-info {
      padding-left: 20px;
    }

    th.artist-track-list-icon {
      text-align: center;
    }

    tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
    }

    td {
      position: relative;
      height: 84px;
      border-bottom: 1px solid #f6f6f6;
      display: table-cell;
      vertical-align: inherit;
    }

    td.artist-track-list-number {
      text-align: center;
    }
    /* 수록곡의 곡/앨범 */
    td.artist-track-list-info-wrap {
      padding-left: 20px;
      text-align: left;
    }
    div.artist-track-list-info-box {
      position: relative;
      min-width: 210px;
      max-width: 520px;
      height: 60px;
      padding-right: 28px;
      padding-left: 80px;
    }

    div.artist-track-list-info-thumb {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;

      a.artist-track-list-info-album {
        position: relative;
        display: block;
        height: 100%;

        ::before {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          content: "";
        }

        img.artist-track-list-info-img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          vertical-align: top;
        }
      }
    }
    div.artist-track-list-info-txt-area {
      max-width: 440px;
      min-width: 130px;
    }
    div.artist-track-list-song {
      width: 100%;
      text-align: left;
      font-family: inherit;
      vertical-align: middle;
      padding-top: 12px;
      padding-bottom: 5px;
      font-size: 16px;
      color: #333;
      font-weight: 400;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div.artist-track-list-album-box {
      display: flex;
      align-items: center;

      a.artist-track-list-album-link {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }

      div.artist-track-list-album {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 6px;
        font-size: 15px;
        color: #969696;
        white-space: pre;
      }
    }
    /* 수록곡 아티스트 */
    td.artist-track-list-artist-box {
      position: relative;
      text-align: left;
      font-size: 15px;
      color: #333;

      a.artist-track-list-artist {
        position: relative;
        min-width: 100px;
        color: black;
      }

      span.artist-track-artist {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        white-space: nowrap;
        width: 196px;
        font-size: 15px;

        &:hover {
          cursor: pointer;
          color: #3f3fff;
        }
      }
    }
    /* 수록곡 듣기,내 리스트, 더보기 아이콘 */
    td.artist-track-list-icon {
      text-align: center;
    }

    button.artist-track-icon-listen {
      vertical-align: middle;
      background: none;
      border: none;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: #3f3fff;
      }

      .artist-track-icon-listen-icon {
        width: 28px;
        height: 28px;
      }
    }
    .more-menu-list {
      position: absolute;
      right: 0;
      top: 55px;
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

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .edit-container {
    display: flex;
    position: fixed;
    bottom: 200px;
    right: calc(50% - 100px);
    width: 200px;
    border-radius: 5px;
    background-color: #3f3fff;
    color: white;

    .edit-box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 50%;
      cursor: pointer;
      font-size: 14px;

      &:nth-of-type(2) {
        .wrapper {
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
`;