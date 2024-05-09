const Div = styled.div`
    background-color: #0D0115;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #0D0115);
  justify-content: center;
`;

const NewsItem = styled.div`
  width: 350px;
  height: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  cursor: pointer;
  margin: 0 auto; 
  background:#1a0229;
`;

const NewsHeadline = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #FF7722;
`;

const NewsInfo = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: white;
`;

const NewsLink = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  color: #FF7722;
  display: none;
`;

function NewsComponent() {
  const [news, setNews] = useState([]);

  function fetchNews() {
    asyncFetch("https://api.npoint.io/c6be145d65144a0e2c8b").then((res) => {
      if (res.ok) {
        setNews(res.body);
      } else {
        console.error("Error fetching news:", res.error);
      }
    });
  }

  useEffect(() => {
    fetchNews();
  }, []);

  const renderNewsItems = () => {
    return news.map((article, i) => (
      <a key={i} href={article.link} target="_blank" rel="noopener noreferrer">
        <NewsItem>
          <NewsHeadline>{article.headline}</NewsHeadline>
          <NewsInfo>{article.info}</NewsInfo>
          <NewsLink
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </NewsLink>
        </NewsItem>
      </a>
    ));
  };

  return (
    <Div>
      <Container>{renderNewsItems()}</Container>
    </Div>
  );
}

return <NewsComponent />;
