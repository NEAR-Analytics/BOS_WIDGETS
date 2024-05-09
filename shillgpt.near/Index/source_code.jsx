let contractId = "v1.shillgpt.near";
const PRETEND_ACCOUNT_ID = null;
let accountId = PRETEND_ACCOUNT_ID ?? context.accountId;
let debugMode = !!props.debug ?? false;
const MAX_MESSAGE_LENGTH = 600;
const IGNORE_LATEST_RESPONSE_EXPIRED = true;

if (props.referral_id && props.referral_id !== Storage.get("referral_id")) {
  Storage.set("referral_id", props.referral_id);
  console.log("referral_id", Storage.get("referral_id"));
}

let allTokens = {
  "token.lonkingnearbackto2024.near": {
    name: "LONK",
    decimals: 8,
    image:
      "data:image/png;base64,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",
  },
  "ftv2.nekotoken.near": {
    name: "NEKO",
    decimals: 24,
    image:
      "https://assets-global.website-files.com/627f75127980b632e08938a5/628668bb571921a4c96a08e3_niko.png",
  },
  "blackdragon.tkn.near": {
    name: "BLACKDRAGON",
    decimals: 24,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABgAGADASIAAhEBAxEB/8QAHQAAAgMBAAMBAAAAAAAAAAAABwgFBgkEAQIDCv/EADkQAAIBAwMCBQMEAAQEBwAAAAECAwQFEQYHEgAhCBMiMUEJFFEVMmFxI0KBkRYzUrEkJWKhweHw/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMFBAEA/8QAMBEAAQMDAQUHBAIDAAAAAAAAAQACAwQRIRIFEzFBUSJhcZGhsfAUQsHRgfEyUuH/2gAMAwEAAhEDEQA/AMw6OhSWQtInoAGP5Pbqw0Fukdf8OIDiSM47D+M9dlBZljH+MFI4jtjuD+OptIJ4XFOI2jaRV9JGMqQCD/WMH+sdXoacMClzVGrAXuNM1NNZIL/KaR6WoqHpUAq4TLzRVZswBvMVcMvrZeJPsc56tW3e0e4u6V1Ni0BpS4XmsERleGkgaRo4gygu2BhFBZRliBkgZ7jplPCH4D79vTFBrjXMs9k0gTyhmQhamuw2G8kMCEjGGBkYH1YCq3qKaL2uLZzw8WiWx7c6at1qp2wJRT+rmQWYeZKcyTMOb45sSB2Xt26RU7Qjpju29p3QfOPzC5FSvmGtxs1Idtp9Kzcq71aybnars2l6UOweGOX76sIABBWOMiPi3cZMmRj9h+TzpX6VmwsVvC3jXGrbnVphJJqNqaljJ4rnCPFI3duRHrPYgdyMm76i8QGpLjUCS2AxwAg4lHHtg+kqpw3fuCc/11JaN3jv9XMBUV044OomBXmfLySCGPvgg5yO/LAzk9Tpq2utrOB3W/v1T4oqQu0A3PfdU6X6XfhpjxA921wSy9gtdTnt/pTY6omr/pKaLrDVVOhdz7jQxiImlpLvb0mZpQpAWSeJo8KXx3ERIHw3y6Emt3tVtq6u9IqR08DOskalm9KklmAz+M9h8exz0Br7vxqm5Vry0eIoFf8Aw43Y4Zc/5gCO57ex7fH56VBX1khvG6/jb8ps9PSxYkFvC/4Wfe8vgN352emqLg+mHvtopEMzXKzxtWU6okaySPIuOcSJlgWlRQeDEZHfpdKu2VVLP9pUwhG5BDyOFz/JPYf69bL3rxobMbOadm1Pu9ev0u6MpSK300hnrq7sGUpT5BI4kYkbiuQRnuM1fczw07TeMDZi2b52TR9Xt7qfUNnF3pvOgii89pm81Wro4eQk8zkzCZT5vGVWYMVEQoQbUv2altu8fr9LNJQm2qE3HQ/PdY93SzSwSzUzJwkhZo3QYPFgcHv7H26rVXagx4FOIU9jgdj0YdyttNR7aX+Sy3ygki93gmCkxVEQdkEsbEetCyOMj5Ug9x1UEsNdeIqqW20M05oYDVVBiQsIogwUu2PZQWUZ/nqlJE0jKRFMQbLwpIiWHIIQkg4Ge/5Pufbpo/BF4c4919bx6l1VZp6nS9ncGZHQrDW1WRwpeeQcYbm/HOAoBx5ikr1pTT921xqq32G1U0c1wudVDSU8SKkSvK7BEHwqjJHc4Hyfk9aw7NaMtm29qodvNPtGYLJATXTRoVNVVMAJJH/JZgeOSSqIq/HWXaNSaaGzP8j6Dr+AipohLJd3AI5a6v8AbdGafNht0kdFHRwR0+IY1RE9IChVXCgKAMKAAAD2GB0tep7y10q/LWTlHGxJbOeTn3OQTkA5wfx7dujLq+zUF+szUrVdQWdRNKePqWRTkgf9QP8A89DE6Hp5JvIp5KgySDnGpYHCcsEkhcZ7Ht/Xv1Ao5Im3e/it1Y2V9mN4KrUFDNcKgU8LIpIJLOcAD/8AYH+vV701VW/TcpjlpGrpKRHlkjj7EFe5ZiPgdvn+O/t1LWPakTPHI1NjzDz4zL5gXiMYHtnJOe+RjH8dRN33M0VoStvekLfW0dfqiy0iVM9HU1kdJS0lMwQmonLlR5KieJcpnlJKkYILNwOoqmzdhmV6lo5GHUcK9blb0babNbdjXm4mpqKxx3CnENHDhmlKsoICwqPMkZhgABcBTyJC5Iyi3v8AHtqfUlfW0Oz1FNpC3tO/lVySf+YSR5HEqRlacnBJCEkZ4hsA5j97zX796op7lc9xP1nWF3uVXJLcK+uio7Pp+yRscKYgZHj4uXYqGaQ844xG8zYeta1094b9uTb7Lt/SXDde+VqrT1M92Wpo6U1PNlH2lPSSxzHmePaSRzjAAyTx9BDuQep8ltkaHEE8vmFWNjNtdSeIfdSFL9VVddbqRoqy+1tRI7E0ysAIfMzkPIAUXvkDkwyEPWzGlt8prDQx0NTA1TRIRC9O6A4hIbKopPHiuAAvbs2M/lZdv7Dtp4eNvNP6b3M1xpjTOr7+1NP/AMLWWBKyoheoQeTGsFIJaqoYgKnnu0gcqMOcgG46x1pt9tlZE1Fq++x1ssyLLRWGjcw3Kr7+pXimVZKXjghvOjVlOFIBPTRuJW5yfnBY5G1O87Ax6Ip7oeGvbnxF7bVaWm8VGlp3mFxtIrEWSKkqACrKqk5MUq/uCnIKxHuF4nNUbU6M0VWmDdDUl2kqZJeAtGmRS1LGEq55VFUZeNMVdFJjMMj4wCEJyCHuj4rtxtfUM1hJOktK+TG0tjpGjeSWBVftJUACRlkbvjIUBR6DhuSr6v3CgXEFn4fbzI3mARgGfPyRjsCO2T6sYH+UAaqd88cZa91hy6j+fdE+mg1BwFz5BNJ4AtOJdN3au/PP5R09aKutQkE8mdRAFzkcTidjk5zxxj5D9018eiiaWmZBNMw5lkJDcAUHYdwPTxz79v8AdePpe6Lgu2gdyb81NA0zVFLQJLwzLGnlyO/c9gn7DgYyR3PYdEq4rW6Xv0tMs5lihkcJxkIV4i3f2Ppzjv8AyOgrAKiqcw8gLe/uVljcYIWuHMlGSz3KS4xSCeAxzQtwkwPQT39j/WM/31P2irs1tqGut7jp4qWlUNJVTMFSEfHIt2wWx2/J7d8Dqi7aXSW62ybl5fMzYb/0scfn2Hsf9+kH8Znibvl+3tu+zdruM9NpjS8oo54sALWVgiUVDN2yRHIxVR3/AGcvfjxkNp3PmMYwqUcjXMDzwTT76eOJ69a3S2xtPUQwPCUfUiUifbghZGxCspTzECwTCSZlMUfHHqLKGT7efcnWJ3FuV0rtDvR3S722Kt/T77IFhtcsjBgJKSByssp8pDJHUqPWi8ogFGQ1ctZ11XaEgF0un3hnjfzhcSsUVDGOCUyQgDDlgHZiT6UQDHq5fGbVlFbYKiXm9RNKA9RUVDeYzsB3ZpHyxP8AOfjqrDSMjNyifPdulqharbtJamc1ZTmS0stQvFQ8jepmRIyUA7+w7D2x8dVS6aPp4Z2+2fzmGWfzAclu3Y9vf3/2/nqdk3Xo2l8kvCVJIJ8liv8A36+aVdPWxNU0zpLG+f8Altkf17/9+tNmOwFnyFx6M1PquxarlvlFrq82m7VKGCor6a4yxzTQhoz5byhssuUXsTgeWD8AdWm56zs9uerr6U1FfclBL3KrCyS1SthnYyNn94PHl6mxg5HI9Ue/VHClYMrLNH39AxhR7YP4zjv39+q1bLZd9TXBbfQB5pSAAHc4VR2Gc+wGcf646TcROs0I7lwyrh+v6r3D1FBp7Q2mK+73S5AQU9vt9NLU1FRwDvxWKMc3Iyzdh7AnH4fzYn6YcOhNO2vczxA1tPLeLjC/m2V/K8i0mVWC83bKSVCjBHbgjE4DlVbpOdt9W7q7OaZrrXpHdeHR1PfWjlrp7THDFc3BGFVayNPulUMowgkVMsxwCxJoG4WsKzVVWldqDW+odVVqg8ZrxXSVTJyALYeR2OSR3PbOB7+/SpWyvyTZcsLWWt/0u9L37RCb07VaqpEguGnr5S0lWFBIMpSojYqTjkhEQZTgZDA+xHRd3M24qJathSRyCJZxI4ip+XBMAHGPj5/k9+/v1RNoaeon8Ud93S0xeBcrJunZmgrIXeGmqbPcaRYhGsqBm5h/IPA+ntKcj0Dk0szAadjmvtI8NScUzOyH1KPlu3YHH/bpNdI5s4lGDa58eBHmghhDojG7hf8AooO6Ts0djs0dGlO0TMxkcM3JmYgDJ/HYDt/HWcPix231NUa51reJNOUNPYNJXC7XmG701IizVM1zvRT7eolAzIoKytEAfQYpwRyc4fbxgbuP4XtCw6ypbI10NxrYrbSeXLgRySRSMspbB7Ax49gcEkYIDdZe7lb56l3RqxVajqo46dZp6imtFHEIKKlaVy8pjjUBVLM7EtgklmJJz0FEx73l7k8hrGAeiGXt1LaX0tNqStrrlJbP1G3aWozea+iLcEqkQnjEzYYKG4sMlSMlc9Qi3OjraqaKCaEyx/vjTtx/06KGxG8SbQ3+6PdbH+tad1JbpLTfLaJvJappnDKQHHcel5BgEd2Bz6QDWuLdUhULxB7h7V727v0Vz2021pNr9MQ2ujtQooYvOkMkSHnPMExzkLEJy/cyxozHkW69dTbc12iaPS9zjeWNtQ2+WWshkQxgPH5Y5rke5Ln4x2P99FSgrfDFTVv38VBq6eOWc1X2D2O2UtUJMNhWuYnchRy7lacB8D0ISCtK3b3BrtcX2ov1caekgiRKO02ulkaSC3UUUaxU8CO37iESMM2MuwJOOyhMTWsBHHv6fMonXOULfurRURrLd4ZaiKNm+5SBwsjY9lVyCMH5yM+5HfqCpaevvVykp7BRyxCZiUp4pGfgoGQCfc4A9+pVoqqW3S3tLQlVaaSQwTEy8OJc+nurBuRyPgj/AN+ua1acudZQivt1wR4jkzxU7kzxgMoJ4HGThs+49j3x36U86nLowFJ2HSQi1DRw7kvqC3WFZwLlLbKRKusRBy7RRySxxs5Ix6pABkt6scTp94Ll+mLpSro7lo3VtBFqyFY6kVm4bJTXCndmLIkUkqrRrMpfgTSnkQmcsDyK5eHz6d+qfEjpun1hoPxK6SqLVFIsFwh+0qzX22TBIjlpnVMN749QVh3VmA6Yuv8ApVbIbG7X6j3H3B3AvWsbvp611FbSCSBKC3vVorfbI0CmRmVpDGrK0hDZ+ASOlPY2UhgJuV7XoBceCA0G4G6m294lt9xuN7st0p54mqrbV0hp2VQFdC6sAynBUj0j0nOe/WsOz2oNK7oaGoNb6V1BXz2q60UcMtter+4ShnUDzIS0ieb5iMWBLH1Ahu68MKjuNoKi3Q8MF81vrnU1J+qWHzbzQXGpZTMsvFc0oJIHGY8Y+K4HmGPCsUwRZ4K/EjHsdquq0rra5zDSN5YCYxzedFRVXH01CogYtlV4PwI7cSeRRV6r1DG7ThdIxtnsJB7+tsZ+BSmvfs2cRSPJY4Ai/L5zTQ/UD2W15up4aZ7NoOlmvF80xdqa+UdFTxlqmujWOWCaGMD2fy6mQjGeQXjj1dYp/rFF5kkEnnI8TFJEaFwysPcEYyD36/SlBPDUwx1NNMksUqh45EYMrqRkEEdiCPnpPPFN9MnZ/wARF5qtbaXvE23mrrhMJq+ut1Ck9HXOWdpZZ6QNHyncuSZQ6knuwYk5kQy7oaeSrOGrKxvhewQiOto4KOjVkFMCvo5lFUHPI5Ld1J+fUD89e0l1pUGUEkh7ekLjI/ILYB/36fKj+i7uma2ClrfEVZY7bC7IssdnmlljiJJysTSKuSTnjzAyT36MejPo17EWmNJNc7l661JUj9y088Fvpm9ZP/LCO49PFe0n/Ue2RxcKloGAh0lZN1l5hKPDUypSxOhGeWZGHyBj2P8AI5e/UHdNSRzximpEYInpQr6Qq49h8n49/wAdMF9Q3w+bd+HDe2DQ22dFX0tpe1w1HGsqXnd3Pdn5sPySuB2HAds5JV6KKSaRYokLOxwAPnoTOXjsotGk5Uvp/VNw0888cKpUUlWhiqaWXJSSMkch/BIUDP8AA/A6NXgz8Ndu8UG4lZoQaylsVfDTfc0/lMvnRxYYNVqr4WoEMnkB6cPFIyzF0b/CZSF6iyw0EP8A4l+UgQEkEce4B/8ArPTgfSe1ps3prxDxWbcbTby6nvTwxaOvgmdRbawRVEc0DKrDIqI5wmTyHJFXGHLKDw5gF16900mxH0zPEHsJufbtd6O8UNBSwQVcL3CGO1VPC50sbZMFTAs6rKrDIIL5BOQwIB6Kf1Hd1I7Xou17PWnz5bpqKRbhWRwl/TRxFgisB2fnKpIHfHkEkAlSGa3W3P0vs/oa4661ZWxw01FGRBCz4erqCD5cEYAJLMR8A8QGY4VWIyx1rX6J3F3Fu2vt1N01qv1QyVRpbJBUzSI7M4jgjknQhIox5YAOTxHEAYDHZs2IyS7+QGzegJuf+LBtCXSzcsIu7qQLD+VftuNc6ntd3jFv0TV36CORZlt7UzTxx1PskoHBsMBnBAB9u5AIPFr2DYrdS5Vdwvwj2z1EKRGpmoYIUts4EpcySUyxq7TOjMOYcAlU/BzE6C3Nvmhqxayy1ppZOayFuCuCVzx/cCV7MwOPcE9GzceTafxf1lngq9QXWzaptdrlgpZo6VWhqJnPJYZOeM4YHBBUes5I6q1jPp596WkA/e29xb/YWt74XLGeHQ2ziPtPPwN7rr8Ou/7bKmn0Lq3djSertELO1Nb6ilrQlwt8TO7LO8cgXlGc+qFXkdSRwzjizl6E3I0buZbZLzoi7Pc6CNghqRSTRRs3f0q0iKGIx3C5xkZxkZx+1RsjuzpDUUugblt1dKi6lmqYXoaKWq+6hQAGSB4wVki9aklR2JAbBGB42/3k3Q2Uv7VGjdQ19sqKR2hmpahDwJGVeOWBsqcHIwwJUgEYIBCptmR1Q3kTwXHPKx78LBFtJ1N2JGEAY8PNbT9RWqNSWvSVhrdQ3mrhpqSihaWSSVwiqACSSSQAAASf4B6RTRv1JtXWueeybhbeUN2rY5vISS21RpyHDsGU4WVZckqF4hR6T+7I6G31AfF5d9QWiPZ6yPFD+rUEVXeEjSaKa2lzE60ZfIEp4iRZRjiSQMDBHUSeimgcGOHHh+1apaqGpBc04HH9JN/F7rVPEDv3qLca3Xyaa1VLQwW8zUpjYQxxqp9JcnBYOQTgkccqn7VGFDY7bZo2mAZ3wOUj9z/QHsBnqUAbA5Nkj8DGeuKvqCV8mP2yA7Edgc9hnrVHCyMAALr5C83KrN9lk+2YzF1dyB7e5/Gf6HTdeArWfhZsO32sabeLb03bXNpuVPf9OXCKMJUf4XlCKGGoB5wFZlMjNjiVb/MwVCnV+nE03CJSY4/n3I/vokbOafpx9pqi33GQTRGaGuppMFWPby8L8r8nlkEj27dFDEKmpDOSRVTfTwF/Pkmx3R3b3E8SOrluGqNR0FNSQTeXSU1TXR0lHQxyN3KI7AkDiOTAM5CryJwo6kdu9tNPPuDZKSg1zZbtcTVxV9JRWaiqrlM88Tu6UYR1jjdHCoXkZgEAOewbIrt17S33U3mqtNru0sxaYw1cT+VHKXzny4yin2zxPKMhsFT7B39utN2zZqrtO7Wv203pvVdcKpBp+12QQxUyeUymMzLLhHZXVsnKDmnwC3VislNKwMjFrg2A5nyPnZRaGEVcmt+TfJN+Hp7r/9k=",
  },
  "token.0xshitzu.near": {
    name: "SHITZU",
    decimals: 18,
    image:
      "data:image/webp;base64,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",
  },
  "nearnvidia.near": {
    name: "NEARVIDIA",
    decimals: 8,
    image:
      "data:image/jpeg;base64,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",
  },
};

