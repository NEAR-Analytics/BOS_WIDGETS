const { userAccountId } = props;
const { evaluation_name, evaluation_method, accent_color, text } = VM.require('evaluator.near/widget/Curriculum.HelloNearMD')

const Wrapper = styled.div`
  h1 {
    padding: 2rem; 
    font-size: 3.75rem;
    line-height: 1; 
    font-weight: 700; 
    background-color: ${accent_color};
  }

  h3 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem; 
    margin-top: 0.5rem; 
    font-size: 1.25rem;
    line-height: 1.75rem; 
    font-weight: 700;
    display: inline-block;
    background-color: #1F2937; 
    color: #F3F4F6; 
    padding: 0.25rem 0;
  }

  ul {
    padding: 0
  }

  ul li a {
    color: #2563EB; 
    font-weight: 600;
  }

  ul li a:hover {
    color: #1D4ED8; 
    text-decoration: underline; 
  }
`;

return <>
  <Wrapper>
    <Markdown text={text} props={{ userAccountId }} />
  </Wrapper>
  <Widget src="evaluator.near/widget/Evaluate" props={{ evaluation_method, userAccountId }} />
  <div class="h-1 mt-4" style={{ background: `${accent_color}` }}></div >
</>
