const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
div {
  background-color: #f2f2f2;
  padding: 250px;
  border-radius: 5px;
  weight: 100hv;
  hight: 100%;
}

/* Style for the heading */
h2 {
  color: #333;
  font-size: 25px;
  margin-bottom: 100px;
}

/* Style for the unordered list */
ul {
  list-style-type: none;
  padding: 100;
}

/* Style for the list items */
li {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 90px;
}

/* Style for the input field */
input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

/* Style for the button */
button {
  background-color: #0066cc;
  color: #fff;
  padding: 10px 25px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #004c99;
}
.SwitchThumb {
   }
`;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div>
        <ul>
          <h2> Blockchain and Crypto-Assets Courses: </h2>

          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/blockchainCourse">
              Introduction to Blockchain{" "}
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/cryptoCourse">
              Cryptocurrency Basics
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/smartcontractsCourse">
              Smart Contracts and Decentralized Applications
            </a>
          </li>
        </ul>
        Please click on the course that you want to enroll in
        <br />
        <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/intro">
          <br />
          <button> main page</button>
        </a>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
