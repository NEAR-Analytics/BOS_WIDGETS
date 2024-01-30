const { userAccountId, evaluatorContract } = props;
const { evaluationName, evaluationMethod, accentColor, text } = VM.require('evaluator.near/widget/Curriculum.HelloNearMD')

const Wrapper = styled.div`
  h1 {
    padding: 2rem; 
    font-size: 3.75rem;
    line-height: 1; 
    font-weight: 700; 
    background-color: ${accentColor};
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
    padding-right: 0.25rem; 
  }

  ul {
    list-style-type: disc; 
    padding-left 1rem
  }

  ul li a {
    color: #2563EB; 
    font-weight: 600;
  }

  ul li a:hover {
    color: #1D4ED8; 
    text-decoration: underline; 
  }

  code {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto; 
  }
`;

return <>
  <Wrapper>
    <Markdown text={text(userAccountId)} />
  </Wrapper>
  <Widget src="evaluator.near/widget/Evaluate" props={{ evaluationMethod, userAccountId }} />
  <div class="h-1 mt-4" style={{ background: `${accentColor}` }}></div >
</>
