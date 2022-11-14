import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BuyMyVoucher from "../../components/purchase/BuyMyVoucher";
import NoMyVoucher from "../../components/purchase/NoMyVoucher";
import Loading from "../../components/Loading";


const My = ({ token }) => {
  const navigate = useNavigate();
  const [userVoucher, setUserVoucher] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch('/data/userVoucherdata.json')
  useEffect(() => {
    fetch("http://13.125.174.118:8000/purchase/my", {
      headers: { Authorization: sessionStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(true);
        if (res.data.length > 0) {
          setUserVoucher(res.data[0]);
        }
      });
  }, []);

  return !loading ? (
    <Loading />
  ) : (
    <StyledMy>
      <div className="my-wrap">
        {!token ? (
          <div className="full-msg">
            <div className="full-msg-cnt">
              <strong className="text-black">로그인해주세요.</strong>
              <span className="text-gray">
                로그인하시면 더욱 더 다양한
                <br />
                FLOrida를 즐길 수 있어요.
              </span>
              <div
                className="full-msg-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span>로그인</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="now-voucher-wrap">
            <section className="my-voucher-section">
              <h3 className="my-section-title">사용 중인 이용권</h3>
              <div className="voucher-card">
                {userVoucher.voucherId ? (
                  <BuyMyVoucher userVoucher={userVoucher} />
                ) : (
                  <NoMyVoucher navigate={navigate} />
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </StyledMy>
  );
};

export default My;

const StyledMy = styled.div`
  .my-wrap {
    padding-top: 40px;
    /* 로그인 X 경우 */
    .full-msg {
      position: relative;
      min-height: 410px;
      width: 100%;
      height: 500px;
      box-sizing: border-box;
      .full-msg-cnt {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        width: auto;
        transform: translate(-50%, -50%);
        .text-black {
          font-size: 20px;
          font-weight: 600;
          color: #181818;
          line-height: 1.3;
          margin-bottom: 7px;
        }
        .text-gray {
          color: #989898;
          font-size: 15px;
          line-height: 1.4;
        }
        .full-msg-btn {
          padding-top: 28px;
          width: 100%;
          span {
            width: auto;
            height: 38px;
            margin: 0 auto;
            padding: 11px 18px;
            color: #3f3fff;
            border: 1px solid #3f3fff;
            border-radius: 19px;
            font-size: 14px;
            font-weight: 600;
            line-height: 38px;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    /* 로그인 O */
    .now-voucher-wrap {
      display: block;
      .my-voucher-section {
        .my-section-title {
          margin-bottom: 12px;
          color: #333;
          font-size: 14px;
          font-weight: 500;
        }
        .voucher-card {
          margin-top: 0;
        }
      }
    }
  }
`;