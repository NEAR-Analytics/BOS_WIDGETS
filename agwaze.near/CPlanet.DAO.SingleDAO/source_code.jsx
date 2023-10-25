const Root = styled.div`
    
`;

const ImageSection = styled.div`
   background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU');
    height: 200px;
    width: 100%;
    position: relative;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        position: absolute;
        top: 120px;
        border: 3px solid #fff;
        left: 20px;
    }
`;

const RightProfile = styled.div`
    margin-top: 104px;
    width: 380px;
    padding: 0 20px;
    .title {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
    .username {
        overflow: hidden;
        color: #B0B0B0;
        text-overflow: ellipsis;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 148%; /* 23.68px */
    }
    .description {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        margin-top: 7px;
        font-weight: 400;
        line-height: 148%; /* 23.68px */
    }
`;

return (
  <Root>
    <ImageSection>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU" />
    </ImageSection>
    <RightProfile>
      <h1 className="title">LOREM IPSUM DAO</h1>
      <span className="username">@lorem.ipsum.dono</span>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </RightProfile>
  </Root>
);
