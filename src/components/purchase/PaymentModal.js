import React from "react";
import { Link } from 'react-router-dom';
import PaymentTerms from "./PaymentTerms";
import styled from "styled-components";


const PaymentModal = ({
  setModalOpen,
  voucherName,
  paymentName,
  originPrice,
  salePrice,
  paymentType,
  voucherId,
}) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledPaymentModal>
      <div className="payment-inner-box">
        <div className="payment-wrapper">
          <div className="payment-modal">
            <span onClick={closeModal} className="modal-close">
              X
            </span>
            <h1 className="payment-title">이용권 구매</h1>
            <div className="payment-form">
              <h3 className="payment-form-title">
                <span>
                  {voucherName} {paymentName}
                </span>
              </h3>
              <div className="payment-form-membership">
                {paymentName === "T멤버십" ? (
                  <div className="membership">
                    <div className="membership-header">
                      <p className="membership-bi">T멤버십 적용</p>
                    </div>
                    <div className="membership-policy">
                      <div className="membership-check">
                        <input
                          type="checkbox"
                          id="checkPolicy"
                          name="checkPolicy"
                        />
                        <label htmlFor="checkPolicy"></label>
                        <span>개인정보 제3자 제공 동의</span>
                        <Link target="_blank" className="btn-view">
                          보기
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="payment-form-sum">
                <ul className="list-sum">
                  {paymentName !== "1개월권" && (
                    <li>
                      <span className="th">기본 결제 금액</span>
                      <span className="td">
                        <em>{originPrice}</em>원
                      </span>
                    </li>
                  )}
                  {paymentName === "정기결제" ? (
                    <li>
                      <span className="th emColor">할인적용</span>
                      <span className="td emColor">
                        <em>-100</em>원
                      </span>
                    </li>
                  ) : null}
                  <li className="final">
                    <span className="th">최종 결제금액</span>
                    <span className="td price">
                      <span className="discounted">
                        <em>{salePrice}</em>원
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <PaymentTerms
              closeModal={closeModal}
              salePrice={salePrice}
              paymentType={paymentType}
              voucherId={voucherId}
            />
          </div>
        </div>
      </div>
    </StyledPaymentModal>
  );
};

export default PaymentModal;

const StyledPaymentModal = styled.div`
  .payment-inner-box {
    position: absolute;
    z-index: 1200;
    .payment-wrapper {
      position: fixed;
      inset: 0;
      display: flex;
      padding: 120px 0 130px 0;
      background-color: rgba(0, 0, 0, 0.7);
      .payment-modal {
        font-family: "NanumBarunGothic", sans-serif;
        overflow-y: scroll;
        position: relative;
        min-width: 560px;
        width: 560px;
        margin: 0 auto;
        height: 100%;
        background-color: #fff;
        padding: 30px 0 75px 0 !important;
        box-sizing: border-box;
        .modal-close {
          position: absolute;
          right: 20px;
          top: 20px;
          z-index: 1000;
          color: black;
          font-weight: 600;
          &:hover {
            cursor: pointer;
          }
        }
        .payment-title {
          height: 40px !important;
          margin: 0 auto;
          padding: 0;
          position: inherit;
          text-align: center !important;
          width: 88.88%;
          font-size: 20px !important;
          font-weight: 600;
          color: #333;
        }
        .payment-form {
          width: 88.88%;
          margin: 0 auto;
          text-align: left;
          border: 1px solid #ebebeb;
          padding-bottom: 20px;
          .payment-form-title {
            height: 70px;
            background-color: #eef2ff;
            position: relative;
            span {
              display: block;
              width: 90%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 18px;
              font-weight: 600;
              line-height: 1.1;
              text-align: center;
            }
          }
          .payment-form-membership {
            padding: 24px 30px;
            .membership > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .membership > .membership-header > .membership-bi {
              font-size: 16px;
              line-height: 24px;
              color: #333;
            }
            .membership > .membership-policy {
              width: 100%;
              margin-top: 20px;
              .membership-check {
                display: flex;
                align-items: center;
                flex-grow: 1;
                font-size: 13px;
                line-height: 14px;
                input[type="checkbox"] {
                  display: none;
                }
                input[type="checkbox"] + label {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  border: 1px solid #aaa;
                  border-radius: 3px;
                  background: #fff;
                  cursor: pointer;
                }
                input[type="checkbox"]:checked + label {
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
                  margin-left: 15px;
                }
                .btn-view {
                  padding-left: 10px;
                  font-size: 13px;
                  line-height: 14px;
                  letter-spacing: -0.4px;
                  color: #989898;
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .payment-form-sum {
            padding: 0 30px;
            .list-sum {
              width: 100%;
              list-style: none;
              li {
                width: 100%;
                min-height: 35px;
                color: #333;
                display: table;
                table-layout: auto;
                .th {
                  display: table-cell;
                  vertical-align: middle;
                  padding: 0;
                  font-size: 15px;
                  color: #aaa;
                }
                .td {
                  display: table-cell;
                  vertical-align: middle;
                  padding: 0;
                  font-size: 16px;
                  text-align: right;
                  em {
                    font-style: normal;
                  }
                }
                .emColor {
                  color: #db2359;
                }
              }
              .final {
                .th {
                  color: #333;
                }
                .td {
                  font-size: 20px !important;
                  color: #3f3fff;
                  font-weight: 600;
                  .discounted {
                    color: #3f3fff;
                    font-size: 22px;
                    font-weight: 600;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;