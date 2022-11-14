import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import axios from "axios";
import LoginFooter from "../../components/LoginFooter";
import styled from 'styled-components';




const Certification = () => {
  const navigate = useNavigate();

  // Input값을 담을 State생성
  const [certification, setCertification] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  // 본인인증 완료 버튼 토글
  const [disabled, setDisabled] = useState(true);
  const [certificationBtn, setCertificationBtn] = useState(true);

  // 타이머 State
  const [minute, setMinute] = useState(3);
  const [second, setSecond] = useState(0);
  const [toggle, setToggle] = useState(true);

  // 이름 Input값 State에 담는 함수
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  // 이름 초기화 함수
  const onResetName = () => {
    setName(" ");
  };

  // 핸드폰번호 Input값 State에 담는 함수
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  // 핸드폰번호 초기화 함수
  const onResetPhone = () => {
    setPhone(" ");
  };
  // 인증번호 Input값 State에 담는 함수
  const onChangeCertification = (e) => {
    setCertification(e.target.value);
  };

  // 본인인증 완료 버튼 Validation
  useEffect(() => {
    if (name.length > 2 && phone.length > 10 && certification.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, phone, certification]);
  //  번호인증 버튼 Validation
  useEffect(() => {
    if (phone.length > 10) {
      setCertificationBtn(false);
    } else {
      setCertificationBtn(true);
    }
  }, [phone]);

  // 타이머 함수
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(second) > 0) {
        setSecond(parseInt(second) - 1);
      }
      if (parseInt(second) === 0) {
        if (parseInt(minute) === 0) {
          clearInterval(countdown);
        } else {
          setMinute(parseInt(minute) - 1);
          setSecond(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minute, second]);

  // 번호인증 검증버튼 Axios
  const isCertification = () => {
    axios
      .post("http://3.34.53.252:8000/users/verify", {
        phone: phone,
        verifyCode: certification,
      })
      .then((response) => {
        console.log("번호인증을 성공했습니다.", response);
        navigate("/signform");
      })
      .catch((error) => {
        console.log("번호인증을 실패했습니다.", error.response);
      });
  };

  // 인증번호 발송 Axios
  const isSend = (e) => {
    setToggle(!toggle);
    axios
      .post("http://3.34.53.252:8000/users/send", {
        phone: phone,
      })
      .then((response) => {
        console.log("인증번호를 발송했습니다.", response);
        navigate("/certification");
      })
      .catch((error) => {
        console.log("인증번호 발송을 실패했습니다.", error.response);
      });
    e.preventDefault();
  };

  // 로컬스토리지 새로고침시 제거되지 않도록 하는 코드
  useEffect(() => {
    const nameData = localStorage.getItem("name-state");
    const phoneData = localStorage.getItem("phone-state");
    if (nameData) {
      setName(JSON.parse(nameData));
    }
    if (phoneData) {
      setPhone(JSON.parse(phoneData));
    }
  }, []);

  // 로컬스토리지에 저장 코드
  useEffect(() => {
    localStorage.setItem("name-state", JSON.stringify(name));
    localStorage.setItem("phone-state", JSON.stringify(phone));
  }, [name, phone]);

  return (
    <Fade>
      <StyledCertification>
        <div className="certification-inner-box">
          {/* 로고박스 */}
          <NavLink to="/" className="certification-logo-box">
            <img
              src={process.env.PUBLIC_URL + "/Images/logo.png"}
              alt="플로리다로고"
            />
          </NavLink>
          <div className="certification-container">
            {/* 본인인증 타이틀 */}
            <div className="certification-title-box">
              <span className="certification-title">본인인증</span>
            </div>

            {/* 본인인증 폼박스 */}
            <div className="certification-form-box">
              <div className="certification-name-input">
                {/* 이름 Input */}
                <input
                  type="text"
                  placeholder="이름"
                  onChange={onChangeName}
                  value={name}
                />
                {/* 리셋 버튼 */}
                {name.length > 0 ? (
                  <button
                    type="reset"
                    className="reset-btn"
                    onClick={onResetName}
                  >
                    X
                  </button>
                ) : null}
              </div>

              <div className="certification-tel-input">
                {/* 폰번호 Input */}
                <input
                  type="number"
                  placeholder="휴대폰 번호(-제외)"
                  name="phonenumber"
                  id="phonenumber"
                  onChange={onChangePhone}
                  value={phone}
                />
                {/* 리셋버튼 */}
                {phone.length > 0 ? (
                  <button
                    type="reset"
                    className="reset-btn"
                    onClick={onResetPhone}
                  >
                    X
                  </button>
                ) : null}
                {/* 인증번호전송 버튼 */}
                <button
                  type="submit"
                  className={
                    certificationBtn === true
                      ? "submit-btn-off"
                      : "submit-btn-on"
                  }
                  onClick={isSend}
                >
                  인증번호 전송
                </button>
              </div>
            </div>

            {certificationBtn === false ? (
              <div className="certification-number-box">
                {/* 인증번호 Input */}
                {toggle === false ? (
                  <input
                    type="text"
                    placeholder="인증번호"
                    onChange={onChangeCertification}
                    value={certification}
                  />
                ) : null}
                {/* 타이머 */}
                {toggle === false ? (
                  <span className="timer">
                    {" "}
                    {minute}:{second < 10 ? `0${second}` : second}
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* 본인인증 완료 버튼 */}
            <span
              className={
                certification.length === 6
                  ? "certification-btn-on"
                  : "certification-btn-off"
              }
              disabled={disabled}
              onClick={isCertification}
            >
              본인인증 완료
            </span>
          </div>
        </div>
        <LoginFooter />
      </StyledCertification>
    </Fade>
  );
};

export default Certification;

const StyledCertification = styled.div`
  .certification-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1280px;
    padding: 100px;
    margin: 0 auto;
    .certification-logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 300px;
      margin-top: 100px;
      img {
        width: 100%;
      }
    }
    .certification-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 100%;
      border: 1px solid #eee;
      padding-top: 0px;
      padding: 0px;
      margin: 0 auto;
      /* 본인인증 타이틀 */
      .certification-title-box {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 50px 0px;
        font: bold 30px/1 "apple";
      }
      /* 본인인증 폼박스 */
      .certification-form-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        /* 이름 */
        .certification-name-input {
          position: relative;
          display: flex;
          flex-direction: column;
          input[type="text"] {
            width: 400px;
            height: 50px;
            margin-bottom: 50px;
            border: none;
            border-bottom: 1px solid #eee;
          }
          .reset-btn {
            position: absolute;
            top: 12px;
            right: 10px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
          }
          .name-error {
            position: absolute;
            top: 60px;
            font: 13px/1 "apple";
            color: red;
          }
        }
        /* 폰번호 */
        .certification-tel-input {
          position: relative;
          input[type="number"] {
            width: 400px;
            height: 50px;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #eee;
          }
          // 리셋버튼
          .reset-btn {
            position: absolute;
            top: 13px;
            right: 110px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
          }

          /* 인증번호 전송 버튼 */
          .submit-btn-on {
            position: absolute;
            top: 10px;
            right: 5px;
            width: 100px;
            height: 30px;
            padding: 5px;
            border: none;
            border-radius: 30px;
            background: #3d40ff;
            color: #fff;
            cursor: pointer;
          }
          .submit-btn-off {
            position: absolute;
            top: 10px;
            right: 5px;
            width: 100px;
            height: 30px;
            padding: 5px;
            border: none;
            border-radius: 30px;
            background: #ddd;
            color: #fff;
            cursor: default;
          }
        }
      }

      /* 인증번호 입력 박스 */
      .certification-number-box {
        position: relative;
        display: flex;
        flex-direction: column;
        input[type="text"] {
          width: 400px;
          height: 50px;
          margin-bottom: 50px;
          border: none;
          border-bottom: 1px solid #eee;
        }
        .timer {
          position: absolute;
          top: 15px;
          right: 10px;
          color: #3d40ff;
        }
      }

      /* 본인인증 버튼 활성화 */
      .certification-btn-on {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 50px;
        margin-bottom: 50px;
        background-color: #3d40ff;
        border: none;
        color: #fff;
        cursor: pointer;
      }
      /* 본인인증 버튼 비활성화 */
      .certification-btn-off {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 50px;
        margin-bottom: 50px;
        background: #ddd;
        border: none;
        color: #fff;
        pointer-events: none;
      }
    }
  }
`;