import React from "react";
import { NavLink } from "react-router-dom";
import { Bounce, Slide, Fade, Roll, LightSpeed } from "react-reveal";
import styled, { keyframes } from "styled-components";



const CreateStudio = ({ isLogin }) => {
  return (
    <StyledCreateStudio>
      <div className="createstudio-inner-box">
        {/* 메인 */}
        <div className="createstudio-main-inner-box">
          <h1>
            <Roll bottom cascade>
              FLORIDA
              <br />
              CREATOR
            </Roll>
          </h1>
          {/* 탑타이틀 */}
          <Bounce>
            <div className="top-title">
              <span className="top-title-text-1">
                <roll top cascade>
                  너의
                </roll>
              </span>
              <div className="top-title-img">
                <div className="img-animation"></div>
              </div>
              <span className="top-title-text-2">
                <roll top cascade delay={300}>
                  들려줘
                </roll>
              </span>
            </div>
          </Bounce>

          {/* 콘텐츠 */}
          <Slide delay={500}>
            <div className="content-inner-box">
              <span className="content-text">
                <Bounce cascade delay={500}>
                  국내 최대 오디오 오픈 플랫폼
                  <br />
                  FLORIDA에서는 누구나 오디오를 직접
                  <br />
                  제작하고, 공유할 수 있습니다.
                </Bounce>
              </span>
            </div>
            {/* 콘텐츠박스1 */}
            <section className="content-box-1">
              <div className="content-img-box">
                <Roll left delay={500}>
                  <img
                    src="https://cdn.pixabay.com/photo/2016/12/06/01/26/colour-1885352_1280.jpg"
                    alt=""
                  />
                </Roll>
              </div>
              <div className="content-text-box">
                <span className="title">FLORIDA에서 가장 쉽게 데뷔하세요.</span>
                <span className="text">
                  나누고 싶은 음악, 나만 아는 정보, ARMR 등<br />
                  어떤 주제도 좋아요!
                  <br />
                  오디오만으로 크리에이터가 될 수 있어요.
                </span>
              </div>
            </section>
            {/* 콘텐츠박스2 */}
            <section className="content-box-1">
              <div className="content-text-box">
                <span className="title">
                  나와 잘 통하는 사람들을
                  <br />
                  만날 수 있어요.
                </span>
                <span className="text">
                  빠르게 청취자를 늘리고
                  <br />
                  FLORIDA르 넘어 팬 플랫폼, 메타버스를 통해
                  <br />
                  소통할 수 있게 도와드립니다.
                </span>
              </div>
              <div className="content-img-box">
                <Roll right delay={500}>
                  <img
                    src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
                    alt=""
                  />
                </Roll>
              </div>
            </section>
            {/* 콘텐츠박스3 */}
            <section className="content-box-1">
              <div className="content-img-box">
                <Roll left delay={500}>
                  <img
                    src="https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg"
                    alt=""
                  />
                </Roll>
              </div>

              <div className="content-text-box">
                <span className="title">
                  내가 만든 오디오로
                  <br />
                  수익을 창출해보세요.
                </span>
                <span className="text">
                  업계 최고 수준의 재생 당 정산률에 더불어
                  <br />
                  총상금 1억의 파격 프로모션 혜택을 제공합니다.
                  <br />
                  지금 바로 부담 없이 도전해 보세요!
                </span>
              </div>
            </section>

            {/* 콘텐츠2 */}
            <div className="content-create-inner-box">
              <Fade right delay={500}>
                <span className="content-create-title">
                  지금
                  <br />
                  FLORIDA <span className="color-blue">크리에이터</span> 가
                  <br />
                  된다면
                </span>
              </Fade>
              <span className="content-create-sub-title">
                FLORIDA와 함께 빠르게 성장해 나갈 수 있도록 A-Z를 지원합니다.
              </span>
              <div className="content-create-section-box">
                {/* 센셕박스1 */}
                <section className="section-box">
                  <div className="section-box-text-box">
                    <span className="section-title">
                      <Bounce right cascade delay={500}>
                        업계 최고, 청취 당 수익 창출!
                      </Bounce>
                    </span>
                    <span className="section-text">
                      <Fade cascade delay={500}>
                        음악저작권과 동일하게 내 오디오가 재생될 때마다 수익을
                        창출해 보세요.
                      </Fade>
                    </span>
                    <span className="section-sub-text">
                      <Fade cascade delay={500}>
                        정산 금액: 건 당 50원, 변경/종료 공지 시까지
                        <br />
                        정산 기준에 대한 내용은 FLORIDA 크리에이터 스튜디오의
                        정산 가이드를 참고해주세요.
                      </Fade>
                    </span>
                  </div>
                </section>
                {/* 섹션박스2 */}
                <section className="section-box">
                  <div className="section-box-text-box">
                    <span className="section-title">
                      <Bounce right cascade>
                        메인 노출 및 마케팅 지원
                      </Bounce>
                    </span>
                    <span className="section-text">
                      <Fade cascade>
                        오디오만 만들면 홍보는 FLORIDA가 해드려요.
                        <br />더 많은 사람들이 들을 수 있도록 메인 노출과
                        마케팅을 지원합니다.
                      </Fade>
                    </span>
                    <span className="section-sub-text">
                      <Fade cascade>* 선정된 크리에이터에 한해</Fade>
                    </span>
                  </div>
                </section>
                {/* 섹션박스3 */}
                <section className="section-box">
                  <div className="section-box-text-box">
                    <span className="section-title">
                      <Bounce right cascade delay={300}>
                        오픈 기념 프로모션
                      </Bounce>
                    </span>
                    <span className="section-text">
                      <Fade cascade delay={300}>
                        우수 프로그램 선정 시 총 상금 1억!
                        <br />
                        조건만 달성하면 100% 추가 혜택 제공까지!
                      </Fade>
                    </span>
                    <span className="section-sub-text">
                      <Fade cascade delay={300}>
                        * 조건 : 에피소드 2개, 클립 길이의 총 합 10분 이상 +
                        팔로잉 수 10명
                      </Fade>
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </Slide>

          {/* 배너 */}
          <LightSpeed right delay={500}>
            <div className="content-create-banner">
              <div className="banner"></div>
            </div>
          </LightSpeed>

          <span className="last-text">
            {" "}
            <Bounce top cascade>
              지금 바로 도전하세요!
            </Bounce>
          </span>
          <Bounce top>
            <NavLink
              to={isLogin === true ? "/" : "/login"}
              className="sign-btn"
            >
              크리에이터 신청하기
            </NavLink>
          </Bounce>
        </div>
      </div>
    </StyledCreateStudio>
  );
};

