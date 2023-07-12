const Box = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:500px;
    background-color:rgba(0,0,0,.05);
    border-radius:20px;
    border: 3px solid rgba(0,0,0,.02);
    box-sizing:border-box;
    padding:1.5rem;

    * {
        padding:0;
        margin:0;
    }
`;

const Profile = styled.div`
    display:flex;
`;

const Avatar = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:60px;
    height:60px;
    border-radius:100%;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    background-color:rgba(0,0,0,.05);
    box-shadow: 0 0 0 5px rgba(0,0,0,.1);
`;

const Details = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    flex-grow:1;
    box-sizing:border-box;
    padding: 0 .7rem;
    color;#000;
    opacity:.7;
    line-height:1.4rem;
    transition: all .2s;

    &:hover {
        transition: all .2s;
        opacity:.9;
    }

    p.name {
        font-size:1.3rem;
        font-weight:bold;
        letter-spacing:-.5px;
    }

    p.handle {
        font-size:.8rem;
        font-weight:bold;
        opacity:.7;
    }

    p.time {
        font-size:.8rem;
    }
`;

const Post = styled.div`
    width:100%;
    height:100%;
    flex-grow:1;
    background-color:#fff;
    border-radius:20px;
    margin:1.3rem 0;
    box-sizing:border-box;
    padding:1rem;
    color:rgba(0,0,0,.8);
`;

const Time = styled.div`
    margin-top:1rem;
    padding: .8rem 0 0;
    font-size:.8rem;
    border-top:1px solid rgba(0,0,0,.1);
`;

const Statistics = styled.div`
    display:flex;
    justify-content:space-between;
    border-top:2px solid rgba(0,0,0,.05);
    border-bottom:2px solid rgba(0,0,0,.05);
    padding:.8rem 0;
    text-align:center;

    p {
        display:inline-block;
        font-size:.8rem;
        font-weight:bold;
        background-color:rgba(0,0,0,.05);
        padding:.5rem 1rem;
        border-radius:20px;
    }
`;

const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    padding:1.2rem 0 0;
    text-align:center;

    p {
        display:flex;
        align-items:center;
        justify-content:center;
        width:calc(30px + 1rem);
        height:calc(30px + 1rem);
        font-size:1.2rem;
        font-weight:bold;
        padding:1rem;
        border-radius:100%;
        background-color:rgba(0,0,0,.05);
        color:red;
        cursor:pointer;
        border: 3px solid rgba(0,0,0,.01);

        &:hover {
            img {
                opacity:.9;
                transition: all .2s;
            }
        }
        
        img {
            max-height:24px;
            opacity:.6;
            transition: all .2s;
        }
    }
`;

return (
  <Box>
    <Profile>
      <Avatar
        style={{
          backgroundImage: `url("https://ipfs.near.social/ipfs/bafkreigj7fckrxx4fjgzu2ntgtvbnnest3phljot2vroshnq7kki7xqyoe")`,
        }}
      ></Avatar>
      <Details>
        <p class="name">Lens Protocol</p>
        <p class="handle">@lensprotocol.lens</p>
      </Details>
    </Profile>
    <Post>
      <p>{`We are thrilled to announce we have collaborated with Coinbase Wallet and @xmtp_. With this integration, Lens Protocol users can now message directly within Coinbase Wallet.`}</p>
      <Time>
        <p>05/07/2023 · 17:20 · Posted via Lenster</p>
      </Time>
    </Post>
    <Statistics>
      <p>50 Comments</p>
      <p>143 Mirrors</p>
      <p>155 Collects</p>
      <p>379 Likes</p>
    </Statistics>
    <Actions>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreihzp4er5k54cqym5tzj6yqo5oftnpfillxshuou6qyjbbap677lyu" />
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreihzytwkhu3u6jc7yapsbuwsff33wlltrlcyv2s7h6jqld7qdmfxqm" />
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreiag6hlzwic63nonmqon5cdfs6hbw3qzpdvz3nhckfvezcthc3otrq" />
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreieqyco26dt23l4v66ppp3sdh6pei72h4pdirhl7ety6rxpmxdtra4" />
      </p>
    </Actions>
  </Box>
);
