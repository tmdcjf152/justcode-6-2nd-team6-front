import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import UserModal from "./UserModal";
import styled from "@emotion/styled";



const Header = ({
  token,
  setToken,
  user_name,
  user_img,
  setIsLogin,
  isLogin,
  setMusicTracks,
  headerShow,
  setHeaderShow,
  footerShow,
  setFooterShow,
}) => {
  const [toggle, setToggle] = useState(false);
  const logOut = () => {
    setToggle(!toggle);
    setIsLogin(!isLogin);
    setMusicTracks([]);
    sessionStorage.clear();
  };

  return (
    <StyledHeader>
      <div className="header-inner-box">
        {/* 로고박스 */}
        <div className="header-logo-box">
          <NavLink to="/" className="header-logo">
            <img src="/Images/logo.png" alt="Florida로고" />
          </NavLink>
        </div>

        {/* 메뉴박스 */}
        <div className="header-nav-box">
          <ul className="header-nav-list">
            <li>
              <NavLink to="/browse/전체차트/0">둘러보기</NavLink>
            </li>
            <li>
              <NavLink to="/storage/mylist">보관함</NavLink>
            </li>
            <li>
              <NavLink to="/purchase/voucher">이용권</NavLink>
            </li>
          </ul>
        </div>

        {/* 검색창 */}
        <div className="header-input-box">
          <AiOutlineSearch />
          <input type="text" placeholder="검색어를 입력하세요" />
        </div>

        {/* 크리에이터 스튜디오 / 로그인 / 회원가입 박스 로그인OFF */}
        <div className="header-login-box">
          <div className="header-login-menu-box">
            <ul className="header-login-menu-list">
              <li className="studio">
                <NavLink to="/promotion/cms/flocreators">
                  크리에이터 스튜디오
                </NavLink>
              </li>
              {isLogin ? (
                <div
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <li className="header-login-on">
                    <span className="user-name">
                      {user_name} 님 반갑습니다.
                    </span>
                    <div className="user-img">
                      <img src={user_img} alt="" />
                    </div>
                  </li>
                </div>
              ) : (
                <>
                  <li className="header-login-off">
                    <NavLink to="/login">로그인</NavLink>
                  </li>
                  <li className="header-login-off">
                    <NavLink to="/signup">회원가입</NavLink>
                  </li>
                </>
              )}
              {toggle === true ? (
                <UserModal
                  user_name={user_name}
                  user_img={user_img}
                  token={token}
                  setToken={setToken}
                  logOut={logOut}
                  setMusicTracks={setMusicTracks}
                />
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;


const StyledHeader = styled.header`
  .header-inner-box {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    background: #fff;
    z-index: 10;
    /* 로고박스 */
    .header-logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      margin: 0px 50px;

      .header-logo {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    /* 메뉴박스 */
    .header-nav-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 20%;
      .header-nav-list {
        width: 300px;
        display: flex;
        li {
          width: 100%;
          a {
            font: 16px/1 "NanumBarunGothic";
            color: #000;
            transition: all 0.5s;
            &:hover {
              color: #3f3fff;
            }
          }
        }
      }
    }
    /* 검색창 */
    .header-input-box {
      position: relative;
      left: -30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 40%;
      input[type="text"] {
        width: 200px;
        height: 30px;
        border-radius: 100px;
        padding: 10px;
        padding-left: 40px;
        border: 1px solid #bbb;
        transition: all 0.5s;
        &:hover {
          border: 1px solid #3f3fff;
        }
      }
      svg {
        position: relative;
        left: 30px;
      }
    }
    /* 크리에이터/로그인/회원가입 박스 */
    .header-login-box {
      position: relative;
      right: 30px;
      display: flex;
      justify-content: flex-end;
      width: 30%;
      .header-login-menu-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .header-login-menu-list {
          display: flex;
          align-items: center;
          margin-right: 50px;
          .studio {
            margin-right: 20px;
          }
          a {
            font: 13px/1 "NanumBarunGothic";
            color: #777;
            transition: all 0.5s;
            &:hover {
              color: #3f3fff;
            }
          }
          .header-login-off {
            margin-right: 20px;
          }
          .header-login-on {
            display: flex;
            justify-content: center;
            align-items: center;
            font: 13px/1 "apple";
            .user-name {
              margin-left: 20px;
              padding-top: 4px;
              cursor: pointer;
            }
            .user-img {
              width: 40px;
              height: 40px;
              margin-left: 20px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
`;