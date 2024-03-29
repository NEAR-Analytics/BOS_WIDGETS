const Callout = styled.div`
  display: flex;
  width: 320px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
  position: relative;
  left: 19px;
`;

const CalloutTitle = styled.div`
  color: #02193a;
  font-family: sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%; /* 26.82px */
`;

const CalloutDescription = styled.div`
  color: #7a818b;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%; /* 17.88px */
`;

return (
  <Callout>
    <CalloutTitle>It's a sandbox story first</CalloutTitle>
    <CalloutDescription>
      We are now in a sandbox mutation. Through it, we can suspendisse mattis
      interdum auctor volutpat nisl quis. Scelerisque morbi eget volutpat
      aliquet vitae curabitur non.
    </CalloutDescription>
  </Callout>
);
