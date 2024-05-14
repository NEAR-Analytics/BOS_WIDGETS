const Styled = styled.div`
@keyframes glow {
  from {
    text-shadow: none;
  }
  to {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
}
.headings .headline,
.headings .subheadline {
  margin: 10px 0;
}
.headings .headline {
  font-size: 4.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.headings .subheadline {
  font-size: 1.5rem;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.headings .headline:hover,
.headings .subheadline:hover {
  animation: glow 0.5s ease-in-out forwards;
}
.headings img {
  width: 200px;
  border-radius: 20px;
}

/* hero */
.hero {
  position: relative;
  /* For background animation */
  height: 100vh;
  /* Full viewport height */
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Contain animation */
}

.hero-background {
  /* Add your background image/video here */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.hero-background .bg-video {
  z-index: -1;
  height: 100%;
  background: url(https://ipfs.near.social/ipfs/bafybeihp7g44qet2eaiklsccug3gerjt3dxbqw5wblij7s3zh7zpdnez7a) center/cover no-repeat;
   
  
  ${
    /*background: url(https://s3.amazonaws.com/snwceomedia/dpn/3d4362fd-de19-4e00-9495-6f75674ee861.sized-1000x1000.gif?w=1000) center/cover no-repeat;*/ ""
  }
  
}
.hero-background .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 3, 5, 0.55);
}
@keyframes background-move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.hero-content {
  color: #fff;
  opacity: 0;
  animation: fade-in 1s ease-in forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hero-buttons {
  margin-top: 30px;
}

.hero-buttons a {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin: 10px;
  transition: all 0.3s ease-in-out;
}

.hero-buttons a:hover {
  background-color: #0062cc;
  transform: scale(1.1);
}

.hero-buttons a:after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s ease-in-out;
}

.hero-buttons a:hover:after {
  width: 100%;
}
`;

// const videoUrl =
//   "https://media.istockphoto.com/id/1401456149/video/people-voting.mp4?s=mp4-640x640-is&k=20&c=jPBUgwMnXQH40jRM5FkgRwEdPR_TBMX0u4S6thg1WH4=";
const videoUrl =
  "http://127.0.0.1:5501/vote-chain/src/assets/tests/istockphoto-1401456149-640_adpp_is-ezgif.com-video-to-gif-converter.gif";
return (
  <Styled>
    <div class="hero">
      <div class="hero-background">
        <div class="overlay"></div>
        <div class="bg-video"></div>
      </div>
      <div class="hero-content">
        <div class="headings">
          <img
            src="https://ipfs.near.social/ipfs/bafkreib3x3txsa57lsllu5v5esvajlpkhslgzkzqp4gxnsyqbuhgwgrixy"
            alt="logo"
          />
          <h1 class="headline">VoteChain</h1>
        </div>
        <div class="">
          <h2>Vote with confidence. Vote with power. Vote decentralized.</h2>
          <div class="hero-buttons">
            <a href="https://near.social/abnakore.near/widget/CreateVote">
              Create a Vote
            </a>
            <a href="#votes">Cast Your Vote</a>
          </div>
        </div>
      </div>
    </div>
  </Styled>
);
