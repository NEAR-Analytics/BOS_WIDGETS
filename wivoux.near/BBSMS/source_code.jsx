const MyComponent = () => {};

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <div
          style={{
            // backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7nlsKcGN7ek2D0hjLfkILP1OJGn_7bu2hhw&usqp=CAU)`,
            backgroundSize: "cover",
            display: "flex", // Add flex property
            justifyContent: "center", // Center child elements horizontally
            alignItems: "center", // Center child elements vertically
          }}
        >
          <h1
            style={{
              fontFamily: "'Bangers', 'Comic Sans MS', 'Comic Sans', cursive",
              textAlign: "center",
            }}
          >
            Blockchain Base Spam Message Detection
          </h1>

          <div className="form">
            <div className="flex">
              <p>{Social.parties}</p>
            </div>
            <Widget
              src="abnakore.near/widget/Input.jsx"
              props={{
                type: "password",
                placeholder: "Text to predict",
                required: true,
              }}
            />
            <button
              className="submit"
              style={{ width: "300px", height: "50px", flex: "middle" }}
            >
              Check Status
            </button>
          </div>
        </div>
      ),
    }}
  />
);
