const user = "next-genz.near";
const props = { name: "WELCOME" };
const options = ["Dogs", "Cats", "Hamsters", "Others"];
State.init({
  img: null,
});

return (
  <>
    <div class="conatiner">
      <h1>MEWOOF</h1>
      <p>Welcome to social media for our pets</p>
      <hr />
    </div>
    <div className="container row">
      <div>
        Image upload: <br />
        <IpfsImageUpload image={state.img} />
      </div>
    </div>
    <div class="container min-vh-100 ">
      <Typeahead
        options={options}
        multiple
        onChange={(value) => {
          State.update({ choose: value });
        }}
        placeholder="Your pets..."
      />
      <hr />
    </div>
  </>
);
