const { assets } = VM.require(`memelol.near/widget/lol.Config`);

const Token = ({ children, size, near, className }) => (
  <div
    className={
      className
        ? className
        : "font justify-content-center d-flex gap-2 align-items-center"
    }
  >
    {children}
    <img
      width={size}
      height={size}
      className="mt-1"
      src={near ? assets.logoNear : assets.logoLol}
    />
  </div>
);

const format = (number, digits) => {
  if (!number) return 0;

  const num = digits
    ? new Big(number).div(Big(10).pow(digits)).toNumber()
    : number;

  return num.toLocaleString("en-US");
};

return { format, Token };
