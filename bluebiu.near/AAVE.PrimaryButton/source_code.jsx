const { children, loading, config, disabled, width, theme, ...properties } =
  props;

const PrimaryButton = styled.button`
  border: 0;
  color: var(--button-text-color);
  background: ${loading || disabled
    ? "var(--button-disabled-color)"
    : "var(--button-color)"};
  border-radius: 5px;

  height: 40px;
  width: ${width ? width + "px" : "100%"};

  font-size: 16px;
  font-weight: bold;

  transition: all 0.3s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Loading = () => (
  <img
    width={40}
    height={20}
    src={`${config.ipfsPrefix}/bafkreib3s7t6npgjqrplyduxbcrnpx7rnncxzgmsgp5smo3byms272jkgm`}
  />
);

return (
  <PrimaryButton
    disabled={loading || disabled}
    style={theme ? theme : {}}
    {...properties}
  >
    {loading ? <Loading /> : children}
  </PrimaryButton>
);
