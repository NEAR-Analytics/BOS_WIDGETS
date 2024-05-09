const ColumnStyle = styled.div`
    border: solid 1px #DDD;
    border-radius: 8px;
    padding: 10px;
    float:left;
    display:inline;
    box-sizing: border-box;
    margin: 10px;
`;

const CardStyle = styled.div`
    border: solid 1px #CCC;
    border-radius: 3px;
    padding: 10px;
    margin: 10px 0 0 0;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
`;

const CardTitleStyle = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const NewButtonStyle = styled.button`
    background: rgb(68, 152, 224);
    color: rgb(255, 255, 255);
    border: none;
    font-size: 12px;
    border-radius: 8px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    padding: 2px 10px;
    float: right;
    margin-right: 10px;
`;

const CardActionButtonStyle = styled.button`
    background: rgb(68, 152, 224);
    color: rgb(255, 255, 255);
    border: none;
    font-size: 12px;
    border-radius: 8px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    padding: 2px 10px;
    float: right;
`;

const CardLabelStyle = styled.label`
    font-size: 12px;
`;

return {
  ColumnStyle,
  CardStyle,
  CardTitleStyle,
  NewButtonStyle,
  CardActionButtonStyle,
  CardLabelStyle,
};
