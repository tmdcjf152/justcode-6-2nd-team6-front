import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import LoginFooter from "../../components/LoginFooter";
import styled from "styled-components";



const Login = ({ setIsLogin, setLoginText }) => {
  const navigate = useNavigate();
  // 비밀번호 토글버튼
  const [blind, setBlind] = useState(false);
  const [input, setInput] = React.useState({ email: "", password: "" });

  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (input.password.length > 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input]);

  // 로그인 Axios
  const isLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://13.125.174.118:8000/users/login", {
        email: input.email,
        password: input.password,
      })
      .then((response) => {
        // Handle success.
        let token = response.data.token;
        let name = response.data.data[0].name;
        let profileImage = response.data.data[0].profileImage;
        // seesionStorage로 창을 닫으면 자동 로그아웃됨
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("profileImage", profileImage);
        navigate("/");
        setIsLogin(true);
        setLoginText(true);
      })
      .catch((error) => {
        // Handle error.
      });
  };

  return (
    <Fade>
      <StyledLogin>
        <div className="login-inner-box">
          <div className="login-container">
            {/* 웹접근성 스크린 리더기 부분 */}
            <h1 className="hidden">로그인</h1>
            <form className="login-form-inner-box">
              {/* 아이디창 */}
              <div className="login-form-id">
                <input
                  type="text"
                  placeholder="아이디(이메일)"
                  name="email"
                  onChange={handleChange}
                  value={input.email}
                />
              </div>

              {/* 페스워드창 */}
              <div className="login-form-pwd">
                <input
                  type={blind === false ? "password" : "text"}
                  placeholder="비밀번호"
                  name="password"
                  onChange={handleChange}
                  value={input.password}
                />
                <span
                  className="blind-pwd"
                  onClick={() => {
                    setBlind(!blind);
                  }}
                >
                  {blind === false ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              {/* 아이디 저장버튼 */}
              <div className="login-save-id">
                <input type="checkbox" name="save-id" id="save-id" />
                <label for="save-id"></label>
                <span>아이디 저장</span>
              </div>

              {/* 로그인버튼 */}
              <button
                type="submit"
                className="login-btn"
                disabled={disabled}
                onClick={isLogin}
              >
                로그인
              </button>

              {/* 아이디 비밀번호 찾기 */}
              <div className="login-find-idpw">
                <ul>
                  <li>
                    <NavLink to="#">아이디 찾기</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">비밀번호 찾기</NavLink>
                  </li>
                </ul>
                <NavLink to="/signup" className="link-signup">
                  회원가입
                </NavLink>
              </div>

              {/* T아이디로 로그인 / 휴대폰 번호로 로그인 */}
              <div className="login-btn-box">
                <NavLink to="#" className="t-login">
                  <span>T아이디로 로그인</span>
                </NavLink>
                <NavLink to="#" className="tel-login">
                  <span>휴대폰 번호로 로그인</span>
                </NavLink>
              </div>

              {/* SNS로그인 */}
              <div className="login-sns-box">
                <NavLink to="" className="naver-login">
                  <span className="hidden">네이버로그인</span>
                </NavLink>
                <NavLink to="" className="kakao-login">
                  <span className="hidden">카카오로그인</span>
                </NavLink>
                <NavLink to="" className="apple-login">
                  <span className="hidden">애플로그인</span>
                </NavLink>
              </div>
            </form>
          </div>
          <LoginFooter />
        </div>
      </StyledLogin>
    </Fade>
  );
};

export default Login;

const StyledLogin = styled.div`
  .login-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1280px;
    padding: 100px;
    margin: 0 auto;
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 100%;
      border: 1px solid #eee;
      padding: 100px;
      margin: 0 auto;
      margin-top: 100px;
      .login-form-inner-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        /* 아이디창 */
        .login-form-id {
          position: relative;
          input[type="text"] {
            width: 400px;
            height: 50px;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #eee;
          }
          .error-msg {
            display: flex;
            position: absolute;
            bottom: 10px;
            font: 12px/1 "apple";
            color: red;
          }
        }
        /* 페스워드창 */
        .login-form-pwd {
          position: relative;
          margin-bottom: 20px;
          input[type="password"] {
            width: 400px;
            height: 50px;
            border: none;
            border-bottom: 1px solid #eee;
          }
          input[type="text"] {
            width: 400px;
            height: 50px;
            border: none;
            border-bottom: 1px solid #eee;
          }
          .blind-pwd {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 25px;
            color: #ccc;
            cursor: pointer;
          }
        }
        /* 아이디 저장벝튼 */
        .login-save-id {
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 10px;
          margin-bottom: 20px;
          input[type="checkbox"] {
            display: none;
          }
          input[id="save-id"] + label {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #aaa;
            border-radius: 3px;
            background: #fff;
            cursor: pointer;
          }
          input[id="save-id"]:checked + label {
            position: relative;
            background: #3d40ff;
            &::before {
              position: absolute;
              top: 3px;
              left: 3px;
              content: "\f00c";
              font-family: FontAwesome;
              font-size: 12px;
              text-align: center;
              color: #fff;
            }
          }
          span {
            font: 16px/1 "NanumBarunGothic";
            padding-left: 15px;
          }
        }
        /* 로그인 버튼 */
        .login-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3d40ff;
          width: 400px;
          height: 50px;
          border: none;
          cursor: pointer;
          font: bold 18px/1 "NanumBarunGothic";
          color: #fff;

          &:disabled {
            background: #ddd;
            cursor: default;
          }
        }
        .login-btn-on {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3f3fff;
          width: 400px;
          height: 50px;
          border: none;
        }
        /* 아아디 비밀번호 찾기 */
        .login-find-idpw {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 20px 10px;
          font: 16px/1 "NanumBarunGothic";
          ul {
            display: flex;
            li {
              margin-right: 10px;
              &::after {
                content: "|";
                margin-left: 10px;
              }
              &:last-child::after {
                content: "";
              }
              a {
                color: #929292;
              }
            }
          }
          .link-signup {
            color: #000;
          }
        }
        /* T로그인 / 휴대폰번호로그인 */
        .login-btn-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 100px;
          .t-login {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 49%;
            height: 50px;
            font: bold 15px/1 "NanumBarunGothic";
            background: #333;
            color: #fff;
          }
          .tel-login {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 49%;
            height: 50px;
            border: 1px solid #333;
            font: bold 15px/1 "NanumBarunGothic";
            background: #fff;
            color: #333;
          }
        }
        /* SNS로그인 */
        .login-sns-box {
          width: 100%;
          display: flex;
          justify-content: center;
          .naver-login {
            width: 50px;
            height: 50px;
            margin-right: 20px;
            background: url("https://cdn.music-flo.com/poc/p/image/social/btn_login_naver.png");
            background-size: cover;
          }
          .kakao-login {
            width: 50px;
            height: 50px;
            background: url("https://ifh.cc/g/Jjqw68.png");
            background-size: cover;
          }
          .apple-login {
            width: 50px;
            height: 50px;
            margin-left: 20px;
            background: url("https://ifh.cc/g/Zv407V.png");
            background-size: cover;
          }
        }
      }
    }
  }
`;
