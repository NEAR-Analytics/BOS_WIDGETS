const Text = styled.p`
  font-family: "Playfair Display";
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  align-content: "center";
  justify-content: "center";
  
`;
const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;

  .image {
    display: block;
    height: 2em;
    margin: 0.5em;
  }

  .attribution {
    display: block;
    height: 2em;
    margin: 0.3em;
  }
}`;
return (
  <div>
    {" "}
    <Badge>
      <a href="https://www.bos.genadrop.io">
        <Widget
          src="mob.near/widget/Image"
          props={{
            className: "image",
            image: {
              ipfs_cid: "bafkreigduruxqsyroisgogpxkttfa4hfii2yprshfdfohantsmwynonliu",
            },
            alt: "GenaDrop x ShardDog",
          }}
        />
      </a>
    </Badge>
  </div>
);
