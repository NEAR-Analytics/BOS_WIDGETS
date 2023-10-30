const Root = styled.div`
    width: 505.226px;
    height: 557.438px;
    background: var(--near-org-medium-purple, #7269E1);
    position: relative;
    margin: 20px;
    .topContainer {
        display: flex;
        flex-direction: column;
      width: 505.23px;
      height: 557px;
      align-items: flex-start;
      background: var(--nearcon-app-spring-green, white); 
      border: 2px dashed #00EC97;
      margin-right: 5px;
      position: absolute;
      right: 2px;
      top: -9px;
    }
    .topContainer:before {
    content: '';
    position: absolute;
    top: -4px; /* Adjust these values as needed to position the border outside the container */
    left: -4px;
    right: -4px;
    bottom: -4px;
  }
  @media only screen and (max-width: 450px) {
    width: 380px;
    .topContainer {
      width: 380px;
    }
  }
`;

const TopContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 20.136px 20.136px 23.315px 20.136px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;  
     border-bottom: 3.179px solid var(--near-org-black, #000);
    background: var(--near-org-spring-green, #00EC97); 
    width: 100%;
    height: 86px;
    h1 {
        color: var(--near-org-black, #000);
        font-family: Inter;
        font-size: 25.236px;
        font-style: normal;
        font-weight: 600;
        line-height: 42.391px; /* 167.979% */
    }
    
`;

const Days = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 21px;
    .day, .lastDay {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid black;
        width: 115px;
        p {
            color: var(--near-org-black, #000);
            text-align: right;
            font-family: Inter;
            font-size: 33.913px;
            margin-bottom: 0;
            font-style: normal;
            font-weight: 400;
        }
        span {
            color: var(--near-org-zuccini, #052E19);
            text-align: center;
            font-family: Inter;
            font-size: 16.691px;
            font-style: normal;
            font-weight: 400;
            line-height: 24.375px; /* 146.032% */
        }
    }
    .lastDay {
      border-right: none;
    }
    @media only screen and (max-width: 450px) {
      .day, .lastDay {
        width: 90px;
      p {
        font-size: 20px;
      }
      span {
        font-size: 12px;
      }
      }
  }
`;

const DateSec = styled.div`
  margin-top: 26px;
  padding: 16px;
  span {
    color: var(--near-org-black, #000);
    font-family: Inter;
    font-size: 12.121px;
    font-style: normal;
    font-weight: 400;
    line-height: 12.717px; /* 104.918% */
  }
  h1 {
    color: var(--near-org-black, #000);
    font-family: Inter;
    font-size: 24.242px;
    font-style: normal;
    margin: 20px 0;
    font-weight: 400;
    margin-bottom: 10px;
  }
  div {
    margin-top: 56px;
  }
  a {
    color: var(--near-org-black, #000);
    font-family: Inter;
    font-size: 11.922px;
    font-style: normal;
    font-weight: 300;
    line-height: 12.717px; /* 106.667% */
    text-decoration-line: underline;
  }
  
`;

return (
  <Root>
    <div className="topContainer">
      <TopContainer>
        <h1>Event Details</h1>
      </TopContainer>
      <Days>
        <div className="day">
          <p>03</p>
          <span>Days</span>
        </div>
        <div className="day">
          <p>10+</p>
          <span>Speakers</span>
        </div>
        <div className="day">
          <p>200</p>
          <span>Developers</span>
        </div>
        <div className="lastDay">
          <p>30+</p>
          <span>Projects</span>
        </div>
      </Days>
      <DateSec>
        <span>Date</span>
        <h1>November 27-30, 2023</h1>
        <a href="#">Add to Calendar</a>
        <div>
          <span>Venue</span>
          <h1>ITF Training complex, Iponri, Lagos, Nigeria.</h1>
          <a href="#">Get Directions to Venue</a>
        </div>
      </DateSec>
    </div>
  </Root>
);
