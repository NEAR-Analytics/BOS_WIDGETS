const standUpContract = "0x7568e517C68D3cB1AaF88b1E76c89a9ec926B5e0";

const standUpAbi = fetch(
  "https://api.polygonscan.com/api?module=contract&action=getabi&address=0xcf8f7085a67646a6f8084c841c3b4d4919b67dd8"
);
if (!standUpAbi.ok) {
  return "Loading";
}

console.log("STAND UP Owners 2", standUpAbi.body.result);
return <div class="LidoFormTopContainerLeftContent2">Stand Up</div>;
