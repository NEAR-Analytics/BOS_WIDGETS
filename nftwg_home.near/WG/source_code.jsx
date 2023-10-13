const Owner = "nftwg_home.near";
const Layout = styled.div`
position: relative;
width: 1300px;
height: 6800px;
background: #FFFBDA;
padding:30px;


`;
const HeaderContainer = styled.div`
position:relative;
width:200px;
height:80px;
`;
return (
  <Layout>
    <Widget src={`${Owner}/widget/Header`} />

    <Widget src={`${Owner}/widget/Hero`} />
    <Widget src={`${Owner}/widget/NFTStats`} />
    <Widget src={`${Owner}/widget/AboutUs`} />
    <Widget src={`${Owner}/widget/OurGoals`} />
    <Widget src={`${Owner}/widget/MeetTheTeam`} />
    <Widget src={`${Owner}/widget/DaapCentral`} />
    <Widget src={`${Owner}/widget/Footer`} />
  </Layout>
);
