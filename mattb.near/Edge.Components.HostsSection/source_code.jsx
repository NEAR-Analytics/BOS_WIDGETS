const HOSTS = [
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/image-AMqqW4bBVQS86Xr2.png",
    name: "Lorem ipsum",
    twitter: "lorem",
    description: "This is a test description of the speaker",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/keszthelyi-timi-JQVX8fkGiC4-unsplash.jpg",
    name: "Lorem ipsum",
    twitter: "ipsum",
    description: "This is a test description of the speaker",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/justin-schuler-HW_85uPRC1I-unsplash.jpg",
    name: "Lorem ipsum",
    twitter: "dolor",
    description: "This is a test description of the speaker",
  },
];

const Box = styled.div`
    padding:2rem;
    box-sizing:border-box;
    width:100%;
    min-height:50vh;
    background-color:#fff;
    color:#000;

    .title, .subtitle {
        font-family: Times New Roman;
        padding:0;
        margin:0;
    }

    .title {
        font-size:1.875rem;
    }

    .subtitle {
        font-size:1rem;
        opacity:.6;
    }
    
    .content {
        margin-top:1rem;

        .company {
            font-family: Times New Roman;
            font-weight:bold;
            border-bottom: 1px solid rgba(0,0,0,1);
        }
    }
`;

const Wrapper = styled.div`

`;

const Hosts = styled.div`
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding:2.5rem 0;
`;

const Host = styled.div`
    text-align:center;
    border: 1px solid rgba(0,0,0,.05);
    padding: 1.5rem;
    .title {
        font-size:1.3rem;
        line-height:1.3rem;
        margin:1rem;
    }

    .description {
        font-size:.8rem;
        opacity:.6;
    }
`;

const Background = styled.img`
    display:block;
    width:100%;
    height:100%;
    max-width:150px;
    max-height:150px;
    margin:0 auto;
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
    border-radius:100%;
`;

return (
  <Box>
    <Wrapper>
      <p className="title">Hosts.</p>
      <p className="subtitle">Convening visionary researchers worldwide</p>
      <Hosts>
        {HOSTS.map((speaker) => (
          <Host>
            <Background src={speaker.image} />
            <p className="title">{speaker.name}</p>
            {speaker.twitter && (
              <a
                href={`https://twitter.com/${speaker.twitter}`}
                target="_blank"
                className="description"
              >
                @{speaker.twitter}
              </a>
            )}
            <p className="description">{speaker.description}</p>
          </Host>
        ))}
      </Hosts>
    </Wrapper>
  </Box>
);
