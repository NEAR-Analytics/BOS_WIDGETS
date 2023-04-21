const H1 = styled.h1`
  color: #11181C;
  font-size: 32px;
  font-weight: 600;
`;
const H6 = styled.h6`
  color: #687076;
  font-size: 20px;
  font-weight: 400
`;
const Button = styled.button`
  display: block;
  color: #09342E;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
`;

return (
  <div class="row">
    <div class="col-8">
      <H1>Discussions</H1>
      <H6>Get help with your projects, join our community!</H6>
    </div>
    <div class="col-4 mt-2 mb-4">
      <Button
        class="btn btn-primary float-end"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        New Discussion
      </Button>
    </div>
  </div>
);
