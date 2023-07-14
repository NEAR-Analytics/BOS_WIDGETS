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
    <button onclick="window.location='http://twitter.com/near_turkey';">
      Near Türkiye Twitter
    </button>
  </>
);
