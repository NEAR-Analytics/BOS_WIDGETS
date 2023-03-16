const Card = styled.div`
    height: 125px;
    background-color: white;
    padding: 12px;
    margin: 8px;
    border-radius: 22px;
    box-shadow: 5px 5px 5px gray;
    border: solid gray;
`;

const Icon = styled.div`
    height: 24px;
    width: 24px;
`;

const Body = styled.div`
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Title = styled.div`
    max-height: 56px;
    font-size: 20px;
    line-height: 28px;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const Preview = styled.div`
    font-size: 16px;
    line-height: 20.8px;
    color: #A6A6A6;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const message = props.message;

return (
  <Card>
    <div className="d-flex flex-row h-100">
      <Icon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2C10.69 2 9.5 2.85 8.64 4.4L2.24 15.92C1.43 17.39 1.34 18.8 1.99 19.91C2.64 21.02 3.92 21.63 5.6 21.63H18.4C20.08 21.63 21.36 21.02 22.01 19.91C22.66 18.8 22.57 17.38 21.76 15.92ZM11.25 9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75C11.59 14.75 11.25 14.41 11.25 14V9ZM12.71 17.71C12.66 17.75 12.61 17.79 12.56 17.83C12.5 17.87 12.44 17.9 12.38 17.92C12.32 17.95 12.26 17.97 12.19 17.98C12.13 17.99 12.06 18 12 18C11.94 18 11.87 17.99 11.8 17.98C11.74 17.97 11.68 17.95 11.62 17.92C11.56 17.9 11.5 17.87 11.44 17.83C11.39 17.79 11.34 17.75 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.74 11.11 16.48 11.29 16.29C11.34 16.25 11.39 16.21 11.44 16.17C11.5 16.13 11.56 16.1 11.62 16.08C11.68 16.05 11.74 16.03 11.8 16.02C11.93 15.99 12.07 15.99 12.19 16.02C12.26 16.03 12.32 16.05 12.38 16.08C12.44 16.1 12.5 16.13 12.56 16.17C12.61 16.21 12.66 16.25 12.71 16.29C12.89 16.48 13 16.74 13 17C13 17.26 12.89 17.52 12.71 17.71Z"
            fill="#292D32"
          />
        </svg>
      </Icon>
      <Body>
        <Content>
          <Title>error</Title>
          <Preview>{props.message || "details not provided"}</Preview>
        </Content>
      </Body>
    </div>
  </Card>
);
