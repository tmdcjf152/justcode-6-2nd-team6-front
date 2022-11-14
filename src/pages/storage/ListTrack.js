import styled from "styled-components";
import Loading from "../../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MusicContainer from "./MusicContainer";



const ListTrack = ({
  musicTracks,
  setMusicTracks,
  setAlertOn,
  isLogin,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMyPlayListClicked, setIsMyPlayListClicked] = useState(false);
  const [isSelectClicked, setIsSelectClicked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(false);
    fetch(`http://3.34.53.252:8000${location.pathname}`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setPlaylistSongs(data);
      });
    setIsSelectClicked(false);
  }, [location.pathname]);

  return (
    <StyledListTrack>
      <div className="my-list-inner-box">
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
          <MusicContainer
            playlistSongs={playlistSongs}
            setPlaylistSongs={setPlaylistSongs}
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
        )}
      </div>
    </StyledListTrack>
  );
};

export default ListTrack;

const StyledListTrack = styled.div`
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
    width: 1280px;
  }
`;