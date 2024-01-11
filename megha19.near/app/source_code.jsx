/**
 * This is the main entry point for the she-is-near application.
 * Page route gets passed in through params, along with all other page props.
 */

const { page, ...passProps } = props;

const cssFont = fetch(
    "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
).body;

if (!cssFont) return "";

// CSS styles to be used across the app.
// Define fonts here, as well as any other global styles.
const Theme = styled.div`
    font-family: "Poppins", sans-serif;
    ${cssFont}

    .grid-4 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .cursor {
        cursor: pointer;
    }

    a {
        all: unset;
    }

    .body-text {
        line-height: 30px;
    }

    img {
        object-fit: cover;
        align-self: center;
    }
`;

if (!page) {
    // If no page is specified, we default to the feed page TEMP
    page = "home";
}

// This is our navigation, rendering the page based on the page parameter
function Page() {
    const routes = page.split(".");
    switch (routes[0]) {
        case "home": {
            return (
                <Widget
                    src="she-is-near.sputnik-dao.near/widget/home"
                    props={passProps}
                />
            );
        }
        // ?page=education
        case "education": {
            return (
                <Widget
                    src={"she-is-near.sputnik-dao.near/widget/education"}
                    props={passProps}
                />
            );
        }
        // ?page=marketing
        case "marketing": {
            return (
                <Widget
                    src={"she-is-near.sputnik-dao.near/widget/marketing"}
                    props={passProps}
                />
            );
        }
        // ?page=partnerships
        case "partnerships": {
            return (
                <Widget
                    src={"she-is-near.sputnik-dao.near/widget/partnerships"}
                    props={passProps}
                />
            );
        }

        default: {
            // TODO: 404 page
            return <p>404</p>;
        }
    }
}

return (
    <Theme>
        <Page />
    </Theme>
);
