const CardMain = styled.div`
 width: 220px;
  height: 270px;
  perspective: 1000px;

`;
const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.999s;
${CardMain}:hover & {
    transform: rotateY(180deg);
  }

`;
const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #6A2C70;
  color: #fff;
  display: flex;
  align-items: center;
  border: 10px solid #6A2C70;
  border-radius: 10px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(0deg);

`;
const CardBack = styled.div`
 position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #F08A5D;
  color: #fff;
  display: flex;
  align-items: center;
  border: 10px solid #F08A5D;
  border-radius: 10px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(180deg);

`;
const hover = props.hover || `hover`;
const hover2 = props.hover2 || `hover2`;

return (
  <CardMain>
    <CardInner>
      <CardFront>
        <p>{hover}</p>
      </CardFront>
      <CardBack>
        <p>{hover2}</p>
      </CardBack>
    </CardInner>
  </CardMain>
);
