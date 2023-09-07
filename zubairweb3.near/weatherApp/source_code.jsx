const bgCold =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077947/Weather/cold2_p13fuw.jpg";
const bgHot =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077946/Weather/hot_gc8qai.webp";
const tempIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077946/Weather/cloud-solid_dlvsum.svg";
const ArrowDown =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694085420/Weather/arrow-down_lswsg8.svg";

State.init({ weather: {} });

const API_KEY = "ace7985557386b32c9d545d37d09dd8d";

function getWeatherData(city, units) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  asyncFetch(weatherUrl).then((res) => {
    let jsonObject = JSON.parse(res.body);
    console.log(jsonObject);
    State.update({ weather: jsonObject });
  });
}

getWeatherData("Kaduna", "metric");

const App = styled.div`
font-family: Verdana, Genrva, Tahoma, sans-serif;
width: 100%;
height: 100vh;
background-position: center;
background-size:cover;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);

`;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
`;

const SectionInputs = styled.div`
width: 100%;
padding: 1rem;
border-radius: 0.4rem;
color: white;

display: flex;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);

`;

const Button = styled.button`
  padding: 10px 50px;
  border: none;
  border-radius: 0.4rem;
  font-size: 20px;
  font-weignt: 500;
  background-color: white;
  &:hover{
    cursor: pointer;
    background-color: lightgray;
  }
`;

const SectionTemperature = styled.div`
width: 100%;
padding: 1rem;
border-radius: 0.4rem;
color: white;
display: flex;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);

`;

const IconTitle = styled.h3`
  font-size: 15px;
  font-weight: 200;
  text-transform: capitalize
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center  
`;

const Temperature = styled.div`
  
`;

const TempTitle = styled.div`
  font-size: 60px;
`;

const Input = styled.input`
border: 0.8px solid white;
border-radius: 0.4rem;
background-color: transparent;
padding: 0.5rem;
font-size: 20px;
font-weight: 200;
color: white;
&:focus{
  outline: none;
}
`;

const Description = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
gap: 2.5rem;
color: white;
`;
const Card = styled.div`
width: 25%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);
padding: 1rem;
border-radius: 0.4rem;
@media screen and (max-width: 600px){
  width: 40%;
}
`;

const CardIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`

`;

return (
  <>
    <App style={{ backgroundImage: `url(${bgHot})` }}>
      <Overlay>
        <Container>
          <SectionInputs>
            <Input type="text" name="city" placeholder="Enter City..." />
            <Button>
              <sup>o</sup>F
            </Button>
          </SectionInputs>
          <SectionTemperature>
            <Icon>
              <IconTitle>London RGB</IconTitle>
              <img
                src={tempIcon}
                width="50px"
                height="50px"
                alt="Weather-icon"
              />
              <IconTitle>Cloudy</IconTitle>
            </Icon>
            <Temperature>
              <TempTitle>
                34 <sup>o</sup>C
              </TempTitle>
            </Temperature>
          </SectionTemperature>
          <Description>
            <Card>
              <CardIcon>
                <img src={ArrowDown} />
                <small>Min</small>
              </CardIcon>
              <CardTitle>
                32 <sup>o</sup>C
              </CardTitle>
            </Card>
            <Card>
              <CardIcon>
                <img src={ArrowDown} />
                <small>Min</small>
              </CardIcon>
              <CardTitle>
                32 <sup>o</sup>C
              </CardTitle>
            </Card>
            <Card>
              <CardIcon>
                <img src={ArrowDown} />
                <small>Min</small>
              </CardIcon>
              <CardTitle>
                32 <sup>o</sup>C
              </CardTitle>
            </Card>
            <Card>
              <CardIcon>
                <img src={ArrowDown} />
                <small>Min</small>
              </CardIcon>
              <CardTitle>
                32 <sup>o</sup>C
              </CardTitle>
            </Card>
          </Description>
        </Container>
      </Overlay>
    </App>
  </>
);
