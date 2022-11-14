import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';




const Popup = () => {
    const [timer, setTimer] = useState(true)

    useEffect(() => {
        setTimeout(() => { setTimer(false) }, 1500)
    })

    // 현재 날짜 및 시간
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();


    return (
        <StyledPopup>
            {timer === true ? <div className="popup-inner-box">
                <div className="popup">
                    <span className='popup-date'>{year}년 {month}월 {date}일</span>
                    <span className='popup-text'><span className='bold'>FLORIDA</span>이벤트/혜택 알림이 수신 동의 처리되었습니다.</span>
                    <span className='close-text'>해당 창은 2초뒤에 자동으로 사라집니다.</span>
                </div>
            </div> : null}
        </StyledPopup>
    );
};



export default Popup;

const popUPAnimation = keyframes`
0%{opacity:0}
25%{opacity:1}
50%{opacity:1}
75%{opacity:1}
100%{opacity:0}
`

const StyledPopup = styled.div`
.popup-inner-box{
position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    animation: ${popUPAnimation} 1.5s 0s ease-in none;
    .popup{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 400px;
        height: 190px;
        padding: 30px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        font: 16px/1 'NBG';
        cursor: default;
        .popup-date{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            font: 18px/1 'apple';
        }
        .popup-text{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-bottom: 30px;
            .bold{
                margin-bottom: 10px;
                text-align: center;
                font: bold 20px/1 'apple';
                color:#3f3fff;
            }
        }
  .close-text{
    font: 12px/1 'apple';
    color: #3f3fff;
  }
    }
}
`