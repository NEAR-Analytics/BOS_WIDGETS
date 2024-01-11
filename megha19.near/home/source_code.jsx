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
    MarketingImg,
    LogoURL,
    Logo,
    MarketingTextImg,
    LogoTextImg,
    PartnershipsLogoImg,
    EducationalImg,
    EducationalTextImg,
    EducationURL,
    MarketingURL,
    PartnershipsImg,
    PartnershipsTextImg,
    CharterTextImg,
    PartnershipsURL
} = VM.require("she-is-near.sputnik-dao.near/widget/core.lib.url");

const BodyText = () => {
    return (
        <div className="body-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
            enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
            autem vel eum iriure dolor in hendrerit in vulputate Ut wisi enim ad
            minim veniam, quis nostrud exerci tation ullamcorper suscipit
            lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
            iriure dolor in hendrerit in vulputate
        </div>
    );
};

const LargeScreenComponent = () => {
    return (
        <LargeContainer>
            <div class="d-flex gap-5">
                <div class="d-flex flex-column gap-5 flex-08">
                    <div class="h1-custom">
                        Welcome to <br /> She is Near
                    </div>
                    <div class="h3-custom">
                        The women’s DAO for the <br /> NEAR ecosystem{" "}
                    </div>
                    <div class="h3-custom">How did we get here?</div>
                    <BodyText />
                </div>
                <div class="d-flex flex-column gap-3 align-items-center flex-1">
                    <LogoImg src={Logo} />
                    <div class="grid-4">
                        <a href={CharterURL} target="_blank" rel="noreferrer">
                            <GridImg src={CharterImg} />
                        </a>
                        <a href={EducationURL} target="_blank" rel="noreferrer">
                            <GridImg src={EducationalImg} />
                        </a>
                        <a href={MarketingURL} target="_blank" rel="noreferrer">
                            <GridImg src={MarketingImg} />
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
                <div class="h1-custom">Welcome to She is Near</div>
                <div class="h3-custom">
                    The women’s DAO for the NEAR ecosystem{" "}
                </div>
                <img src={Logo} height={300} />
                <div class="h3-custom">How did we get here?</div>
                <BodyText />
                <div className="d-flex flex-column gap-2">
                    <a href={PartnershipsURL} target="_blank" rel="noreferrer">
                        <SmallImg src={PartnershipsTextImg} />
                    </a>
                    <a href={MarketingURL} target="_blank" rel="noreferrer">
                        <SmallImg src={MarketingTextImg} />
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
                    props={{ showRow: false }}
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
