import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Fade } from "react-reveal";
import Genre from "./Genre";
import Charts from "./Charts";
import Loading from "../../components/Loading";
import styled from 'styled-components';



const Browse = ({ musicTracks, setMusicTracks, setAlertOn }) => {
  const [chart, setChart] = useState([]);
  const params = useParams();
  const { genre } = useParams();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // 카테고리별 리스트 가져오기

  /**
   * 목데이터
   * fetch('http://localhost:3000/data/genredata.json')
   */

  useEffect(() => {
    if (params.id == 0) {
      fetch("http://13.125.174.118:8000/browse")
        // fetch('http://localhost:3000/data/genredata.json')
        .then((res) => res.json())
        .then((res) => {
          setLoading(true);
          setChart(res.chart);
        });
    } else {
      fetch(`http://13.125.174.118:8000/browse?genreid=${params.id}`)
        .then((res) => res.json())
        .then((res) => {
          setLoading(true);
          setChart(res.chart);

        });
    }
  }, [params]);

  return (
    <Fade>
      {!loading ? (
        <Loading />
      ) : (
        <StyledBrowse>
          <div className="BrowseMenu-inner-box">
            <div className="BrowseMenu-tab-box">
              {/* 탭 리스트 */}
              <ul className="BrowseMenu-tab">
                {[
                  "추천차트",
                  "국내 발라드",
                  "해외 팝",
                  "국내 댄스",
                  "국내 알앤비",
                  "국내 힙합",
                  "트로트",
                  "OST",
                  "키즈",
                  "국내 인디",
                  "뉴에이지",
                ].map((tab, index) => {
                  return (
                    <li
                      key={tab}
                      className={params.category === tab ? "tab-on" : "tab-off"}
                    >
                      <NavLink to={`/browse/${tab}/${index}`}>{tab}</NavLink>
                    </li>
                  );
                })}

                {/* 목록 펼치기 버튼 */}
                <button
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  className={
                    toggle === true ? "tab-more-btn-on" : "tab-more-btn-off"
                  }
                >
                  {toggle === true ? (
                    <spna className="hidden">차트 카테고리 목록 펼치기</spna>
                  ) : (
                    <span className="hidden">차트 카테고리 목록 접기</span>
                  )}
                </button>

                {/* 추가 탭 리스트 */}
                {toggle === true ? <Addtab /> : null}
              </ul>
            </div>
          </div>
          <Charts
            genre={genre}
            params={params}
            chart={chart}
            setChart={setChart}
            musicTracks={musicTracks}
            setMusicTracks={setMusicTracks}
            setAlertOn={setAlertOn}
          />

          <Genre />
        </StyledBrowse>
      )}
    </Fade>
  );
};

const Addtab = () => {
  const params = useParams();

  return (
    <StyledBrowse>
      <ul className="BrowseMenu-tab">
        {[
          "국내 어쿠스틱",
          "해외 일텍트로닉",
          "해외 소셜 차트",
          "해외 알앤비",
          "해외힙합",
          "클래식",
          "CCM",
        ].map((tab, index) => {
          return (
            <li
              key={tab}
              className={params.category === tab ? "tab-on" : "tab-off"}
            >
              <NavLink to={`/browse/${tab}/${index + 11}`}>{tab}</NavLink>
            </li>
          );
        })}
      </ul>
    </StyledBrowse>
  );
};

export { Browse, Addtab };

const StyledBrowse = styled.div`
  .BrowseMenu-inner-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
    padding-top: 150px;
    margin: 0 auto;
    .BrowseMenu-tab-box {
      width: 100%;
      padding: 0px 50px;
      /* 탭리스트 박스 ul */
      .BrowseMenu-tab {
        position: relative;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;

        margin-bottom: 50px;
        li {
          margin-right: 5px;
          margin-bottom: 10px;
        }
      }
      /* 버튼 클릭안됬을때 */
      .tab-off {
        a {
          height: 32px;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
          background-color: none;
          border: 1px solid #777;
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            border: 1px solid #3f3fff;
            color: #3f3fff;
          }
        }
        .active {
          height: 32px;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #3f3fff;
          background-color: none;
          border: 1px solid #3f3fff;
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            border: 1px solid #3f3fff;
            color: #3f3fff;
          }
        }
      }
      .tab-more-btn-on {
        position: absolute;
        right: -50px;
        top: 0px;
        width: 30px;
        height: 30px;
        margin-right: 30px;
        background-image: url("https://www.music-flo.com/img/sp_button@2x.97bb1f02.png");
        background-size: 714px 706px;
        background-position: -597px -105px;
        background-color: transparent;
        border: none;
        color: transparent;
        &:hover {
          position: absolute;
          right: -50px;
          top: 0px;
          width: 30px;
          height: 30px;
          margin-right: 30px;
          background-image: url("https://www.music-flo.com/img/sp_button@2x.97bb1f02.png");
          background-size: 714px 706px;
          background-position: -597px -70px;
          background-color: transparent;
          border: none;
          color: transparent;
        }
      }
      .tab-more-btn-off {
        position: absolute;
        right: -50px;
        top: 0px;
        width: 30px;
        height: 30px;
        margin-right: 30px;
        background-image: url("https://www.music-flo.com/img/sp_button@2x.97bb1f02.png");
        background-size: 714px 706px;
        background-position: -597px -210px;
        background-color: transparent;
        border: none;
        color: transparent;
        &:hover {
          position: absolute;
          right: -50px;
          top: 0px;
          width: 30px;
          height: 30px;
          margin-right: 30px;
          background-image: url("https://www.music-flo.com/img/sp_button@2x.97bb1f02.png");
          background-size: 714px 706px;
          background-position: -597px -175px;
          background-color: transparent;
          border: none;
          color: transparent;
        }
      }
    }
  }
`;