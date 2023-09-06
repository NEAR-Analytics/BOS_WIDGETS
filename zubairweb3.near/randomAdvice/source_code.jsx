let user = context.accountId;

let Heading = styled.h3`
color: violet;
font-family: arial;
font-size: 1.2rem;
text-align: center;
margin-bottom: 15px;
`;

let Wrapper = styled.div`
background-image: linear-gradient(to right, #42275a, #734b6d);
display: flex;
flex-direction: column;
width: 100%;
height: 100vh;
align-items: center;
justify-content: center;
@media (max-width: 600px){
  padding: 10px;
}
`;

let Content = styled.div`
width: 60%;
text-align: center;
background: #000428;
border: 2px solid #42275a;
border-radius: 20px;
height: 200px;
display: flex;
justify-content: center;
align-items: center;
color: palevioletred;
padding: 15px;
@media (max-width: 600px){
  width: 90vw;
}
`;

let Button = styled.button`
width: 120px;
margin-top: 20px;
background: #000428;
color: #fff;
border: none;
padding: 10px;
border-radius: 10px;
font-weight: 600;
&:hover{
  background: palevioletred;
}
`;

State.init({ advice: "" });

function getAdvice() {
  asyncFetch("https://api.adviceslip.com/advice").then((res) => {
    let jsonObject = JSON.parse(res.body);
    let adviceString = jsonObject.slip.advice;
    State.update({ advice: adviceString });
  });
}

function init() {
  if (state.advice === "") {
    getAdvice();
  }
}

init();

return (
  <Wrapper>
    <Heading>
      Advice for <span style={{ color: "#fff" }}>{user || "you"}</span>
    </Heading>
    <Content>
      <h4>{state.advice}</h4>
    </Content>
    <Button onClick={getAdvice}>Advice me</Button>
  </Wrapper>
);
