const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
.discussion-container {
  background-color: #f2f2f2;
  padding: 200px;
  border-radius: 5px;
}

/* Style for the heading */
.discussion-container h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

/* Style for the discussion items */
.discussion-item {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* Style for the discussion item headings */
.discussion-item h4 {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 5px;
}

/* Style for the discussion item description */
.discussion-item p {
  color: #333;
  font-size: 14px;
  margin-bottom: 0;
}
 }
  .SwitchThumb {
    }
`;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div class="discussion-container">
        <h1>Discussions and Community:</h1>

        <div class="discussion-item">
          <h4>Discussion Topic 1</h4>
          <p>Description of the discussion topic.</p>
        </div>

        <div class="discussion-item">
          <h4>Discussion Topic 2</h4>
          <p>Description of the discussion topic.</p>
        </div>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
      
  </Wrapper>
);
