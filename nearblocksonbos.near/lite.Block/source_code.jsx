let Skeleton = window?.Skeleton || (({ children }) => <>{children}</>);
const Block = ({ hash, rpcUrl }) => {
  let { rpcFetch } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.fetcher`
  );
  let { nsToDateTime, yoctoToNear, yoctoToTgas } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  let { shortenString } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  nsToDateTime = nsToDateTime || (() => <></>);
  yoctoToNear = yoctoToNear || (() => <></>);
  yoctoToTgas = yoctoToTgas || (() => <></>);
  formatNumber = formatNumber || (() => <></>);
  shortenString = shortenString || (() => <></>);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState(null);
  useEffect(() => {
    if (rpcFetch && rpcUrl && hash) {
      const blockId = !isNaN(Number(hash)) ? Number(hash) : hash;
      rpcFetch(rpcUrl, "block", { block_id: blockId })
        .then((response) => setBlock(response))
        .catch(setError)
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, rpcUrl]);
  const gas = useMemo(() => {
    let limit = 0;
    let used = 0;
    let fee = "0";
    if (block) {
      limit = block.chunks.reduce((acc, curr) => acc + curr.gas_limit, 0);
      used = block.chunks.reduce((acc, curr) => acc + curr.gas_used, 0);
      fee = Big(used).mul(Big(block.header.gas_price)).toString();
    }
    return { fee, limit, used };
  }, [block]);
  if (error) {
    return (
      <Widget
        key="error"
        props={{ title: "Error Fetching Block" }}
        src={`nearblocksonbos.near/widget/lite.Atoms.Error`}
      />
    );
  }
  return (
    <div className="relative container mx-auto">
      <div className="pt-7 pb-[26px] px-5">
        <Skeleton className="block h-[54px] w-56" loading={loading}>
          <h1 className="flex items-center font-heading font-medium text-[36px] tracking-[0.1px] mr-4">
            {formatNumber(String(block?.header.height ?? 0), 2)}
            <Widget
              key="copy"
              props={{
                buttonClassName: "ml-3",
                className: "text-primary w-6",
                text: String(block?.header.height),
              }}
              src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
            />
          </h1>
        </Skeleton>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Hash</h2>
          <Skeleton
            className="block h-[39px] w-48 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: shortenString(block?.header.hash ?? ""),
                  tooltip: block?.header.hash,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
              <Widget
                key="copy"
                props={{
                  buttonClassName: "ml-1",
                  className: "text-primary w-4",
                  text: block?.header.hash,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
              />
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Time</h2>
          <Skeleton
            className="block h-[39px] w-60 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[24px]">
              {nsToDateTime(
                block?.header.timestamp_nanosec ?? "0",
                "DD/MM/YY hh:mm:ss AA"
              )}
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Author</h2>
          <Skeleton
            className="block h-[39px] w-52 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: (
                    <Link href={`/address/${block?.author}`}>
                      {shortenString(block?.author ?? "")}
                    </Link>
                  ),
                  tooltip: block?.author,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
              <Widget
                key="copy"
                props={{
                  buttonClassName: "ml-1",
                  className: "text-primary w-4",
                  text: block?.author,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
              />
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Gas Used</h2>
          <Skeleton
            className="block h-[39px] w-32 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToTgas(String(gas.used)), 0)} Tgas
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Gas Price</h2>
          <Skeleton
            className="block h-[39px] w-48 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToTgas(block?.header.gas_price ?? "0"), 4)} Ⓝ /
              Tgas
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Gas Limit</h2>
          <Skeleton
            className="block h-[39px] w-36 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToTgas(String(gas.limit)), 0)} Tgas
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Gas Fee</h2>
          <Skeleton
            className="block h-[39px] w-36 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToNear(gas.fee), 6)} Ⓝ
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Shards</h2>
          <Skeleton
            className="block h-[39px] w-10 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              {block?.header.chunks_included ?? 0}
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Parent Hash</h2>
          <Skeleton
            className="block h-[39px] w-48 overflow-hidden"
            loading={loading}
          >
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: (
                    <Link href={`/blocks/${block?.header.prev_hash}`}>
                      {shortenString(block?.header.prev_hash ?? "")}
                    </Link>
                  ),
                  tooltip: block?.header.prev_hash,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
              <Widget
                key="copy"
                props={{
                  buttonClassName: "ml-1",
                  className: "text-primary w-4",
                  text: block?.header.prev_hash,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
              />
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
return Block(props);
