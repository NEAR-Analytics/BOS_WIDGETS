// user의 값은 자신의 지갑 주소를 입력해주세요.
const user = "idknwhoru.near";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />
    {/** 자신이 만든 Greeter 컴포넌트를 불러올 수 있습니다. **/}
    <Widget src={`${user}/widget/Greeter`} props={props} />
  </>
);
