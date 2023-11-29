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
@media (max-width: 768px) {
gap:10px;
  }

`;
const Logo = styled.img`
width: 180px;
@media (max-width: 768px) {
width: 100px;
height:20px
  }
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
border-bottom: ${props.active ? "0px solid #061D33" : "4px solid #061D33"};

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
display:block;
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
@media (max-width: 414px) {
display:none;
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
      <Logo
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
