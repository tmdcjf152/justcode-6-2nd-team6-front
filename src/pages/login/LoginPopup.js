import React  from 'react';
import styled, { keyframes } from "styled-components";



const LoginPopup = () => {

    const user_name = sessionStorage.getItem('name')

    return (
        <StyledLoginPopup>
            <div className="login-popup-inner-box">
                <div className="login-popup">
                    <span className='login-popup-text'>{user_name}님 반갑습니다. 오늘도 FLORIDA와 함께 즐거운 하루되세요</span>
                </div>
            </div>
        </StyledLoginPopup>
    );
};

export default LoginPopup;

const popUp = keyframes`
0% {
    opacity: 0;
    top: 800px;
}
25%{
    opacity: 1;
    top: 700px;
}
50%{
    opacity: 1;
    top: 700px;
}
75%{
    opacity: 1;
    top: 700px;
}
100%{
    opacity: 0;
    top: 800px;
}
`

const StyledLoginPopup = styled.div`
.login-popup-inner-box{
    position: relative;
    width: 100%;
    .login-popup{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0%;
        top: 800px;
        width: 100%;
        height: 70px;
        background: #444;
        animation: ${popUp} 7s 1s ease-in-out none;
        transition: all 0.5s;
        .login-popup-text{
            font: bold 20px/1 'apple';
            color: #fff;
        }
    }
}
`