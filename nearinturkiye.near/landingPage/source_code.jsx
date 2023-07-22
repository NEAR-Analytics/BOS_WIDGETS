State.init({
  value: "value to update",
});

console.log(Near.view("nearinturkiye.near", "socialMedia"));

const testCall = () => {
  return Near.call("nearinturkiye.near", "socialMedia", {
    message: "Hi Near Social",
  });
};

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Welcome to Near Türkiye</h1>
      <p>{user_account}</p>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <h2>Near Türkiye official social media channels: </h2>
    <button OnClick="https://www.twitter.com/near_turkey">
      NEAR Türkiye Twitter
    </button>
    <br></br>
    <br></br>
    <button href="https://www.google.com">NEAR Türkiye Telegram</button>
    <br></br>
    <br></br>
    <button OnClick=" location.href='https://www.google.com' ">
      NEAR Türkiye Near Social
    </button>
    <br></br>
    <br></br>
    <button OnClick="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">
      NEAR Türkiye Youtube
    </button>
    <br></br>
    <input
      type="button"
      onclick="location.href='https://google.com';"
      value="Go to Google"
    />
    <div>
      <iframe
        iframeResizer={{
          onResized: ({ width, height }) => {
            console.log("iframe resized", width, height);
          },
        }}
        onLoad={() => console.log("iframe loaded")}
        src="http://twitter.com"
      />
    </div>
  </>
);
