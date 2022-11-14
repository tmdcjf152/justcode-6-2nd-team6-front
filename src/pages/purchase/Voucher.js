import React from 'react';
import VoucherCard from '../../components/purchase/VoucherCard';
import styled from 'styled-components';



const Voucher = () => {
  return (
    <StyledVoucher>
      <div className='voucher-wrap'>
        <ul className='voucher-cardlist'>
          <li>
            <div className='voucher-carditem voucher-banner'>
              <div className='voucher-banner-text'>
                <span className='banner-text'>
                  FLOrida 첫구매라면{' '}
                  <span className='color-mint'>첫 달 100원!</span>
                </span>
              </div>
              <div className='voucher-banner-item'>
                <div className='card-left'>
                  <h3 className='name'>(첫 구매) 무제한 듣기 정기결제</h3>
                </div>
                <div className='card-right'>
                  <ul className='voucher-list-sub'>
                    <li>
                      <div className='item'>
                        <div className='item-right'>
                          <span className='price-box'>
                            <del className='first-cost'>정가 8,000원</del>
                            <span className='price'>
                              <em>100</em>원
                            </span>
                          </span>
                          <button type='button' className='btn-buy'>
                            구매
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <button type='button' className='btn-detail'>
                  이용권 자세히보기
                  <img
                    alt='화살표'
                    src='/Images/next.png'
                    className='next-arrow-img'
                  />
                </button>
              </div>
            </div>
          </li>
          <VoucherCard />
        </ul>
        <div className='pass-notice'>
          <h3 className='notice-title'>이용권 유의사항</h3>
        </div>
      </div>
    </StyledVoucher>
  );
};

export default Voucher;

const StyledVoucher = styled.div`
  .voucher-wrap {
    padding: 40px;
    .voucher-cardlist {
      list-style: none;
      li {
        /* 공통부분 */
        .voucher-carditem {
          display: flex;
          flex-wrap: wrap;
          min-height: 200px;
          margin-bottom: 20px;
          border-radius: 8px;
          box-sizing: border-box;
          .card-left > .name {
            font-size: 20px;
            line-height: 1.2;
            font-weight: 600;
          }
          .card-right {
            align-self: center;
            .voucher-list-sub .item {
              display: flex;
              align-items: center;
              .item-right {
                margin-left: 10px;
                .price-box {
                  display: inline-block;
                  line-height: 1.2;
                  .first-cost {
                    font-size: 13px;
                    vertical-align: middle;
                    text-decoration: line-through;
                  }
                  .price {
                    font-size: 16px;
                    vertical-align: middle;
                    em {
                      font-size: 20px;
                      vertical-align: middle;
                    }
                  }
                }
                .btn-buy {
                  display: inline-block;
                  min-width: 60px;
                  height: 32px;
                  padding: 0 17px;
                  font-size: 14px;
                  line-height: 33px;
                  color: #fff;
                  background-color: #3f3fff;
                  text-align: center;
                  border: none;
                  border-radius: 22px;
                  box-sizing: border-box;
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
        /* Banner 부분 */
        .voucher-banner {
          position: relative;
          padding: 0 0 40px;
          background-color: rgb(150, 105, 232);
          .voucher-banner-text {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 0;
            font-size: 30px;
            font-weight: 800;
            .banner-text {
              color: white;
              text-align: center;
              .color-mint {
                color: #11efef;
              }
            }
          }
          .voucher-banner-item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0 165px;
            margin-top: 5px;
            box-sizing: border-box;
            .card-left {
              flex: 0 1 auto;
              width: auto;
              margin: 0;
              padding: 0;
              .name {
                color: #fff;
                margin-top: 0;
                letter-spacing: -0.3px;
              }
            }
            .card-right {
              flex: 0 0 auto;
              margin-left: 22px;
              padding-left: 0;
              border: 0;
              .voucher-list-sub {
                list-style: none;
                li {
                  .item {
                    text-align: center;
                    justify-content: normal;
                    .item-right {
                      flex: 0 1 auto;
                      text-align: right;
                      .btn-buy {
                        margin-left: 10px;
                      }
                      .price-box > .first-cost {
                        margin-right: 5px;
                        color: hsla(0, 0%, 100%, 0.7);
                      }
                      .price-box > .price {
                        color: white;
                      }
                    }
                  }
                }
              }
            }
            .btn-detail {
              position: absolute;
              bottom: auto;
              right: 40px;
              left: auto;
              font-size: 12px;
              background-color: transparent;
              color: white;
              border: none;
              .next-arrow-img {
                position: absolute;
                top: 2px;
                width: 15px;
                height: 15px;
                vertical-align: middle;
                color: white;
              }
              &:hover {
                cursor: pointer;
              }
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
    }
  }
`;