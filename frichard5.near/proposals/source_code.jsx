const {widgetProvider, ftList, parent } = props;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const ndcList = [
    "ndctrust.sputnik-dao.near",
    "marketing.sputnik-dao.near",
    "creativesdao.sputnik-dao.near",
    "neardevgov.sputnik-dao.near",
    "gwg.sputnik-dao.near",
]
const daosList = ndcList.includes(account)?ndcList:[account];

const forgeUrl = (apiUrl, params) =>
    apiUrl +
    Object.keys(params).sort().reduce(
        (paramString, p) => paramString + `${p}=${params[p]}&`,
        "?"
    );

const detailSvg = <svg width="20" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
                       focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LoupeIcon">
    <path
        d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10h8c1.1 0 2-.9 2-2v-8c0-5.51-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
</svg>;

const ProposalContainer = styled.div`
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;
  min-height: 500px;
`;

const NoProposal = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const resPerPage = 10;

State.init({
    offset: 0,
    //lastProposalFetch: [],
    proposals: [],
    isFetchingProposals: false,
    types: [],
    account: account,
    status: [],
    fromDate: "",
    toDate: "",
    daos:  props.initialSelectedDaos || [account],
    isModalOpen: false
});

const columns = [
    {
        id: "submission_time",
        label: "Date",
        formatter: (data) => {
            return new Date(data.submission_time).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
    {
        id: "proposal_type",
        label: "type",
    },
    {
        id: "proposer",
        label: "Proposer",
        formatter: (d) => {
            return (
                <a
                    href={`https://explorer.near.org/accounts/${d.proposer}`}
                    target="_blank"
                >
                    {d.proposer}
                </a>
            );
        },
    },
    {
        id: "proposal_id",
        label: "Proposal Id",
    },
    {
        id: "dao_id",
        label: "Dao",
        formatter: (d) => {
            return (
                <a
                    href={`https://explorer.near.org/accounts/${d.dao_id}`}
                    target="_blank"
                >
                    {d.dao_id}
                </a>
            );
        },
    },
    {
        id: "status",
        label: "Status",
        formatter: (d) => {
            const status = d.status;
            const Status = styled.div`
              font-weight: 700;
              color: ${(props) => {
                switch (props.status) {
                  case "Rejected":
                    return "#ff5e03";
                  case "Approved":
                    return "#13a36e";
                  case "Expired":
                    return "grey";
                  case "InProgress":
                    return "#ff8743";
                }
              }}
            `;
            return <Status status={status}>{status}</Status>
        }
    },
    {
        id: "",
        label: "Details",
        formatter: (d) => {
            const setModal = () => {
                State.update({
                    isModalOpen: true,
                    detailedProposal: d,
                });
            };
            return <button style={{marginLeft: 0}} onClick={setModal}> {detailSvg}</button>
        }
    }
];

const nextPage = () => {
    fetchProposal( state.offset + resPerPage)
    State.update({offset: state.offset + resPerPage});
};

const previousPage = () => {
    fetchProposal( state.offset - resPerPage)
    State.update({offset: state.offset - resPerPage});
};


const GenericTable = (
    <Widget
        src={`${widgetProvider}/widget/generic_table`}
        props={{
            columns,
            data: state.proposals,
            nextPage,
            previousPage,
            offset: state.offset,
            resPerPage,
            maxHeight: 800,
            boxShadow: 'unset'
        }}
    />
);

const fetchPolicy = (params) => {
    const policy = fetch(forgeUrl(apiPolicyUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    })

    policy.body && State.update({
        policy: policy.body.length ? policy.body : [policy.body],
    });
};

const fetchProposal = (offset) => {
    State.update({fetchingProposals: true});
    asyncFetch(forgeUrl(apiUrl, {
        offset: offset,
        limit: resPerPage,
        proposal_types: state.types,
        status: state.status,
        time_start: state.fromDate,
        time_end: state.toDate,
        daos: state.daos,
    }), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
            "no-cache": true,
        },
    }).then((res) => {
        res.body && State.update({proposals: res.body, fetchingProposals:false});
    })
};

!state.fetchingProposals && !state.proposals.length && fetchProposal(state.offset);

if (!state.policy) {
    fetchPolicy({daos: daosList});
}

if (state.account != account) {
    State.update({proposals: [], account, offset: 0, daos: [account]});
}

const selectType = (types) => {
    State.update({
        proposals: [],
        offset: 0,
        types: types,
    });
};

const typeOptions = [
    "Transfer",
    "Vote",
    "FunctionCall",
    "AddBounty",
    "BountyDone",
    "AddMemberToRole",
    "RemoveMemberFromRole",
    "ChangeConfig",
    "ChangePolicy",
    "ChangePolicyUpdateParameters",
    "ChangePolicyUpdateDefaultVotePolicy",
    "ChangePolicyRemoveRole",
    "ChangePolicyAddOrUpdateRole",
    "FactoryInfoUpdate",
    "SetStakingContract",
    "UpgradeRemote",
    "UpgradeSelf",
].map((t) => {
    return {
        value: t,
        label: t,
    };
});
const SelectType = (
    <Widget
        src={`${widgetProvider}/widget/NDC-checkbox-list`}
        props={{
            widgetProvider,
            checkboxes: typeOptions,
            selectedBoxes: [...state.types],
            onChange: selectType,
            label: "Type",
            id: "proposal-type-selector",
        }}
    />
);

