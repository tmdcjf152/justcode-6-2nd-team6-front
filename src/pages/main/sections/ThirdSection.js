import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import styled from 'styled-components';



const ThirdSection = () => {
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    fetch('/data/genreImage.json')
      .then((res) => res.json())
      .then((data) => {
        setGenre(data.genreImg);
      });
  }, []);

  return (
    <StyledSection>
      <section className='second-section-inner-box'>
        {/*오늘 발매 음악 정보 */}
        <div className='second-section-info-box'>
          {/*오늘 발매 음악 제목 */}
          <div className='second-section-title-box'>
            <h3 className='second-section-title'>
              <Link to='/detail' className='second-section-title-link'>
                <span className='second-section-today-music'>장르 콜렉션</span>
              </Link>
            </h3>
          </div>
        </div>
        {/*최신 발매 음악 정보 끝 */}
        <div className='second-section-album-inner-box'>
          <div className='second-section-album-wrap'>
            {/*앨범리스트*/}
            {genre.map((el) => {
              return (
                <div key={el.imageId} className='second-section-album-box'>
                  <div className='second-section-album-list'>
                    <Link to='#' className='second-section-album-link'>
                      <div className='second-section-album-img-box'>
                        <img
                          alt='앨범 표지'
                          className='second-section-album-cover'
                          src={el.image}
                        />
                      </div>
                    </Link>
                    <button
                      alt='플레이 버튼'
                      className='second-section-play-button'
                      type='button'
                    >
                      <BsFillPlayFill className='second-section-play-button-icon' />
                    </button>
                  </div>
                </div>
              );
            })}
            {/*앨범리스트 끝*/}
          </div>
        </div>
      </section>
    </StyledSection>
  );
};

export default ThirdSection;

const StyledSection = styled.section`
  width: 100%;
  margin: 50px auto;
  display: block;
  font-family: 'NanumBarunGothic', sans-serif;

  section.second-section-inner-box {
    div.second-section-info-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    div.second-section-genre {
      width: 130px;
    }

    /* 발매 음악 앨범 리스트 */
    div.second-section-album-inner-box {
      width: 1080px;
      margin: 30px 0;

      div.second-section-info-box {
      }
    }

    /* 발매 음악 앨범 타이틀 */
    div.second-section-title-box {
      width: 200px;

      h3.second-section-title {
        width: 100%;
        display: inline-block;
        font-size: 26px;
      }

      a.second-section-title-link {
        font-weight: 600;
        color: black;

        &:hover {
          cursor: pointer;
          color: #3f3fff;
        }
      }

      .second-section-today-music-icon {
        width: 26px;
        height: 24px;
        margin-bottom: 2px;
        margin-left: 8px;
        text-indent: 100%;
        vertical-align: middle;
      }
    }

    /* 최신 발매 음악 앨범 리스트 */

    div.second-section-album-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    div.second-section-album-box {
      width: 192px;
      background-clip: content-box;
      margin-bottom: 20px;

      div.second-section-album-list {
        position: relative;
        margin-bottom: 10px;
      }

      /* 발매 음악 앨범 리스트 앨범 링크 */
      a.second-section-album-link {
        position: relative;
        z-index: auto;

        div.second-section-album-img-box {
          position: relative;
        }
      }

      img.second-section-album-cover {
        width: 192px;
        height: 192px;
        border-radius: 7px;

        &:hover {
          filter: brightness(70%);
        }
      }

      /* 발매 음악 앨범 리스트 재생 버튼 */
      button.second-section-play-button {
        position: absolute;
        z-index: auto;
        right: -5px;
        bottom: -1px;
        border: none;
        background: none;

        .second-section-play-button-icon {
          width: 55px;
          height: 55px;
          color: white;

          &:hover {
            cursor: pointer;
            color: #3f3fff;
          }
        }
      }
    }
  }
`;