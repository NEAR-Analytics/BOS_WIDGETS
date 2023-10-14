const IconsSection = styled.div`
display: grid;
grid: repeat(3,300px) / repeat(2,300px);
background-color: #06050b;
color: red;
`;

const IconsDescription = styled.p`
color: white;
`;

return (
  <div>
    <Widget src="amandaalexbr.near/widget/VexHero" />

    <IconsSection>
      <i class="ph-fill ph-users-four"></i>
      <IconsDescription>description</IconsDescription>
      <p>item</p>
      <i class="ph-fill ph-currency-btc"></i>
      <i class="ph-fill ph-chart-line-up"></i>
      <p>item</p>
    </IconsSection>
  </div>
);
