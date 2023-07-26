const variant = props.variant ?? "";
const className = props.className ?? "";
const children = props.children ?? "#tag";

const Tag = styled.span`
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

&.outline { 
      background: transparent;
      color: #4f46e5;
      border: 1px solid #4f46e5;
    }
`;
return <Tag className={`${variant} ${className}`}>{children}</Tag>;
