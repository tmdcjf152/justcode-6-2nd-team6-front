import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";


const UserModal = ({ user_name, user_img, isLogin, logOut }) => {
  const navigate = useNavigate();

  return (
    <StyledUserModal>
      <div className="modal-inner-box">
        <p className="user-info-title">내 정보</p>
        {/* 유저정보 */}
        <div className="user-info-box">
          {/* 유저 이미지박스 */}
          <NavLink className="user-info-img-box">
            <img src={user_img} alt="" />
          </NavLink>
          {/* 유저 닉네임박스 */}
          <NavLink to="/My" className="user-info-text-box">
            <span className="user-id">{user_name} 님</span>
            <p className="user-text">즐거운 플로리다 되세요.</p>
          </NavLink>
        </div>

        {/* 마이페이지 */}
        <NavLink to="/" className="user-my-page-box">
          <span>마이페이지</span>
        </NavLink>

        {/* 이용권관리 */}
        <NavLink to="/" className="user-voucher-box">
          <span>이용권관리</span>
        </NavLink>

        {/* 로그아웃버튼 */}
        <div className="logout-btn-box">
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              logOut();
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </StyledUserModal>
  );
};

export default UserModal;

const StyledUserModal = styled.div`
  .modal-inner-box {
    position: fixed;
    top: 80px;
    right: 80px;
    width: 300px;
    height: 350px;
    z-index: 10;
    padding: 10px 10px;
    background: #fff;
    border: 1px solid #efefef;
    box-shadow: 0px 0px 5px #efefef;
    .user-info-title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0px;
      border-bottom: 1px solid #efefef;
      font: bold 16px/1 "apple";
    }
    /* 유저 정보 박스 */
    .user-info-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 20px 0px;
      border-bottom: 1px solid #efefef;
      /* 유저 정보 - 이미지 */
      .user-info-img-box {
        width: 50px;
        height: 50px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      /* 유저 정보 - 아이디 */
      .user-info-text-box {
        margin-right: 20px;
        .user-id {
          font: bold 15px/1 "apple";
          color: #000;
          transition: all 0.5s;
          &:hover {
            color: #3f3fff;
          }
        }
        .user-text {
          margin-top: 5px;
          font: 13px/1 "apple";
          color: #aaa;
        }
      }
    }

    /* 유저 마이페이지 박스 */
    .user-my-page-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #efefef;
      span {
        font: 16px/1 "apple";
      }
    }

    /* 유저 이용권 박스 */
    .user-voucher-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #efefef;
      span {
        font: 16px/1 "apple";
      }
    }

    /* 로그아웃 버튼 */

    .logout-btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 35px;
        margin-top: 15px;
        background-color: #fff;
        border: 1px solid #3f3fff;
        border-radius: 100px;
        font-size: 14px;
        color: #3f3fff;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          background: #3f3fff;
          color: #fff;
        }
      }
    }
  }
`;