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
  font-size: 28px;
  margin-bottom: 70px;
}

/* Style for the news items */
.news-item {
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  margin-bottom: 50px;
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
  margin-bottom: 10;
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
          <h4>News Websites</h4>
          <p>
            Popular technology news websites like CoinDesk, Cointelegraph, and
            The Block regularly cover the latest developments in blockchain
            technology, including news about cryptocurrencies, blockchain
            projects, and regulatory changes.
          </p>
        </div>

        <div class="news-item">
          <h4>Cryptocurrency Forums</h4>
          <p>
            Websites like Reddit's r/cryptocurrency and Bitcointalk.org have
            active communities discussing and sharing news related to blockchain
            and cryptocurrencies.{" "}
          </p>
        </div>
        <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/intro">
          <button> main page</button>
        </a>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
