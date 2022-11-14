import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import styled from "styled-components";
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import LoginPopup from "../login/LoginPopup";
import Loading from "../../components/Loading";
import ThirdSection from "./sections/ThirdSection";



const Main = ({ loginText, musicTracks, setMusicTracks, setAlertOn }) => {
  const [slide, setSlide] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://13.125.174.118:8000/", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {

        setLoading(true);
        setSlide(data.slideData);
      });

    fetch("http://13.125.174.118:8000/")
      .then((res) => res.json())
      .then((data) => {

        setAlbumList(data.recent);
        setLoading(true);
      });
  }, []);

  return (
    <Fade>
      {!loading ? (
        <Loading />
      ) : (
        <StyledMain>
          <div className="main-inner-box">
            <div className="main-wrap">
              <FirstSection
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
                setAlertOn={setAlertOn}
                slide={slide}
                setSlide={setSlide}
              />
              <SecondSection
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
                setAlertOn={setAlertOn}
                albumList={albumList}
                setAlbumList={setAlbumList}
              />
              <ThirdSection
                musicTracks={musicTracks}
                setMusicTracks={setMusicTracks}
                setAlertOn={setAlertOn}
                albumList={albumList}
                setAlbumList={setAlbumList}
              />
            </div>
          </div>
          {loginText === true ? <LoginPopup /> : null}
        </StyledMain>
      )}
    </Fade>
  );
};

export default Main;


const StyledMain = styled.main`
  width: 1280px;
  margin: 0 auto;

  div.main-inner-box {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    font-family: "NanumBarunGothic", sans-serif;

    div.main-wrap {
      margin-top: 120px;
    }
  }
`;