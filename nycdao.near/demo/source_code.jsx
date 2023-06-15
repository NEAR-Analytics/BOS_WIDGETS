if (context.loading) {
  return "";
}

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

return (
  <div class="container-fluid py-3 mb-5">
    <div class="row">
      <div class="col-12">
        <H1>NEAR NYC Demo Day</H1>
        <h4>Community Choice Award</h4>
        <H6>Upvote any of the projects you like!</H6>
        <div class="mt-5">
          <Widget
            src="nycdao.near/widget/projects"
            props={{ admins, adminContract: adminContract }}
          />
        </div>
      </div>
    </div>
  </div>
);
