const { SocialIconImg } = VM.require("megha19.near/widget/styles");

const {
    TelegramURL,
    TelegramIcon,
    NearIcon,
    NearSocialURL,
    LinkdinIcon,
    LinkdInURL
} = VM.require("megha19.near/widget/core.lib.url");

const SocialIcons = ({ text, src }) => {
    return (
        <div className="d-flex flex-column gap-2 align-items-center cursor">
            <SocialIconImg src={src} />
            <div>{text}</div>
        </div>
    );
};

return (
    <div
        class={
            props.showRow
                ? "d-flex flex-row gap-3 align-items-center justify-content-center"
                : "d-flex flex-column gap-3 align-items-center"
        }
    >
        <a href={TelegramURL} target="_blank" rel="noreferrer">
            <SocialIcons text="Telegram" src={TelegramIcon} />
        </a>
        <a href={NearSocialURL} target="_blank" rel="noreferrer">
            <SocialIcons text="Near Social" src={NearIcon} />
        </a>
        <a href={LinkdInURL} target="_blank" rel="noreferrer">
            <SocialIcons text="LinkdIn" src={LinkdinIcon} />
        </a>
    </div>
);
