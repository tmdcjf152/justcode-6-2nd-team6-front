import React from 'react';
import styled from 'styled-components';



const Affiliate = () => {
  return (
    <StyledAffiliate>
      <div className='affiliate-wrap'>
        <ul className='affiliate-cardlist'>
          <li>
            <div className='affilite-carditem'>
              <div className='card-left'>
                <h3 className='name'>Wave&FLOrida 무제한 이용권</h3>
                <p className='desc'>
                  이용권 하나로 모든 음악과 방송, 영화, 해외시리즈까지!
                </p>
              </div>
              <div className='card-right'>
                <div className='item'>
                  <span className='price-box'>
                    <span className='subject'>Wave&FLOrida 무제한 이용권</span>
                    <span className='price'>
                      <em>12,500</em>원
                    </span>
                  </span>
                  <button type='button' className='btn-buy'>
                    구매
                  </button>
                </div>
                <h4 className='blind'>결합상품 정보</h4>
                <ul className='voucher-combi-list'>
                  <li>
                    <div className='combi-logo'>
                      <img alt='플로리다로고' src='/Images/logo.png' />
                    </div>
                    <div className='combi-info'>
                      <strong className='subject'>무제한 듣기</strong>
                      <p className='desc'>기기제한 없음, 무제한 스트리밍</p>
                    </div>
                  </li>
                  <img
                    alt='플러스'
                    src='/Images/plus.png'
                    className='plus-img'
                  />
                  <li>
                    <div className='combi-logo'>
                      <img alt='웨이브' src='/Images/letter-w.png' />
                    </div>
                    <div className='combi-info'>
                      <strong className='subject'>Basic</strong>
                      <p className='desc'>동시시청 1회선,HD화질,모바일+PC</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button type='button' className='btn-detail'>
                이용권 자세히 보기
                <img
                  alt='화살표'
                  src='/Images/next.png'
                  className='next-arrow-img'
                />
              </button>
            </div>
          </li>
          <li>
            <div className='affilite-carditem'>
              <div className='card-left'>
                <h3 className='name'>NO24 북클럽 X FLOrida 99 요금제</h3>
                <p className='desc'>
                  NO24 북클럽 X FLOrida 결합상품 책과 음악, 무제한으로 즐기기
                </p>
              </div>
              <div className='card-right'>
                <div className='item'>
                  <span className='price-box'>
                    <span className='subject'>
                      NO24 북클럽 X FLOrida 99 요금제
                    </span>
                    <span className='price'>
                      <em>9,000</em>원
                    </span>
                  </span>
                  <button type='button' className='btn-buy'>
                    바로가기
                  </button>
                </div>
                <h4 className='blind'>결합상품 정보</h4>
                <ul className='voucher-combi-list'>
                  <li>
                    <div className='combi-logo'>
                      <img alt='플로리다로고' src='/Images/logo.png' />
                    </div>
                    <div className='combi-info'>
                      <strong className='subject'>모바일 무제한 듣기</strong>
                      <p className='desc'>모바일 전용, 무제한 스트리밍</p>
                    </div>
                  </li>
                  <img
                    alt='플러스'
                    src='/Images/plus.png'
                    className='plus-img'
                  />
                  <li>
                    <div className='combi-logo'>
                      <img alt='북클럽' src='/Images/book-club.png' />
                    </div>
                    <div className='combi-info'>
                      <strong className='subject'>eBook 무제한 독서</strong>
                      <p className='desc'>1만권이 넘는 eBook이 무제한</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button type='button' className='btn-detail'>
                이용권 자세히 보기
                <img
                  alt='화살표'
                  src='/Images/next.png'
                  className='next-arrow-img'
                />
              </button>
            </div>
          </li>
        </ul>
        <div className='pass-notice'>
          <h3 className='notice-title'>구매안내</h3>
          <ul className='no-dot'>
            <li>
              <ul>
                <li>이용권 구매 시 부가가치세(10%)가 별도 부가됩니다.</li>
                <li>
                  음원 권리사의 요청으로 특정 음원의 경우 서비스 이용이 제한 될
                  수 있습니다.
                </li>
                <li>
                  이용권 구매 관련 문의사항은 각 상품 별 구매처에 문의해주세요.
                </li>
                <li>
                  wave&FLOrida 무제한 : FLOrida 1:1 문의 또는 1599-6034(유료)
                </li>
                <li>NO24 북클럽 X FLOrida 99 요금제 : 1544-3800</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </StyledAffiliate>
  );
};

export default Affiliate;

const StyledAffiliate = styled.div`
  .affiliate-wrap {
    padding: 40px;
    .affiliate-cardlist {
      list-style: none;
      li {
        list-style: none;
        .affilite-carditem {
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
            width: 310px;
            margin-right: 14px;
            padding-bottom: 40px;
            .name {
              margin-top: 4px;
              font-size: 20px;
              line-height: 1.2;
              color: #000;
              font-weight: 600;
            }
            .desc {
              margin-top: 17px;
              font-size: 13px;
              line-height: 20px;
              color: #555;
            }
          }
          .card-right {
            flex: 1;
            align-self: center;
            .item {
              position: relative;
              margin-bottom: 30px;
              text-align: right;
              .price-box {
                line-height: 1.2;
                display: inline-block;
                .subject {
                  margin-right: 20px;
                  font-size: 16px;
                  color: #181818;
                  vertical-align: middle;
                }
                .price {
                  font-size: 20px;
                  color: #3f3fff;
                  vertical-align: middle;
                }
              }
              .btn-buy {
                margin-left: 20px;
                padding: 5px 17px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-color: #3f3fff;
                border: none;
                border-radius: 22px;
                box-sizing: border-box;
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .blind {
              position: absolute;
              overflow: hidden;
              margin: -1px;
              width: 1px;
              height: 1px;
            }
            .voucher-combi-list {
              list-style: none;
              position: relative;
              li {
                position: relative;
                display: flex;
                align-items: center;
                min-height: 95px;
                padding: 24px 45px;
                margin: 10px 0;
                background-color: #fff;
                border-radius: 8px;
                box-sizing: border-box;
                .combi-logo {
                  width: 155px;
                  margin-right: 20px;
                  img {
                    width: 54px;
                    vertical-align: top;
                  }
                }
                .combi-info {
                  flex: 0 1 100%;
                  margin-top: 5px;
                  .subject {
                    font-size: 16px;
                    color: #181818;
                  }
                  .desc {
                    margin-top: 17px;
                    font-size: 13px;
                    color: #929292;
                  }
                }
              }
              .plus-img {
                width: 33px;
                height: 33px;
                border-radius: 50%;
                position: absolute;
                top: 88px;
                left: 245px;
                z-index: 2;
              }
            }
          }
          .btn-detail {
            position: absolute;
            bottom: 57px;
            left: 60px;
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
      }
    }
    .pass-notice {
      padding-top: 30px;
      text-align: left;
      width: 955px;
      .notice-title {
        height: 25px;
        color: #222;
        font-size: 14px;
        font-weight: 600;
      }
      .no-dot {
        list-style: none;
        li {
          padding-left: 0;
          margin-top: 5px;
          font-size: 13px;
          line-height: 1.4;
          color: #777;
          padding-bottom: 7px;
        }
      }
    }
  }
`;