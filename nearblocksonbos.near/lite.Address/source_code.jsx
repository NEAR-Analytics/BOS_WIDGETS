let ErrorSkeleton = window?.ErrorSkeleton || (() => <></>);
let AddressSkeleton = window?.AddressSkeleton || (() => <></>);
let AddressKeysSkeleton = window?.AddressKeysSkeleton || (() => <></>);
let Skeleton = window?.Skeleton || (({ children }) => <>{children}</>);
const Address = ({ id, rpcUrl }) => {
  let { apiFetch, rpcFetch } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.fetcher`
  );
  let { yoctoToNear } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber, formatSize } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  if (!apiFetch || !rpcFetch || !yoctoToNear || !formatNumber || !formatSize)
    return <AddressSkeleton />;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({
    address: true,
    stats: true,
  });
  const [stats, setStats] = useState(null);
  const [address, setAddress] = useState(null);
  const ACCOUNT_CODE_HASH = "11111111111111111111111111111111";
  const value = formatNumber(
    Big(yoctoToNear(address?.amount ?? "0"))
      .mul(stats?.near_price ?? "0")
      .toString(),
    2
  );
  useEffect(() => {
    if (rpcFetch && rpcUrl && id) {
      rpcFetch(rpcUrl, "query", {
        account_id: id,
        finality: "final",
        request_type: "view_account",
      })
        .then((response) => setAddress(response))
        .catch(setError)
        .finally(() => setLoading((state) => ({ ...state, address: false })));
    }
    if (apiFetch) {
      apiFetch(`https://api.nearblocks.io/v1/stats`)
        .then((response) => setStats(response?.stats?.[0]))
        .catch(console.log)
        .finally(() => setLoading((state) => ({ ...state, stats: false })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rpcUrl]);
  if (error) {
    return (
      <Widget
        key="error"
        loading={<ErrorSkeleton />}
        props={{ title: "Error Fetching Address" }}
        src={`nearblocksonbos.near/widget/lite.Atoms.Error`}
      />
    );
  }
  return (
    <div className="relative container mx-auto">
      <div className="pt-7 pb-[26px] px-5">
        <Skeleton
          className="block h-[48px] lg:h-[54px] w-full"
          loading={loading.address}
        >
          <h1 className="flex items-center font-heading font-medium text-[32px] lg:text-[36px] tracking-[0.1px] mr-4">
            <span className="truncate">{id}</span>
            <Widget
              key="copy"
              props={{
                buttonClassName: "ml-3",
                className: "text-primary w-6",
                text: id,
              }}
              src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
            />
          </h1>
        </Skeleton>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Balance</h2>
          <Skeleton className="block h-[39px] w-32" loading={loading.address}>
            <p className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToNear(address?.amount ?? "0"), 2)} Ⓝ
            </p>
          </Skeleton>
        </div>
        {context.networkId === "mainnet" && (
          <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
            <h2 className="font-medium text-sm mb-0.5">Value</h2>
            <Skeleton
              className="block h-[39px] w-32"
              loading={loading.address || loading.stats}
            >
              <p className="font-heading font-medium text-[26px]">${value}</p>
            </Skeleton>
          </div>
        )}
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Validator Stake</h2>
          <Skeleton className="block h-[39px] w-32" loading={loading.address}>
            <p className="font-heading font-medium text-[26px]">
              {formatNumber(yoctoToNear(address?.locked ?? "0"), 2)} Ⓝ
            </p>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Storage Used</h2>
          <Skeleton className="block h-[39px] w-32" loading={loading.address}>
            <p className="font-heading font-medium text-[26px]">
              {formatSize(String(address?.storage_usage ?? 0), 2)}
            </p>
          </Skeleton>
        </div>
        {context.networkId === "mainnet" && (
          <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
            <h2 className="font-medium text-sm mb-0.5">Type</h2>
            <Skeleton className="block h-[39px] w-28" loading={loading.address}>
              <p className="font-heading font-medium text-[24px]">
                {address?.code_hash === ACCOUNT_CODE_HASH
                  ? "Account"
                  : "Contract"}
              </p>
            </Skeleton>
          </div>
        )}
      </div>
      <div className="bg-bg-box lg:rounded-xl shadow mt-8">
        <div className="pt-4 pb-6 mx-6">
          <button className="font-medium border-b-[3px] border-text-body py-1 mr-4">
            Access Keys
          </button>
        </div>
        <Widget
          key="keys"
          loading={<AddressKeysSkeleton />}
          props={{ id, rpcUrl }}
          src={`nearblocksonbos.near/widget/lite.Address.Keys`}
        />
      </div>
    </div>
  );
};
return Address(props);
