const Join = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  width:100%;
  margin:0 1.7rem 0 0px;
  border-radius:20px;
  background-color:#FAFAFA;
  border: 1px solid rgba(0,0,0,.05);
  box-sizing:border-box;
  padding:1.5rem;

  h2 {
      font-size:1.6rem;
      margin:0;
      padding:0;
      font-weight:bold;
    }
`;

const Wrapper = styled.div`
    padding:20px 0;
`;

const Requirements = styled.ul`
    position:relative;
    padding:0;
    margin:0;
    list-style:none;
    padding: 0 0 0 20px;
    border-radius:10px;
    overflow:hidden;

    ::after {
        content:'';
        position:absolute;
        top:0;
        left:9px;
        width:4px;
        height:100%;
        background-color:rgba(0,0,0,.1);
        border-radius:10px;
    }
`;

const Requirement = styled.li`
    font-size:.8rem;
    position:relative;
    padding-left:5px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    
    :not(:last-of-type) {
        margin-bottom:10px;
    }

    h2 {
        font-size:1rem;
        font-weight:normal;
        padding:10px 0;
        margin:0;

        + .description {
            margin-left:10px;
        }
    }

    ::after {
        content:'';
        position:absolute;
        width:15px;
        height:15px;
        background-color:#FAFAFA;
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-17px;
        z-index:999;
    }

    ::before {
        content:'';
        position:absolute;
        width:8px;
        height:8px;
        background-color:rgba(0,0,0,.5);
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-13px;
        z-index:1000;
    }

    &+ .description {
        display:none;
    }
`;

const Description = styled.li`
    margin-left:15px;
    margin-bottom:10px;
    font-size:.8rem;
`;

const ButtonJoin = styled.a`
    align-self:center;
    border-radius:50px;
    font-weight:bold;
    color:#000;
    background-color:#F2F2F2;
    border:1px solid rgba(0,0,0,.05);
    padding:.8rem 2rem;
    font-size:17px;
    cursor:pointer;
    transition: all .2s;
    text-decoration:none!important;
    margin-right:10px;
    
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        color:#000;
    }
`;

return (
  <Join>
    <h2>How to join?</h2>
    <Wrapper>
      <Requirements>
        <Requirement>
          <h2>Click Join now! button</h2>
        </Requirement>
        <Requirement>
          <h2>Connect your NEAR account</h2>
        </Requirement>
        <Requirement>
          <h2>Connect the wallet of the handle you want to link</h2>
        </Requirement>
        <Requirement
          className={`
                  ${
                    state.address && state.chainId == POLYGON_CHAIN_ID
                      ? "verified"
                      : ""
                  }
                  ${
                    state.address && state.chainId != POLYGON_CHAIN_ID
                      ? "selected failed"
                      : ""
                  }
              `}
        >
          <h2>Sign a message to verify ownership</h2>
        </Requirement>
        <Requirement>
          <h2>Save it to your NEAR account</h2>
        </Requirement>
        <Requirement>
          <h2>Enjoy Frensly!</h2>
        </Requirement>
      </Requirements>
    </Wrapper>
    <ButtonJoin href="/mattb.near/widget/NearBadger.Pages.Main" target="_blank">Join now!</ButtonJoin>
  </Join>
);
