// user의 값은 자신의 지갑 주소를 입력해주세요.
const user = "14ea88d51603eb512dae55d259b805b74b58c6ade02df799706c3e12ab26c14a";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />
    {/** 자신이 만든 Greeter 컴포넌트를 불러올 수 있습니다. **/}
    <Widget src={`${user}/widget/GreeterYourName`} props={props} />
  </>
);
