import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiFolderAddLine } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import styled from "styled-components";



const ArtistAlbum = () => {
  const params = useParams();
  const [roleType, setRoleType] = useState([
    { id: 1, name: "전체", selected: false },
    { id: 2, name: "정규/싱글", selected: false },
    { id: 3, name: "참여", selected: false },
  ]);
  const [sortType, setSortType] = useState([
    { id: 1, name: "최신순", selected: false },
    { id: 2, name: "인기순", selected: false },
    { id: 3, name: "가나다순", selected: false },
  ]);
  const [albumsData, setAlbumsData] = useState([]);
  const [albumList, setAlbumList] = useState([]);

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
    const newArr = albumsData.filter((data) => {
      return !data.includes("sortType=");
    });

    if (selectedName == "최신순") {
      setAlbumsData(() => [...newArr, "sortType=RECENT"]);
    } else if (selectedName == "인기순") {
      return setAlbumsData(() => [...newArr, "sortType=POPULARITY"]);
    } else if (selectedName == "가나다순") {
      return setAlbumsData(() => [...newArr, "sortType=WORD"]);
    }
  };

  const roleHandler = (e) => {
    const arr = roleType.map((data) => {
      return data.id == e.target.type
        ? { id: data.id, name: data.name, selected: true }
        : { id: data.id, name: data.name, selected: false };
    });
    setRoleType(arr);

    const selectedName = arr.filter((result) => {
      return result.selected;
    })[0].name;
    const newArr = albumsData.filter((data) => {
      return !data.includes("roleType=");
    });

    if (selectedName == "전체") {
      setAlbumsData(() => [...newArr, " roleType=ALL"]);
    } else if (selectedName == "정규/싱글") {
      return setAlbumsData(() => [...newArr, "roleType=RELEASE"]);
    } else if (selectedName == "참여") {
      return setAlbumsData(() => [...newArr, "roleType=JOIN"]);
    }
  };

  useEffect(() => {
    const queryString =
      albumsData.length == 0
        ? "?sortType=WORD&roleType=ALL"
        : "?" + albumsData.join("&");
    fetch(
      `http://13.125.174.118:8000/detail/artist/${params.artistId}/albums${queryString}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAlbumList(data.artistAlbums);
      });
  }, [albumsData]);

  return (
    <StyledArtistAlbum>
      <div className="artist-album-inner-box">
        <div className="artist-album-head-wrap">
          {/* <ul>
            {roleType.map((result) => {
              return (
                <StyledLi
                  type={result.id}
                  selected={result.selected}
                  className="type"
                  onClick={roleHandler}
                >
                  {result.name}
                </StyledLi>
              );
            })}
          </ul> */}
          <span className="artist-album-stick" />
          {/* <ul>
            {sortType.map((result) => {
              return (
                <StyledLi
                  type={result.id}
                  selected={result.selected}
                  className="type"
                  onClick={sortHandler}
                >
                  {result.name}
                </StyledLi>
              );
            })}
          </ul> */}
        </div>
        <ul className="artist-album-list-wrap">
          {albumList.map((el) => {
            return (
              <li key={el.albumId} className="artist-album-list-box">
                <div className="artist-album-list">
                  {/* 앨범 표지 */}
                  <div className="artist-album-list-thumbnail">
                    <Link
                      to={`/detail/album/${params.albumId}/details`}
                      className="artist-album-list-link"
                    >
                      <img
                        alt="앨범 표지"
                        src={el.albumImage}
                        className="artist-album-list-image"
                      />
                    </Link>
                  </div>
                  {/* 앨범 설명 */}
                  <div className="track-info-wrap">
                    {/* 앨범 타이틀/가수 */}
                    <div className="track-info-top">
                      <p className="track-info-top-title">
                        <Link
                          to={`/detail/album/${params.albumId}/details`}
                          className="track-info-album-link"
                        >
                          {el.albumTitle}
                        </Link>
                      </p>
                      <p className="track-info-top-singer">
                        <Link
                          to={`/detail/artist/${params.artistId}/songs`}
                          className="track-info-singer-link"
                        >
                          {el.artistName}
                          <MdOutlineNavigateNext className="track-info-singer-icon" />
                        </Link>
                      </p>
                    </div>
                    {/* 앨범 종류/발매 날짜 */}
                    <div className="track-info-middle">
                      <div className="track-info-sort">{el.albumType}</div>
                      <div className="track-info-date">
                        {el.albumReleaseDate}
                      </div>
                    </div>
                    {/* 앨범 아이콘 */}
                    <div className="track-info-bottom">
                      <RiPlayListAddFill className="track-info-icon" />
                      <RiFolderAddLine className="track-info-icon" />
                      <BsSuitHeart className="track-info-icon" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </StyledArtistAlbum>
  );
};

export default ArtistAlbum;

const StyledLi = styled.li`
  color: ${(props) => (props.selected ? "#3f3fff" : "black")};
`;

const StyledArtistAlbum = styled.section`
  padding-top: 40px;
  margin-bottom: 40px;

  div.artist-album-inner-box {
    position: relative;
    min-height: 20px;
    padding-bottom: 16px;

    div.artist-album-head-wrap {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 0;
      right: 0;
      color: #333;

      ul {
        display: flex;
        flex-direction: row;

        ${StyledLi} {
          margin-right: 15px;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: #3f3fff;
          }
        }
      }

      span.artist-album-stick {
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
    ul.artist-album-list-wrap {
      margin-left: -20px;
      margin-top: -40px;

      li.artist-album-list-box {
        display: inline-block;
        vertical-align: top;
        width: 412px;
        margin-top: 40px;
        margin-left: 22px;
        padding-right: 12px;

        div.artist-album-list {
          width: 412px;
          display: flex;
          flex-direction: row;
          position: relative;

          div.artist-album-list-thumbnail {
            position: relative;
            height: 175px;
            width: 175px;
            margin-bottom: 15px;
            padding-top: 14px;
            line-height: 175px;
            text-align: center;
          }

          a.artist-album-list-link {
            z-index: auto;
            position: relative;
            display: block;
            height: 100%;
            width: 100%;
            border-radius: 6px;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: #f8f9fa;

            img.artist-album-list-image {
              width: 175px;
              height: 175px;
              vertical-align: top;
              border-radius: 6px;
            }
          }

          button.play-button {
            width: 32px;
            height: 32px;
            z-index: auto;
            position: absolute;
            right: 9px;
            bottom: 12px;
            vertical-align: middle;
            white-space: nowrap;
            color: white;
            border: none;
            background: none;

            .play-button-icon {
              width: 40px;
              height: 40px;
              color: white;
            }
          }

          div.track-info-wrap {
            vertical-align: top;
            position: relative;
            z-index: 6;
            padding-top: 14px;
            padding-left: 20px;
            vertical-align: middle;

            div.track-info-top {
              margin-top: 10px;
              width: 204px;
              position: relative;
            }
            p.track-info-top-title {
              padding-top: 15px;
              font-size: 15px;
              font-weight: 700;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              a.track-info-album-link {
                color: #333;
              }
            }

            p.track-info-top-singer {
              padding-top: 8px;
              font-size: 14px;

              a.track-info-singer-link {
                position: relative;
                padding-right: 14px;
                color: #333;

                .track-info-singer-icon {
                  width: 15px;
                  height: 15px;
                  position: absolute;
                  top: 1px;
                  right: 1;
                  display: inline-block;
                  content: "";
                }
              }
            }

            div.track-info-middle {
              padding-top: 20px;

              div.track-info-sort {
                position: relative;
                font-size: 13px;
              }

              div.track-info-date {
                padding-top: 7px;
                position: relative;
                font-size: 13px;
                clear: both;
                color: #969696;
              }
            }

            div.track-info-bottom {
              margin-top: 20px;
              color: #969696;

              .track-info-icon {
                width: 20px;
                height: 20px;
                margin-right: 14px;
              }
            }
          }
        }
      }
    }
  }
`;