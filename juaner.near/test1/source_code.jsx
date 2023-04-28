let greeting = "Have a great day";
// const statusy = Storage.get("buttonStatus", "juaner.near/widget/test2");
const statusx = Storage.get("buttonStatus");
// console.log("000000000000-test1组件更新了-获取到test2的状态值是--0", statusx);
// console.log("000000000000-test1组件更新了-获取到test2的状态值是--1", statusy);
console.log("000000000000-test1组件更新了");
return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>
      {statusx ? "拿到的是true" : "拿到的是false"}
    </div>
  </>
);
