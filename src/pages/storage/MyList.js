import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import Loading from "../../components/Loading";
import styled from "styled-components";



const MyList = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
  isExpandedClicked,
  isLogin,
}) => {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myListData, setMyListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://13.125.174.118:8000/storage", {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        if (sessionStorage.getItem("token") !== null || data.data.length !== 0)
          setMyListData(data.data);
      });
  }, [isExpandedClicked, isEditClicked]);

  return (
    <StyledMyList>
      {isLogin === false ? (
        <div className="full-msg">
          <div className="full-msg-cnt">
            <strong className="text-black">로그인해주세요.</strong>
            <span className="text-gray">
              로그인하시면 더욱 더 다양한
              <br />
              FLOrida를 즐길 수 있어요.
            </span>
            <div
              className="full-msg-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              <span>로그인</span>
            </div>
          </div>
        </div>
      ) : !loading ? (
        <Loading />
      ) : (
        <div className="my-list-inner-box">
          {!isEditClicked || (
            <div
              className="select-all hover"
              onClick={() => {
                if (checkedList.length < myListData.length) {
                  setCheckedList(myListData.map((el) => el.playlistId));
                } else setCheckedList([]);
              }}
            >
              전체선택
            </div>
          )}
          <div
            className="edit hover"
            onClick={() => {
              setIsEditClicked(!isEditClicked);
              setCheckedList([]);
            }}
          >
            {isEditClicked ? "완료" : "편집"}
          </div>
          {myListData.map((el, i) => (
            <PlayListContainer
              key={el.playlistId}
              data={el}
              musicTracks={musicTracks}
              setMusicTracks={setMusicTracks}
              setAlertOn={setAlertOn}
              isEditClicked={isEditClicked}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          ))}
          <div
            className="play-list-container"
            onClick={() => {
              axios({
                url: `http://3.34.53.252:8000/storage`,
                method: "POST",
                headers: {
                  Authorization: sessionStorage.getItem("token"),
                },
              }).then((res) => {
                navigate(`/detail/mylist/${res.data.data[0].playlistId}`);
              });
            }}
          >
            <div className="play-list-cover">
              <div className="first-box" />
              <div className="second-box" />
              <div className="third-box">
                <AiOutlinePlus size="50" />
              </div>
            </div>
            <div className="song-info">
              <div className="add-list">새로운 리스트 만들기</div>
            </div>
          </div>
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
                      axios({
                        url: `http://3.34.53.252:8000/storage`,
                        method: "DELETE",
                        headers: {
                          Authorization: sessionStorage.getItem("token"),
                        },
                        data: {
                          playlistId: checkedList,
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
        </div>
      )}
    </StyledMyList>
  );
};

const PlayListContainer = ({
  data,
  musicTracks,
  setMusicTracks,
  setAlertOn,
  isEditClicked,
  checkedList,
  setCheckedList,
}) => {
  const navigate = useNavigate();

  const onCheckedElement = (checked, item) => {
    if (checked === false) {
      setCheckedList([...checkedList, item]);
    } else if (checked === true) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  return (
    <div className="play-list-container">
      <div className="play-list-cover">
        <div className="first-box" />
        <div className="second-box" />
        <img
          src={
            data.albumImage == null ? "/Images/nothing.png" : data.albumImage
          }
          className="third-box"
          onClick={() => {
            if (isEditClicked === true)
              onCheckedElement(
                checkedList.includes(data.playlistId),
                data.playlistId
              );
            else navigate(`/detail/mylist/${data.playlistId}`);
          }}
        />
        {!isEditClicked || (
          <div class="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              checked={
                checkedList.includes(data.playlistId) && isEditClicked
                  ? true
                  : false
              }
            />
            <label
              for="checkbox"
              onClick={() => {
                onCheckedElement(
                  checkedList.includes(data.playlistId),
                  data.playlistId
                );
              }}
            ></label>
          </div>
        )}
        <FaPlay
          className="play"
          onClick={() => {
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
                if (plData.message === "Need Voucher")
                  setAlertOn(
                    "이용권을 구매해야 음악 재생 서비스를 이용하실 수 있습니다."
                  );
                if (plData[0].songTitle !== null) {
                  const musicTracksId = musicTracks.map((el) => el.songId);
                  const filteredNewTracks = plData.filter(
                    (el, i) => musicTracksId.includes(el.songId) === false
                  );
                  setMusicTracks([...filteredNewTracks, ...musicTracks]);
                  setAlertOn(
                    "현재 재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                  );
                }
              });
          }}
        />
      </div>
      <div className="song-info">
        <Link to={`/detail/mylist/${data.playlistId}`} className="title">
          {data.title}
        </Link>
        <div className="quantity">총 {data.songTotalCount} 곡</div>
        <div className="date">{data.createdAt}</div>
      </div>
    </div>
  );
};

export default MyList;

const StyledMyList = styled.div`
  .full-msg {
    position: relative;
    min-height: 410px;
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    .full-msg-cnt {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      width: auto;
      transform: translate(-50%, -50%);
      .text-black {
        font-size: 20px;
        font-weight: 600;
        color: #181818;
        line-height: 1.3;
        margin-bottom: 7px;
      }
      .text-gray {
        color: #989898;
        font-size: 15px;
        line-height: 1.4;
      }
      .full-msg-btn {
        padding-top: 28px;
        width: 100%;
        span {
          width: auto;
          height: 38px;
          margin: 0 auto;
          padding: 11px 18px;
          color: #3f3fff;
          border: 1px solid #3f3fff;
          border-radius: 19px;
          font-size: 14px;
          font-weight: 600;
          line-height: 38px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .my-list-inner-box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 80px 0 60px 0;

    .hover {
      cursor: pointer;
      &:hover {
        color: #3f3fff;
      }
    }

    .select-all {
      position: absolute;
      left: 0;
      top: 30px;
    }

    .edit {
      position: absolute;
      right: 0;
      top: 30px;
    }

    .play-list-container {
      display: flex;
      width: 480px;
      margin-right: 20px;
      margin-bottom: 20px;
      /* background-color: #777777; */

      .play-list-cover {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .first-box {
          width: 170px;
          height: 170px;
          border-radius: 5px;
          background-color: #f3f3f3;
        }

        .second-box {
          width: 185px;
          height: 185px;
          margin-top: -165px;
          border-radius: 5px;
          background-color: #e9e9e9;
        }

        .third-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          margin-top: -180px;
          border-radius: 5px;
          background-color: #dfdfdf;
          color: #3f3fff;

          &:hover {
            filter: brightness(70%);
          }
        }

        .checkbox-container {
          position: absolute;
          top: 28px;
          left: 18px;
          .checkbox {
            display: none;
          }

          .checkbox + label:before {
            content: "";
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 17px;
            border-radius: 100%;
            vertical-align: middle;
            background-color: #fff;
          }

          .checkbox:checked + label:before {
            display: flex;
            align-items: center;
            justify-content: center;
            content: "\f00c";
            font-family: "Font Awesome 5 free";
            font-weight: 900;
            color: #fff;
            background-color: #3f3fff;
            font-size: 18px;
            text-align: center;
          }
        }

        .play {
          position: absolute;
          bottom: 25px;
          right: 22.5px;
          color: white;
          transform: scale(1.75);
          cursor: pointer;

          &:hover {
            color: #3f3fff;
          }
        }
      }

      .song-info {
        margin: 30px 20px;

        .title {
          color: black;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;

          &:hover {
            color: #3f3fff;
          }
        }

        .quantity {
          margin: 25px 0 10px 0;
          font-size: 14px;
        }

        .date {
          font-size: 14px;
          color: #969696;
        }

        .add-list {
          margin-top: 70px;
          color: #3f3fff;
          font-weight: 700;
          cursor: pointer;
        }
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
  }
`;