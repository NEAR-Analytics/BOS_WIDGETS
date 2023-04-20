const Row = styled.div`
  display: flex;
  flex-direction: row;

  &.reverse {
    flex-direction: row-reverse;
  }

  justify-content: space-between;
  align-items: center;
  gap: 1em;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const SectionHeader = styled.h3`
  text-align: center;
  font-family: 'FK Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 120%;
  color: #000000;

  &.black {
    font-size: 3em;
    color: #ffffff;
  }
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  text-align: left;

  h4 {
    font-family: 'FK Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 120%;
    color: #000000;
  }

  p {
    font-family: 'FK Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 150%;
    color: #000000;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

console.log("here")

return (
  <div>
    <SectionHeader>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.6932 30.1863C52.0726 30.1863 55.5813 26.3801 55.0826 21.9001C54.7019 18.492 51.9501 15.7401 48.5419 15.3595C44.0619 14.8607 40.2557 18.3695 40.2557 22.7488C40.2557 22.9632 40.2688 23.1732 40.2863 23.3832L34.6557 24.897C33.9732 23.2345 32.8751 21.7863 31.4969 20.6795L35.3688 14.3576C36.5676 14.8257 37.9107 15.0051 39.3238 14.7645C42.5701 14.2045 45.1207 11.5051 45.4619 8.22822C45.9651 3.43322 41.8701 -0.578654 37.0444 0.0688461C33.7632 0.506346 31.1251 3.1576 30.6963 6.43885C30.3551 9.04197 31.3744 11.422 33.1332 12.9882L29.2613 19.3101C27.9444 18.7107 26.4832 18.3782 24.9432 18.3782C22.8694 18.3782 20.9357 18.9863 19.3038 20.0276L13.5594 13.1063C14.8938 11.527 15.5894 9.38322 15.2176 7.08635C14.7013 3.8926 12.0851 1.36385 8.87818 0.943846C4.02193 0.305096 -0.0905683 4.39135 0.500057 9.24322C0.898182 12.5245 3.51006 15.1932 6.78256 15.6701C8.52381 15.9238 10.1688 15.5607 11.5426 14.7776L17.2869 21.6988C15.5282 23.5757 14.4432 26.1001 14.4432 28.8738C14.4432 31.0482 15.1082 33.0651 16.2413 34.7451L12.0807 38.3851C10.6019 37.1995 8.66381 36.5651 6.57693 36.8013C3.22131 37.182 0.491307 39.8638 0.0625567 43.2151C-0.558693 48.0713 3.53631 52.1751 8.38818 51.567C11.5819 51.1688 14.1938 48.6838 14.7538 45.5163C15.0907 43.6176 14.6838 41.8282 13.8001 40.3626L17.9651 36.7182C19.8201 38.3676 22.2613 39.3738 24.9344 39.3738C27.2269 39.3738 29.3488 38.6345 31.0769 37.3788L37.3594 44.112C36.1694 45.6957 35.5876 47.7651 35.9988 49.9701C36.5544 52.9276 38.9126 55.3032 41.8701 55.8588C46.9319 56.8126 51.3244 52.5951 50.6813 47.577C50.2657 44.3526 47.7282 41.732 44.5213 41.2157C42.5788 40.9051 40.7501 41.3601 39.2801 42.3138L26.5576 28.9001C26.1769 28.502 26.1551 27.9901 26.4351 27.7232L26.4657 27.6926C26.7719 27.3995 27.2269 27.3776 27.5507 27.5963L34.0563 32.807C34.2882 32.9951 34.6338 32.8945 34.7432 32.6145C35.1894 31.4507 35.4388 30.1907 35.4388 28.8695C35.4388 28.3795 35.4038 27.8982 35.3382 27.4301L40.9688 25.912C42.1632 28.432 44.7226 30.182 47.6888 30.182L47.6932 30.1863Z" fill="#66A0FF" />
      </svg>
      Web3 Founders
    </SectionHeader>
    <Row>
      <svg width="352" height="262" viewBox="0 0 352 262" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g clip-path="url(#clip0_2150_82073)">
          <path d="M344.986 245.601L340.942 245.059L340.399 241.015C340.337 240.552 339.671 240.552 339.608 241.015L339.066 245.059L335.022 245.601C334.559 245.664 334.559 246.33 335.022 246.392L339.066 246.935L339.608 250.979C339.671 251.441 340.337 251.441 340.399 250.979L340.942 246.935L344.986 246.392C345.448 246.33 345.448 245.664 344.986 245.601Z" fill="white" />
          <path d="M261.986 245.601L257.942 245.059L257.399 241.015C257.337 240.552 256.671 240.552 256.608 241.015L256.066 245.059L252.022 245.601C251.559 245.664 251.559 246.33 252.022 246.392L256.066 246.935L256.608 250.979C256.671 251.441 257.337 251.441 257.399 250.979L257.942 246.935L261.986 246.392C262.448 246.33 262.448 245.664 261.986 245.601Z" fill="white" />
          <path d="M178.986 245.601L174.942 245.059L174.399 241.015C174.337 240.552 173.671 240.552 173.608 241.015L173.066 245.059L169.022 245.601C168.559 245.664 168.559 246.33 169.022 246.392L173.066 246.935L173.608 250.979C173.671 251.441 174.337 251.441 174.399 250.979L174.942 246.935L178.986 246.392C179.448 246.33 179.448 245.664 178.986 245.601Z" fill="white" />
          <path d="M95.9862 245.601L91.9417 245.059L91.3995 241.015C91.3373 240.552 90.6706 240.552 90.6084 241.015L90.0662 245.059L86.0217 245.601C85.5595 245.664 85.5595 246.33 86.0217 246.392L90.0662 246.935L90.6084 250.979C90.6706 251.441 91.3373 251.441 91.3995 250.979L91.9417 246.935L95.9862 246.392C96.4484 246.33 96.4484 245.664 95.9862 245.601Z" fill="white" />
          <path d="M12.9862 245.601L8.94172 245.059L8.39949 241.015C8.33727 240.552 7.6706 240.552 7.60838 241.015L7.06616 245.059L3.02172 245.601C2.55949 245.664 2.55949 246.33 3.02172 246.392L7.06616 246.935L7.60838 250.979C7.6706 251.441 8.33727 251.441 8.39949 250.979L8.94172 246.935L12.9862 246.392C13.4484 246.33 13.4484 245.664 12.9862 245.601Z" fill="white" />
          <path d="M344.986 188.601L340.942 188.059L340.399 184.015C340.337 183.552 339.671 183.552 339.608 184.015L339.066 188.059L335.022 188.601C334.559 188.664 334.559 189.33 335.022 189.392L339.066 189.935L339.608 193.979C339.671 194.441 340.337 194.441 340.399 193.979L340.942 189.935L344.986 189.392C345.448 189.33 345.448 188.664 344.986 188.601Z" fill="white" />
          <path d="M261.986 188.601L257.942 188.059L257.399 184.015C257.337 183.552 256.671 183.552 256.608 184.015L256.066 188.059L252.022 188.601C251.559 188.664 251.559 189.33 252.022 189.392L256.066 189.935L256.608 193.979C256.671 194.441 257.337 194.441 257.399 193.979L257.942 189.935L261.986 189.392C262.448 189.33 262.448 188.664 261.986 188.601Z" fill="white" />
          <path d="M178.986 188.601L174.942 188.059L174.399 184.015C174.337 183.552 173.671 183.552 173.608 184.015L173.066 188.059L169.022 188.601C168.559 188.664 168.559 189.33 169.022 189.392L173.066 189.935L173.608 193.979C173.671 194.441 174.337 194.441 174.399 193.979L174.942 189.935L178.986 189.392C179.448 189.33 179.448 188.664 178.986 188.601Z" fill="white" />
          <path d="M95.9862 188.601L91.9417 188.059L91.3995 184.015C91.3373 183.552 90.6706 183.552 90.6084 184.015L90.0662 188.059L86.0217 188.601C85.5595 188.664 85.5595 189.33 86.0217 189.392L90.0662 189.935L90.6084 193.979C90.6706 194.441 91.3373 194.441 91.3995 193.979L91.9417 189.935L95.9862 189.392C96.4484 189.33 96.4484 188.664 95.9862 188.601Z" fill="white" />
          <path d="M12.9862 188.601L8.94172 188.059L8.39949 184.015C8.33727 183.552 7.6706 183.552 7.60838 184.015L7.06616 188.059L3.02172 188.601C2.55949 188.664 2.55949 189.33 3.02172 189.392L7.06616 189.935L7.60838 193.979C7.6706 194.441 8.33727 194.441 8.39949 193.979L8.94172 189.935L12.9862 189.392C13.4484 189.33 13.4484 188.664 12.9862 188.601Z" fill="white" />
          <path d="M344.986 131.601L340.942 131.059L340.399 127.015C340.337 126.552 339.671 126.552 339.608 127.015L339.066 131.059L335.022 131.601C334.559 131.664 334.559 132.33 335.022 132.392L339.066 132.935L339.608 136.979C339.671 137.441 340.337 137.441 340.399 136.979L340.942 132.935L344.986 132.392C345.448 132.33 345.448 131.664 344.986 131.601Z" fill="white" />
          <path d="M261.986 131.601L257.942 131.059L257.399 127.015C257.337 126.552 256.671 126.552 256.608 127.015L256.066 131.059L252.022 131.601C251.559 131.664 251.559 132.33 252.022 132.392L256.066 132.935L256.608 136.979C256.671 137.441 257.337 137.441 257.399 136.979L257.942 132.935L261.986 132.392C262.448 132.33 262.448 131.664 261.986 131.601Z" fill="white" />
          <path d="M178.986 131.601L174.942 131.059L174.399 127.015C174.337 126.552 173.671 126.552 173.608 127.015L173.066 131.059L169.022 131.601C168.559 131.664 168.559 132.33 169.022 132.392L173.066 132.935L173.608 136.979C173.671 137.441 174.337 137.441 174.399 136.979L174.942 132.935L178.986 132.392C179.448 132.33 179.448 131.664 178.986 131.601Z" fill="white" />
          <path d="M95.9862 131.601L91.9417 131.059L91.3995 127.015C91.3373 126.552 90.6706 126.552 90.6084 127.015L90.0662 131.059L86.0217 131.601C85.5595 131.664 85.5595 132.33 86.0217 132.392L90.0662 132.935L90.6084 136.979C90.6706 137.441 91.3373 137.441 91.3995 136.979L91.9417 132.935L95.9862 132.392C96.4484 132.33 96.4484 131.664 95.9862 131.601Z" fill="white" />
          <path d="M12.9862 131.601L8.94172 131.059L8.39949 127.015C8.33727 126.552 7.6706 126.552 7.60838 127.015L7.06616 131.059L3.02172 131.601C2.55949 131.664 2.55949 132.33 3.02172 132.392L7.06616 132.935L7.60838 136.979C7.6706 137.441 8.33727 137.441 8.39949 136.979L8.94172 132.935L12.9862 132.392C13.4484 132.33 13.4484 131.664 12.9862 131.601Z" fill="white" />
          <path d="M344.986 74.6013L340.942 74.0591L340.399 70.0146C340.337 69.5524 339.671 69.5524 339.608 70.0146L339.066 74.0591L335.022 74.6013C334.559 74.6635 334.559 75.3302 335.022 75.3924L339.066 75.9346L339.608 79.9791C339.671 80.4413 340.337 80.4413 340.399 79.9791L340.942 75.9346L344.986 75.3924C345.448 75.3302 345.448 74.6635 344.986 74.6013Z" fill="white" />
          <path d="M261.986 74.6013L257.942 74.0591L257.399 70.0146C257.337 69.5524 256.671 69.5524 256.608 70.0146L256.066 74.0591L252.022 74.6013C251.559 74.6635 251.559 75.3302 252.022 75.3924L256.066 75.9346L256.608 79.9791C256.671 80.4413 257.337 80.4413 257.399 79.9791L257.942 75.9346L261.986 75.3924C262.448 75.3302 262.448 74.6635 261.986 74.6013Z" fill="white" />
          <path d="M178.986 74.6013L174.942 74.0591L174.399 70.0146C174.337 69.5524 173.671 69.5524 173.608 70.0146L173.066 74.0591L169.022 74.6013C168.559 74.6635 168.559 75.3302 169.022 75.3924L173.066 75.9346L173.608 79.9791C173.671 80.4413 174.337 80.4413 174.399 79.9791L174.942 75.9346L178.986 75.3924C179.448 75.3302 179.448 74.6635 178.986 74.6013Z" fill="white" />
          <path d="M95.9862 74.6013L91.9417 74.0591L91.3995 70.0146C91.3373 69.5524 90.6706 69.5524 90.6084 70.0146L90.0662 74.0591L86.0217 74.6013C85.5595 74.6635 85.5595 75.3302 86.0217 75.3924L90.0662 75.9346L90.6084 79.9791C90.6706 80.4413 91.3373 80.4413 91.3995 79.9791L91.9417 75.9346L95.9862 75.3924C96.4484 75.3302 96.4484 74.6635 95.9862 74.6013Z" fill="white" />
          <path d="M12.9862 74.6013L8.94172 74.0591L8.39949 70.0146C8.33727 69.5524 7.6706 69.5524 7.60838 70.0146L7.06616 74.0591L3.02172 74.6013C2.55949 74.6635 2.55949 75.3302 3.02172 75.3924L7.06616 75.9346L7.60838 79.9791C7.6706 80.4413 8.33727 80.4413 8.39949 79.9791L8.94172 75.9346L12.9862 75.3924C13.4484 75.3302 13.4484 74.6635 12.9862 74.6013Z" fill="white" />
          <path d="M344.986 17.6013L340.942 17.0591L340.399 13.0146C340.337 12.5524 339.671 12.5524 339.608 13.0146L339.066 17.0591L335.022 17.6013C334.559 17.6635 334.559 18.3302 335.022 18.3924L339.066 18.9346L339.608 22.9791C339.671 23.4413 340.337 23.4413 340.399 22.9791L340.942 18.9346L344.986 18.3924C345.448 18.3302 345.448 17.6635 344.986 17.6013Z" fill="white" />
          <path d="M261.986 17.6013L257.942 17.0591L257.399 13.0146C257.337 12.5524 256.671 12.5524 256.608 13.0146L256.066 17.0591L252.022 17.6013C251.559 17.6635 251.559 18.3302 252.022 18.3924L256.066 18.9346L256.608 22.9791C256.671 23.4413 257.337 23.4413 257.399 22.9791L257.942 18.9346L261.986 18.3924C262.448 18.3302 262.448 17.6635 261.986 17.6013Z" fill="white" />
          <path d="M178.986 17.6013L174.942 17.0591L174.399 13.0146C174.337 12.5524 173.671 12.5524 173.608 13.0146L173.066 17.0591L169.022 17.6013C168.559 17.6635 168.559 18.3302 169.022 18.3924L173.066 18.9346L173.608 22.9791C173.671 23.4413 174.337 23.4413 174.399 22.9791L174.942 18.9346L178.986 18.3924C179.448 18.3302 179.448 17.6635 178.986 17.6013Z" fill="white" />
          <path d="M95.9862 17.6013L91.9417 17.0591L91.3995 13.0146C91.3373 12.5524 90.6706 12.5524 90.6084 13.0146L90.0662 17.0591L86.0217 17.6013C85.5595 17.6635 85.5595 18.3302 86.0217 18.3924L90.0662 18.9346L90.6084 22.9791C90.6706 23.4413 91.3373 23.4413 91.3995 22.9791L91.9417 18.9346L95.9862 18.3924C96.4484 18.3302 96.4484 17.6635 95.9862 17.6013Z" fill="white" />
          <path d="M12.9862 17.6013L8.94172 17.0591L8.39949 13.0146C8.33727 12.5524 7.6706 12.5524 7.60838 13.0146L7.06616 17.0591L3.02172 17.6013C2.55949 17.6635 2.55949 18.3302 3.02172 18.3924L7.06616 18.9346L7.60838 22.9791C7.6706 23.4413 8.33727 23.4413 8.39949 22.9791L8.94172 18.9346L12.9862 18.3924C13.4484 18.3302 13.4484 17.6635 12.9862 17.6013Z" fill="white" />
        </g>
      </svg>
      <SubSection>
        <h4>Join an acceleration program</h4>
        <p>
          Join an accelerator cohort where you will participate in live sessions focused on building, launching, and scaling a successful Web3 business.
        </p>
      </SubSection>
    </Row>
  </div>
);
