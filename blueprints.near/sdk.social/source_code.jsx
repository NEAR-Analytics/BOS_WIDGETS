const SocialSDK = {
  poke: (accountId) => {
    const data = {
      index: {
        graph: JSON.stringify({
          key: "poke",
          value: {
            accountId: accountId,
          },
        }),
        notify: JSON.stringify({
          key: accountId,
          value: {
            type: "poke",
          },
        }),
      },
    };
    Social.set(data, {
      force: true,
    });
  },
  follow: (followId, userId) => {
    if (!followId || !userId || userId === followId) {
      return;
    }
    const followEdge = Social.keys(
      `${userId}/graph/follow/${followId}`,
      undefined,
      { values_only: true }
    );
    const follow = followEdge && Object.keys(followEdge).length;
    const type = follow ? "unfollow" : "follow";
    const data = {
      graph: { follow: { [followId]: follow ? null : "" } },
      index: {
        graph: JSON.stringify({
          key: "follow",
          value: {
            type,
            accountId: followId,
          },
        }),
        notify: JSON.stringify({
          key: followId,
          value: {
            type,
          },
        }),
      },
    };
    Social.set(data);
  },
  followStatus: (followId, userId) => {
    if (!followId || !userId || userId === followId) {
      return;
    }
    const followEdge = Social.keys(
      `${userId}/graph/follow/${followId}`,
      undefined,
      {
        values_only: true,
      }
    );
    const inverseEdge = Social.keys(
      `${followId}/graph/follow/${userId}`,
      undefined,
      {
        values_only: true,
      }
    );
    const loading = followEdge === null || inverseEdge === null;
    const follow = followEdge && Object.keys(followEdge).length;
    const inverse = inverseEdge && Object.keys(inverseEdge).length;
    return loading
      ? "Loading"
      : follow
      ? "Following"
      : inverse
      ? "Follow back"
      : "Follow";
  },
};
return { SocialSDK };
