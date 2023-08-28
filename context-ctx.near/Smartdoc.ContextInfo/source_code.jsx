// Styles
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #345AD5; 
`;
const Container = styled.div`
  position: relative;
  margin-top: 5px;
  width: 100%;
  padding: 10px 40px;
  height: auto;
  min-height: 80px;
  overflow: hidden;
`;

// States

/**
 * Render
 */
let ctxRpc;
let ctxApp;
if (props.network === `devnet`) {
  ctxRpc = `http://localhost:4000`;
  ctxApp = `http://localhost:4100/d`;
} else if (props.network === `testnet`) {
  ctxRpc = `https://testrpc.ctx.xyz`;
  ctxApp = `https://app.ctx.xyz/d`;
} else {
  ctxRpc = `https://ctx.xyz`;
  ctxApp = `https://app.ctx.xyz/d`;
}
ctxRpc += `/near/${context.accountId}`;
ctxApp += `/near/${context.accountId}?network=${props.network}`;

return (
  <>
    <div class="container">
      <Title>Context links</Title>
      <Container>
        <div>
          <a href={ctxRpc} target={`_blank`}>
            {ctxRpc}
          </a>
        </div>
        <div>
          <a href={ctxApp} target={`_blank`}>
            {ctxApp}
          </a>
        </div>
      </Container>
    </div>
  </>
);
