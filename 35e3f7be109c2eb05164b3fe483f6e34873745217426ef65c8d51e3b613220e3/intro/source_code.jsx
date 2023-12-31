const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
div {
  background-color: #f2f2f2;
  padding: 250px;
  border-radius: 5px;
  height: 100vh;

}

/* Style for the heading */
h1 {
  color: #333;
  font-size: 36px;
  margin-bottom: 50px;
  text-align: center;
}

/* Style for the unordered list */
ul {
  list-style-type: none;
  padding: 0;
}

/* Style for the list items */
li {
  margin-bottom: 36px;
}

/* Style for the links */
a {
  color: #0066cc;
  text-decoration: none;
  font-size: 18px;
}

a:hover {
  text-decoration: underline;
}
 }
  .SwitchThumb {
     }
`;

return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div>
        <ul>
          <h1> Welcome to our Crypto App!</h1>
          <br />
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/courses">
              Courses and training
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/Quizzes">
              Quizzes
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/Articles">
              Demystifying Crypto-assets articles
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/News">
              News and Analysis
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/Community">
              Discussions and Community
            </a>
          </li>
          <li>
            <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/Support">
              Support
            </a>
          </li>
        </ul>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
