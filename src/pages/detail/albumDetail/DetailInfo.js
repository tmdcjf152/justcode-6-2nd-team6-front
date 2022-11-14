import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';



const DetailInfo = ({ albumInfo }) => {
  const params = useParams();
  const details = params.albumPage;
  return (
    <NavLink to={`${details}`}>
      <StyledDetailInfo>
        <div className='detail-info-inner-box'>
          <div className='detail-info-wrap'>
            <ul className='detail-info-list-box'>
              <li className='detail-info-list'>
                <span className='detail-info-album-name'>앨범명</span>
                <span className='stick' />
                <span className='detail-info-album-singer'>
                  {albumInfo.albumTitle}
                </span>
              </li>
              <li className='detail-info-list'>
                <span className='detail-info-album-name'>아티스트</span>
                <span className='stick' />
                <span className='detail-info-album-singer'>
                  {albumInfo.artist}
                </span>
              </li>
              <li className='detail-info-list'>
                <span className='detail-info-album-name'>발매사</span>
                <span className='stick' />
                <span className='detail-info-album-singer'>
                  {albumInfo.releaseCompany}
                </span>
              </li>
              <li className='detail-info-list'>
                <span className='detail-info-album-name'>기획사</span>
                <span className='stick' />
                <span className='detail-info-album-singer'>
                  {albumInfo.managementCompany}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </StyledDetailInfo>
    </NavLink>
  );
};

export default DetailInfo;

const StyledDetailInfo = styled.section`
  padding-top: 40px;

  div.detail-info-inner-box {
    padding-left: 20px;

    div.detail-info-wrap {
      overflow: hidden;
      white-space: pre-wrap;

      ul.detail-info-list-box {
        font-size: 18px;
        color: #3d3d3d;

        li.detail-info-list {
          padding: 15px 0;
        }

        span.detail-info-album-name {
          font-weight: 600;
        }

        span.stick {
          padding: 0 15px;
        }
      }
    }
  }
`;