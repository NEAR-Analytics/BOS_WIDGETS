const header = props.header ?? <></>;
const body = props.body ?? <></>;
const footer = props.footer ?? <></>;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 0px;
  gap: 10px;
  background: #FFF9ED;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 24px 16px;
  gap: 14px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  border-top: 1px solid #ECEEF0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

return (
  <CardContainer>
    <CardHeader>
      {header}
    </CardHeader>
    <CardBody>
      {body}
    </CardBody>
    <CardFooter>{footer}</CardFooter>
  </CardContainer>
);
