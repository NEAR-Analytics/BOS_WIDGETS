const test = Storage.get(
  "my-storage-key",
  "wendersonpires.near/widget/NearSocialBridgeTests"
);
console.log("Test:", test);

const test2 = Storage.get(
  "lastBlockHeight",
  "mob.near/widget/NotificationFeed"
);
console.log("Test2:", test2);

return (
  <>
    <p>
      Hello {props.username}. Your age is {props.age}
    </p>
  </>
);

// // The link provided by thirdapp pointing to the react app stored inside IPFS
// const externalAppUrl =
//   "https://bafybeigadizblnffuidc5jmrnhmtd64bfzmapaoohb6twpcmbguluw25kq.ipfs.cf-ipfs.com/";

// asyncFetch(
//   "https://bafybeigadizblnffuidc5jmrnhmtd64bfzmapaoohb6twpcmbguluw25kq.ipfs.cf-ipfs.com/"
// ).then((res) => {
//   console.log("UI:", res);
// });

// return (
//   <Widget
//     src={"wendersonpires.near/widget/NearSocialBridgeCore"}
//     props={{
//       externalAppUrl,
//     }}
//   />
// );
