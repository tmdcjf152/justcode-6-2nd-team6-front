import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-reveal';
import Popup from './Popup';
import styled from 'styled-components';

const StyledTerms = styled.div`
  .terms-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1280px;
    padding: 100px;
    padding-bottom: 200px;
    margin: 0 auto;
    .terms-logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 300px;
      margin-top: 50px;
      img {
        width: 100%;
      }
    }
  }
  .terms-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    border: 1px solid #eee;
    padding: 100px;
    margin: 0 auto;
    .terms-list-inner-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .terms-title {
        width: 100%;
        margin-bottom: 30px;
        padding-bottom: 30px;
        font: bold 30px/1 'NanumBarunGothic';
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
      ul {
        width: 100%;
        border-bottom: 1px solid #ddd;
        li {
          display: flex;
          justify-content: flex-start;
          input[type='checkbox'] {
            display: none;
          }
          input[type='checkbox'] + label {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #aaa;
            border-radius: 3px;
            background: #fff;
            cursor: pointer;
          }
          input[type='checkbox']:checked + label {
            position: relative;
            background: #3d40ff;
            &::before {
              position: absolute;
              top: 3px;
              left: 3px;
              content: '\f00c';
              font-family: FontAwesome;
              font-size: 12px;
              text-align: center;
              color: #fff;
            }
          }
          span {
            width: 70%;
            padding: 0px 10px;
            margin-bottom: 35px;
            font: 16px/1 'apple';
          }
          .specialty {
            display: block;
            width: 30%;
            text-align: right;
            font: 14px/1 'apple';
            color: #aaa;
          }
          .text-color {
            color: #3f3fff;
          }
        }
      }
      .all-access {
        width: 100%;
        margin-top: 30px;
        input[type='checkbox'] {
          display: none;
        }
        input[type='checkbox'] + label {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 1px solid #aaa;
          border-radius: 3px;
          background: #fff;
          cursor: pointer;
        }
        input[type='checkbox']:checked + label {
          position: relative;
          background: #3d40ff;
          &::before {
            position: absolute;
            top: 3px;
            left: 3px;
            content: '\f00c';
            font-family: FontAwesome;
            font-size: 12px;
            text-align: center;
            color: #fff;
          }
        }
        .all-access-text {
          &:nth-of-type(1) {
            margin-left: 20px;
            margin-bottom: 5px;
            display: inline-block;
            font: bold 18px/1 'apple';
          }
          &:nth-of-type(2) {
            display: inline-block;
            width: 100%;
            padding-left: 40px;
            color: #aaa;
          }
        }
      }
      a {
        width: 100%;
        height: 50px;
        .terms-next-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          margin-top: 50px;
          background: #3d40ff;
          font: bold 16px/1 'apple';
          color: #fff;
          border: none;
          cursor: pointer;
          &:disabled {
            background: #ddd;
            cursor: default;
          }
        }
      }
    }
  }
`;

const Terms = () => {
  const [checkList, setCheckList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  // 전체동의시 모든 체크박스 활성화
  const checkAll = (e) => {
    if (checkList.length === 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    e.target.checked
      ? setCheckList(['terms1', 'terms2', 'terms3', 'terms4', 'terms5'])
      : setCheckList([]);
  };

  // 전체체크 선택시 전체선택 및 해제
  const handleCheck = (e) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((el) => el !== e.target.name));
  };

  // 필수체크 풀리면 버튼활성화 해제
  useEffect(() => {
    if (
      checkList.includes('terms1') &&
      checkList.includes('terms2') &&
      checkList.includes('terms3')
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checkList]);

  return (
    <Fade >
    <StyledTerms>
      <div className='terms-inner-box'>
        <NavLink to='/' className='terms-logo-box'>
          <img
            src={process.env.PUBLIC_URL + '/images/logo.png'}
            alt='플로리다로고'
          />
        </NavLink>

        <div className='terms-container'>
          <div className='terms-list-inner-box'>
            <span className='terms-title'>이용약관</span>
            <ul>
              <li>
                <input
                  type='checkbox'
                  name='terms1'
                  id='terms1'
                  checked={checkList.includes('terms1') ? true : false}
                  onChange={handleCheck}
                />
                <label for='terms1'></label>
                <span>
                  <span className='text-color'>(필수)</span> 이용약관
                </span>
                <span className='specialty'>전문보기</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  name='terms2'
                  id='terms2'
                  checked={checkList.includes('terms2') ? true : false}
                  onChange={handleCheck}
                />
                <label for='terms2'></label>
                <span>
                  <span className='text-color'>(필수)</span> 개인정보 수집 및
                  이용 안내
                </span>
                <span className='specialty'>전문보기</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  name='terms3'
                  id='terms3'
                  checked={checkList.includes('terms3') ? true : false}
                  onChange={handleCheck}
                />
                <label for='terms3'></label>
                <span>
                  <span className='text-color'>(필수)</span> 제 3자 제공 동의
                </span>
                <span className='specialty'>전문보기</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  name='terms4'
                  id='terms4'
                  checked={checkList.includes('terms4') ? true : false}
                  onChange={handleCheck}
                />
                <label for='terms4'></label>
                <span>
                  <span>(선택)</span> 제 3자 제공 동의(선택)
                </span>
                <span className='specialty'>전문보기</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  name='terms5'
                  id='terms5'
                  checked={checkList.includes('terms5') ? true : false}
                  onChange={handleCheck}
                />
                <label
                  for='terms5'
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {toggle === true ? <Popup /> : null}
                </label>
                <span>
                  <span>(선택)</span> 이벤트/혜택 알림 동의
                </span>
                <span className='specialty'>전문보기</span>
              </li>
            </ul>
            <div className='all-access'>
              <input
                type='checkbox'
                name='save-id'
                id='save-id'
                onClick={checkAll}
              />
              <label
                for='save-id'
                onClick={() => {
                  setToggle2(!toggle2);
                }}
              >
                {toggle2 === true ? <Popup /> : null}
              </label>
              <span className='all-access-text'>전체동의</span>
              <span className='all-access-text'>
                (선택) 이벤트/혜택 알림을 포함하여 모두 동의합니다.
              </span>
            </div>
            <NavLink to='/certification'>
              <button
                className='terms-next-btn'
                disabled={disabled}
              >
                다음
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </StyledTerms>
    </Fade>
  );
};

export default Terms;
