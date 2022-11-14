import React from 'react';
import styled from 'styled-components';



const BuyMyVoucher = ({ userVoucher }) => {
  return (
    <StyledBuyMyVoucher>
      <div className='voucher-card-item voucher-card-using'>
        <div className='card-left'>
          <h4 className='name'>
            {userVoucher.voucherName} {userVoucher.paymentType}
          </h4>
          <span className='voucher-label'>사용 중</span>
          <div className='etc-area'>
            <button type='button' className='link-layer'>
              이용권 관리
            </button>
          </div>
        </div>
        <div className='card-right'>
          <ul className='voucher-info-list'>
            <li>
              <span className='th'>사용기간</span>
              <span className='td'>{userVoucher.period}</span>
            </li>
            <li>
              <span className='th'>구매출처</span>
              <span className='td'>FLOrida</span>
            </li>
            <li>
              <span className='th'>결제설정</span>
              <span className='td'>{userVoucher.payWith}</span>
            </li>
            <li>
              <span className='th'>결제수단</span>
              <span className='td'>{userVoucher.payWith}</span>
            </li>
          </ul>
        </div>
      </div>
    </StyledBuyMyVoucher>
  );
};

export default BuyMyVoucher;


const StyledBuyMyVoucher = styled.div`
  .voucher-card-item {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-height: 200px;
    margin-bottom: 20px;
    padding: 50px 60px;
    background-color: #f4f5f8;
    border-radius: 8px;
    box-sizing: border-box;
    .card-left {
      margin-right: 14px;
      .name {
        margin-top: 4px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2;
      }
      .voucher-label {
        position: absolute;
        top: 50px;
        right: 50px;
        padding: 5px 6px 2px;
        font-size: 12px;
        line-height: 1.2;
        border: 1px solid #9c9c9c;
        border-radius: 15px;
      }
    }
    .card-right {
      flex: 1;
      padding-left: 49px;
      align-self: center;
      border-left: 1px solid rgba(0, 0, 0, 0.2);
      .voucher-info-list {
        margin-top: 7px;
        li {
          position: relative;
          font-size: 12px;
          .th {
            min-width: 43px;
            max-width: 57px;
            margin-right: 10px;
            font-size: 12px;
          }
          .td {
            font-size: 12px;
            line-height: 22px;
          }
        }
      }
    }
    .msg-novoucher {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      span {
        color: #000;
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
      }
    }
  }
  .voucher-card-using {
    background-color: #525cfd;
    min-height: 210px;
    .card-left {
      width: 420px;
      padding-bottom: 80px;
      .name {
        color: #fff;
      }
      .voucher-label {
        opacity: 0.7;
        border-color: #fff;
        color: #fff;
      }
      .etc-area {
        position: absolute;
        left: 60px;
        bottom: 48px;
        .link-layer {
          padding-top: 15px;
          font-size: 12px;
          color: #fff;
          background-color: transparent;
          border-color: #fff;
          border: none;
          border-bottom: 1px solid rgba(24, 24, 24, 0.7);
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .card-right {
      border-color: hsla(0, 0%, 100%, 0.07);
      .voucher-info-list .th {
        color: hsla(0, 0%, 100%, 0.6);
      }
      .voucher-info-list .td {
        color: #fff;
      }
    }
  }
`;