if (state === undefined) {
  State.init({
    selectedTab: !!accountId ? "Main" : "About",
    showUnstakeForm: false,
    buyCreditAmount: 0.1,
    withdrawCreditAmount: 0,
    nonce: 0,
    pauseNonce: false,
    requestFromAccountId: props.requestFrom,
    tokenInMessage: "",
    tokenOutMessage: "",
    refLink: accountId
      ? `https://near.social/shillgpt.near/widget/Index?referral_id=${accountId}`
      : null,
  });

  // Auto refresh orders and account
  setInterval(() => {
    State.update((state) => ({
      ...state,
      nonce:
        accountId && !state.pauseNonce && !state.requestFromAccountId
          ? state.nonce + 1
          : state.nonce,
    }));
  }, 1000);
}

const getTokenPrices = () => {
  if (!state.pricesNonce || state.pricesNonce + 10 <= state.nonce) {
    asyncFetch("https://indexer.ref.finance/list-token-price").then((r) => {
      State.update({
        pricesNonce: state.nonce ?? 0,
        prices: JSON.parse(r?.body ?? "{}"),
      });
    });
  }
};

const getUserBalance = (tokenId) => {
  Near.asyncView(tokenId, "ft_balance_of", {
    account_id: accountId,
  }).then((balance) => {
    if (balance !== null) {
      let userBalances = state.userBalances ?? {};
      userBalances[tokenId] = getFtBalance(tokenId, balance ?? 0);
      State.update({ userBalances });
    }
  });
};

