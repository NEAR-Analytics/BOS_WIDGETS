const Image1 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";
const Image2 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/post1_e3ffre.png";

const Wrapper = styled.div`
    color: #fff;
    text-align: center;
    padding: 2rem;
    --tw-bg-opacity: 1;
    background-color: black;
    border-radius: 0.75rem;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 25%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
}
`;
const ImageGroup = styled.div`
   display: flex;
   width: 100%;
}
`;

const StyledImage = styled.img`
   width: 50%;
}
`;

const ShareBtn = styled.button`
color: #fff;
    cursor: pointer;
    padding: 1rem 0.5rem;
    background-color: #003C8C; 
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    align-items: center;
    display: flex;
`;

const SharedIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/x_abhrox.svg";

const StyledIcon = styled.img`
    width: 1rem;
    max-width: 100%;
    height: auto;
`;

return (
  <Wrapper>
    <h2>Entered</h2>
    <ImageGroup>
      <StyledImage src={Image1} alt="raffle pics" />
      <StyledImage src={Image2} alt="raffle pics" />
    </ImageGroup>
    <p>
      Thanks for entering the raffle! Winners will be emailed on Nov.1 11:59pm
    </p>
    <ShareBtn>
      <span>Share on twitter</span>
    </ShareBtn>
  </Wrapper>
);
