const LargeContainer = styled.div`
    padding: 2rem;
    .h1-custom {
        font-size: 70px;
        font-weight: 550;
        line-height: 80px;
    }
    .h2-custom {
        font-size: 40px;
        font-weight: 550;
        line-height: 50px;
    }
    .h3-custom {
        font-size: 25px;
        font-weight: 500;
        line-height: 30px;
    }

    .flex-1 {
        flex: 1;
    }

    .flex-08 {
        flex: 0.8;
    }

    @media screen and (max-width: 1300px) {
        .flex-08 {
            flex: 1;
        }
    }

    @media screen and (max-width: 1200px) {
        padding: 1rem;
        .h1-custom {
            font-size: 50px;
            font-weight: 550;
            line-height: 60px;
        }
        .h2-custom {
            font-size: 30px;
            font-weight: 550;
            line-height: 40px;
        }
        .h3-custom {
            font-size: 25px;
            font-weight: 500;
            line-height: 30px;
        }
    }
    @media screen and (max-width: 1000px) {
        .h1-custom {
            font-size: 45px;
            font-weight: 550;
            line-height: 50px;
        }
        .h2-custom {
            font-size: 29px;
            font-weight: 550;
            line-height: 40px;
        }
        .h3-custom {
            font-size: 25px;
            font-weight: 500;
            line-height: 30px;
        }
    }

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

const LogoImg = styled.img`
    height: 420px;
    @media screen and (max-width: 1300px) {
        height: 300px;
    }
    @media screen and (max-width: 1100px) {
        height: 260px;
    }
    @media screen and (max-width: 900px) {
        height: 220px;
    }
`;

const GridImg = styled.img`
    cursor: pointer;
    height: 200px;
    @media screen and (max-width: 1300px) {
        height: 140px;
    }
    @media screen and (max-width: 1100px) {
        height: 120px;
    }
    @media screen and (max-width: 900px) {
        height: 100px;
    }
`;

const SmallContainer = styled.div`
    padding: 1rem;
    .h1-custom {
        font-size: 40px;
        font-weight: 700;
        line-height: 40px;
    }
    .h2-custom {
        font-size: 25px;
        font-weight: 500;
        line-height: 30px;
    }
    .h3-custom {
        font-size: 20px;
        font-weight: 650;
        line-height: 30px;
    }
    @media screen and (min-width: 700px) {
        display: none;
    }
`;

const SocialIconImg = styled.img`
    height: 80px;

    @media screen and (max-width: 1100px) {
        height: 60px;
    }
    @media screen and (max-width: 700px) {
        height: 80px;
    }
`;

const SmallImg = styled.img`
    cursor: pointer;
    height: 90px;
    width: -webkit-fill-available;

    @media screen and (max-width: 600px) {
        height: 60px;
    }
`;

return {
    LargeContainer,
    SmallContainer,
    GridImg,
    LogoImg,
    SocialIconImg,
    SmallImg
};
