const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 336px;
  gap: 64px;
  width: 100%;

  @media (max-width: 995px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const sourceCode = `
\`\`\`jsx
${props.code}
\`\`\`
`;

return (
  <Content>
    <Markdown text={sourceCode} />
  </Content>
);
