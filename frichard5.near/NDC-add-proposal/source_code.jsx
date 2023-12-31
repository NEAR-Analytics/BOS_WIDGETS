const {widgetProvider, policy} = props;
const account = props.account || "marketing.sputnik-dao.near";
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const apiBalanceUrl = `https://api.pikespeak.ai/account/balance/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const refUrl = "https://api.stats.ref.finance/api/ft";

const ftList = fetch(refUrl);

State.init({
    type: "Vote",
    data: {
        token: "",
    },
});

const forgeUrl = (apiUrl, params) =>
    apiUrl +
    Object.keys(params).reduce(
        (paramString, p) => paramString + `${p}=${params[p]}&`,
        "?"
    );

const selectType = (e) => {
    State.update({
        type: e.target.value,
    });
};

const selectToken = (e) => {
    State.update({
        data: {...state.data, token: e.target.value},
    });
};

const getDescription = (data) => {
    return `${data.description} ${data.link}`
}

const getPayload = (type, data) => {
    const ft = ftList.body.find((ft) => ft.token_account_id === state.data.token);
    let decimals = 0;
    if (ft) {
        decimals = Number(ft.decimals);
    } else if (state.data.token === '') {
        decimals = 24;
    }
    const amount = data.amount && new Big(data.amount).times(Math.pow(10, decimals)).toFixed();

    switch (type) {
        case "Vote":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: "Vote",
                },
            };
        case "Transfer":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: {
                        Transfer: {
                            token_id: data.token,
                            receiver_id: data.target,
                            amount: amount,
                        },
                    },
                },
            };
        case "AddMemberToRole":
        case "RemoveMemberFromRole":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: {
                        [type]: {
                            member_id: data.member_id,
                            role: data.selectedRole,
                        },
                    },
                },
            };
        case "AddBounty":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: {
                        AddBounty: {
                            bounty: {
                                description: getDescription(data),
                                token: data.token,
                                amount: amount,
                                times: Number(data.times),
                                max_deadline: new Big(data.max_deadline)
                                    .times(86400 * Math.pow(10, 9))
                                    .toFixed(),
                            },
                        },
                    },
                },
            };
        case "BountyDone":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: {
                        BountyDone: {
                            bounty_id: Number(data.bounty_id),
                            receiver_id: data.target,
                        },
                    },
                },
            };
        case "FunctionCall":
            return {
                proposal: {
                    description: getDescription(data),
                    kind: {
                        FunctionCall: {
                            receiver_id: data.contract_name,
                            actions: [
                                {
                                    method_name: data.method_name,
                                    args: Buffer.from(JSON.stringify(JSON.parse(data.args),)).toString("base64"),
                                    deposit: data.deposit?data.deposit:"0",
                                    gas: data.gas?data.gas:"300000000000000"
                                }
                            ]
                        }
                    }
                }
            }
    }
};

const sendProposal = () => {
    const deposit =
        state.type === "AddBounty"
            ? state.policy.state.policy.bounty_bond
            : state.policy.state.policy.proposal_bond;
    Near.call([
        {
            contractName: account,
            methodName: "add_proposal",
            args: getPayload(state.type, state.data),
            gas: "300000000000000",
            deposit,
        },
    ]);
};

const proposalTypes = [
    "Transfer",
    "Vote",
    "AddBounty",
    "BountyDone",
    "AddMemberToRole",
    "RemoveMemberFromRole",
/*
    "FunctionCall"
*/
].map((t) => {
    return {
        value: t,
        label: t,
    };
});

const fetchPolicy = (params) => {
    asyncFetch(forgeUrl(apiPolicyUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    }).then(({err, body, ok}) => {
        if (ok) {
            const roles = body.state.policy.roles
                .filter((r) => r.kind != "Everyone")
                .map((r) => {
                    return {
                        label: r.name,
                        value: r.name,
                    };
                });
            State.update({
                roles,
                policy: body,
                data: {
                    ...state.data,
                    selectedRole: roles[0].value,
                },
            });
        }
    });
};

!state.policy && fetchPolicy({daos: [account]});

const fetchBalance = () => {
    const balance = fetch(apiBalanceUrl, {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    });
    balance.body &&
    State.update({
        balance: balance.body,
        data: {
            ...state.data,
            token:
                balance.body[0].contract === "Near" ? "" : balance.body[0].contract,
        },
    });
};
!state.balance && fetchBalance();

const ProposalCard = styled.div`
  position: relative;
  height: fit-content;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
  background: white;

  svg {
    height: 20px;

    &.approved-icon {
      fill: #13a36e;
    }

    &.rejected-icon {
      fill: #ff5e03;
    }

    &.not-voted-yet-icon {
      fill: rgb(140, 140, 140)
    }
  }
`;

const ProposalForm = styled.div`

`;

const InputText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: fit-content;
`;

const InputDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: 100%;
`;

const AmountSelector = styled.div`
  display: flex;
