import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-reveal';
import styled from 'styled-components';



const Genre = () => {
  const [genre, setGenre] = useState('');
  const [situation, setSituation] = useState('');
  const [atmosphere, setAtmosphere] = useState('');
  const [audio, setAudio] = useState('');

  useEffect(() => {
    fetch('/data/genredata.json')
      .then((res) => res.json())
      .then((res) => {
        setGenre({ data: res.cards.genre });
        setSituation({ data: res.cards.situation });
        setAtmosphere({ data: res.cards.atmosphere });
        setAudio({ data: res.cards.audio });
      });
  }, []);

  return (
    <Fade>
    <StyledGenre>
      <section className='genre-inner-box'>
        {/* 장르 */}
        <section className='genre-list-inner-box'>
          <span className='genre-title-text'>장르</span>
          <ul className='genre-list-box'>
            {genre.data &&
              genre.data.map((item, index) => {
                return (
                  <li className='genre-list-item' key={index}>
                    <NavLink to='#'>
                      <img
                        src={genre.data[index].img}
                        alt={genre.data[index].title}
                      />
                      <span>{genre.data[index].title}</span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </section>

        {/* 상황 */}
        <section className='genre-list-inner-box'>
          <span className='genre-title-text'>상황</span>
          <ul className='genre-list-box'>
            {situation.data &&
              situation.data.map((item, index) => {
                return (
                  <li className='genre-list-item' key={index}>
                    <NavLink to='#'>
                      <img
                        src={situation.data[index].img}
                        alt={situation.data[index].title}
                      />
                      <span>{situation.data[index].title}</span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </section>

        {/* 분위기 */}
        <section className='genre-list-inner-box'>
          <span className='genre-title-text'>분위기</span>
          <ul className='genre-list-box'>
            {atmosphere.data &&
              atmosphere.data.map((item, index) => {
                return (
                  <li className='genre-list-item'>
                    <NavLink to='#'>
                      <img
                        src={atmosphere.data[index].img}
                        alt={atmosphere.data[index].title}
                      />
                      <span>{atmosphere.data[index].title}</span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </section>

        {/* 오디오 */}
        <section className='genre-list-inner-box'>
          <span className='genre-title-text'>오디오</span>
          <ul className='genre-list-box'>
            {audio.data &&
              audio.data.map((item, index) => {
                return (
                  <li className='genre-list-item'>
                    <NavLink to='#'>
                      <img
                        src={audio.data[index].img}
                        alt={audio.data[index].title}
                      />
                      <span>{audio.data[index].title}</span>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </section>
      </section>
    </StyledGenre>
    </Fade>
  );
};

export default Genre;

const StyledGenre = styled.div`
  .genre-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1280px;
    margin: 0 auto;
    padding: 100px 15px;
    .genre-list-inner-box {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 50px;
      /* 테마별 제목 */
      .genre-title-text {
        display: block;
        font: bold 22px/1 'apple';
        margin-bottom: 20px;
      }
      /* 버튼 inner box */
      .genre-list-box {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        /* 버튼  */
        .genre-list-item {
          position: relative;
          width: 215px;
          height: 100px;
          margin-right: 35px;
          margin-bottom: 30px;
          a {
            display: block;
            width: 100%;
            height: 100%;
            transform: scale(1);
            transition: all 1s;
            &:hover {
              transform: scale(1.1);
              transition: all 0.5s;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 7px;
            }
            span {
              position: absolute;
              top: 20px;
              left: 20px;
              font: 15px/1 'apple';
              color: #fff;
            }
          }
        }
      }
    }
  }
`;