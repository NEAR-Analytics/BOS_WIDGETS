const { message } = props;

const Message = styled.div`
    padding:1rem;
    border-left:1px solid rgba(0,0,0,.05);
    height:100vh;
    background-color:#fff;
    width:100%;
    max-width:800px;

    p {
        margin:0;
        margin-bottom:.5rem;
    }
`;

return (
  <Message>
    <p>
      From: <strong>{message.from}</strong>
    </p>
    <p>
      To: <strong>{message.to}</strong>
    </p>
    <p>
      Subject: <strong>{message.subject}</strong>
    </p>
    <br />
    <p>{message.body}</p>
  </Message>
);
