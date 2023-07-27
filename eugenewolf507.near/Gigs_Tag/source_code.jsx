const variant = props.variant ?? "";
const className = props.className ?? "";
const children = props.children ?? "#tag";
const disabled = props.disabled;
const onClick =
  props.onClick ??
  (() => {
    console.log("add onClick via props");
  });

const Tag = styled.button`
display: inline-block;
padding: 4px 8px;
border-radius: 100px;
background: var(--gradient-purple-gradient, linear-gradient(90deg, #9333EA 0%, #4F46E5 100%));
color: #FFF;
font-family: Open Sans;
font-size: 8px;
font-style: normal;
font-weight: 400;
line-height: 120%; /* 9.6px */
border: 1px solid #4f46e5;

&.outline { 
  background: linear-gradient(90deg, rgba(147, 51, 234, 0.10) 0%, rgba(79, 70, 229, 0.10) 100%);
  color: #4f46e5;
    }
`;
return (
  <Tag
    onClick={onClick}
    disabled={disabled}
    className={`${variant} ${className}`}
  >
    {children}
  </Tag>
);
