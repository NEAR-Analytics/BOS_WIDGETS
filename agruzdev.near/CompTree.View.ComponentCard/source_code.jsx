const DEFAULT_OPEN = false;

const [accountId, widget, widgetName] = props.src.split('/');
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  'final'
);

const tags = Object.keys(metadata.tags || {});
const detailsUrl = `#/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `#/${accountId}/widget/${widgetName}`;
const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

function distinct(arr) {
  return [...new Set(arr)];
}

const filterDeps = (widget) => {
  const pattern = /<Widget\s+src=(?:{['"]([^'"}]+)['"]}|['"]([^'"}]+)['"])/g;

  let matches = [];
  let match;
  while ((match = pattern.exec(widget.toString())) !== null) {
    const srcValue = match[1] || match[2];
    matches.push(srcValue);
  }

  return distinct(matches);
};

const updateDeps = () => {
  setLoading(true);
  const widget = Social.get(props.src);

  if (!widget) return;

  setDeps(filterDeps(widget));
  setLoading(false);
};

const deps = state.deps;
const setDeps = (value) => {
  State.update({ deps: value });
};

const loading = state.loading;
const setLoading = (value) => {
  State.update({ loading: value });
};

const isShown = state.isShown;
const toggleShown = () => {
  State.update((prev) => {
    return {
      isShown: !prev.isShown,
    };
  });
};

State.init({ deps: null, isShown: DEFAULT_OPEN, loading: false });

updateDeps();

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: ${state.deps && state.deps.length === 0
    ? '1fr'
    : '1fr 1fr 1fr'};
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const CardTag = styled.p`
  margin: 0;
  font-size: 9px;
  line-height: 14px;
  background: #eceef0;
  color: #687076;
  font-weight: 400;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 3px;
  padding: 0 4px;

  i {
    margin-right: 3px;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? '#11181C !important' : '#687076 !important')};
  font-weight: ${(p) => (p.bold ? '600' : '400')};
  font-size: ${(p) => (p.small ? '12px' : '14px')};
  overflow: ${(p) => (p.ellipsis ? 'hidden' : 'visible')};
  text-overflow: ${(p) => (p.ellipsis ? 'ellipsis' : 'unset')};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? '#11181C' : '#687076')};
  font-weight: ${(p) => (p.bold ? '600' : '400')};
  font-size: ${(p) => (p.small ? '12px' : '14px')};
  overflow: ${(p) => (p.ellipsis ? 'hidden' : '')};
  text-overflow: ${(p) => (p.ellipsis ? 'ellipsis' : '')};
  white-space: nowrap;

  i {
    margin-right: 3px;
  }
`;

const Thumbnail = styled.a`
  display: block;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  position: relative;
  margin-top: 4px;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? '#006ADC' : '#11181C')} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

const DepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  flex-direction: column;
`;

const Dep = styled.div`
  margin-top: 10px;
  margin-left: 20%;
`;

return (
  <>
    {!loading ? (
      <>
        <Card>
          {
            <CardTag>
              <i className="bi bi-clock"></i>{' '}
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{
                  blockHeight: props.blockHeight,
                  keyPath: `${accountId}/widget/${widgetName}`,
                }}
              />{' '}
              ago
            </CardTag>
          }

          <CardBody>
            <Thumbnail href={detailsUrl}>
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: metadata.image,
                  fallbackUrl:
                    'https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu',
                  alt: metadata.name,
                }}
              />
            </Thumbnail>

            <CardContent>
              <TextLink as="a" href={detailsUrl} bold ellipsis>
                {metadata.name || widgetName}
              </TextLink>

              <TextLink small as="a" href={accountUrl} ellipsis>
                @{accountId}
              </TextLink>

              {tags.length > 0 && (
                <TagsWrapper>
                  <Widget
                    src="near/widget/Tags"
                    props={{
                      tags,
                      scroll: true,
                    }}
                  />
                </TagsWrapper>
              )}
            </CardContent>
          </CardBody>

          <CardFooter>
            <ButtonLink href={detailsUrl}>View Details</ButtonLink>
            {deps && deps.length !== 0 ? (
              <>
                <ButtonLink onClick={toggleShown}>
                  {isShown ? 'Close' : 'Show'}
                </ButtonLink>
                <ButtonLink
                  target={'_blank'}
                  href={`#/agruzdev.near/widget/CompTree.View.ComponentCard?src=${props.src}&reset=true`}
                  primary
                >
                  Root
                </ButtonLink>
              </>
            ) : null}
          </CardFooter>
        </Card>
        {isShown && deps && deps.length !== 0 ? (
          <DepsContainer>
            {deps.map((dep) => (
              <Dep>
                <Widget
                  src={'agruzdev.near/widget/CompTree.View.ComponentCard'}
                  props={{ src: dep }}
                />
              </Dep>
            ))}
          </DepsContainer>
        ) : null}
      </>
    ) : (
      <Widget src={'nui.sking.near/widget/Feedback.Spinner'} />
    )}
  </>
);
