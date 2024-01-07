const Wrapper = styled.div`
  background: #0c0c0c;
  height: 100%;
  padding: 10px;
  margin: 0;

  .content-wrap {
  min-height: calc(100% - 60px); /* Adjust 60px to the height of your footer */
  /* Padding bottom equals to footer height */
  padding-bottom: 60px; /* Same as footer height */
  box-sizing: border-box; /* Include padding in the height calculation */
}
`;

const Navbar = styled.div`
  background: #0c0c0c;
    opacity: 0.8;
    border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 30px 40px;

  .logo {
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    background: linear-gradient(to right, #2F70C0, #F5D34B, #BD2D2F);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; 
  -webkit-text-fill-color: transparent; 
  }

  .logo:hover{
    opacity: 0.75;
  }

  .nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links li {
  padding: 0 15px;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  background: transparent;
  padding: 5px 12px; 
  border-radius: 6px;
}

.nav-links li a:hover {
  color: black;
  font-weight: bold;
  background: white;
  opacity: 0.5;
}

.near-button {
      cursor: pointer;

      color: white;
      background: white;

      border: 1px solid transparent;
      border-radius: 10px;

      padding: 5px 10px;
    }
  
`;

const Header = styled.div`
    background: #0c0c0c;
    
    color: #fff;
    margin: 5px 0px;
    border-radius: 15px;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center; 
    
  .logo2 {
    pointer-events: none;
    color: #fff;
    font-size: 3.5em;
    font-weight: bold;
    background: linear-gradient(to right, #2F70C0, #F5D34B, #BD2D2F);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  }
  
  .center {
    display:flex;
    align-items: center;
    justify-content: center;
  }

  .typing-effect {
  border-right: 2px solid; /* Simulates the cursor */
  white-space: nowrap; /* Ensures text doesn't wrap to a new line */
  overflow: hidden; /* Keeps the content within the bounds of the element */
  animation: typing 4s steps(40, end) forwards, blink-caret .5s step-end;
  /* Adjust the timing in the animation as needed */
  
    pointer-events: none;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; border-color: transparent; }
}

@keyframes blink-caret {
  from, to { border-color: white; }
  50% { border-color: transparent; }
}

`;

const Stat = styled.div`
    background: #1c1c1c;
    opacity: 0.8;

    pointer-events: none;
    
    color: #fff;
    border-radius: 15px;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  
`;

const Card = styled.div`
    background: #1c1c2c;
    background: linear-gradient(to right, #2F70C0, #F5D34B, #BD2D2F);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    
    color: #fff;
    border-radius: 15px;
    padding: 20px 5%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p{
      font-size: 1.1em;
      font-weight: bold;
      line-height: .8;
      text-transform: uppercase;
    }
`;

const Spacer = styled.div`
    margin: 10px 0px;
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px 15px;

    background: #1c1c1c;
    border-radius: 12px;

    .social-button {
      cursor: pointer;

      color: white;
      background: #0c0c0c;

      border: 1px solid transparent;
      border-radius: 8px;

      padding: 5px 10px;
      margin: 0 10px;
    }

    .social-button:hover {
      color: #0c0c0c;
      background: white;

      border: 1px solid transparent;
      border-radius: 8px;

      padding: 5px 10px;
      margin: 0 10px;
    }

`;

return (
  <Wrapper className="content-wrap">
    <Navbar>
      <a className="logo" href='/'>Bac Inc.</a>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <Link to="/components">Components</Link>
        </li>
      </ul>
      <div class="near-button">
      <a href="https://near.social/shemar268abel.near/widget/BAC-HomePage#/mob.near/widget/ProfilePage?accountId=bac-inc.near">
          <svg
            width="20"
            height="20"
            viewBox="0 0 561 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M449.244 28.6222L332.267 202.222C324.178 214.044 339.733 228.356 350.933 218.4L466.044 118.222C469.156 115.733 473.511 117.6 473.511 121.956V434.933C473.511 439.289 467.911 441.156 465.422 438.044L116.978 21.1556C105.778 7.46667 89.6 0 71.5555 0H59.1111C26.7556 0 0 26.7556 0 59.7333V500.267C0 533.244 26.7556 560 59.7333 560C80.2667 560 99.5555 549.422 110.756 531.378L227.733 357.778C235.822 345.956 220.267 331.644 209.067 341.6L93.9556 441.156C90.8444 443.644 86.4889 441.778 86.4889 437.422V125.067C86.4889 120.711 92.0889 118.844 94.5778 121.956L443.022 538.844C454.222 552.533 471.022 560 488.444 560H500.889C533.867 560 560.622 533.244 560.622 500.267V59.7333C560.622 26.7556 533.867 0 500.889 0C479.733 0 460.444 10.5778 449.244 28.6222Z"
              fill="#1c1c1c"
            />
          </svg>
        </a>
        </div>
    </Navbar>

    

    <Header>
      <div className="center">
        <div>Antigua</div>
        <img
          src="https://bafkreih7ormw2rbh6ijhn75vct4j742rwi24ncfpqclncwohwrqvjm56oe.ipfs.nftstorage.link"
          height="40px"
        />
        <div>Barbuda</div>
      </div>
      <span className="logo2">Bac Inc.</span>
      <Spacer />
      <div>
        <p className="typing-effect">
          ♥ Share ideas, connect with people, and get involved! ♥
        </p>
      </div>
      <Spacer />
      <Social>
        <a class="social-button" href="http://x.com">
          <i class="bi-twitter"></i>
        </a>
        <a class="social-button" href="https://github.com/MarmaJFoundation/">
          <i class="bi-github"></i>
        </a>
        <a class="social-button" href="https://t.me/BAC_inc/">
          <i class="bi-telegram"></i>
        </a>
      </Social>
    </Header>

    <Stat>
      <Card>
        <p>$120</p>
        <p>raised</p>
      </Card>
      <Card>
        <p>15</p>
        <p>Components</p>
      </Card>
      <Card>
        <p>220</p>
        <p>Proposals</p>
      </Card>
      <Card>
        <p>12</p>
        <p>Members</p>
      </Card>
    </Stat>

  </Wrapper>
);
