const Header = styled.div`
  background: #f00;
  width: 100%;
  .contaner{
    text-align: center;
    padding: 50px 0;
    background-color: blue;
  }
  
  .hed{
    color: #fff;
    font-size: 30px;
  }
  .pen{
    color: white;
    margin: 0 50px;
    background-color: lightblue;
    font-size: 15px;
  }
`;

return (<>
    <Header type="heade">
        <div className="contaner">
            <div>
                <h2 className="hed">My First Bootstrap Page</h2>
            </div>
            <div>
                <p className="pen">Resize this responsive page to see the effect!</p>
            </div>
        </div>
    </Header>
</>)