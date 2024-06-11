const Address = ({ address }) => {
  let { shortenString } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  if (!shortenString) return null;
  return (
    <div className="flex items-center pb-3">
      <span className="inline-block h-4 w-4 rounded-full bg-bg-skeleton mr-3" />
      <span className="flex font-heading font-semibold text-sm group">
        <Link href={`/address/${address}`}>
          {address.length > 22 ? (
            <Widget
              key="tooltip"
              props={{
                children: shortenString(String(address), 10, 10, 22),
                tooltip: address,
              }}
              src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
            />
          ) : (
            address
          )}
        </Link>
        <Widget
          key="copy"
          props={{
            buttonClassName: "w-4 ml-1",
            className: "hidden text-primary w-3.5 group-hover:block",
            text: address,
          }}
          src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
        />
      </span>
    </div>
  );
};
return Address(props);
