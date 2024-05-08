const {
    LargeContainer,
    LogoImg,
    GridImg,
    SmallContainer,
    SocialIconImg,
    SmallImg
} = VM.require("she-is-near.sputnik-dao.near/widget/styles");

const {
    CharterURL,
    CharterImg,
    LogoURL,
    Logo,
    LogoTextImg,
    CharterTextImg,
    EducationalImg,
    EducationalTextImg,
    EducationURL,
    PartnershipsImg,
    PartnershipsURL,
    MarketingLogoImg,
    PartnershipsTextImg
} = VM.require("she-is-near.sputnik-dao.near/widget/core.lib.url");

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
                    <div class="h1-custom">Marketing team</div>
                    <Description />
                    <SubHeading />
                    <BodyText />
                </div>
                <div class="d-flex flex-column gap-3 align-items-center flex-1">
                    <LogoImg src={MarketingLogoImg} />
                    <div class="grid-4">
                        <a href={CharterURL} target="_blank" rel="noreferrer">
                            <GridImg src={CharterImg} />
                        </a>

                        <a href={LogoURL} target="_blank" rel="noreferrer">
                            <GridImg src={Logo} />
                        </a>
                        <a href={EducationURL} target="_blank" rel="noreferrer">
                            <GridImg src={EducationalImg} />
                        </a>
                        <a
                            href={PartnershipsURL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GridImg src={PartnershipsImg} />
                        </a>
                    </div>
                </div>
                <Widget
                    src={"she-is-near.sputnik-dao.near/widget/components.socialLinks"}
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
                <div class="h1-custom">Marketing team</div>
                <img src={MarketingLogoImg} height={300} />
                <Description />
                <SubHeading />
                <BodyText />
                <div className="d-flex flex-column gap-2">
                    <a href={PartnershipsURL} target="_blank" rel="noreferrer">
                        <SmallImg src={PartnershipsTextImg} />
                    </a>

                    <a href={LogoURL} target="_blank" rel="noreferrer">
                        <SmallImg src={LogoTextImg} />
                    </a>
                    <a href={CharterURL} target="_blank" rel="noreferrer">
                        <SmallImg src={CharterTextImg} />
                    </a>
                    <a href={EducationURL} target="_blank" rel="noreferrer">
                        <SmallImg src={EducationalTextImg} />
                    </a>
                </div>
                <Widget
                    src={"she-is-near.sputnik-dao.near/widget/components.socialLinks"}
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
