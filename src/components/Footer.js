import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import styled from 'styled-components';






const Footer = () => {

    return (
        <StyledFooter>
            <div className="footer-inner-box">
                {/* Footer 헤더영역 */}
                <div className="footer-nav-inner-box">
                    <div className="footer-nav-list">
                        <ul>
                            <li><NavLink to="#">FRD 소개</NavLink></li>
                            <li><NavLink to="#">공지사항</NavLink></li>
                            <li><NavLink to="#">고객센터</NavLink></li>
                            <li><NavLink to="#">FRD 플레이어 다운로드</NavLink></li>
                            <li><NavLink to="#">FRD 크리에이터 스튜디오</NavLink></li>
                        </ul>
                    </div>
                    <div className="footer-sns-box">
                        <ul>
                            <li><NavLink to="#"><FaFacebookF /></NavLink></li>
                            <li><NavLink to="#"><FaInstagram /></NavLink></li>
                            <li><NavLink to="#"><FaYoutube /></NavLink></li>
                            <li><NavLink to="#"><FaTwitter /></NavLink></li>
                        </ul>
                    </div>
                </div>

                {/* Footer 메인영역 */}
                <div className="footer-main-inner-box">
                    <div className="footer-main-nav-list-box">
                        <ul className='footer-main-menu'>
                            <li><NavLink to="#">회사소개</NavLink></li>
                            <li><NavLink to="#">이용약관</NavLink></li>
                            <li><NavLink to="#">개인정보 처리방침</NavLink></li>
                            <li><NavLink to="#">청소년 보호정책</NavLink></li>
                            <li><NavLink to="#">사업자정보 확인</NavLink></li>
                        </ul>
                        <div className='footer-address-top'>
                            <span>팀명 : FLORIDA</span>
                            <span>이메일 : florida@music-florida-co.kr</span>
                            <span>사업자 등록번호 : 382-28-33943</span>
                            <span>통신판매업 신고번호 : 2000-서울강남-2939</span>
                        </div>
                        <div className='footer-address-bottom'>
                            <div className="florida">
                                <span>플로리다 : 서울특별시 서초구 강남대로 203 플로리다 20F</span><span>대표전화 : 1588-0293</span>
                            </div>
                            <div className="ilever">
                                <span>아이리버 : 서울틀별시 서초구 방배로 18길 5</span><span>대표전화 : 1577-5557</span>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <span>(주)플로리다컴퍼니 ALL RIGHTS RESERVED</span>
                            <span>본 사이트는 Chorm 및 Microsoft Edge 브라우저에서 사용 가능합니다.</span>
                        </div>
                    </div>
                </div>
            </div>

        </StyledFooter>
    );
};

export default Footer;


const StyledFooter = styled.footer`
.footer-inner-box{
    width: 1280px;
    height: 300px;
    margin: 0 auto;
    margin-bottom: 50px;
    .footer-nav-inner-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px 0px;
        border-bottom: 1px solid #ddd;
        .footer-nav-list{
            width: 50%;
            display: flex;
            ul{
                 display: flex;
                 li{
                    margin-right: 20px;
                    a{
                        font:bold 14px/1 'NanumBarunGothic' ;
                        color: #000;
                    }
                 }
                }
        }
        .footer-sns-box{
            ul{
                display: flex;
                li{
                    margin-right: 15px;
                    font-size: 18px;
                    svg{
                        color: #333;
                    }
                }
            }
       
        }
    }

    .footer-main-inner-box{
       .footer-main-menu{
      display: flex;
      li{
        margin: 20px 0px;
        a{        
            font : 13px/1 'NanumBarunGothic';
            color: #4a4a4a;
        }
        &::after{
            content: '|';
           margin: 0 10px;
            color: #aaa;
            font-size: 15px;
            line-height: 1;

        }
        &:last-child::after{content:'';}
      }
       }
       .footer-address-top{
        margin-bottom: 20px;
        font : 13px/1 'NanumBarunGothic';
            color: #4a4a4a;
            span{
                &::after{
            content: '|';
           margin: 0 5px;
            color: #aaa;
            font-size: 15px;
            line-height: 1;
        }
        &:last-child::after{content:'';}
            }
       }
       .footer-address-bottom{
        .florida{
            margin-bottom: 3px;
        }
        .ilever{
            margin-bottom: 20px;
        }
        font : 13px/1 'NanumBarunGothic';
            color: #4a4a4a;
            span{
                &::after{
            content: '|';
           margin: 0 5px;
            color: #aaa;
            font-size: 15px;
            line-height: 1;
        }
        &:last-child::after{content:'';}
        
            }
       }
       .footer-copyright{
        display: flex;
        justify-content: space-between;
        font : 12px/1 'NanumBarunGothic';
            color: #4a4a4a;
            span{
            &:nth-of-type(1){
                color: #000;
            
            }}
       }
    }
}

`