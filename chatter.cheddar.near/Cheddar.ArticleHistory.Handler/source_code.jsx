//Cheddar.ArticleHistory.Handler
const addressForArticles = 'wikiTest2Article'

const { articleId, isTest, baseActions, kanbanColumns, widgets, versions } =
    props

State.init({
    selectedTab: 'code',
    selectedBlockHeight: null,
})

//TODO Need the function getArticlesVersions in the lib.articles

if (props.count) props.count(versions.length)

if (!state.selectedBlockHeight && versions.length > 0)
    state.selectedBlockHeight = versions[0].blockHeight

const renderBlockChangesLink = (version) => {
    if (!version) return <>Loading...</>

    const timeLastEdit = new Date(version.value.metadata.lastEditTimestamp)

    return (
        <div>
            <button
                className={`list-group-item list-group-item-action ${
                    state.selectedBlockHeight != version.blockHeight
                        ? ''
                        : 'list-group-item-info'
                }`}
                onClick={() => {
                    State.update({ selectedBlockHeight: version.blockHeight })
                }}
            >
                #{version.blockHeight} *{' '}
                {timeLastEdit.toDateString() +
                    ' ' +
                    timeLastEdit.toLocaleTimeString()}
            </button>
        </div>
    )
}

function renderWidgetCode(blockHeight) {
    const currentVersionDisplayed = versions.find(
        (version) => version.blockHeight === blockHeight
    )
    const index = versions.findIndex((el) => el.blockHeight === blockHeight)
    const prevBlockHeightObject = versions[index + 1]
    return (
        <Widget
            style={{ minHeight: '200px' }}
            key={blockHeight}
            src={widgets.views.editableWidgets.articleHistoryFirstContainer}
            props={{
                widgets,
                pathToCurrentArticle: `${currentVersionDisplayed.metadata.author}/${addressForArticles}/main`,
                currentBlockHeight: blockHeight,
                currentVersionData: currentVersionDisplayed,
                allVersionsData: versions,
                pathToPrevArticle: `${prevBlockHeightObject.metadata.author}/${addressForArticles}/main`,
                prevBlockHeight: prevBlockHeightObject.blockHeight,
            }}
        />
    )
}

function blockHeightToWidgetRender(blockHeight, allArticles) {
    const index = versions.findIndex((el) => el.blockHeight === blockHeight)
    return <Markdown text={allArticles[index].value.articleData.body} />
}

function articleHistoryHasndlerStateUpdate(obj) {
    State.update(obj)
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
    display: flex;
    padding: 0 12px;
    height: 48px;
    border-bottom: 1px solid #eceef0;
`

const TabsButton = styled.button`
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 0 12px;
    position: relative;
    color: ${(p) => (p.selected ? '#11181C' : '#687076')};
    background: none;
    border: none;
    outline: none;

    &:hover {
        color: #11181c;
    }

    &::after {
        content: '';
        display: ${(p) => (p.selected ? 'block' : 'none')};
        position: absolute;
        bottom: 0;
        left: 12px;
        right: 12px;
        height: 3px;
        background: #0091ff;
    }
`

return (
    <>
        <div className="mt-2">
            <h3 className="text-center">Article History</h3>
            {!versions ? (
                <div>incorrent widget path</div>
            ) : (
                <div>
                    <div div className="card mb-3">
                        <h3 className="card-header">
                            {versions.length} Commits
                        </h3>
                        <div className="list-group">
                            {versions
                                .slice(0, 5)
                                .map((height) =>
                                    renderBlockChangesLink(height)
                                )}
                            <div className="collapse" id="collapseExample">
                                {versions
                                    .slice(5)
                                    .map((height) =>
                                        renderBlockChangesLink(height)
                                    )}
                            </div>
                            {versions.length > 5 && (
                                <button
                                    className="list-group-item active"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    Show all
                                </button>
                            )}
                        </div>
                    </div>

                    <Tabs>
                        <TabsButton
                            type="button"
                            onClick={() =>
                                State.update({
                                    selectedTab: 'code',
                                })
                            }
                            selected={state.selectedTab === 'code'}
                        >
                            Code
                        </TabsButton>

                        <TabsButton
                            type="button"
                            onClick={() =>
                                State.update({
                                    selectedTab: 'render',
                                })
                            }
                            selected={state.selectedTab === 'render'}
                        >
                            Render
                        </TabsButton>
                    </Tabs>

                    {state.selectedTab === 'code' && (
                        <div>{renderWidgetCode(state.selectedBlockHeight)}</div>
                    )}

                    {state.selectedTab === 'render' && (
                        <div>
                            {blockHeightToWidgetRender(
                                state.selectedBlockHeight,
                                versions
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    </>
)
