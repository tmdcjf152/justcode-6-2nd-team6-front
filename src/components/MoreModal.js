import React from "react";
import { AiOutlineCheck } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';

const MoreModal = ({checkedList, setCheckedList,musicTracks,setMusicTracks,setAlertOn,location}) => {
  return (
    <div>
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
                fetch(`http://13.125.174.118:8000/${location.pathname}`, {
                  headers: {
                    Authorization: sessionStorage.getItem("token"),
                  },
                })
                  .then((res) => res.json())
                  .then((plData) => {
                    const selectedPlData = plData.filter(
                      (el, i) => checkedList.includes(el.songId) === true
                    );
                    const musicTracksId = musicTracks.map((el) => el.songId);
                    const filteredSelectedPlData = selectedPlData.filter(
                      (el, i) => musicTracksId.includes(el.songId) === false
                    );
                    setMusicTracks([...filteredSelectedPlData, ...musicTracks]);
                    setAlertOn(
                      "재생목록에 추가되었습니다. 중복된 곡은 제외됩니다."
                    );
                    setCheckedList([]);
                  });
              }}
            >
              <BsFillPlayFill className="icon" size="18" />
              <div className="text">듣기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreModal;