export default CreateStudio;

const titleanimation = keyframes`
0%{
    background-image: url('https://ifh.cc/g/YpoAxs.png');
}
25%{
    background-image:url('https://ifh.cc/g/pJsnjd.png') ;
}
50%{
    background-image:url('https://ifh.cc/g/GYPtj1.png') ;

}
75%{
    background-image:url('https://ifh.cc/g/MfGsSL.png') ;

}
100%{
    background-image:url('https://ifh.cc/g/MTBjO2.png') ;

}
`;


const StyledCreateStudio = styled.div`
  @font-face {
    src: url("https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2")
      format("woff2");
    font-family: "Meta";
    font-style: normal;
    font-weight: normal;
  }
  display: flex;
  justify-content: center;
  overflow: hidden;

  .createstudio-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1280px;
    padding-top: 50px;

    /* 메인 */
    .createstudio-main-inner-box {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      padding-top: 50px;
      padding-bottom: 200px;
      h1 {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200%;
        height: 100vh;
        background: #000;
        padding: 50px 0px;
        transition: all 0.5s;
        -webkit-text-stroke: 4px #d6f4f4;
        font-variation-settings: "wght" 900, "ital" 1;
        font-size: 13rem;
        text-align: center;
        color: transparent;
        font-family: "Meta", sans-serif;
        text-shadow: 10px 10px 0px #07bccc, 15px 15px 0px #e601c0,
          20px 20px 0px #e9019a, 25px 25px 0px #f40468, 45px 45px 10px #482896;
        cursor: pointer;
        &:hover {
          font-variation-settings: "wght" 900, "ital" 1;
          text-shadow: none;
        }
      }
      .top-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        margin-top: 100vh;
        margin-bottom: 200px;
        .top-title-text-1 {
          display: block;
          font: bold 70px/1 "apple";
        }
        .top-title-text-2 {
          display: block;
          font: bold 70px/1 "apple";
          margin-bottom: 20px;
        }
        .top-title-img {
          position: relative;
          left: 100px;
          width: 500px;
          height: 100px;
          animation: ${titleanimation} 5s 1s ease-in-out infinite;
          background-size: cover;
          margin: 40px 0px;
        }
      }
      .content-inner-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 200px;
        .content-text {
          text-align: center;
          font: bold 50px/1.3 "apple";
        }
      }
      .content-box-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 100px;
        .content-img-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30%;
          margin-right: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content-text-box {
          width: 40%;

          .title {
            display: block;
            font: bold 50px/1 "apple";
            margin-bottom: 20px;
          }
          .text {
            display: block;
            font: 20px/1 "apple";
            color: #777;
          }
        }
      }
      /* 크리에이터가 된다면 부분 */
      .content-create-inner-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .content-create-title {
          display: block;
          width: 100%;
          .color-blue {
            color: #3f3fff;
          }
          font: bold 80px/1 "apple";
          margin-bottom: 30px;
        }
        .content-create-sub-title {
          font: 20px/1 "apple";
          color: #777;
        }
        /* 콘텐츠2 */
        .content-create-section-box {
          .section-box {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 200px 0px;
            .section-box-text-box {
              .section-title {
                display: block;
                margin-bottom: 30px;
                font: bold 60px/1 "apple";
                color: #3f3fff;
              }
              .section-text {
                display: block;
                margin-bottom: 10px;
                font: bold 40px/1 "apple";
              }
              .section-sub-text {
                display: block;
                font: 18px/1.3 "apple";
                color: #999;
              }
            }
          }
        }
      }

      /* 배너 */
      .content-create-banner {
        width: 150%;
        height: 300px;
        margin: 0px 0px 300px;
        .banner {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-image: url("https://ifh.cc/g/zWWcC2.png");
        }
      }

      .last-text {
        font: bold 70px/1 "apple";
        margin-bottom: 100px;
      }
      .sign-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 70px;
        font: bold 30px/1 "apple";
        color: #fff;
        background: #3f3fff;
        border-radius: 50px;
        border: none;
        transition: all 0.5s;
        &:hover {
          background: #fff;
          color: #3f3fff;
          border: 1px solid #3f3fff;
          cursor: pointer;
        }
      }
    }
  }
`;