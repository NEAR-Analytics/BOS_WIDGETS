const Box = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:700px;
    background-color:#FAFAFA;
    border: 1px solid rgba(0,0,0,.05);
    box-sizing:border-box;
    padding:1.5rem;

    :not(:last-of-type) {
      border-bottom:0;
    }

    :first-of-type {
      border-top-left-radius:20px;
      border-top-right-radius:20px;
    }

    :last-of-type {
      border-bottom-left-radius:20px;
      border-bottom-right-radius:20px;
    }

    * {
        padding:0;
        margin:0;
    }
`;

const Profile = styled.div`
    display:flex;
    @keyframes pulse {
      0% {
        opacity:1;
      }

      50% {
        opacity:.5;
      }

      0% {
        opacity:1;
      }
    }

    animation-name:pulse;
    animation-duration:1s;
    animation-fill-mode:backwards;
    animation-iteration-count: infinite;
`;

const PostAvatar = styled.div`
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
        max-width:400px;
        display:inline-flex;
        font-size:1.3rem;
        font-weight:bold;
        letter-spacing:-.5px;
        margin:0;
        padding:0;
        color:transparent;
        background-color:rgba(0,0,0,.05);
        border-radius:5px;
        margin-bottom:7px;
    }

    p.handle {
        display:inline-flex;
        max-width:200px;
        font-size:.8rem;
        font-weight:bold;
        opacity:.7;
        margin:0;
        padding:0;
        color:transparent;
        background-color:rgba(0,0,0,.05);
        border-radius:5px;
    }

    p.time {
        font-size:.8rem;
    }
`;

const Post = styled.div`
    @keyframes pulse {
      0% {
        opacity:1;
      }

      50% {
        opacity:.5;
      }

      0% {
        opacity:1;
      }
    }

    animation-name:pulse;
    animation-duration:1s;
    animation-fill-mode:backwards;
    animation-iteration-count: infinite;
    width:100%;
    height:100%;
    flex-grow:1;
    background-color:#fff;
    border-radius:20px;
    margin:1.3rem 0;
    box-sizing:border-box;
    padding:1rem;
    color:rgba(0,0,0,.8);
    word-break:break-words;

    img {
      margin-top:20px;
      border-radius:20px;
      max-height:400px;
    }
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
        background-color:#F2F2F2;
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

const Time = styled.div`
    margin-top:1rem;
    padding: .8rem 0 0;
    font-size:.8rem;
    border-top:1px solid rgba(0,0,0,.1);
    p {
      display:inline-block;
      margin:0;
      padding:0;
      color:transparent;
      background-color:rgba(0,0,0,.05);
      border-radius:5px;
      
      :not(:last-of-type) {
        margin-bottom:10px;
      }
    }
`;

const PublicationText = styled.div`
    p {
      margin:0;
      padding:0;
      color:transparent;
      background-color:rgba(0,0,0,.05);
      border-radius:5px;
      
      :not(:last-of-type) {
        margin-bottom:10px;
      }
    }
`;

return <>
    {[1,2,3,4,5].map(() => <Box>
      <Profile>
        <PostAvatar></PostAvatar>
        <Details>
          <p class="name">John Doe</p>
          <p class="handle">example.lens</p>
        </Details>
      </Profile>
      <Post>
        <PublicationText>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem</p>
        </PublicationText>
        <Time>
          <p>
            2024-02-05T22:00:00Z ·{" "}
            Posted via frensly
          </p>
        </Time>
      </Post>
      <Actions>
        <p
        >
          <img src="https://ipfs.near.social/ipfs/bafkreihzp4er5k54cqym5tzj6yqo5oftnpfillxshuou6qyjbbap677lyu" />
          <span class="badge">{post.stats.comments}</span>
          <span class="tip">Comment</span>
        </p>
        <p>
          <img src="https://ipfs.near.social/ipfs/bafkreihzytwkhu3u6jc7yapsbuwsff33wlltrlcyv2s7h6jqld7qdmfxqm" />
          <span class="badge">{post.stats.mirrors}</span>
          <span class="tip">Mirror</span>
        </p>
        <p>
          <img src="https://ipfs.near.social/ipfs/bafkreiag6hlzwic63nonmqon5cdfs6hbw3qzpdvz3nhckfvezcthc3otrq" />
          <span class="badge">{post.stats.collects}</span>
          <span class="tip">Collect</span>
        </p>
        <p>
          <img src="https://ipfs.near.social/ipfs/bafkreieqyco26dt23l4v66ppp3sdh6pei72h4pdirhl7ety6rxpmxdtra4" />
          <span class="badge">{post.stats.reactions}</span>
          <span class="tip">Like</span>
        </p>
      </Actions>
    </Box>)}
</>