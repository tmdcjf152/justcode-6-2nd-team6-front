import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import naverpay from "../../Img/naverpay.png";
import kakaopay from "../../Img/kakaopay.png";
import styled from "styled-components";



const PaymentTerms = ({ closeModal, voucherId, salePrice, paymentType }) => {
  const [checkList, setCheckList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  // 결제수단 클릭시 색깔 변화
  const [isNaverPayClicked, setIsNaverPayClicked] = useState(false);
  const [isKakaoPayClicked, setIsKakaoPayClicked] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [isPhoneAllClicked, setIsPhoneAllClicked] = useState(false);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  // 결제수단 클릭시 Post로 보낼 경우 필요!
  const [payWith, setPayWith] = useState("");
  const navigate = useNavigate();

  // 전체체크 선택시 전체 선택 or 전체해제
  const checkAll = (e) => {
    e.target.checked ? setCheckList(["check0", "check1"]) : setCheckList([]);
  };

  // 체크박스 전체선택시 모두선택 체크박스 활성화시키기
  const handleCheck = (e) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((el) => el !== e.target.name));
  };

  // 필수체크 풀리면 버튼활성화 해제
  useEffect(() => {
    if (checkList.includes("check0") && checkList.includes("check1")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checkList]);

  // 결제하기 버튼 클릭 시 POST 방식
  const onPayClick = () => {
    fetch("http://13.125.174.118:8000/purchase/my", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        voucherId: voucherId,
        payment: salePrice,
        payWith: payWith,
        paymentType: paymentType,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "PURCHASE_SUCCESS") {
          alert("결제되었습니다!");
          navigate("/");
        } else {
          alert("결제에 실패하였습니다.");
        }
      });
  };

  return (
    <StyledPaymentTerms>
      <div className="payment-option">
        <h3 className="payment-option-title">결제방법</h3>
        <div className="options-list">
          <button
            type="button"
            className={isNaverPayClicked ? "btn-selected" : "btn-primary"}
            onClick={() => {
              setPayWith("네이버페이");
              setIsNaverPayClicked(true);
              setIsKakaoPayClicked(false);
              setIsCardClicked(false);
              setIsPhoneAllClicked(false);
              setIsPhoneClicked(false);
            }}
          >
            <span className="btn-naverpay pay-img">네이버페이</span>
          </button>
          <button
            type="button"
            className={isKakaoPayClicked ? "btn-selected" : "btn-primary"}
            onClick={() => {
              setPayWith("카카오페이");
              setIsNaverPayClicked(false);
              setIsKakaoPayClicked(true);
              setIsCardClicked(false);
              setIsPhoneAllClicked(false);
              setIsPhoneClicked(false);
            }}
          >
            <span className="btn-kakaopay pay-img">카카오페이</span>
          </button>
          <button
            type="button"
            className={isCardClicked ? "btn-selected" : "btn-primary"}
            onClick={() => {
              setPayWith("신용/체크카드");
              setIsNaverPayClicked(false);
              setIsKakaoPayClicked(false);
              setIsCardClicked(true);
              setIsPhoneAllClicked(false);
              setIsPhoneClicked(false);
            }}
          >
            <span>신용/체크카드</span>
          </button>
          <button
            type="button"
            className={isPhoneAllClicked ? "btn-selected" : "btn-primary"}
            onClick={() => {
              setPayWith("휴대폰(공통)");
              setIsNaverPayClicked(false);
              setIsKakaoPayClicked(false);
              setIsCardClicked(false);
              setIsPhoneAllClicked(true);
              setIsPhoneClicked(false);
            }}
          >
            <span>휴대폰(공통)</span>
          </button>
          <button
            type="button"
            className={isPhoneClicked ? "btn-selected" : "btn-primary"}
            onClick={() => {
              setPayWith("휴대폰(SKT)");
              setIsNaverPayClicked(false);
              setIsKakaoPayClicked(false);
              setIsCardClicked(false);
              setIsPhoneAllClicked(false);
              setIsPhoneClicked(true);
            }}
          >
            <span>휴대폰(SKT)</span>
          </button>
        </div>
        <p className="agree-check-all">
          <input
            type="checkbox"
            id="AgreeAll"
            name="AgreeAll"
            onChange={checkAll}
            checked={checkList.length === 2 ? true : false}
          />
          <label htmlFor="AgreeAll"></label>
          <span>아래 내용에 모두 확인, 동의 합니다.</span>
        </p>
        <ul>
          <li className="has-view">
            <input
              type="checkbox"
              id="check0"
              name="check0"
              checked={checkList.includes("check0") ? true : false}
              onChange={handleCheck}
            />
            <label htmlFor="check0"></label>
            <span>
              <em className="mandatory">(필수)</em>상기 결제내역과 이용약관 및
              하단 유의사항에 동의합니다.
            </span>
            <a href="#" className="txtBtn btn-view" target="_blank">
              <span>약관확인</span>
            </a>
          </li>
          <li>
            <input
              type="checkbox"
              id="check1"
              name="check1"
              checked={checkList.includes("check1") ? true : false}
              onChange={handleCheck}
            />
            <label htmlFor="check1"></label>
            <span>
              <em className="mandatory">(필수)</em>본 이용권은 결제 시점으로부터
              1개월의 사용기간을 기준으로 하는 월 단위 상품으로, 결제하신
              이용권의 사용기간을 기준으로 하는 월 단위 상품으로, 결제하신
              이용권의 사용기간 만료일자 1일 전 별도의 고지 없이 자동 정기 결제
              되는 것에 동의합니다.
            </span>
          </li>
        </ul>
      </div>
      <div className="btn-wrap bottom-fixed">
        <button className="btn-cancel-pay" onClick={closeModal}>
          결제취소
        </button>
        <button className="btn-pay" disabled={disabled} onClick={onPayClick}>
          결제하기
        </button>
      </div>
    </StyledPaymentTerms>
  );
};

