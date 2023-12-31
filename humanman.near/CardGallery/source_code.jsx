// propagates props to child widget SimpleCard to create card gallery
const user = "humanman.near";
const props = { cardData: props.cardData };
const Gallery = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

return (
  <Gallery>
    {props.cardData.map(({ img, link, title, video, description, height }) => {
      return (
        <Widget
          src={`${user}/widget/SimpleCard`}
          props={{ img, link, title, video, description, height }}
        />
      );
    })}
  </Gallery>
);
