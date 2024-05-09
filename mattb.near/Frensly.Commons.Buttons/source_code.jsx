const ButtonPrimary = styled.a`
    border-radius:30px;
    font-weight:bold;
    color:#000;
    background-color:#f2f2f2;
    border:1px solid rgba(0,0,0,.05);
    padding:.8rem 1.4rem;
    font-size:16px;
    cursor:pointer;
    transition: all .2s;
    text-decoration:none!important;
    margin-right:10px;
    
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        color:#000;
    }
`;

const ButtonSecondary = styled.a`
    border:3px solid rgba(0,0,0,.05);
    padding:4.8px 12.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        color:#000;
    }
`;

return {
    ButtonPrimary,
    ButtonSecondary
}