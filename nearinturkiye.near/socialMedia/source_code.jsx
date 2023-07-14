State.init({
  value: "value to update",
});

console.log(Near.view("nearinturkiye.near", "socialMedia"));

const testCall = () => {
  return Near.call("nearinturkiye.near", "socialMedia", {
    message: "Hi Near Social",
  });
};

let user_account = context.accountId;

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Welcome to Near Türkiye </h1>
      <p>{user_account}</p>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <h2>Near Türkiye official social media channels: </h2>

    <button OnClick=" location.href='link.html' ">Visit Page Now</button>
  </>
);
