const Container = styled.div`
  width: 560px;
  margin: 0 auto;
  background: linear-gradient(90deg, #B6C133 0%, #FDFE03 100%);
  height: 96px;
  padding: 12px 20px 0 57px;
  position: relative;
  margin-bottom: -30px;
  z-index: 0;
  border-radius: 25px 25px 0 0;
`;

const Icon = styled.div`
    position: absolute;
    left: -25px;
    top: -10px;
`

const Tip = styled.div`
    font-family: Montserrat;
    font-size: 16px;
    line-height: 19.5px;
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
    .spe {
        font-weight: 900;
        font-style: italic;
    }
`

const RulesTrigger = styled.div`
    position: absolute;
    right: 25px;
    top: 35px;
    cursor: pointer;
    color: rgba(0, 117, 255, 1);
    text-decoration: underline;
`

State.init({
    rulerShow: false
})

return (
    <Container>
        <Icon>
            <svg width="66" height="58" viewBox="0 0 66 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.06215 5.5345C7.38431 4.66389 8.61569 4.66389 8.93785 5.53451L10.0012 8.40803C10.1024 8.68175 10.3182 8.89756 10.592 8.99885L13.4655 10.0621C14.3361 10.3843 14.3361 11.6157 13.4655 11.9379L10.592 13.0012C10.3182 13.1024 10.1024 13.3182 10.0012 13.592L8.93785 16.4655C8.61569 17.3361 7.38431 17.3361 7.06215 16.4655L5.99885 13.592C5.89756 13.3182 5.68175 13.1024 5.40803 13.0012L2.5345 11.9379C1.66389 11.6157 1.66389 10.3843 2.53451 10.0621L5.40803 8.99885C5.68175 8.89756 5.89756 8.68175 5.99885 8.40803L7.06215 5.5345Z" fill="#FCFD03" />
                <path d="M57.0621 2.5345C57.3843 1.66389 58.6157 1.66389 58.9379 2.53451L60.0012 5.40803C60.1024 5.68175 60.3182 5.89756 60.592 5.99885L63.4655 7.06215C64.3361 7.38431 64.3361 8.61569 63.4655 8.93785L60.592 10.0012C60.3182 10.1024 60.1024 10.3182 60.0012 10.592L58.9379 13.4655C58.6157 14.3361 57.3843 14.3361 57.0621 13.4655L55.9988 10.592C55.8976 10.3182 55.6818 10.1024 55.408 10.0012L52.5345 8.93785C51.6639 8.61569 51.6639 7.38431 52.5345 7.06215L55.408 5.99885C55.6818 5.89756 55.8976 5.68175 55.9988 5.40803L57.0621 2.5345Z" fill="#FCFD03" stroke="#16181D" stroke-width="2" stroke-linejoin="round" />
                <circle opacity="0.6" cx="37.4162" cy="28.7092" r="22.2082" fill="url(#paint0_linear_11093_10070)" />
                <circle cx="37.4191" cy="28.7081" r="21.7277" fill="url(#paint1_linear_11093_10070)" stroke="black" stroke-width="2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.7499 18.0973C39.9215 18.0155 40.1127 17.9843 40.3013 18.0074L47.4484 18.8798C47.7699 18.9191 48.0525 19.1116 48.2066 19.3964L51.8794 26.1822C52.1104 26.6089 52.0017 27.1399 51.6216 27.4415L37.3274 38.7834C37.0566 38.9983 36.6939 39.058 36.3683 38.9413L23.6625 34.3852C23.401 34.2914 23.1904 34.0932 23.0809 33.838C22.9715 33.5827 22.9731 33.2935 23.0854 33.0395L26.8575 24.5089C26.9542 24.2902 27.126 24.1134 27.3418 24.0105L39.7499 18.0973ZM40.3477 20.0279L30.787 24.5842L35.1628 25.5963L44.1891 20.4968L40.3477 20.0279ZM46.9325 21.244L36.39 27.2L37.4815 36.108L49.7212 26.3963L46.9325 21.244ZM35.516 36.511L34.4087 27.4747L28.3523 26.0739L25.3492 32.8653L35.516 36.511Z" fill="black" />
                <path d="M53.0621 36.5345C53.3843 35.6639 54.6157 35.6639 54.9379 36.5345L57.0815 42.3277C57.1828 42.6014 57.3986 42.8172 57.6723 42.9185L63.4655 45.0621C64.3361 45.3843 64.3361 46.6157 63.4655 46.9379L57.6723 49.0815C57.3986 49.1828 57.1828 49.3986 57.0815 49.6723L54.9379 55.4655C54.6157 56.3361 53.3843 56.3361 53.0621 55.4655L50.9185 49.6723C50.8172 49.3986 50.6014 49.1828 50.3277 49.0815L44.5345 46.9379C43.6639 46.6157 43.6639 45.3843 44.5345 45.0621L50.3277 42.9185C50.6014 42.8172 50.8172 42.6014 50.9185 42.3277L53.0621 36.5345Z" fill="#FCFD03" stroke="#16181D" stroke-width="2" stroke-linejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_11093_10070" x1="15.208" y1="28.7092" x2="59.6244" y2="28.7092" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FDF621" />
                        <stop offset="0.595" stop-color="#FDFCC3" />
                        <stop offset="1" stop-color="#FDF973" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_11093_10070" x1="16.6914" y1="28.7081" x2="58.1467" y2="28.7081" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FDF621" />
                        <stop offset="0.595" stop-color="#FDFCC3" />
                        <stop offset="1" stop-color="#FDF973" />
                    </linearGradient>
                </defs>
            </svg>
        </Icon>
        <Tip>
            Earn <span className="spe">Blast points</span> with cross-chain swaps via <span className="spe">XY</span> frontend on <span className="spe">DapDap!</span>
        </Tip>
        <RulesTrigger onClick={() => {
            props.showRules()
        }}>Rules {'>'}</RulesTrigger>
    </Container>
);
