import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-reveal';
import LoginFooter from '../../components/LoginFooter';
import styled from 'styled-components';



const Signup = (setFooterShow) => {
  return (
    <Fade >
    <StyledSignup>
      <div className='signup-inner-box'>
        <a className='signup-logo-box'>
          <img
            src={process.env.PUBLIC_URL + '/Images/logo.png'}
            alt='플로리다로고'
          />
        </a>
      </div>
      <span className='signup-text'>다음 가입방법 중 하나를 선택하세요</span>
      <div className='signup-sns-box'>
        <NavLink to='/terms' className='signup-email'>
          <span className='hidden' onClick={()=>{setFooterShow(true)}}>이메일 아이디로 가입하기</span>
        </NavLink>
        <NavLink to='#' className='signup-t'>
          <span className='hidden'>T 아이디로 로그인</span>
        </NavLink>
        <NavLink to='#' className='signup-naver'>
          <span className='hidden'>네이버 아이디로 로그인</span>
        </NavLink>
        <NavLink to='#' className='signup-kakao'>
          <span className='hidden'>카카오 계정으로 로그인</span>
        </NavLink>
        <NavLink to='#' className='signup-apple'>
          <span className='hidden'>Apple로 로그인</span>
        </NavLink>
      </div>
      <LoginFooter />
    </StyledSignup>
    </Fade>
  );
};

export default Signup;

const StyledSignup = styled.div`
  .signup-inner-box {
    display: flex;
    justify-content: center;
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    .signup-logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 300px;
      margin-top: 100px;
      img {
        width: 100%;
      }
    }
  }
  .signup-text {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 16px/1 'NanumBarunGothic';
    margin-bottom: 100px;
  }
  .signup-sns-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .signup-email {
      width: 400px;
      height: 60px;
      background: url('https://ifh.cc/g/321CYT.png');
      background-size: cover;
      margin-bottom: 15px;
    }
    .signup-t {
      width: 400px;
      height: 60px;
      background: url('https://ifh.cc/g/3WWz2O.png');
      background-size: cover;
      margin-bottom: 15px;
    }
    .signup-naver {
      width: 400px;
      height: 60px;
      background: url('https://ifh.cc/g/ftDbH5.png');
      background-size: cover;
      margin-bottom: 15px;
    }
    .signup-kakao {
      width: 400px;
      height: 60px;
      background: url('https://ifh.cc/g/2M72co.png');
      background-size: cover;
      margin-bottom: 15px;
    }
    .signup-apple {
      width: 400px;
      height: 60px;
      background: url('https://ifh.cc/g/PDO5mA.png');
      background-size: cover;
      margin-bottom: 15px;
    }
  }
`;