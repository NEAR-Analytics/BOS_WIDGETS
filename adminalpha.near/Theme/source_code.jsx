const Theme = styled.div`
  --text-xs: 400 12px/1.4 "Mona Sans", sans-serif;
  --text-s: 400 14px/1.4 "Mona Sans", sans-serif;
  --text-base: 400 16px/1.4 "Mona Sans", sans-serif;
  --text-l: 400 20px/1.4 "Mona Sans", sans-serif;
  --text-xl: 400 24px/1.4 "Mona Sans", sans-serif;
  --text-2xl: 400 30px/1.4 "Mona Sans", sans-serif;
  --text-3xl: 400 42px/1.4 "Mona Sans", sans-serif;

  --black: hsl(0, 0%, 0%);
  --white: hsl(0, 0%, 100%);

  --blackA1: hsla(0, 0%, 0%, 0.012);
  --blackA2: hsla(0, 0%, 0%, 0.027);
  --blackA3: hsla(0, 0%, 0%, 0.047);
  --blackA4: hsla(0, 0%, 0%, 0.071);
  --blackA5: hsla(0, 0%, 0%, 0.09);
  --blackA6: hsla(0, 0%, 0%, 0.114);
  --blackA7: hsla(0, 0%, 0%, 0.141);
  --blackA8: hsla(0, 0%, 0%, 0.22);
  --blackA9: hsla(0, 0%, 0%, 0.439);
  --blackA10: hsla(0, 0%, 0%, 0.478);
  --blackA11: hsla(0, 0%, 0%, 0.565);
  --blackA12: hsla(0, 0%, 0%, 0.91);

  --whiteA1: hsla(0, 0%, 100%, 0);
  --whiteA2: hsla(0, 0%, 100%, 0.013);
  --whiteA3: hsla(0, 0%, 100%, 0.034);
  --whiteA4: hsla(0, 0%, 100%, 0.056);
  --whiteA5: hsla(0, 0%, 100%, 0.086);
  --whiteA6: hsla(0, 0%, 100%, 0.124);
  --whiteA7: hsla(0, 0%, 100%, 0.176);
  --whiteA8: hsla(0, 0%, 100%, 0.249);
  --whiteA9: hsla(0, 0%, 100%, 0.386);
  --whiteA10: hsla(0, 0%, 100%, 0.446);
  --whiteA11: hsla(0, 0%, 100%, 0.592);
  --whiteA12: hsla(0, 0%, 100%, 0.923);

  --amber1: hsl(39, 70%, 99%);
  --amber2: hsl(40, 100%, 96.5%);
  --amber3: hsl(44, 100%, 91.7%);
  --amber4: hsl(43, 100%, 86.8%);
  --amber5: hsl(42, 100%, 81.8%);
  --amber6: hsl(38, 99.7%, 76.3%);
  --amber7: hsl(36, 86.1%, 67.1%);
  --amber8: hsl(35, 85.2%, 55.1%);
  --amber9: hsl(39, 100%, 57%);
  --amber10: hsl(35, 100%, 55.5%);
  --amber11: hsl(30, 100%, 34%);
  --amber12: hsl(20, 80%, 17%);

  --cyan1: hsla(180, 82%, 98%, 1);
  --cyan2: hsla(180, 75%, 97%, 1);
  --cyan3: hsla(178, 78%, 93%, 1);
  --cyan4: hsla(179, 77%, 88%, 1);
  --cyan5: hsla(178, 78%, 82%, 1);
  --cyan6: hsla(178, 73%, 77%, 1);
  --cyan7: hsla(179, 65%, 72%, 1);
  --cyan8: hsla(178, 60%, 52%, 1);
  --cyan9: hsla(179, 72%, 64%, 1);
  --cyan10: hsla(178, 67%, 57%, 1);
  --cyan11: hsla(186, 78%, 33%, 1);
  --cyan12: hsla(186, 78%, 14%, 1);

  --green1: hsla(150, 100%, 98%, 1);
  --green2: hsla(152, 100%, 97%, 1);
  --green3: hsla(150, 94%, 93%, 1);
  --green4: hsla(151, 93%, 88%, 1);
  --green5: hsla(151, 93%, 82%, 1);
  --green6: hsla(151, 93%, 77%, 1);
  --green7: hsla(150, 86%, 72%, 1);
  --green8: hsla(150, 60%, 51%, 1);
  --green9: hsla(150, 80%, 64%, 1);
  --green10: hsla(150, 74%, 58%, 1);
  --green11: hsla(155, 66%, 32%, 1);
  --green12: hsla(150, 79%, 10%, 1);

  --mauve1: hsl(300, 20%, 99%);
  --mauve2: hsl(300, 7.7%, 97.5%);
  --mauve3: hsl(294, 5.5%, 95.3%);
  --mauve4: hsl(289, 4.7%, 93.3%);
  --mauve5: hsl(283, 4.4%, 91.3%);
  --mauve6: hsl(278, 4.1%, 89.1%);
  --mauve7: hsl(271, 3.9%, 86.3%);
  --mauve8: hsl(255, 3.7%, 78.8%);
  --mauve9: hsl(252, 4%, 57.3%);
  --mauve10: hsl(253, 3.5%, 53.5%);
  --mauve11: hsl(252, 4%, 44.8%);
  --mauve12: hsl(260, 25%, 11%);

  --red1: hsla(6, 100%, 98%, 1);
  --red2: hsla(8, 100%, 97%, 1);
  --red3: hsla(8, 100%, 93%, 1);
  --red4: hsla(7, 100%, 88%, 1);
  --red5: hsla(8, 100%, 82%, 1);
  --red6: hsla(7, 100%, 77%, 1);
  --red7: hsla(8, 99%, 72%, 1);
  --red8: hsla(8, 65%, 57%, 1);
  --red9: hsla(7, 90%, 69%, 1);
  --red10: hsla(7, 81%, 65%, 1);
  --red11: hsla(8, 100%, 33%, 1);
  --red12: hsla(7, 95%, 15%, 1);

  --sand1: hsl(50, 20%, 99%);
  --sand2: hsl(60, 7.7%, 97.5%);
  --sand3: hsl(59, 6.5%, 95.1%);
  --sand4: hsl(58, 6.1%, 92.9%);
  --sand5: hsl(57, 6%, 90.7%);
  --sand6: hsl(56, 5.9%, 88.4%);
  --sand7: hsl(55, 5.9%, 85.2%);
  --sand8: hsl(51, 6%, 77.1%);
  --sand9: hsl(50, 2%, 55.7%);
  --sand10: hsl(55, 1.7%, 51.9%);
  --sand11: hsl(50, 2%, 43.1%);
  --sand12: hsl(50, 6%, 10%);

  --violet1: hsla(248, 80%, 98%, 1);
  --violet2: hsla(245, 73%, 97%, 1);
  --violet3: hsla(245, 67%, 93%, 1);
  --violet4: hsla(244, 67%, 88%, 1);
  --violet5: hsla(245, 67%, 82%, 1);
  --violet6: hsla(245, 68%, 77%, 1);
  --violet7: hsla(245, 62%, 72%, 1);
  --violet8: hsla(250, 53%, 54%, 1);
  --violet9: hsla(245, 64%, 68%, 1);
  --viole10: hsla(246, 57%, 61%, 1);
  --violet11: hsla(241, 50%, 32%, 1);
  --violet12: hsla(244, 49%, 17%, 1);

  color: var(--sand12);
  font: var(--text-base);
`;

return <Theme>{props.children}</Theme>;
