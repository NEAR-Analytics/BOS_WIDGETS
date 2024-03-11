// This schema lists the entity types used by the Nexus
// it is used to layout the Nexus UI

// It will be used by the indexer to determine which social.near properties to index

// Potential resources:
//   Model providers, including Provable Inference
//   Agent frameworks: mintbase, LangChain
//   Custom UIs on BOS
//   Triggers: time, on-chain event based
//   Reputation: of data, models, agents
//   Github repos
//   Papers
const schema = {
    overview: {
        title: "Overview",
        icon: "ph ph-flower-lotus",
    },
    datasets: {
        title: "Datasets",
        icon: "ph ph-list-checks",
        defaultValue: "providers",
        items: [
            {
                name: "Foundation",
                value: "foundation",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'foundationDataset', title: 'Foundation Datasets'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
            {
                name: "Supervised Fine Tuning",
                value: "fineTuning",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'fineTuningDataset', title: 'Supervised Fine Tuning Datasets'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
            {
                name: "Alignment",
                value: "alignment",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'alignmentDataset', title: 'Alignment Datasets: RLHF, DPO'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
        ],
    },
    models: {
        title: "Models & Providers",
        icon: "ph ph-list-checks",
        defaultValue: "providers",
        items: [
            {
                name: "Providers",
                value: "providers",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'modelProvider', title: 'Model Providers'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
            {
                name: "Models",
                value: "models",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'model', title: 'Models'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
        ],
    },
    agents: {
        title: "Agents",
        icon: "ph ph-list-checks",
        defaultValue: "agents",
        items: [
            {
                name: "Agents",
                value: "agents",
                content: <Widget src="agiguild.near/widget/Agent.AgentEntityConfig"/>,
                icon: "ph ph-address-book",
            },
            {
                name: "Frameworks",
                value: "frameworks",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'agentFramework', title: 'Agent Frameworks'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
            {
                name: "User Interfaces",
                value: "uis",
                content: <Widget src="agiguild.near/widget/Placeholder" props={{entityType: 'customUI', title: 'Custom UIs'}}/>,
                icon: "ph ph-chart-bar-horizontal",
            },
        ],
    },
}
return {schema};