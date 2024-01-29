const Size = props.size || 300;

const Loading = styled.div`
  width: ${Size}px;
  height: ${Size}px;
  line-height: ${Size}px;
  animation: loading 1s linear infinite;
  transform-origin: center center;
  display: inline-block;
  text-align: center;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const body = styled.div``;
const info = styled.div`
`;

const MovingImage = styled.img`
  width: ${Size}px;
  height: ${Size}px;
  position: absolute;
  top: 0;
  left: 0;
  animation: moveImage 1s linear infinite;
  
  @keyframes moveImage {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(10px); // Adjust the value to control the movement
    }
    100% {
      transform: translateX(0);
    }
  }
`;

return (
  <body>
    <Loading style={{ ...props.style, position: "relative" }}>
      <MovingImage
        src="https://i.ibb.co/p3cDCn7/fotor-202401300583.png"
        alt="Moving Image"
      />
    </Loading>
    <info>
      Some Info about Near protocol of India.<br></br> 1. **Community
      Engagement:** NEAR Protocol has a global community of developers,
      enthusiasts, and contributors. If there's a specific community in India,
      it could involve local meetups, events, and initiatives to engage
      developers and users interested in blockchain technology.<br></br>
      <br></br> 2. **Developer Ecosystem:** NEAR Protocol aims to provide a
      developer-friendly environment. In India, if there's a developer community
      associated with NEAR, it may involve hackathons, workshops, and resources
      to encourage blockchain development on the NEAR platform.<br></br>
      <br></br> 3. **Regional Projects:** India has a vibrant blockchain
      ecosystem, and if there's a NEAR community in India, there might be
      regional projects, applications, or startups building on the NEAR
      Protocol. These could span various domains, including decentralized
      finance (DeFi), NFTs, and more.<br></br>
      <br></br> 4. **Educational Initiatives:** Blockchain education and
      awareness initiatives may be part of the efforts in India. This could
      include educational materials, online courses, and collaborations with
      educational institutions. <br></br>
      <br></br>5. **Partnerships and Collaborations:** NEAR Protocol globally
      seeks collaborations with various entities. In India, partnerships could
      involve collaborations with local blockchain organizations, businesses, or
      government bodies interested in the potential of blockchain technology.
      For the most accurate and up-to-date information about NEAR India, I
      recommend checking official NEAR Protocol communication channels, social
      media accounts, or reaching out directly to the NEAR community in India if
      there is one. Keep in mind that developments in the blockchain space can
      occur rapidly, and new information may have emerged since my last update.
    </info>
  </body>
);
