const YouWillReceive = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 16px;
  p{
    margin-bottom:0px;
    line-height:26px;
    img {
      width: 26px;
      height: 26px;
      margin-right:10px;
      margin-top:-4px;
    }
  }
`;

return (
  <YouWillReceive>
    <p>
      <img src={props.secondIconUrl} />
      {props.secondIconName}  to  receive </p>
    <p>{props.text}</p>
  </YouWillReceive>
);
