// user의 값은 자신의 지갑 주소를 입력해주세요.
const user = "ebcf2af7ee0a89f3de0d5ca125069f64ee966b68a9b9eb5216751d6a8de89c01";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />
    {/** 자신이 만든 Greeter 컴포넌트를 불러올 수 있습니다. **/}
    <Widget src={`${user}/widget/HelloNEAR`} props={props} />
  </>
);
