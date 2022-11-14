import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const LoginFooter = () => {
    return (
        <StyledLoginFooter>
            <ul className='footer-main-menu'>
                <li>
                    <Link href="#">회사소개</Link>
                </li>
                <li>
                    <Link href="#">이용약관</Link>
                </li>
                <li>
                    <Link href="#">개인정보 처리방침</Link>
                </li>
                <li>
                    <Link href="#">청소년 보호정책</Link>
                </li>
                <li>
                    <Link href="#">사업자정보 확인</Link>
                </li>
            </ul>
            <span className='company-name'>(주)플로리다컴퍼니</span>
        </StyledLoginFooter>
    );
};

export default LoginFooter;

const StyledLoginFooter = styled.div`
padding-bottom: 100px;
    .footer-main-menu{
      display: flex;
      justify-content: center;
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
    .company-name{
        display: flex;
      justify-content: center;
      margin-bottom: 100px;
      font : 13px/1 'NanumBarunGothic';
          color: #4a4a4a;

    }
`