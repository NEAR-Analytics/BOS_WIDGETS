/*This fetches the google poppins, Monteserrat, and Orbitron fonts*/
const font = fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat+Alternates:wght@400;600;800&family=Orbitron:wght@400;600&family=Poppins:wght@100;200;700&display=swap"
).body;

/*This checks wether the google font is returned, if not, it returns null*/
if (!font) {
  return null;
}

const NavStyle = styled.div`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: Poppins, 'sans-serif';
}.body;
`;

const Header = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: space-around;
  align-items: center;
  width: 100wv;
  height: 99px;
  border: 2.5px solid #EDEDED;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(24.5px);

    @media only screen and (max-width: 750px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 30px;

    };
`;
const Titlediv = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: Poppins, 'sans-serif';
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

    @media only screen and (max-width: 750px) {
    display: flex;
    justify-content: flex-start;
    font-size: 12px;
    flex-shrink: 0;

    };
  
`;
const Title1 = styled.span`
  color: #232323;

    @media only screen and (max-width: 750px) {
    
    };
`;

const Title2 = styled.span`
  color: #8B5EED;
`;
const Navdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 225px;
  height: 30px;

    @media only screen and (max-width: 750px) {
      justify-content: space-around;
      padding: 0 30px;

`;

const Navspan1 = styled.span`
  color: #000;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
    a{
    text-decoration: none;
    color: #000 !important;
    }
    a:hover{
      color: #8B5EED !important;
    }


    @media only screen and (max-width: 750px) {
    font-size: 12px;
    flex-shrink: 0;
    a{
    text-decoration: none;
    color: #000 !important;
    font-weight: 400;
    }


`;

const Navspan2 = styled.span`
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Poppins, 'sans-serif';
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.15px;
    a{
    text-decoration: none;
    color: #000 !important;
    }
    a:hover{
      color: #8B5EED !important;
    }

    @media only screen and (max-width: 750px) {
    font-size: 12px;
    flex-shrink: 0;
    a{
    text-decoration: none;
    color: #000 !important;
    font-weight: 400;
    }
`;

/*This section handles the screen size respinsiveness at maximum of 750px (Mobile first design) */
// const Main = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   overflow-y: auto;
//   height: 100vh;
//   padding-bottom: 80px;
//   background-image: url('https://bit.ly/dtect-app');
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;

//   @media only screen and (max-width: 750px) {
//     padding-bottom: 160px;
//   }
// `;

return (
  <NavStyle>
    
      <Header>
        <Titlediv>
          <Title1>DTEC</Title1> <Title2>TEET</Title2>
        </Titlediv>
        <Navdiv>
          <Navspan1>
            <a href="#">Docs</a>
          </Navspan1>
          <Navspan2>
            <a href="#">Blog</a>
          </Navspan2>
        </Navdiv>
      </Header>
  
  </NavStyle>
);
