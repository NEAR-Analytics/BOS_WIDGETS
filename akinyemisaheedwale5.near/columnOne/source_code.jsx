

const ColumnOne = styled.div`
  width: 30%
  .head{
    color: #000
  }
  
  p{
    color: #444;
    font-size: 15px;
  }
`;

return(<>
    <ColumnOne>
       <div>
       <h2 className="head">Column {props.colum}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
       </div>
    </ColumnOne>
</>)