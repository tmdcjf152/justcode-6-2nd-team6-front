import React from "react";
import { Fade } from "react-reveal";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";



const Purchase = () => {
  return (
    <Fade>
      <StyledPurchase>
        <section className="purchase-main">
          <div className="purchase-inner-box">
            <ul className="purchase-tab">
              <li>
                <NavLink
                  to="/purchase/voucher"
                  className={({ isActive }) =>
                    isActive ? "btn-primary" : "btn-color-black"
                  }
                >
                  이용권
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purchase/affiliate"
                  className={({ isActive }) =>
                    isActive ? "btn-primary" : "btn-color-black"
                  }
                >
                  제휴
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purchase/my"
                  className={({ isActive }) =>
                    isActive ? "btn-primary" : "btn-color-black"
                  }
                >
                  My
                </NavLink>
              </li>
            </ul>
            <div className="purchase-coupon">
              <button type="button" className="btn-coupon">
                쿠폰
              </button>
            </div>
            <Outlet />
          </div>
        </section>
      </StyledPurchase>
    </Fade>
  );
};

export default Purchase;


const StyledPurchase = styled.section`
  .purchase-main {
    font-family: "NanumBarunGothic", sans-serif;
    height: 100%;
    padding: 95px 80px 40px;
    background-color: #fff;
    .purchase-inner-box {
      display: flex;
      flex-direction: column;
      width: 1030px;
      max-width: 1600px;
      min-width: 800px;
      position: relative;
      margin: 0 auto;
      padding-top: 50px;
      .purchase-tab {
        display: flex;
        justify-content: center;
        position: relative;
        margin-right: 50px;
        height: 32px;
        li {
          margin: 0 15px;
          color: black;
          border: none;
          &:hover {
            color: #3f3fff;
            cursor: pointer;
          }
        }
        .btn-color-black {
          color: black;
        }
        .btn-primary {
          color: white;
          background-color: #3f3fff;
          padding: 7px 12px;
          border-radius: 16px;
        }
      }
      .purchase-coupon {
        position: absolute;
        top: 42px;
        right: 40px;
        color: #000;
        width: auto;
        .btn-coupon {
          width: 97px;
          height: 32px;
          font-size: 13px;
          color: #000;
          background-color: transparent;
          border: 0.5px solid #d2d2d2;
          border-radius: 16px;
          &:hover {
            color: blue;
            border-color: blue;
            cursor: pointer;
          }
        }
      }
    }
  }
`;