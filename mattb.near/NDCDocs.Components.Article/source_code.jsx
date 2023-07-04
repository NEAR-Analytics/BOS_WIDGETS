State.init({
  currentSection: 0,
});

const SECTIONS = [
  "Introduction",
  "The NDC",
  "NDC Mission",
  "NDC Core Principles",
  "Key Deliverables",
  "How is NDC Organized",
];

const Main = styled.div`
    display:flex;
    position:relative;
`;

const SideBar = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    min-width:250px;
    height:calc(100vh - 1.5rem);
    border-right:1px solid rgba(0,0,0,.05);
    box-sizing:border-box;
    padding:1.5rem;

    h1 {
      font-size:1.4rem;
      font-weight:bold;
    }

    div:nth-child(1) {
        flex-grow:1;
        overflow-y:auto;
    }

    ul {
        list-style:none;

        li {
            cursor:pointer;
            position:relative;
            
            h2 {
                font-size:.8rem;
                padding:.5rem;
                transition: all .2s;
            }

            &::after {
                position:absolute;
                top:0;
                bottom:0;
                left:-10px;
                margin:auto;
                content: '';
                width:5px;
                height:5px;
                border-radius:100%;
                background-color:#E5E5E5;
                box-shadow: 0 0 0 4px #fff;
                transition: all .2s;
            }

            &:not(:last-of-type) {
                &::before {
                    content: '';
                    position:absolute;
                    width:2px;
                    height:100%;
                    left:-8.5px;
                    background-color:#E5E5E5;
                    transform:translateY(50%);
                    
                }
            }

            &.selected {
                h2 {
                    position:relative;
                    transition: all .2s;
                    font-weight:bold;
                }

                &::after {
                    transition: all .2s;
                    width:10px;
                    height:10px;
                    left:-12.5px;
                }
            }
        }
    }
`;

const ArticleDetails = styled.div`
    left:0;
    right:0;
    bottom:5px;
    margin:auto;
    width:100%;
    min-height:150px;
    box-sizing:border-box;
    border-top: 1px solid rgba(0,0,0,.05);
    padding: .5rem 0;

    .title {
        font-size:.8rem;
        font-weight:bold;
    }

    p {
        padding:0;
        margin:0;
    }

    .title + p {
        font-size:.7rem;
        margin-bottom:10px;
        padding-bottom:10px;
        &:not(:last-of-type) {
            border-bottom: 1px solid rgba(0,0,0,.05);
        }
    }
`;

const Content = styled.div`
    flex-grow:1;
    box-sizing:border-box;
    padding:2rem;
    min-height:100vh;

    img {
        display:block;
        margin:0 auto;
        height:300px;
        border-radius:20px;
        background-color:rgba(0,0,0,.05);
        margin-bottom:30px;
    }

    h1 {
        font-weight:bold;
    }
`;

const Wrapper = styled.div`
  max-width:800px;
  margin:0 auto;
`;

const Controls = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`;

const ControlButton = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:100px;
  border-radius:10px;
  border: 4px solid rgba(0,0,0,.05);
  box-sizing:border-box;
  padding:1rem;
  margin-top:20px;

  & div:nth-child(1) {
    font-weight:bold;
  }

  &.previous {

    div + div {
      flex-grow:1;
      text-align:right;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
        opacity:.5;
      }

    }

  }

  &.next {
    flex-direction:row-reverse;

    div + div {
      flex-grow:1;
      text-align:left;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
        opacity:.5;
      }

    }

  }
`;

return (
  <Main>
    <SideBar>
      <div>
        <h1>The NDC</h1>
        <ul>
          {SECTIONS.map((text, key) => (
            <li
              onClick={() => State.update({ currentSection: key })}
              className={key === state.currentSection ? "selected" : ""}
            >
              <h2>{text}</h2>
            </li>
          ))}
        </ul>
      </div>
      <ArticleDetails>
        <p className="title">Published by</p>
        <p>@neardigitalcolletive.near</p>
        <p className="title">Last edit by</p>
        <p>@neardigitalcolletive.near</p>
        <p className="title">Modified on</p>
        <p>Thu, 6 Jun 2023</p>
        <p className="title">Version</p>
        <p>#16</p>
      </ArticleDetails>
    </SideBar>
    <Content>
      <Wrapper>
        <img
          id="lol"
          className="image"
          src="https://ipfs.near.social/ipfs/bafkreie6esjs3h2bdwrvwdt4zksk3nzfqdds3waej5solgh3vk6a7dm7ly"
        />
        <h1>The NDC</h1>
        <p>A Grassroots Community-Led movement to BuiDL Web3 Gov on NEAR.</p>
        <p>
          Originally proposed by NEAR co-founder Illia Polosukhin, it is now an
          independent movement led by the NEAR Community.
        </p>

        <Controls>
          <ControlButton className="previous">
            <div>{"<"}</div>
            <div>
              <p>Previous</p>
              <p>Introduction</p>
            </div>
          </ControlButton>
          <ControlButton className="next">
            <div>{">"}</div>
            <div>
              <p>Next</p>
              <p>NDC Mission</p>
            </div>
          </ControlButton>
        </Controls>
      </Wrapper>
    </Content>
  </Main>
);