const getUserRequestResponse = (requestAccountId) => {
  if (requestAccountId) {
    Near.asyncView(contractId, "get_user_request_response", {
      account_id: requestAccountId,
    }).then((userRequestResponse) => {
      if (userRequestResponse) {
        if (userRequestResponse?.request?.token_in) {
          userRequestResponse.request.tokenInName =
            allTokens[userRequestResponse.request["token_in"]].name;
        }
        if (userRequestResponse?.request?.token_out) {
          userRequestResponse.request.tokenOutName =
            allTokens[userRequestResponse.request["token_out"]].name;
        }

        console.log("userRequestResponse", userRequestResponse);
        let shillResponseText = userRequestResponse.response.text;
        let shillResponseSize = "SHILL_DECLINED";
        let shillResponseObject;
        try {
          shillResponseObject = JSON.parse(userRequestResponse.response.text);
          shillResponseText = shillResponseObject.reason;
          shillResponseSize = shillResponseObject.size;
        } catch (ex) {
          console.log("get_user_request_response parse error", ex);
        }

        if (
          userRequestResponse?.response.ok &&
          userRequestResponse?.response.text
        ) {
          userRequestResponse.response.shillAccepted =
            shillResponseSize.startsWith("SHILL_ACCEPTED");
          userRequestResponse.response.shillDeclined =
            shillResponseSize == "SHILL_DECLINED";
          userRequestResponse.response.textCleaned = shillResponseText;

          if (shillResponseSize == "SHILL_ACCEPTED_HALF") {
            userRequestResponse.response.verdict = "Shill accepted!!!";
            userRequestResponse.response.color = "#00a951";
          } else if (shillResponseSize == "SHILL_ACCEPTED_QUARTER") {
            userRequestResponse.response.verdict =
              "Shill accepted by half amount!";
            userRequestResponse.response.color = "#00a951";
          } else if (shillResponseSize == "SHILL_ACCEPTED_EIGHTH") {
            userRequestResponse.response.verdict =
              "Shill accepted by quoter amount";
            userRequestResponse.response.color = "#00a951";
          } else if (shillResponseSize == "SHILL_ACCEPTED_SIXTEENTH") {
            userRequestResponse.response.verdict =
              "Shill accepted by eighth amount";
            userRequestResponse.response.color = "#00a951";
          } else if (shillResponseSize == "SHILL_DECLINED") {
            userRequestResponse.response.verdict = "Shill declined...";
            userRequestResponse.response.color = "#e02e49";
          }
        } else if (userRequestResponse?.response.ok == false) {
          userRequestResponse.response.verdict = "Shill Failed";
          userRequestResponse.response.textCleaned = shillResponseText;
          userRequestResponse.response.color = "#e02e49";
        } else {
          userRequestResponse.response = { verdict: "Pending" };
          userRequestResponse.response.color = "#36aeb3";
        }
      }

      State.update({ userRequestResponse });
    });
  }
};

let whitelist = Near.view(contractId, "get_whitelist");
let pools = Near.view(contractId, "get_pools");
let user_pools = [],
  user_credits_data = [];
if (accountId) {
  user_pools = Near.view(contractId, "get_pools_for_user", {
    account_id: accountId,
  });
  user_credits_data = Near.view(contractId, "get_credits", {
    account_id: accountId,
  });
}
let requestCost = Near.view(contractId, "get_request_cost");

useEffect(() => {
  if (accountId && state.nonce % 10 === 0) {
    (whitelist ?? []).map((t) => getUserBalance(t));
  }

  getTokenPrices();
  getUserRequestResponse(state.requestFromAccountId ?? accountId);
}, [state.nonce]);

if (!whitelist || !pools || !requestCost) {
  return "Loading";
}

getUserRequestResponse(state.requestFromAccountId ?? accountId);

const userCredits = user_credits_data[0];
const userFreeEntryAvailable = user_credits_data[1];
const userCreditsAvailable =
  userFreeEntryAvailable || Number(userCredits ?? 0) > 0;

const request = () => {
  if (state.tokenIn && state.tokenOut) {
    let args = {
      request: {
        token_in: state.tokenIn,
        token_out: state.tokenOut,
        token_in_message: state.tokenInMessage ?? "",
        token_out_message: state.tokenOutMessage ?? "",
      },
    };

    if (Storage.get("referral_id")) {
      args.referral_id = Storage.get("referral_id");
    }

    Near.call(
      contractId,
      "request",
      args,
      "300000000000000",
      state.attachNearToEveryRequest || !userCreditsAvailable ? requestCost : 0
    );
  }
};

