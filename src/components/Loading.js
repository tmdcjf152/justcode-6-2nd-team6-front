import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";



const Loading = () => {
  return (
    <StyledLoading>
      <div className="loading-container">
        <CircularProgress className="loading" />
      </div>
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  .loading-container {
    width: 100%;
    height: 100vh;

    .loading {
      position: fixed;
      top: 50vh;
      right: calc(50% - 30px);
    }
  }
`;