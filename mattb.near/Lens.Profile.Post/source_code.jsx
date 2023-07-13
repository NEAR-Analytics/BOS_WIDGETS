const Box = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:500px;
    background-color:#F2F2F2;
    border-radius:20px;
    border: 3px solid rgba(0,0,0,.05);
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
    box-shadow: 0 0 0 3px rgba(0,0,0,.05);
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

const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    padding:1.6rem 0 0;
    text-align:center;
    border-top: 2px solid rgba(0,0,0,.05);

    p {
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        width:calc(30px + 1rem);
        height:calc(30px + 1rem);
        font-size:1.2rem;
        font-weight:bold;
        padding:1rem;
        border-radius:100%;
        background-color:#E6E6E6;
        color:red;
        cursor:pointer;
        border: 2px solid rgba(0,0,0,.05);

        &:hover {
            img {
                opacity:.9;
                transition: all .2s;
            }

            .tip {
                opacity:1;
                transition: all .2s;
            }
        }

        .badge {
            position:absolute;
            top:0;
            transform:translateX(calc(50% + 8px));
            font-size:.7rem;
            color:#fff;
            padding: 2px 4px;
            background-color:#35393C;
            border-radius:10px;
            border: 1px solid rgba(0,0,0,.05);
        }

        .tip {
            opacity:0;
            pointer-events:none;
            display:block;
            position:absolute;
            bottom:-85%;
            font-size:.8rem;
            color: #fff;
            background-color:#35393C;
            padding: 2px 8px;
            border-radius:5px;
            font-weight:normal;
            transition: all .2s;
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
    <Actions>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreihzp4er5k54cqym5tzj6yqo5oftnpfillxshuou6qyjbbap677lyu" />
        <span class="badge">50</span>
        <span class="tip">Comments</span>
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreihzytwkhu3u6jc7yapsbuwsff33wlltrlcyv2s7h6jqld7qdmfxqm" />
        <span class="badge">143</span>
        <span class="tip">Mirrors</span>
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreiag6hlzwic63nonmqon5cdfs6hbw3qzpdvz3nhckfvezcthc3otrq" />
        <span class="badge">155</span>
        <span class="tip">Collects</span>
      </p>
      <p>
        <img src="https://ipfs.near.social/ipfs/bafkreieqyco26dt23l4v66ppp3sdh6pei72h4pdirhl7ety6rxpmxdtra4" />
        <span class="badge">379</span>
        <span class="tip">Likes</span>
      </p>
    </Actions>
  </Box>
);