const deposit = () => {
  if (state.depositAmount && state.depositToken) {
    let amount = Big(state.depositAmount)
      .mul(Big(10).pow(allTokens[state.depositToken].decimals))
      .toFixed();
    Near.call(
      state.depositToken,
      "ft_transfer_call",
      {
        receiver_id: contractId,
        amount,
        msg: '"Deposit"',
      },
      "50000000000000",
      "1"
    );
  }
};

const getFtBalance = (tokenId, balance, decimals) => {
  if (decimals == undefined) {
    decimals = 10;
  }
  if (balance === undefined || balance === null) {
    return "Undefined";
  }
  return Number(
    Big(balance)
      .div(Big(10).pow(allTokens[tokenId].decimals))
      .toFixed(decimals, 0) // 0 to ROUND_DOWN
  );
};

const getFtWithDecimals = (tokenId, balance) => {
  if (balance === undefined || balance === null) {
    return "0";
  }
  return Big(balance).mul(Big(10).pow(allTokens[tokenId].decimals)).toFixed();
};

const getNearBalance = (balance, decimals) => {
  if (decimals == undefined) {
    decimals = 10;
  }
  if (balance === undefined) {
    return "Undefined";
  }
  let res = Big(balance).div(Big(10).pow(24)).toFixed(decimals, 0); // 0 to ROUND_DOWN
  return Number(res);
};

const getYoctoNear = (balance) => {
  if (!balance) return 0;
  return Big(balance).mul(Big(10).pow(24)).toFixed();
};

const withdrawCredit = () => {
  if (state.withdrawCreditAmount) {
    Near.call(
      contractId,
      "withdraw_credits",
      { amount: getYoctoNear(state.withdrawCreditAmount) },
      "30000000000000"
    );
  }
};

const buyCredit = () => {
  if (state.buyCreditAmount) {
    Near.call(
      contractId,
      "buy_credits",
      {},
      "30000000000000",
      getYoctoNear(state.buyCreditAmount)
    );
  }
};

const unstake = () => {
  if (state.unstakeAmount) {
    Near.call(
      contractId,
      "unstake",
      {
        token_id: state.unstakeTokenId,
        amount: getFtWithDecimals(state.unstakeTokenId, state.unstakeAmount),
      },
      "70000000000000"
    );
  }
};

const css = `.balances{
cursor: pointer;
display: flex;
flex-direction: row;
-webkit-box-align: center;
align-items: center;
padding: 0.3em 0.65em;
margin-right: 0.5em;
gap: 0.5em;
background: #6c757d;
border-radius: 14px;
flex: 0 0 auto;
order: 0;
-webkit-box-flex: 0;
font-style: normal;
font-weight: 600;
font-size: 0.7em;
line-height: 1em;
color: white;
}

h2 {
font-style: normal;
font-weight: 700;
font-size: 2em;
line-height: 36px;
color: #000000;
margin:0;
}

h3 {
font-style: normal;
font-weight: 700;
font-size: 1.5em;
line-height: 36px;
color: #000000;
margin:0;
}

h4{
font-style: normal;
font-weight: 700;
font-size: 1.2em;    
color: #000000;
margin:0;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.75em;
    gap: 0.75em;

    @media (max-width: 600px) {
    flex-direction: column;
    }
}

.main-title {
font-style: normal;
font-weight: 700;
font-size: 1.75em;
color: #101828;

@media screen and (max-width: 768px) {
font-size: 1.25em;
}
}

.main-subtitle {
ont-style: normal;
font-weight: 400;
font-size: 1.3em;
line-height: 1.5em;
color: #475467;

@media screen and (max-width: 768px) {
font-size: 1em;
}
}

.tabs-container{
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
overflow: hidden;
border-bottom: 1px solid #eceef0;
width: 100%;
padding: 0;
}


.olcards, .olcards * {
margin: 0;
padding: 0;
box-sizing: border-box;
}

.olcards {
list-style: none;
counter-reset: cardCount;
font-family: sans-serif;
display: flex;
flex-direction: column;
--cardsGap: 1rem;
gap: var(--cardsGap);
padding-bottom: var(--cardsGap);
}

.olcards li {
counter-increment: cardCount;
display: flex;
color: white;
--labelOffset: 1rem;
--arrowClipSize: 1.5rem;
margin-top: var(--labelOffset);
}

.olcards li .icon {
grid-area: icon;
align-self: start;
font-size: 2em;
}

.olcards li .content .title {
grid-area: title;
font-size: 1.25em;  
}

.olcards li .content .text {
grid-area: text;
}
`;

const Notice = styled.div`    
padding: ${(props) =>
  props.isSmall
    ? `7px 7px 7px ${props.paddingLeft ?? "7px"}!important`
    : `15px 15px 15px ${props.paddingLeft ?? "15px"}!important`};
font-size: ${(props) => (props.isSmall ? "90%" : "100%")};
background-color: #fafafa;
border-left: 6px solid #7f7f84;
margin-bottom: ${(props) => `${props.marginBottom ?? "10px"}`};
-webkit-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
-moz-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
border-color: ${(props) => props.cardColor};
}
`;

const MyListItem = styled.li`
.icon img {
width: 32px;
}
.content::before {
content: "";
position: absolute;
width: var(--labelOffset);
height: var(--labelOffset);
background: ${(props) => props.cardColor};
left: 0;
bottom: 0;
clip-path: polygon(0 0, 100% 0, 0 100%);
filter: brightness(0.75);  
display: ${(props) => props.displayNumber};
}

&::before {
content: counter(cardCount, decimal-leading-zero);
background: ${(props) => props.backColor};
color: ${(props) => props.cardColor};
font-size: 2em;
font-weight: 700;
transform: translateY(calc(-1 * var(--labelOffset)));
margin-right: calc(-1 * var(--labelOffset));
z-index: 1;
display: flex;
justify-content: center;
align-items: center;
padding-inline: 0.5em;
display: ${(props) => props.displayNumber};
}

.content::after {
content: "";
position: absolute;
height: var(--cardsGap);
width: var(--cardsGap);
background: linear-gradient(to right, rgba(0, 0, 0, 0.25), transparent 50%);
left: 0;
top: 100%;
display: ${(props) => props.displayNumber};
}

.content {
background-color: ${(props) => props.cardColor};
--inlinePadding: 1em;
--boxPadding: 0.5em;
display: grid;
padding: var(--boxPadding) calc(var(--inlinePadding) + var(--arrowClipSize))
var(--boxPadding) calc(var(--inlinePadding) + var(--labelOffset));
grid-template-areas:    "icon text";
align-items: center;
gap: 0.25em 1em;
clip-path: polygon(0 0, calc(100% - var(--arrowClipSize)) 0, 100% 50%, calc(100% - var(--arrowClipSize)) 100%, calc(100% - var(--arrowClipSize)) calc(100% + var(--cardsGap)), 0 calc(100% + var(--cardsGap)));
position: relative;
}
`;

const TabItem = styled.a`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;
padding: 1em;
margin: 0;
text-decoration: none;
transition: all 0.2s ease-in-out;
border-bottom: 4px solid
${({ selected }) => (selected ? "#0091ff" : "transparent")};
font-style: normal;
font-weight: 600;
font-size: 0.9em;
line-height: 1em;
color: ${({ selected }) => (selected ? "#11181c" : "#687076")};

&:hover {
color: #667085;
text-decoration: none;
background-color: #f9fafb;
}

span {
margin-left: 0.25em;
margin-right: ${({ hasCount }) => (hasCount ? "1.75em" : "0")};
}  
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}    
`,
  });
}

const Theme = state.theme;

const navTabs = !!accountId
  ? ["Main", "Credits", "Pools", "Earn", "About"]
  : ["Main", "Pools", "Earn", "About"];

let now = Date.now();
let isLatestResponseExpired =
  (state.userRequestResponse?.request_timestamp ?? 0) / 1000000 +
    10 * 60 * 1000 >
  now;

let showLatestResponse = !state.requestFromAccountId
  ? IGNORE_LATEST_RESPONSE_EXPIRED || isLatestResponseExpired
  : true;

