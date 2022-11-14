import React, { useState, useEffect } from "react";
import PaymentList from "./PaymentList";
import styled from "styled-components";



const VoucherCard = () => {
  const [voucher, setVoucher] = useState([]);

  // fetch('/data/voucherdata.json')
  useEffect(() => {
    // fetch("http://13.125.174.118:8000/purchase/voucher")
    fetch('/data/voucherdata.json')
      .then((res) => res.json())
      .then((res) => {
        setVoucher(res.data);
      });
  }, []);

  return (
    <StyledVoucherCard>
      {voucher &&
        voucher.map((voucherCard, index) => {
          return (
            <li key={voucherCard.voucherId}>
              <div className="voucher-carditem">
                <div className="card-left">
                  <h3 className="name">{voucherCard.voucherName}</h3>
                  <p className="desc">{voucherCard.description}</p>
                </div>
                <div className="card-right">
                  <ul className="voucher-list-sub">
                    {voucherCard.payments &&
                      voucherCard.payments.map((payment, index) => {
                        if (payment.salePrice)
                          return (
                            <PaymentList
                              payment={payment}
                              voucherName={voucherCard.voucherName}
                              voucherId={voucherCard.voucherId}
                            />
                          );
                      })}
                  </ul>
                </div>
                <button type="button" className="btn-detail">
                  이용권 자세히 보기
                  <img
                    alt="화살표"
                    src="/Images/next.png"
                    className="next-arrow-img"
                  />
                </button>
              </div>
            </li>
          );
        })}
    </StyledVoucherCard>
  );
};

export default VoucherCard;

const StyledVoucherCard = styled.li`
  .voucher-carditem {
    position: relative;
    padding: 50px 60px;
    background-color: #f4f5f8;
    .card-left {
      width: 310px;
      margin-right: 14px;
      padding-bottom: 40px;
      .name {
        margin-top: 4px;
        font-size: 20px;
        line-height: 1.2;
        color: black;
        font-weight: 600;
      }
      .desc {
        margin-top: 5px;
        font-size: 13px;
        line-height: 20px;
        color: #555;
      }
    }
    .card-right {
      flex: 1;
      padding-left: 49px;
      border-left: 1px solid rgba(0, 0, 0, 0.03);
      align-self: center;
      .voucher-list-sub {
        list-style: none;
      }
    }
    .btn-detail {
      position: absolute;
      bottom: 57px;
      left: 57px;
      font-size: 13px;
      color: #929292;
      background-color: transparent;
      border: none;
      .next-arrow-img {
        position: absolute;
        bottom: 2px;
        width: 15px;
        height: 15px;
        vertical-align: middle;
        color: #929292;
        opacity: 0.5;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;