const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
.news-container {
  background-color: #f2f2f2;
  padding: 200px;
  border-radius: 5px;
}

/* Style for the heading */
.news-container h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

/* Style for the news items */
.news-item {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* Style for the news item headings */
.news-item h4 {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 5px;
}

/* Style for the news item description */
.news-item p {
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
      <div class="news-container">
        <h1>Crypto-Asset News:</h1>

        <div class="news-item">
          <h4>Headline 1</h4>
          <p>Description of the news article.</p>
        </div>

        <div class="news-item">
          <h4>Headline 2</h4>
          <p>Description of the news article.</p>
        </div>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
