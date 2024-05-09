const role = props.role || "Noob";
const user = props.user || "noob268.near";
const image =
  props.image ||
  "https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/shemar268abel.near";

const Wrapper = styled.div`
  background: #0c0c0c;
  height: 100vh;
  padding: 10px;
  margin: 0;

  .content-wrap {
  min-height: calc(100% - 60px); /* Adjust 60px to the height of your footer */
  /* Padding bottom equals to footer height */
  padding-bottom: 60px; /* Same as footer height */
  box-sizing: border-box; /* Include padding in the height calculation */
}
`;

const Feature = styled.div`
    background: #1c1c1c;
    opacity: 0.8;

    pointer-events: none;
    
    color: #fff;
    border-radius: 15px;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  
`;

const Glow = styled.div`
    background: #1c1c2c;
    background: linear-gradient(to right, #2F70C0, #F5D34B, #BD2D2F);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    
    color: #fff;
    border-radius: 15px;
    padding: 20px 5%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p{
      font-size: 1.1em;
      font-weight: bold;
      line-height: .8;
      text-transform: uppercase;
    }
`;

const Card = styled.div`
    background: #0c0c0c;
    
    color: #fff;
    border-radius: 15px;
    padding: 20px 1%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85%;
    width: 18%;

    margin: 0 1%;

    p{
      font-size: 0.8em;
      font-weight: bold;
      line-height: .8;
      text-transform: uppercase;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-all;
    }

    .role {
        border: 1px solid #1c1c1c;
        border-radius: 5px;
        background: #1c1c1c;
        padding: 4%;
    }

    .prof {
        border: 1px solid #1c1c1c;
        border-radius: 10%;
        margin: 0 0 10px 0;;

        height: 50%;
        width: 50%;
    }
`;

const Spacer = styled.div`
    margin: 10px 0px;
`;

return (
  <Feature>
    <Card>
      <img className="prof" src={image} />
      <p>{user}</p>
      <p className="role">{role}</p>
    </Card>
    <Card>
      <img className="prof" src={image} />
      <p>{user}</p>
      <p className="role">{role}</p>
    </Card>
    <Card>
      <img className="prof" src={image} />
      <p>{user}</p>
      <p className="role">{role}</p>
    </Card>
    <Card>
      <img className="prof" src={image} />
      <p>{user}</p>
      <p className="role">{role}</p>
    </Card>
    <Card>
      <img className="prof" src={image} />
      <p>{user}</p>
      <p className="role">{role}</p>
    </Card>
  </Feature>
);
