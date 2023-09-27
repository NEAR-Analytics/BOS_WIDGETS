const DivBackground = styled.div`
  background-color: #FDF3DD;
  height: 100vh;
  display: flex;
  padding-bottom:20vh;
  align-items:center;
  justify-content:center;
`;

const GridView = styled.div`
  display: grid;
  width:100%;
  grid-template-columns: 40% 60%;
`;

return (
  <DivBackground>
    <div>
      <h1>AROUND THE WORLD</h1>
      <GridView>
        <div>
          <div style={{textAlign:"center"}}>
            <>
              <p style={{ fontSize: 20 }}>Visit with Artists</p>
              <p style={{ fontSize: 20 }}>Scan the QR Codes</p>
              <p style={{ fontSize: 20 }}>Collect Stamps</p>
              <p style={{ fontSize: 20 }}>Unlock Prizes</p>
            </>
          </div>
          <div>Add navigation to passport here</div>
        </div>
        <div></div>
      </GridView>
    </div>
  </DivBackground>
);
