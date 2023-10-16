const H1 = styled.h1`
  color: #ffffff; /* White text for titles */
  font-size: 32px;
  font-weight: 600;
`;

const H6 = styled.h6`
  color: #b0b0b0; /* Light gray text for subtitles */
  font-size: 20px;
  font-weight: 400;
`;

const Button = styled.a`
  display: block;
  color: #ffffff;
  background-color: #1e1e1e; /* Dark background color */
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  float: inline-end;

  :hover {
    background-color: #30A46C; /* Dark green background on hover */
    cursor: pointer;
  }
`;

return (
  <div class="row">
    <div class="col-lg-8 col-sm-12">
      <H1>NEAR Atlas Notebooks</H1>
      <H6>Public Notebooks For NEAR Analytics</H6>
    </div>
    <div class="col-lg-4 col-sm-12">
      <Button
        class="btn btn-primary"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        Post A Notebook
      </Button>
    </div>
  </div>
);
