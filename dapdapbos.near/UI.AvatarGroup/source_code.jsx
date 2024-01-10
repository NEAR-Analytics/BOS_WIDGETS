const AvatarGroupWrap = styled.div`
  display: flex;
  padding: 0 10px 0 12px;
`;
const AvatarItem = styled.span`
  margin-left: ${props.gap ? props.gap : -10}px;
`;

const { icons, size, gap } = props;

return (
  <AvatarGroupWrap gap={gap}>
    {icons.map((icon, index) => {
      return (
        <AvatarItem key={index}>
          <Widget
            src="dapdapbos.near/widget/UI.Avatar"
            props={{ src: icon, size }}
          />
        </AvatarItem>
      );
    })}
  </AvatarGroupWrap>
);
