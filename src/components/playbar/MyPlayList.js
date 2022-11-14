import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";




const MyPlayList = ({
  isMyPlayListClicked,
  setIsMyPlayListClicked,
  isGetMyPlayListClicked,
  setIsGetMyPlayListClicked,
  checkedList,
  setCheckedList,
  setAlertOn,
  musicTracks,
  setMusicTracks,
}) => {
  const [myListData, setMyListData] = useState([
    {
      userId: 0,
      playlistId: 0,
      title: "",
      songTotalCount: "",
      albumImage: "",
      createdAt: "",
    },
  ]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch("http://13.125.174.118:8000/storage", {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (sessionStorage.getItem("token") !== null) setMyListData(data.data);
      });
  }, [isMyPlayListClicked, update]);

  return (
    <StyledDialog
      open={isMyPlayListClicked}
      onClose={() => {
        setIsMyPlayListClicked(false);
        setTimeout(() => setIsGetMyPlayListClicked(false), 200);
        setCheckedList([]);
      }}
    >
      {/* 내 리스트 가져오기 and 새로운 리스트 추가하기 */}
      {isGetMyPlayListClicked ? (
        <div className="my-play-list-inner-box">
          <div className="title">내 리스트 가져오기</div>
          <div className="play-lists">
            {myListData.map((el) => (
              <PlayListBar
                key={el.playlistId}
                data={el}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                setIsMyPlayListClicked={setIsMyPlayListClicked}
                isGetMyPlayListClicked={isGetMyPlayListClicked}
                setAlertOn={setAlertOn}
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="my-play-list-inner-box">
          <div className="title">내 리스트에 담기</div>
          <div className="play-lists">
            {/* 새로운 리스트 추가하기 토글 */}
            <div
              className="add-list-box"
              onClick={() => {
                axios({
                  url: `http://13.125.174.118:8000/storage`,
                  method: "POST",
                  headers: {
                    Authorization: sessionStorage.getItem("token"),
                  },
                }).then((res) => {
                  setUpdate(!update);
                });
              }}
            >
              <div className="add-list-cover">
                <AiOutlinePlus />
              </div>
              <div className="play-list-info">
                <div className="add-list">새로운 리스트 추가하기</div>
              </div>
            </div>
            {myListData.map((el, i) => (
              <PlayListBar
                key={el.playlistId}
                data={el}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                setIsMyPlayListClicked={setIsMyPlayListClicked}
                setAlertOn={setAlertOn}
                isGetMyPlayListClicked={isGetMyPlayListClicked}
              />
            ))}
          </div>
        </div>
      )}
    </StyledDialog>
  );
};

// 플레이 리스트
const PlayListBar = ({
  data,
  checkedList,
  setCheckedList,
  setIsMyPlayListClicked,
  setAlertOn,
  isGetMyPlayListClicked,
  musicTracks,
  setMusicTracks,
}) => {
  return (
    <div
      className="play-list-bar-inner-box"
      onClick={() => {
        if (isGetMyPlayListClicked === true) {
          fetch(
            `http://3.34.53.252:8000/play/addsongs/playlist/${data.playlistId}`,
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
            .then((res) => res.json())
            .then((plData) => {
              if (plData[0].songTitle !== null) {
                const musicTracksId = musicTracks.map((el) => el.songId);
                const filteredNewTracks = plData.filter(
                  (el, i) => musicTracksId.includes(el.songId) === false
                );
                setMusicTracks([...filteredNewTracks, ...musicTracks]);
                setIsMyPlayListClicked(false);
                setAlertOn(
                  "현재 재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                );
              }
            });
        } else {
          axios({
            url: `http://3.34.53.252:8000/detail/mylist/${data.playlistId}`,
            method: "POST",
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
            data: {
              songId: checkedList,
            },
          })
            .then((res) => {
              setCheckedList([]);
              setIsMyPlayListClicked(false);
              setAlertOn(
                "플레이리스트에 추가되었습니다. 중복된 곡은 제외됩니다."
              );
            })
            .catch((error) => {
              setAlertOn("이미 플레이리스트에 존재하는 곡입니다.");
            });
        }
      }}
    >
      <img
        src={data.albumImage == null ? "/Images/nothing.png" : data.albumImage}
        alt="playlist cover"
        className="cover"
      />
      <div className="play-list-info">
        <div className="album-title">{data.title}</div>
        <div className="num">{data.songTotalCount}곡</div>
      </div>
    </div>
  );
};

export default MyPlayList;


const StyledDialog = styled(Dialog)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "NanumBarunGothic", sans-serif;

    .my-play-list-inner-box {
      display: flex;
      flex-direction: column;
      width: 525px;
      padding: 30px;
      border-radius: 5px;
      background-color: white;

      .title {
        padding-bottom: 25px;
        font-size: 18px;
        font-weight: 700;
      }

      .play-lists {
        overflow-y: auto;
        max-height: 400px;
      }

      .add-list-box {
        display: flex;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #f2f2f2;
        color: #3f3fff;
        cursor: pointer;

        .add-list-cover {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
          width: 60px;
          margin-right: 15px;
          border-radius: 5px;
          background-color: #dedede;
          font-size: 30px;
        }
        .add-list {
          font-weight: bold;
        }
      }
    }

    .play-list-bar-inner-box {
      display: flex;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #f2f2f2;
      cursor: pointer;

      .cover {
        height: 60px;
        width: 60px;
        margin-right: 15px;
        border-radius: 5px;
      }

      .album-title {
        margin-bottom: 10px;
        font-weight: 700;
      }

      .num {
        color: #969696;
        font-size: 14px;
      }
    }
  }
`;