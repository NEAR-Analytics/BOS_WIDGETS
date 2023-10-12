const Owner = "nftwg_home.near";
const Layout = styled.div`
position: relative;
width: 1000px;
height: 7060px;
background: #FFFBDA;
left:-78px;
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
