const {
    LargeContainer,
    LogoImg,
    GridImg,
    SmallContainer,
    SocialIconImg,
    SmallImg
} = VM.require("megha19.near/widget/styles");

const {
    CharterURL,
    CharterImg,
    MarketingImg,
    LogoURL,
    Logo,
    MarketingTextImg,
    LogoTextImg,
    CharterTextImg,
    PartnershipsLogoImg,
    EducationalImg,
    EducationalTextImg,
    EducationURL,
    MarketingURL
} = VM.require("megha19.near/widget/core.lib.url");

const Description = () => {
    return (
        <div className="description">
            The She is Near marketing team is embracing a grassroots DAO
            approach to ensure that we support and fund initiatives from our
            community members. <br /> The majority of marketing efforts, such as
            content campaigns, contests, social media threads, and any
            communication strategies to engage the community, are to be executed
            by active DAO members.
        </div>
    );
};

const BodyText = () => {
    return (
        <div className="description">
            <ul>
                <li>
                    Highlighting women who are actively contributing and making
                    strides in the ecosystem.
                </li>
                <li>
                    Raising awareness about gender-related issues and providing
                    career advice and tips for women to navigate these
                    challenges.
                </li>
                <li>
                    Amplifying the efforts of other teams, including
                    partnerships, education, and technical development.
                </li>
                <li>
                    Continuously updating and maintaining a consistent brand
                    identity.
                </li>
                <li>Expanding our social media presence.</li>
                <li>
                    Support and fund marketing initiatives put forth by our
                    community members that align with and champion the points
                    outlined above, following the approved process on the forum.
                </li>
            </ul>
        </div>
    );
};

const SubHeading = () => {
    return (
        <div className="subheading">
            With our marketing initiatives, we aim to achieve our missions:
        </div>
    );
};

const LargeScreenComponent = () => {
    return (
        <LargeContainer>
            <div class="d-flex gap-5">
                <div class="d-flex flex-column gap-5 flex-08">
                    <div class="h1-custom">Partnerships team</div>
                    <Description />
                    <SubHeading />
                    <BodyText />
                </div>
                <div class="d-flex flex-column gap-3 align-items-center flex-1">
                    <LogoImg src={PartnershipsLogoImg} />
                    <div class="grid-4">
                        <a href={CharterURL} target="_blank" rel="noreferrer">
                            <GridImg src={CharterImg} />
                        </a>
                        <a href={MarketingURL} target="_blank" rel="noreferrer">
                            <GridImg src={MarketingImg} />
                        </a>
                        <a href={EducationURL} target="_blank" rel="noreferrer">
                            <GridImg src={EducationalImg} />
                        </a>
                        <a href={LogoURL} target="_blank" rel="noreferrer">
                            <GridImg src={Logo} />
                        </a>
                    </div>
                </div>
                <Widget
                    src={"megha19.near/widget/components.socialLinks"}
                    props={{ showRow: false }}
                />
            </div>
        </LargeContainer>
    );
};

const MobileScreenComponent = () => {
    return (
        <SmallContainer>
            <div className="d-flex flex-column gap-4">
                <div class="h1-custom">Partnerships team</div>
                <img src={PartnershipsLogoImg} height={300} />
                <Description />
                <SubHeading />
                <BodyText />
                <div className="d-flex flex-column gap-2">
                    <a href={MarketingURL} target="_blank" rel="noreferrer">
                        <SmallImg src={MarketingTextImg} />
                    </a>
                    <a href={EducationURL} target="_blank" rel="noreferrer">
                        <SmallImg src={EducationalTextImg} />
                    </a>
                    <a href={LogoURL} target="_blank" rel="noreferrer">
                        <SmallImg src={LogoTextImg} />
                    </a>
                    <a href={CharterURL} target="_blank" rel="noreferrer">
                        <SmallImg src={CharterTextImg} />
                    </a>
                </div>
                <Widget
                    src={"megha19.near/widget/components.socialLinks"}
                    props={{ showRow: true }}
                />
            </div>
        </SmallContainer>
    );
};

return (
    <div>
        <LargeScreenComponent />
        <MobileScreenComponent />
    </div>
);
