const Alert = styled.div`
  background-color: #28bb4d;
  padding: 20px;
  display: flex;
  border-radius: 8px;
  color: #fff;
  .icon {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-left: 10px;
  line-height: 19.2px;
  .fd {
    font-weight: 600;
  }
`;

const { text, button } = props;

return (
  <Alert>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012L24 4Z" />
        <path d="m17 24l5 5l10-10" />
      </g>
    </svg>
    <Label>{text}</Label>
    {button}
  </Alert>
);
