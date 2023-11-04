const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
div {
  background-color: #f2f2f2;
  padding: 100px;
  border-radius: 5px;
}

/* Style for the heading */
h2 {
  color: #333;
  font-size: 25px;
  margin-bottom: 22px;
}

/* Style for the unordered list */
ul {
  list-style-type: none;
  padding: 0;
}

/* Style for the list items */
li {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 10px;
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

          <li>Introduction to Blockchain</li>
          <li>Cryptocurrency Basics</li>
          <li>Smart Contracts and Decentralized Applications</li>
        </ul>
        Please enter the number of the course you want to enroll in or press '0'
        to go back: <input />
        <button>Click Here </button>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
