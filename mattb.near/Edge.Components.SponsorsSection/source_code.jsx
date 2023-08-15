const SPONSORS = [
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/image-AMqqW4bBVQS86Xr2.png",
    name: "Computing Architecture & Frameworks",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/keszthelyi-timi-JQVX8fkGiC4-unsplash.jpg",
    name: "Models, Learning, and Inferencing",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/justin-schuler-HW_85uPRC1I-unsplash.jpg",
    name: "Cryptography, Privacy, and Humanity in the Age of AI",
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

const Sponsors = styled.div`
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding:4rem 0;
`;

const Sponsor = styled.div`
    text-align:center;

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
      <p className="title">Sponsors.</p>
      <p className="subtitle">Backed by the bests</p>
      <Sponsors>
        {SPONSORS.map((sponsor) => (
          <Sponsor>
            <Background src={sponsor.image} />
            <p className="title">{sponsor.name}</p>
          </Sponsor>
        ))}
      </Sponsors>
    </Wrapper>
  </Box>
);
