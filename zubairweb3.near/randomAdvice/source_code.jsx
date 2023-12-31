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
flex-direction: column;
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

let AdviceId = styled.p`
border-radius: 50%;
background: palevioletred;
color: #ffffff;
padding: 10px;
font-size: 0.8rem;
`;

State.init({ advice: {} });

function getAdvice() {
  asyncFetch("https://api.adviceslip.com/advice").then((res) => {
    let jsonObject = JSON.parse(res.body);
    State.update({ advice: jsonObject });
  });
}

function init() {
  if (state.advice.slip === undefined) {
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
      <AdviceId>#{state.advice.slip.id}</AdviceId>
      <h4>{state.advice.slip.advice}</h4>
    </Content>
    <Button onClick={getAdvice}>Advice me</Button>
  </Wrapper>
);
