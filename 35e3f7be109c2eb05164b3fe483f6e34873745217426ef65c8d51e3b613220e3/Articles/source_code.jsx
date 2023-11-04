const Wrapper = styled.div`
.SwitchRoot {
    div {
  background-color: #f2f2f2;
  padding: 200px;
  border-radius: 5px;
}

/* Style for the heading */
h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

/* Style for the unordered list */
ul {
  list-style-type: none;
  padding: 0;
}

/* Style for the list items */
li {
  margin-bottom: 10px;
}

/* Style for the links */
a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.SwitchThumb {
    }
`;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div>
        <h1>Crypto-Asset Concepts:</h1>
        <ul>
          <li>
            <a href="#" onclick="readArticle('What is Bitcoin?')">
              1. What is Bitcoin?
            </a>
          </li>
          <li>
            <a
              href="#"
              onclick="readArticle('Understanding Blockchain Technology')"
            >
              2. Understanding Blockchain Technology
            </a>
          </li>
          <li>
            <a
              href="#"
              onclick="readArticle('Introduction to Decentralized Finance')"
            >
              3. Introduction to Decentralized Finance
            </a>
          </li>
        </ul>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
