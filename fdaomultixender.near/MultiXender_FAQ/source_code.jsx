const Mainpage = styled.div`
  height: 2000px;
  margin: 0;
  padding: 0;
  background-color: #22252a;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const NewsContainer = styled.div`
margin-top: 50px;
`;
const NewsItem = styled.div`
  height: auto;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  background-color: #fff;
  color: #22252a; 
  @media screen and (min-width: 414px) {
    width: 350px;
    }
  @media screen and (min-width: 768px){
    width: 450px;
  }
  @media screen and (min-width: 1400px){
    width: 800px;
  }
`;

const NewsHeadline = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #22252a;
`;

const NewsInfo = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color:#22252a;
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
      <a key={i} target="_blank" rel="noopener noreferrer">
        <NewsItem>
          <NewsHeadline>{article.headline}</NewsHeadline>
          <NewsInfo>{article.info}</NewsInfo>
        </NewsItem>
      </a>
    ));
  };

  return (
    <Mainpage>
      <NewsContainer>{renderNewsItems()}</NewsContainer>
    </Mainpage>
  );
}

return <NewsComponent />;