const selectStatus = (status) => {
    State.update({
        status,
        proposals: [],
        offset: 0,
    });
};

const selectDaos = (daos) => {
    State.update({
        daos,
        proposals: [],
        offset: 0,
    });
};

const getVoters = () => {
    let proposalType = state.detailedProposal.proposal_type.toLowerCase();
    proposalType = proposalType==='functioncall'?'call':proposalType;
    const proposalPolicy = state.policy.filter((pol) => pol.dao_id === state.detailedProposal.dao_id);
    return proposalPolicy[0].state.policy.roles.reduce((acc,val) => {
        const isGroupAllowed = val.permissions.some((p) => {
            const parsedP = p.toLowerCase().replaceAll('_','');
            return parsedP.includes(`${proposalType}:voteapprove`)||parsedP.includes(`*:voteapprove`)
        });

        if(isGroupAllowed) {
            acc.push(...val.kind);
        }
        return acc
    }, [])
}

const statusOptions = ["Approved", "Rejected", "InProgress", "Expired"].map(
    (t) => {
        return {
            value: t,
            label: t,
        };
    }
);

const SelectStatus = (
    <Widget
        src={`${widgetProvider}/widget/NDC-checkbox-list`}
        props={{
            widgetProvider,
            checkboxes: statusOptions,
            selectedBoxes: [...state.status],
            onChange: selectStatus,
            label: "Status",
            id: "proposal-status-selector",
        }}
    />
);

const daosOptions = daosList.map((t) => {
    return {
        value: t,
        label: t.split(".")[0],
    };
});

const SelectDaos = (
    <Widget
        src={`${widgetProvider}/widget/NDC-checkbox-list`}
        props={{
            widgetProvider,
            checkboxes: daosOptions,
            selectedBoxes: [...state.daos],
            onChange: selectDaos,
            label: "Daos",
            id: "proposal-daos-selector",
        }}
    />
);

const SelectFromDate = (
    <Widget
        src={`${widgetProvider}/widget/NDC-input`}
        props={{
            widgetProvider,
            validate: "date",
            sendInput: (fromDate) => {
                State.update({
                    fromDate,
                    proposals: [],
                    offset: 0,
                });
            },
            placeholder: "yyyy/mm/dd",
            label: "From Date",
        }}
    />
);
const SelectToDate = (
    <Widget
        src={`${widgetProvider}/widget/NDC-input`}
        props={{
            widgetProvider,
            validate: "date",
            sendInput: (toDate) => {
                State.update({
                    toDate,
                    proposals: [],
                    offset: 0,
                });
            },
            placeholder: "yyyy/mm/dd",
            label: "To Date",
        }}
    />
);


const getFilters = () => {
    let filters = [...state.status, ...state.types, ...state.daos];
    if (state.fromDate.length) {
        filters.push(`From: ${state.fromDate}`);
    }
    if (state.toDate.length) {
        filters.push(`From: ${state.toDate}`);
    }
    return filters;
};

const ProposalFilters = (
    <Widget
        src={`${widgetProvider}/widget/NDC-filter-menu`}
        props={{
            widgetProvider,
            comps: [
                SelectDaos,
                SelectType,
                SelectStatus,
                SelectFromDate,
                SelectToDate,
            ],
            filters: getFilters(),
            removeFilter: (filter) => {
                State.update({
                    types: [...state.types.filter((t) => t != filter)],
                    status: [...state.status.filter((s) => s != filter)],
                    daos: [...state.daos.filter((d) => d != filter)],
                    fromDate: filter.includes(state.fromDate) ? "" : state.fromDate,
                    proposals: [],
                    offset: 0,
                    limit: resPerPage,
                });
            },
            resetFilters: () => {
                State.update({
                    types: [],
                    status: [],
                    proposals: [],
                    offset: 0,
                    daos: [state.account],
                    limit: resPerPage,
                });
            },
        }}
    />
);

const toggleModal = (isOpen) => {
    State.update({ isModalOpen: isOpen });
};

const ProposalCard = (
    <Widget
        src={`${widgetProvider}/widget/NDC-proposal-card`}
        props={{
            proposal: state.detailedProposal,
            widgetProvider,
            ftList,
            parent,
            council: state.policy && state.detailedProposal.dao_id && getVoters(),
            voteExpired:
                state.policy &&
                state.policy.filter((pol) => pol.dao_id === state.detailedProposal.dao_id)[0].state
                    .policy.proposal_period,
        }}
    />
);

return <div>
    {state.isModalOpen && state.policy ? (
        <Widget
            src={`${widgetProvider}/widget/NDC-modal`}
            props={{
                isOpen: state.isModalOpen,
                toggleModal,
                component: ProposalCard,
            }}
        />
    ) : (
        ""
    )}
    <ProposalContainer>
        {ProposalFilters}
        {state.proposals.length ? GenericTable : <NoProposal>No proposal found.</NoProposal>}
    </ProposalContainer>
</div>