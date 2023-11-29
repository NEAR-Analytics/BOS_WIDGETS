const Navbar = styled.div`
background: #F3F9FF;
height: 110px;
width:100%;

`;
const MainNav = styled.div`
width: 90%;
height:100%;
margin-left: auto;
margin-right: auto;
display: flex;
align-items:center;
justify-content: space-between;
padding-top:20px;

`;
const Logo = styled.img`

`;
const HTest = styled.h2`
font-family: Space Grotesk;
font-size: 17px;
font-weight: 500;
line-height: 26px;
letter-spacing: 0.005em;
text-align: left;
color: #061D33;
cursor:pointer;
height:90px; 
padding-top:35px;

&:hover {

border-bottom: 4px solid #061D33;
height:90px;

}
border-bottom: ${
  props.active === false ? "4px solid #061D33" : "0px solid #061D33"
};

`;
const HTest2 = styled.h2`
font-family: Space Grotesk;
font-size: 17px;
font-weight: 500;
line-height: 26px;
letter-spacing: 0.005em;
text-align: left;
color: #061D33;
cursor:pointer;
height:90px; 
padding-top:35px;

&:hover {

border-bottom: 4px solid #061D33;
height:90px;

}
border-bottom: ${props.active ? "4px solid #061D33" : "0px solid #061D33"};

`;
const SearchBar = styled.input`
width: 597px;
height: 64px;
left: 602px;
border-radius: 40px;
padding-left:30px;
border-color:#69B5FF;
border:2px;
outline-color:
#69B5FF;
@media (max-width: 768px) {
width: 397px;
  }
`;

const Connect = styled.button`
width: 174px;
height: 54px;
padding: 14px, 24px, 14px, 24px;
border-radius: 8px;
border: 0px, 3px, 3px, 0px;
gap: 8px;
background:#0F4880;
color:white;


`;

return (
  <Navbar>
    <MainNav>
      <img
        src={`https://ipfs.near.social/ipfs/bafkreifgocan6s5hfavl3g6k4hfmwzynpxzrkgzjqok6p6hufl24mzw3iu`}
        alt=""
      />

      <HTest2 onClick={props.fetchAllPost}>All Post</HTest2>
      <HTest onClick={props.fetchTrendFeed}>Trending Feed</HTest>

      <SearchBar
        type="text"
        placeholder="search"
        onChange={(e) => props.getSearch(e.target.value)}
      />

      <Widget src="tvh050423.near/widget/ConnectButton" props={{}} />
    </MainNav>
  </Navbar>
);
