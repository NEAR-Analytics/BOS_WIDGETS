const accountId = props.accountId ?? context.accountId; const ownerId = props.ownerId ?? "hack.near"; const pageId = props.pageId ?? "community.page"; return <Widget src="hack.near/widget/community.page" props={{ accountId, communityId: multi.near, contractId: mint.sharddog.near, h1: Communities,
        h2: DAO, tagline: Connect, Cooperate, and Create!, bgColor: , buttonText: Get Started, link: https://near.social }} />