console.log("showLatestResponse", showLatestResponse);

const timestampBeforeNow = (timestamp) => {
  let date = timestamp / 1000000;
  let now = Date.now();
  console.log("date", date, now);
  return date <= now;
};

const timestampToHumanDate = (timestamp) => {
  var date = new Date(timestamp / 1000000);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString().slice(-2);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
};

const copySvg = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    style={{ width: "1em", marginTop: "-0.2em" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="14" rx="2" ry="2" width="14" x="8" y="8" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

console.log("pools", pools, user_pools);

let tokenOutBalance = null;
if (state.tokenOut && user_pools) {
  let tokenOutPool = (user_pools ?? []).filter((p) => p[0] == state.tokenOut);
  if (tokenOutPool.length) {
    tokenOutBalance = getFtBalance(
      tokenOutPool[0]?.[0],
      tokenOutPool[0]?.[1]?.user_balance,
      2
    );

    if (tokenOutBalance == "0.00" || tokenOutBalance == 0) {
      tokenOutBalance = null;
    }
  }
}

const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

const latestResponseBlock = (
  <div
    id="latestResponse"
    class="card"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style={{ width: "100%" }}
  >
    {state.userRequestResponse?.response?.verdict && (
      <div class="card-header">
        <h4 class="me-auto">{state.userRequestResponse?.response?.verdict}</h4>
      </div>
    )}
    <div class="card-body">
      <Notice
        isSmall={1}
        paddingLeft="10px"
        marginBottom="1rem"
        cardColor={state.userRequestResponse?.response?.color}
      >
        {`👀 ${!!state.requestFromAccountId ? "" : "Your"} Last Request at
                ${new Date(
                  (state.userRequestResponse?.["request_timestamp"] ?? 0) /
                    1000000
                ).toLocaleTimeString()}`}
      </Notice>
      <ol class="olcards">
        <MyListItem
          cardColor={state.userRequestResponse?.response?.color}
          displayNumber="none"
          style={{ marginTop: 0 }}
        >
          <div class="content" style={{ paddingLeft: "1rem" }}>
            <div class="icon">
              <img
                src={
                  allTokens[state.userRequestResponse?.request?.token_in].image
                }
              />
            </div>
            <div class="text">
              <div>
                <strong>{`Sell:
                    ${state.userRequestResponse?.request?.tokenInName}`}</strong>
              </div>

              <div>
                {state.userRequestResponse.request["token_in_message"] ??
                  "No Message"}
              </div>
            </div>
          </div>
        </MyListItem>
        <MyListItem
          cardColor={state.userRequestResponse?.response?.color}
          displayNumber="none"
          style={{ marginTop: 0 }}
        >
          <div class="content" style={{ paddingLeft: "1rem" }}>
            <div class="icon">
              <img
                src={
                  allTokens[state.userRequestResponse?.request?.token_out].image
                }
              />
            </div>
            <div class="text">
              <div>
                <strong>{`Buy:
                   ${state.userRequestResponse?.request?.tokenOutName}`}</strong>
              </div>
              <div>
                {state.userRequestResponse.request["token_out_message"] ??
                  "No Message"}
              </div>
            </div>
          </div>{" "}
        </MyListItem>
        {state.userRequestResponse?.response &&
          (state.userRequestResponse?.response?.ok == false ||
            state.userRequestResponse?.response?.shillAccepted ||
            state.userRequestResponse?.response?.shillDeclined) && (
            <MyListItem
              cardColor={state.userRequestResponse?.response?.color}
              displayNumber="none"
              style={{ marginTop: 0 }}
            >
              <div class="content" style={{ paddingLeft: "1rem" }}>
                <div class="icon">{`${
                  state.userRequestResponse?.response?.shillAccepted
                    ? `🤑`
                    : state.userRequestResponse?.response?.shillDeclined
                    ? `🤯`
                    : `🤨`
                }`}</div>
                <div class="text">
                  <div>
                    <strong>ShillGPT respond:</strong>
                  </div>
                  <div>{state.userRequestResponse?.response?.textCleaned}</div>
                </div>
              </div>
            </MyListItem>
          )}
        {state.userRequestResponse?.response?.verdict !== "Pending" &&
          state.userRequestResponse?.amount_in &&
          state.userRequestResponse?.amount_out && (
            <Notice
              isSmall={1}
              paddingLeft="10px"
              cardColor={state.userRequestResponse?.response?.color}
            >
              🚀
              {`${getFtBalance(
                state.userRequestResponse?.request?.token_in,
                state.userRequestResponse?.amount_in,
                2
              )} ${
                state.userRequestResponse?.request?.tokenInName
              } was sold to buy ${getFtBalance(
                state.userRequestResponse?.request?.token_out,
                state.userRequestResponse?.amount_out,
                2
              )} ${state.userRequestResponse?.request?.tokenOutName}`}
            </Notice>
          )}

        {state.userRequestResponse?.response?.verdict &&
          state.userRequestResponse?.response?.shillDeclined === false &&
          state.userRequestResponse?.response?.verdict !== "Pending" &&
          !state.userRequestResponse?.amount_in &&
          !state.userRequestResponse?.amount_out && (
            <Notice
              isSmall={1}
              paddingLeft="10px"
              cardColor={state.userRequestResponse?.response?.color}
            >
              {" "}
              🚀Swapping on AMM...
            </Notice>
          )}
      </ol>
    </div>
  </div>
);

const headerBlock = (
  <div id="container-header">
    <div class="main-header align-items-start">
      <img
        src="https://ipfs.near.social/ipfs/bafkreicptaq3otho65azjvuacrj6pwp6cccrhsmsd5y5c33m7zmlvbdnze"
        alt="ShillGPT"
        title="ShillGPT"
        class="img-fluid"
      />
      <div class="mt-lg-4 d-flex">
        {!!accountId && (
          <div
            class="balances"
            onClick={() => {
              State.update({ selectedTab: "Credits" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-wallet"
              viewBox="0 0 16 16"
            >
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
            </svg>
            <span>
              {" "}
              {!!userFreeEntryAvailable && <div>Free request available!</div>}
              {!userFreeEntryAvailable && (
                <div class="text-white">
                  Credits: ${getNearBalance(userCredits, 4)}
                </div>
              )}
            </span>
          </div>
        )}
        <div class="d-flex">
          <div>
            <span>
              <a href="https://twitter.com/shill_gpt" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6c757d"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                </svg>
              </a>
            </span>
          </div>
          <div class="ps-1">
            <span>
              <a href="https://teletype.in/@shillgpt/about" target="_blank">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6c757d"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12.01,12.01,0,0,0,12,0Zm1,18a1,1,0,0,1-2,0V11H10a1,1,0,0,1,0-2h2a1,1,0,0,1,1,1ZM12.02,7a1,1,0,0,1-.01-2h.01a1,1,0,0,1,0,2Z" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-title">Shill tokens to the AI bot and earn rewards!</div>
    <div class="main-subtitle">
      The first <strong>AI</strong> that manages{" "}
      <strong>memecoin treasuries</strong> and rebalances them upon{" "}
      <strong>your influence</strong>.
    </div>
  </div>
);

if (!!state.requestFromAccountId) {
  return (
    <Theme>
      {headerBlock}
      <div>
        <div
          class="toast show mt-2"
          style={{ width: "100%" }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <strong class="me-auto">
              Latest response from{" "}
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId: state.requestFromAccountId }}
              />
            </strong>
            {state.userRequestResponse && (
              <small>
                {timeSince(
                  (state.userRequestResponse?.["request_timestamp"] ?? 0) /
                    1000000
                )}{" "}
                ago
              </small>
            )}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                State.update({ requestFromAccountId: null });
              }}
            ></button>
          </div>

          <div class="toast-body">
            {state.userRequestResponse ? (
              latestResponseBlock
            ) : (
              <div>Not found</div>
            )}
          </div>
        </div>
      </div>
    </Theme>
  );
}

return (
  <Theme>
    {headerBlock}

    <div class="tabs-container mt-2 mb-3">
      {navTabs.map((tab) => (
        <TabItem
          selected={state.selectedTab == tab}
          href="#"
          onClick={() =>
            State.update({
              selectedTab: tab,
            })
          }
          key={tab}
        >
          <span>{tab}</span>
        </TabItem>
      ))}
    </div>

    {state.selectedTab == "About" && (
      <div id="about">
        <div class="card  mb-3">
          <div class="card-header">
            <h4>How it works</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">🚀</div>
                  <div class="text">
                    Shill a promising memecoin, and the AI bot will immidately
                    buy it on Ref Finance
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">🤑</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Earn" })}
                    >
                      Earn meme coins
                    </a>{" "}
                    if you have previously provided liquidity to the pool for
                    the token purchased by the Shill GPT.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">🤩</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Earn" })}
                    >
                      Earn Shill points
                    </a>{" "}
                    and participate in potential $SHILL token airdrop
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">👌</div>
                  <div class="text">
                    The bot does not charge any fees for exchanges. However,
                    there is a {getNearBalance(requestCost, 2)} NEAR fee per
                    request, which covers the expenses associated with accessing
                    various AI models.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>

        <div class="card  mb-3">
          <div class="card-header">
            <h4>How to get started</h4>
          </div>
          <div class="card-body">
            <ol class="olcards mb-4">
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">💸</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Credits" })}
                    >{`Deposit`}</a>{" "}
                    some NEAR to the smart virtual balance (you can withdraw it
                    at any time)
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">😎</div>
                  <div class="text">
                    Go to{" "}
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Main" })}
                    >{`Shillbox`}</a>
                    and make a request to the AI bot and convince why one
                    memecoin should be exchanged for another meme coin.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">😇</div>
                  <div class="text">
                    When confirming the first request transaction, make sure you
                    to toggle on the option to "Don't ask again for sending
                    similar ..." at the bottom
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">👍</div>
                  <div class="text">
                    If your request was convincing, the ShillGPT will exchange
                    tokens according to your command on the AMM, rebalancing the
                    treasury. Depending on how convincing your arguments were,
                    the ShillGPT may exchange tokens from 1/16 to 1/2 of the
                    pool.
                  </div>
                </div>
              </MyListItem>
            </ol>
            <Notice isSmall={1}>
              Product in Beta! Attacks on the Shill GPT's functionality may
              result in resetting your points to zero.
            </Notice>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h4>Whitelisted tokens</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              {whitelist.map((t) => (
                <MyListItem cardColor="#36aeb3" backColor="#eee">
                  <div class="content">
                    <div class="icon">
                      <img src={allTokens[t].image} />
                    </div>
                    <div class="text">${allTokens[t].name}</div>
                  </div>
                </MyListItem>
              ))}

              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">
                    <img
                      src={
                        "https://ipfs.near.social/ipfs/bafkreid5anr4kscz5pftbiczayzfsvz5dr6vcdl23uqluggmnvqlfedg24"
                      }
                    />
                  </div>
                  <div class="text">$SHILL (Coming soon)</div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Main" && (
      <div id="shillbox">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header">
                  <h4>Shill Box</h4>
                </div>

                <div class="card-body">
                  {!userCreditsAvailable && (
                    <div class="alert alert-warning" role="alert">
                      We strongly recommend{" "}
                      <a
                        href="#"
                        onClick={() => State.update({ selectedTab: "Credits" })}
                      >
                        deposit NEAR
                      </a>{" "}
                      in ShillGPT to avoid confirming each transaction in the
                      wallet and to enhance user experience.
                    </div>
                  )}

                  <div class="row g-3 align-items-center mb-3">
                    <div class={!showLatestResponse ? `col-2` : `col-4`}>
                      <label for="tokenToSale" class="col-form-label">
                        Token to sale:
                      </label>
                    </div>
                    <div class="col-auto">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          id="tokenToSale"
                        >
                          {state.tokenIn
                            ? allTokens[state.tokenIn].name
                            : "Select token"}
                        </button>
                        <ul class="dropdown-menu">
                          {whitelist.map((t) => (
                            <li>
                              <a
                                class={`dropdown-item ${
                                  state.tokenIn == t ? "active" : ""
                                } ${state.tokenOut == t ? "disabled" : ""}`}
                                href="#"
                                onClick={() => {
                                  State.update({ tokenIn: t });
                                }}
                              >
                                {allTokens[t].name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 align-items-center mb-3">
                    <div class={!showLatestResponse ? `col-2` : `col-4`}>
                      <label for="tokenToBuy" class="col-form-label">
                        Token to buy:
                      </label>
                    </div>
                    <div class="col-auto">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          id="tokenToBuy"
                        >
                          {state.tokenOut
                            ? allTokens[state.tokenOut].name
                            : "Select token"}
                        </button>
                        <ul class="dropdown-menu">
                          {whitelist.map((t) => (
                            <li>
                              <a
                                class={`dropdown-item ${
                                  state.tokenOut == t ? "active" : ""
                                } ${state.tokenIn == t ? "disabled" : ""}`}
                                href="#"
                                onClick={() => {
                                  State.update({ tokenOut: t });
                                }}
                              >
                                {allTokens[t].name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {state.tokenOut && !tokenOutBalance && (
                      <Notice cardColor="#FEAF20">
                        You haven't deposit {allTokens[state.tokenOut].name}{" "}
                        yet.
                        <a
                          href="#"
                          onClick={() => State.update({ selectedTab: "Pools" })}
                        >{`Provide liquidity to the pool`}</a>
                        and whenever ShillGPT purchases more
                        {`${allTokens[state.tokenOut].name},`} your balance in
                        the pool will grow.
                      </Notice>
                    )}
                  </div>

                  {state.tokenIn && (
                    <div class="row g-3 align-items-center mb-3">
                      <div class={!showLatestResponse ? `col-2` : `col-4`}>
                        <label for="tokenInMessage" class="form-label">
                          Why to sale {allTokens[state.tokenIn].name}?{" "}
                          <div>
                            <small>Optional</small>
                          </div>
                        </label>
                      </div>
                      <div class="col-8">
                        <div>
                          <textarea
                            class="form-control"
                            id="tokenInMessage"
                            rows="3"
                            onChange={(e) =>
                              State.update({ tokenInMessage: e.target.value })
                            }
                            value={state.tokenInMessage}
                          ></textarea>
                        </div>{" "}
                        {(state.tokenInMessage ?? "").length >
                          MAX_MESSAGE_LENGTH && (
                          <div class="text-secondary">Message is too long</div>
                        )}
                      </div>
                    </div>
                  )}
                  {state.tokenOut && (
                    <div class="row g-3 align-items-center mb-3">
                      <div class={!showLatestResponse ? `col-2` : `col-4`}>
                        <label for="tokenOutMessage" class="col-form-label">
                          Why to buy {allTokens[state.tokenOut].name}?{" "}
                          <div>
                            <small>Optional</small>
                          </div>
                        </label>
                      </div>
                      <div class="col-8">
                        <div>
                          <textarea
                            class="form-control"
                            id="tokenOutMessage"
                            rows="3"
                            onChange={(e) =>
                              State.update({ tokenOutMessage: e.target.value })
                            }
                            value={state.tokenOutMessage}
                          ></textarea>
                        </div>
                        {(state.tokenOutMessage ?? "").length >
                          MAX_MESSAGE_LENGTH && (
                          <div class="text-secondary">Message is too long</div>
                        )}
                      </div>
                    </div>
                  )}

                  {userFreeEntryAvailable && (
                    <Notice cardColor="#80D651" isSmall={1}>
                      <div class="text-secondary">
                        You have free request as a new user!{" "}
                      </div>
                    </Notice>
                  )}
                  {!accountId && (
                    <span role="button">
                      <button onClick={props.requestSignIn}>
                        Sign in to continue
                      </button>{" "}
                    </span>
                  )}
                  {!!accountId &&
                    !userFreeEntryAvailable &&
                    !userCreditsAvailable && (
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={!userCreditsAvailable}
                          disabled={userCreditsAvailable}
                          id="attachNearToEveryRequest"
                          onChange={(e) => {
                            State.update({
                              attachNearToEveryRequest: e.target.checked,
                            });
                          }}
                        />
                        <label
                          class="form-check-label"
                          for="attachNearToEveryRequest"
                        >
                          Attach deposit to every request{" "}
                          {userCreditsAvailable && (
                            <span>(not recommeded)</span>
                          )}
                          {!userCreditsAvailable && (
                            <span>
                              (Not recommended.
                              <a
                                href="#"
                                onClick={() =>
                                  State.update({ selectedTab: "Credits" })
                                }
                              >
                                Deposit NEAR
                              </a>{" "}
                              to avoid wallet confirmation on every request)
                            </span>
                          )}
                        </label>
                      </div>
                    )}

                  {!!accountId && (
                    <>
                      <button
                        type="submit"
                        class={`btn btn-primary ${
                          state.tokenIn &&
                          state.tokenOut &&
                          state.tokenInMessage.length +
                            state.tokenOutMessage.length >
                            0 &&
                          (state.tokenInMessage ?? "").length <=
                            MAX_MESSAGE_LENGTH &&
                          (state.tokenOutMessage ?? "").length <=
                            MAX_MESSAGE_LENGTH
                            ? ""
                            : "disabled"
                        }`}
                        onClick={() => request()}
                      >
                        Submit
                      </button>

                      {!(state.tokenIn && state.tokenOut) && (
                        <div class="mt-2">
                          <Notice
                            isSmall={1}
                            paddingLeft="12px"
                            cardColor="#FEAF20"
                          >
                            Select tokens to shill: what to sale and what to buy
                          </Notice>
                        </div>
                      )}

                      {state.tokenIn &&
                        state.tokenOut &&
                        state.tokenInMessage.length +
                          state.tokenOutMessage.length ==
                          0 && (
                          <div class="mt-2">
                            <Notice
                              isSmall={1}
                              paddingLeft="12px"
                              cardColor="#FEAF20"
                            >
                              At least one message about tokens required
                            </Notice>
                          </div>
                        )}

                      <div class="mt-2">
                        <Notice
                          isSmall={1}
                          paddingLeft="12px"
                          cardColor="#FEAF20"
                        >
                          When confirming the first request transaction, make
                          sure you to toggle on the option to "Don't ask again
                          for sending similar ..." at the bottom
                        </Notice>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {showLatestResponse &&
              state.userRequestResponse?.["request_timestamp"] && (
                <div class="col">{latestResponseBlock}</div>
              )}
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Pools" && (
      <div id="pools">
        <div class="container">
          <div class="row">
            {!!accountId && (
              <div class="col">
                <div class="card  mb-3">
                  <div class="card-header">
                    <h4>Deposit to pool</h4>
                  </div>
                  <div class="card-body">
                    <div class="row g-3 align-items-center mb-3">
                      <div class="col-4 col-md-2">
                        <label for="depositAmount" class="col-form-label">
                          Token
                        </label>
                      </div>
                      <div class="col-auto">
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {state.depositToken
                              ? allTokens[state.depositToken].name
                              : "Select token"}
                          </button>
                          <ul class="dropdown-menu">
                            {whitelist.map((t) => (
                              <li>
                                <a
                                  class={`dropdown-item ${
                                    state.depositToken == t ? "active" : ""
                                  }`}
                                  href="#"
                                  onClick={() => {
                                    State.update({ depositToken: t });
                                    getUserBalance(t);
                                  }}
                                >
                                  {allTokens[t].name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="row g-3 align-items-center mb-3">
                      <div class="col-4 col-md-2">
                        <label for="depositAmount" class="col-form-label">
                          Amount
                        </label>
                      </div>
                      <div class="col-auto">
                        <input
                          type="number"
                          class="form-control"
                          step="0.01"
                          id="depositAmount"
                          value={state.depositAmount}
                          onChange={(e) =>
                            State.update({ depositAmount: e.target.value })
                          }
                        />
                      </div>
                      <div class="col-auto">
                        {state.depositToken && (
                          <span
                            class="form-text"
                            role="button"
                            onClick={() =>
                              State.update({
                                depositAmount: Big(
                                  state.userBalances[state.depositToken] ?? 0
                                )
                                  .round(2, Big.roundDown)
                                  .toString(),
                              })
                            }
                          >
                            Your balance:{" "}
                            {Big(state.userBalances[state.depositToken] ?? 0)
                              .round(2, Big.roundDown)
                              .toString()}
                            {`${allTokens[state.depositToken].name}`}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      class={`btn btn-primary ${
                        state.depositAmount &&
                        parseFloat(state.depositAmount) > 0 &&
                        state.depositToken &&
                        state.userBalances[state.depositToken] &&
                        Big(state.userBalances[state.depositToken]).gte(
                          Big(state.depositAmount)
                        )
                          ? ""
                          : "disabled"
                      }`}
                      onClick={() => deposit()}
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div class="col">
              <div class="card mb-3">
                <div class="card-body">
                  <Notice cardColor="#80D651" isSmall={1}>
                    Provide liquidity to one of the memecoin pools and receive a
                    share in that pool. Then, whenever the ShillGPT buys more of
                    that token, your balance in the pool will increase.
                  </Notice>
                  <Notice cardColor="#80D651" isSmall={1}>
                    Note that if the bot is convinced to sell tokens from your
                    pool, the balance of your tokens in the pool will decrease
                    as well.
                    <a
                      class="text-decoration-underline text-black"
                      href="#"
                      onClick={() => State.update({ selectedTab: "About" })}
                    >
                      More details
                    </a>
                  </Notice>
                  <Notice cardColor="#80D651" isSmall={1}>
                    Minimal pool staking period: 7 days from the last user's
                    deposit in this pool.
                  </Notice>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header">
                  <h4>Treasury</h4>
                </div>
                <div class="card-body">
                  <ol class="olcards">
                    {pools.map((p) => {
                      let tokenBalance = getFtBalance(
                        p[0],
                        p[1].total_balance,
                        2
                      );
                      let tokenValue = (
                        parseFloat(state.prices[p[0]]?.price ?? 0) *
                        parseFloat(tokenBalance ?? 0)
                      ).toFixed(2);
                      return (
                        <MyListItem
                          cardColor="#36aeb3"
                          backColor="#eee"
                          id={`pool-${p[0]}`}
                        >
                          <div class="content">
                            <div class="icon">
                              <img src={allTokens[p[0]].image} />
                            </div>
                            <div class="text">
                              <div>
                                <strong>{allTokens[p[0]].name}</strong>
                              </div>
                              <span>
                                {`Total Balance: ${tokenBalance} ($${tokenValue})`}
                              </span>

                              {debugMode && (
                                <div>
                                  <span>Total shares: {p[1].total_shares}</span>
                                  <span>
                                    Locked balance:{" "}
                                    {getFtBalance(p[0], p[1].locked_balance, 2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </MyListItem>
                      );
                    })}
                  </ol>
                </div>{" "}
              </div>
            </div>

            {((user_pools ?? []).filter((p) => p[1].user_balance > 0) ?? [])
              .length > 0 && (
              <div class="col">
                <div id="user-pools" class="card  mb-3">
                  <div class="card-header">
                    <h4>Your Pools</h4>
                  </div>
                  <div class="card-body">
                    <ol class="olcards">
                      {(user_pools ?? []).map((up) => {
                        let tokenBalance = getFtBalance(
                          up[0],
                          up[1].user_balance,
                          2
                        );
                        let tokenValue = (
                          parseFloat(state.prices[up[0]]?.price ?? 0) *
                          parseFloat(tokenBalance ?? 0)
                        ).toFixed(2);

                        return (
                          up[1].user_balance > 0 &&
                          tokenBalance > 0 && (
                            <MyListItem
                              cardColor="#00a951"
                              backColor="#eee"
                              key={`userpool-${up[0]}`}
                              id={`userpool-${up[0]}`}
                            >
                              <div class="content">
                                <div class="icon">
                                  <img src={allTokens[up[0]].image} />
                                </div>
                                <div class="text">
                                  <div>
                                    <strong>{allTokens[up[0]].name}</strong>
                                  </div>
                                  <div>
                                    <span>
                                      {`User balance: ${tokenBalance}. ($${tokenValue})`}
                                      {!timestampBeforeNow(
                                        up[1].user_unstake_date
                                      ) && (
                                        <span>{`Unstake: 
                      ${timestampToHumanDate(
                        up[1].user_unstake_date ?? 0
                      )}`}</span>
                                      )}
                                    </span>

                                    {timestampBeforeNow(
                                      up[1].user_unstake_date
                                    ) && (
                                      <span
                                        class="badge bg-secondary ms-1 p-2"
                                        role="button"
                                        onClick={() => {
                                          State.update({
                                            showUnstakeForm: true,
                                            unstakeTokenId: up[0],
                                            unstakeAmount: getFtBalance(
                                              up[0],
                                              up[1].user_balance,
                                              2
                                            ),
                                          });
                                        }}
                                      >
                                        Unstake
                                      </span>
                                    )}
                                  </div>
                                  {debugMode && (
                                    <span>{`User shares: ${up[1].user_shares}.`}</span>
                                  )}
                                </div>
                              </div>
                            </MyListItem>
                          )
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {state.showUnstakeForm && state.unstakeTokenId && (
            <div class="card  mb-3">
              <div class="card-header">
                <h4>
                  {" "}
                  Unstake from {allTokens[state.unstakeTokenId].name} pool
                </h4>
              </div>

              <div class="card-body" id="unstake">
                <div>
                  Keep in mind that the token balance in the pool constantly
                  changes due to treasury rebalancing.
                </div>

                <div class="row g-3 align-items-center mb-3">
                  <div class="col-4">
                    <label for="depositAmount" class="col-form-label">
                      Specify the minimum amount of tokens to withdraw
                    </label>
                  </div>
                  <div class="col-auto">
                    <input
                      type="number"
                      class="form-control col"
                      id="unstakeAmount"
                      step="0.01"
                      value={state.unstakeAmount}
                      onChange={(e) =>
                        State.update({ unstakeAmount: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <button
                    class={`btn btn-small btn-secondary mb-2 ${
                      !!parseFloat(state.unstakeAmount) ? "" : "disabled"
                    }`}
                    type="button"
                    onClick={() => unstake()}
                  >
                    Unstake
                  </button>
                </div>
              </div>
            </div>
          )}

          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header text-center">
                  <h4>TVL by Token</h4>
                </div>
                <div class="card-body justify-content-center">
                  <Widget
                    src="shillgpt.near/widget/PoolsChart"
                    props={{
                      pools,
                      allTokens,
                      pricesData: {
                        ok: true,
                        body: JSON.stringify(state.prices),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Credits" && (
      <div id="credits">
        <div class="card  mb-3">
          <div class="card-header">
            <h4>Deposit NEAR</h4>
          </div>

          <div class="card-body">
            <div class="mb-4">
              <div class="mb-3">
                <Notice cardColor="#45ABCD">
                  Deposit NEAR to avoid wallet confirmation on every request to
                  ShillGPT. Withdraw the remaining balance at any moment.
                </Notice>
              </div>

              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Amount in NEAR:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="number"
                    class="form-control"
                    id="buyCreditAmount"
                    step="0.01"
                    value={state.buyCreditAmount}
                    onChange={(e) =>
                      State.update({ buyCreditAmount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Request cost:
                  </label>
                </div>
                <div class="col-auto">
                  {getNearBalance(requestCost, 2)} NEAR
                </div>
              </div>

              <button
                class={`btn btn-small btn-secondary mb-2 ${
                  parseFloat(state.buyCreditAmount) > 0 ? "" : "disabled"
                }`}
                type="button"
                onClick={() => buyCredit()}
              >
                Deposit
              </button>
              <div>
                Will be enought to make
                {Big(getYoctoNear(state.buyCreditAmount ?? 0))
                  .div(Big(requestCost))
                  .toFixed()}{" "}
                requests
              </div>
            </div>
          </div>
        </div>

        {userCreditsAvailable && (
          <div class="card  mb-3">
            <div class="card-header">
              <h4>Withdraw NEAR</h4>
            </div>
            <div class="card-body">
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Amount to withdraw:
                  </label>
                </div>

                <div class="col-auto">
                  <input
                    type="number"
                    class="form-control"
                    id="withdrawCreditAmount"
                    step="0.01"
                    value={state.withdrawCreditAmount}
                    onChange={(e) =>
                      State.update({ withdrawCreditAmount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label class="col-form-label">Your credits</label>
                </div>

                <div
                  class="col-auto"
                  role="button"
                  onClick={() =>
                    State.update({
                      withdrawCreditAmount: getNearBalance(userCredits, 4),
                    })
                  }
                >
                  {getNearBalance(userCredits, 4)} NEAR
                </div>
              </div>
              <button
                class={`btn btn-small btn-secondary mb-2 ${
                  parseFloat(state.withdrawCreditAmount) <=
                  getNearBalance(userCredits, 4)
                    ? ""
                    : "disabled"
                }`}
                type="button"
                onClick={() => withdrawCredit()}
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    {state.selectedTab == "Earn" && (
      <>
        <div id="earn" class="card mb-3">
          <div class="card-header">
            <h4>Earn $SHILL</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              <MyListItem cardColor="#162d59" backColor="#eee">
                <div class="content">
                  <div class="icon">💰</div>
                  <div class="text">
                    <div>
                      <strong>$SHILL POINTS</strong>
                    </div>
                    All users talking with the ShillGPT will be eligible for
                    token airdrops proportionally based on the number of
                    requests, pool deposits, and the number of invited users.
                  </div>
                </div>
              </MyListItem>
              {!!accountId && state.refLink && (
                <MyListItem cardColor="#162d59" backColor="#eee">
                  <div class="content">
                    <div class="icon">🤝</div>
                    <div class="text">
                      <div>
                        <strong>Shill ShillGPT and earn $SHILL</strong>
                      </div>
                      <div>Your invitation link:</div>
                      <div class="d-flex form-group">
                        <input
                          class="form-control p-1"
                          style={{ width: "400px" }}
                          type="text"
                          disabled
                          value={state.refLink}
                        />
                        <OverlayTrigger
                          placement="auto"
                          overlay={
                            <Tooltip>
                              {state.copied ? "Copied!" : "Copy to clipboard"}
                            </Tooltip>
                          }
                        >
                          <button
                            class="btn btn-outline-primary border-0 p-2 ms-2"
                            onMouseEnter={() =>
                              State.update({ pauseNonce: true })
                            }
                            onMouseLeave={() =>
                              State.update({ pauseNonce: false })
                            }
                            onClick={() => {
                              clipboard.writeText(state.refLink).then(() => {
                                State.update({ copied: true });
                              });
                            }}
                          >
                            {state.copied ? (
                              <>
                                <i className="bi bi-check-lg" />
                              </>
                            ) : (
                              <>{copySvg}</>
                            )}
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </MyListItem>
              )}

              <MyListItem cardColor="#162d59" backColor="#eee">
                <div class="content">
                  <div class="icon">🤗</div>
                  <div class="text">
                    $SHILL holders will vote on listing new tokens in the
                    ShillGPT and participate in the distribution of system
                    revenue: referral commissions on AMM and service fees.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>

        <div id="earn" class="card mb-3">
          <div class="card-header">
            <h4>Earn Memcoins</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">💰</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Pools" })}
                    >
                      Provide liquidity
                    </a>{" "}
                    to one of the memecoin pools and receive a share in that
                    pool. Then, whenever the ShillGPT buys more of that token,
                    your balance in the pool will increase.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">🤔</div>
                  <div class="text">
                    For instance, if there were 100 tokens in the memecoin pool
                    and you added another 100, you would own 50% of that pool.
                    Subsequently, if you persuaded the bot to sell some other
                    token and buy the memecoin from your pool, let's say the bot
                    bought an additional 300 tokens. The total pool balance
                    would then be 500 tokens (200 existing tokens plus 300
                    purchased). You would still own 50% of the pool, enabling
                    you to withdraw 250 tokens instead of just the initial 100
                    you deposited.
                  </div>
                </div>
              </MyListItem>

              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">⚠️</div>
                  <div class="text">
                    Note that if the bot is convinced to sell tokens from your
                    pool, the balance of your tokens in the pool will decrease
                    as well. Assess the risks before depositing tokens into the
                    pool.
                  </div>
                </div>
              </MyListItem>

              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">👆</div>
                  <div class="text">
                    Users can withdraw funds from the pool no earlier than 7
                    days after the their last deposit in this pool.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>
      </>
    )}

    <div class="text-center mb-3">
      <small class="text-secondary" style={{ fontSize: "0.7em" }}>
        <div>
          This project is currently in its beta phase. We appreciate your
          support and patience as we work to improve and enhance its
          functionality.{" "}
        </div>
        <div>
          Your feedback is invaluable to us in shaping the final product. Thank
          you for being a part of this journey with us.
        </div>
      </small>
    </div>
  </Theme>
);