`;

const AmountComp = (
    <AmountSelector>
        <InputText>
            <label style={{color: "#8c8c8c"}} for={id}>
                {"Amount"}
            </label>
            <input
                type="number"
                onChange={(e) => {
                    State.update({
                        data: {...state.data, amount: e.target.value},
                    });
                }}
                placeholder={"0"}
            />
        </InputText>
        {state.balance && (
            <Widget
                src={`${widgetProvider}/widget/NDC-select`}
                props={{
                    widgetProvider,
                    options: state.balance.map((b) => {
                        return {
                            label: b.symbol,
                            value: b.contract === "Near" ? "" : b.contract,
                            additional: (
                                <span style={{color: "#8c8c8c"}}>
                  {Number(b.amount).toFixed(2)}
                </span>
                            ),
                        };
                    }),
                    selectedOption: state.data.token,
                    onChange: selectToken,
                    label: "Token",
                    id: "token-selector",
                }}
            />
        )}
    </AmountSelector>
);

return (<>
        {ftList.body ? <ProposalCard>
            <Widget
                src={`${widgetProvider}/widget/NDC-select`}
                props={{
                    widgetProvider,
                    options: proposalTypes,
                    selectedOption: state.type,
                    onChange: selectType,
                    label: "Type",
                    id: "proposal-type-selector",
                }}
            />

            <ProposalForm>
                <InputDescription>
                    <label style={{color: "#8c8c8c"}} for={id}>
                        {"Description"}
                    </label>
                    <input
                        style={{height: "160px"}}
                        type="text"
                        onChange={(e) => {
                            State.update({
                                data: {...state.data, description: e.target.value},
                            });
                        }}
                        placeholder={"Describe your proposal here."}
                    />
                </InputDescription>
                <InputText>
                    <label style={{color: "#8c8c8c"}} for={id}>
                        {"Link"}
                    </label>
                    <input
                        type="text"
                        onChange={(e) => {
                            State.update({
                                data: {...state.data, link: e.target.value},
                            });
                        }}
                        placeholder={"https://near.gov/somediscussion"}
                    />
                </InputText>
                {state.type === "Transfer" && (
                    <>
                        {AmountComp}
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Target"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, target: e.target.value},
                                    });
                                }}
                                placeholder={"receiver.near"}
                            />
                        </InputText>
                    </>
                )}
                {(state.type === "AddMemberToRole" ||
                        state.type === "RemoveMemberFromRole") &&
                    state.roles.length && (
                        <>
                            <Widget
                                src={`${widgetProvider}/widget/NDC-select`}
                                props={{
                                    widgetProvider,
                                    options: state.roles,
                                    onChange: (e) => {
                                        State.update({
                                            data: {...state.data, selectedRole: e.target.value},
                                        });
                                    },
                                    label: "Role",
                                    id: "role-selector",
                                }}
                            />
                            <InputText>
                                <label style={{color: "#8c8c8c"}} for={id}>
                                    {"Member"}
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        State.update({
                                            data: {...state.data, member_id: e.target.value},
                                        });
                                    }}
                                    placeholder={"member.near"}
                                />
                            </InputText>
                        </>
                    )}
                {state.type === "AddBounty" && (
                    <>
                        {AmountComp}
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Times"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, times: e.target.value},
                                    });
                                }}
                                placeholder={"0"}
                            />
                        </InputText>
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Days to compete"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, max_deadline: e.target.value},
                                    });
                                }}
                                placeholder={"0"}
                            />
                        </InputText>
                    </>
                )}
                {state.type === "BountyDone" && (
                    <>
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Bounty id"}
                            </label>
                            <input
                                type="number"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, bounty_id: e.target.value},
                                    });
                                }}
                                placeholder={"The bounty proposal id"}
                            />
                        </InputText>
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Target"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, target: e.target.value},
                                    });
                                }}
                                placeholder={"bounty_receiver.near"}
                            />
                        </InputText>
                    </>
                )}
     {/*           {state.type === "FunctionCall" && (<>
                    <InputText>
                        <label style={{color: "#8c8c8c"}} for={id}>
                            {"Contract Name"}
                        </label>
                        <input
                            type="text"
                            onChange={(e) => {
                                State.update({
                                    data: {...state.data, contract_name: e.target.value},
                                });
                            }}
                            placeholder={"v2.ref-finance.near"}
                        />
                    </InputText>
                    <InputText>
                        <label style={{color: "#8c8c8c"}} for={id}>
                            {"Method Name"}
                        </label>
                        <input
                            type="text"
                            onChange={(e) => {
                                State.update({
                                    data: {...state.data, method_name: e.target.value},
                                });
                            }}
                            placeholder={"swap"}
                        />
                    </InputText>
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Deposit"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, deposit: e.target.value},
                                    });
                                }}
                                defaultValue={"0"}
                                placeholder={"0"}
                            />
                        </InputText>
                        <InputText>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"Gas"}
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, gas: e.target.value},
                                    });
                                }}
                                defaultValue={"300000000000000"}
                                placeholder={"300000000000000"}
                            />
                        </InputText>
                        <InputDescription>
                            <label style={{color: "#8c8c8c"}} for={id}>
                                {"JSON Args"}
                            </label>
                            <textarea
                                style={{height: "160px"}}
                                onChange={(e) => {
                                    State.update({
                                        data: {...state.data, args: e.target.value},
                                    });
                                }}
                                placeholder={"{}"}
                            />
                        </InputDescription>
                    </>
                )}*/}
            </ProposalForm>

            <button onClick={sendProposal} style={{float: "right"}}>
                Propose
            </button>
        </ProposalCard> : ""}</>
);
