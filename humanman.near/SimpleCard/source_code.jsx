props = props || {
  title: props.title,
  link: props.link,
  description: props.description,
  img: props.img,
  video:
    props.video ||
    "https://youtu.be/QZLUQSOv7VY?origin=https://alpha.near.org/",
};
const Card = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: top;
  align-items: top;
  width: 300px;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: black;
  cursor: pointer;
  margin: 5px;
  padding: 3px 15px;

  &:hover {
    background-color: #e9ecef;
    box-shadow: #444 1px 1px 5px;
  }
`;

const Anchor = styled.a`
  color: #222;
  &:hover {
    text-decoration: underline;
    color: #444;
  }
`;

const VideoAnchor = styled.a`
  color: #222;
  &:hover {
    text-decoration: underline;
    color: #00EC97;
    font-weight: bold;
  }
  transition: all 0.2s ease-in-out;
`;

return (
  <Card>
    {props.img && props.video ? (
      <VideoAnchor href={props.video}>
        <img style={{ maxWidth: "80%", margin: "auto" }} src={props.img} />
        <p>watch key takeaways</p>
      </VideoAnchor>
    ) : (
      <br />
    )}

    <h4 style={{ textAlign: "left" }}>{props.title}</h4>
    <hr />
    <p style={{ textAlign: "left" }}>{props.description}</p>
    <Anchor href={props.link}>Visit Resource</Anchor>
  </Card>
);
