const RubikLogo = () => {
  const { LogoWrapper, Square, Dot } = VM.require(
    "rubik-ui.near/widget/RubikUI.Styled.Core"
  );
  return (
    <LogoWrapper>
      <Square>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </Square>
    </LogoWrapper>
  );
};

return {
  RubikLogo,
};
