import React from 'react';
import styled from 'styled-components';

const NoMyVoucher = ({ navigate }) => {
  return (
    <StyledNoMyVoucher>
      <div className='voucher-card-noitem'>
        <div className='msg-novoucher'>
          <span>사용 중인 이용권이 없습니다.</span>
          <button
            type='button'
            className='btn-round'
            onClick={() => {
              navigate('/purchase/voucher');
            }}
          >
            이용권 구매
          </button>
        </div>
      </div>
    </StyledNoMyVoucher>
  );
};

export default NoMyVoucher;

const StyledNoMyVoucher = styled.div`
  .voucher-card-noitem {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    min-height: 200px;
    margin-bottom: 20px;
    padding: 50px 60px;
    background-color: #f4f5f8;
    border-radius: 8px;
    box-sizing: border-box;
    .msg-novoucher {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      span {
        font-size: 18px;
        line-height: 30px;
        color: #000;
        font-weight: 500;
      }
      .btn-round {
        height: 40px;
        margin-top: 19px;
        padding: 0 32px;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        line-height: 1.25;
        background-color: #3f3fff;
        color: #fff;
        font-weight: 500;
        text-align: center;
      }
    }
  }
`;