export default PaymentTerms;

const StyledPaymentTerms = styled.div`
  .payment-option {
    width: 88.88%;
    margin: 0 auto;
    text-align: left;
    padding: 50px 0 30px 0;
    .payment-option-title {
      font-size: 16px;
      color: #181818;
      font-weight: 600;
      height: 30px;
    }
    .options-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 -5px 15px;
      // 버튼 눌렀을 때 나오는 효과!
      .btn-selected {
        width: calc(49.6499% - 10px);
        height: 52px;
        margin: 0 5px 10px 5px;
        line-height: 16px;
        vertical-align: middle;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #3f3fff !important;
        color: #3f3fff;
        font-weight: 600;
      }
      .btn-primary {
        width: calc(49.6499% - 10px);
        height: 52px;
        margin: 0 5px 10px 5px;
        line-height: 16px;
        vertical-align: middle;
        border: 1px solid #ebebeb;
        font-size: 14px;
        background-color: #fff;
        color: #9d9d9d;
        .pay-img {
          display: inline-block;
          vertical-align: middle;
          color: transparent;
          font-size: 0;
          text-indent: 100%;
          overflow: hidden;
          background-size: 100% auto;
          background-repeat: no-repeat;
        }
        .btn-naverpay {
          width: 60px;
          height: 19px;
          background-image: url(${naverpay});
        }
        .btn-kakaopay {
          width: 45px;
          height: 15px;
          margin-top: 1px;
          background-image: url(${kakaopay});
        }
      }
    }
    .agree-check-all {
      margin-bottom: 7px;
      padding-bottom: 11px;
      border-bottom: 1px solid #f8f8f8;
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
        font-size: 12.8px;
        color: #181818;
        overflow: hidden;
        padding-left: 15px;
        min-height: 25px;
        line-height: 25px;
      }
    }
    ul {
      list-style: none;
      li {
        position: relative;
        padding: 7px 0;
        width: 100%;
        font-weight: 500;
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
          font-size: 12.8px;
          color: #181818;
          padding-left: 15px;
          min-height: 25px;
          line-height: 25px;
          .mandatory {
            color: #3f3fff;
            margin-right: 5px;
          }
        }
      }
    }
    .has-view > span {
      padding-right: 80px;
    }
    .has-view > .btn-view {
      position: absolute;
      top: 10.4px;
      right: 0;
      font-size: 12.8px;
      color: #929292;
      text-decoration: none;
      span {
        display: block !important;
        text-decoration: underline;
        font-size: 14px;
      }
    }
  }
  .btn-wrap {
    z-index: 2;
    button {
      height: 100%;
      font-size: 16px;
      font-weight: 600;
      line-height: 60px;
      text-align: center;
      border: 0;
    }
  }
  .bottom-fixed {
    width: 500px;
    height: 62px;
    margin: 0 auto 30px auto;
    display: block;
    position: static;
    left: auto;
    right: auto;
    bottom: auto;
    button {
      width: 248px;
      margin: 0 auto;
      display: inline-block;
    }
    .btn-cancel-pay {
      float: left;
      background-color: #7f7f7f;
      color: #fff;
    }
    .btn-pay {
      float: right;
      background-color: #3f3fff;
      color: #fff;
      &:disabled {
        background: rgb(63, 63, 255, 0.3);
      }
    }
  }
`;