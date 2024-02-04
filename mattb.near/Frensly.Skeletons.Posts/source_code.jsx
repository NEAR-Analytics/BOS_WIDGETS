
return <>
    <Box>
          <Profile>
            <PostAvatar
              style={{
                backgroundImage: `url("${post.by.metadata.picture.optimized.uri}")`,
              }}
            ></PostAvatar>
            <Details>
              <p class="name">{post.by.metadata.displayName}</p>
              <p class="handle">{post.by.handle.suggestedFormatted.localName}.lens</p>
            </Details>
          </Profile>
          <Post>
            <Markdown
              text={post.metadata.content}
            />
            {post.metadata.asset?.image.optimized.uri && <Markdown
              text={`![Image](${post.metadata.asset.image.optimized.uri})`}
            />}
            <Time>
              <p>
                {post.createdAt} ·{" "}
                {post.publishedOn.id && `Posted via ${post.publishedOn.id}`}
              </p>
            </Time>
          </Post>
          <Actions>
            <p
              onClick={() =>
                State.update({
                  displayCommentSection: !state.displayCommentSection,
                })
              }
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
        </Box>
</>