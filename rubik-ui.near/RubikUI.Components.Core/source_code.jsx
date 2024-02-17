const { LogoWrapper, Square, Dot } = VM.require("rubik-ui.near/widget/RubikUI.Styled.Core");

const Rubik = () => {
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
    Rubik
};