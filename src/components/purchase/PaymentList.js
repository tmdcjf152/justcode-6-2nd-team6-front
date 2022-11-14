import React, { useState } from 'react';
import PaymentModal from './PaymentModal';
import styled from 'styled-components';



const PaymentList = ({ payment, voucherName, voucherId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <StyledPaymmentList>
      <li key={payment.paymentType} className='payment-list'>
        <div className='item'>
          <div className='item-left'>
            <span className='subject'>{payment.name}</span>
          </div>
          <div className='item-right'>
            <span className='price-box'>
              {payment.originPrice !== null && (
                <del className='first-cost'>
                  정가
                  {payment.originPrice}원
                </del>
              )}
              {payment.salePrice !== null && (
                <span className='price'>
                  <em>{payment.salePrice}</em>원
                </span>
              )}
            </span>
            <button type='button' className='btn-buy' onClick={showModal}>
              구매
            </button>
          </div>
        </div>
        <ul className='voucher-item-cautions'>
          {payment.description !== null && (
            <li className='voucher-item-caution'>{payment.description}</li>
          )}
        </ul>
      </li>
      {modalOpen && (
        <PaymentModal
          setModalOpen={setModalOpen}
          voucherName={voucherName}
          paymentName={payment.name}
          originPrice={payment.originPrice}
          salePrice={payment.salePrice}
          paymentType={payment.paymentType}
          voucherId={voucherId}
        />
      )}
    </StyledPaymmentList>
  );
};

export default PaymentList;

const StyledPaymmentList = styled.li`
  .payment-list {
    margin-top: 30px;
    .item {
      justify-content: space-between;
      margin-bottom: 0;
      text-align: right;
      .item-left {
        display: block;
        flex: 0 1 auto;
        text-align: left;
        .subject {
          font-size: 16px;
          color: #181818;
        }
      }
      .item-right {
        flex: 1 0 auto;
        .price-box {
          .first-cost {
            margin-right: 10px;
            color: #bdbdbd;
          }
          .price {
            color: #3f3fff;
          }
          .color-red {
            color: #e61313 !important;
          }
        }
        .btn-buy {
          margin-left: 20px;
        }
      }
    }
    .voucher-item-cautions {
      margin-top: 8px;
      list-style: none;
      .voucher-item-caution {
        display: flex;
        max-width: 330px;
        font-size: 11px;
        line-height: 14px;
        color: #929292;
      }
    }
  }
`;