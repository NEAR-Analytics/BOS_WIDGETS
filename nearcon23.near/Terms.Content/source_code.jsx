const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3.5em 3.5em 4.5em;
  gap: 3em;
  background: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45%;
  gap: 2em;
  padding: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 41px;
    color: #000000;
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 170%;
    color: #000000;
  }
`;

return (
  <>
    <p>
      These NEARCON Terms and Conditions (which incorporate any other terms and
      conditions imposed by the Foundation from time to time in respect of the
      Event (as defined below)) (the “Terms”) describe the terms and conditions
      on which NEAR Stiftung (NEAR Foundation) (“Foundation”, “we”, “us” or
      “our”) offers you (“you” or “Attendee”) the opportunity to participate in
      a NEARCON and any NEARCON related events (as defined below) community
      event hosted by the Foundation (either solely or jointly with a third
      party) such as (without limitation) a quiz, “ask me anything” (AMA),
      contest, competition, speaking panel, party, conference call, or Twitter
      Space, arising out of NEARCON further details of which may be communicated
      by the Foundation from time to time (the “Event”).   The Terms govern your
      participation in the Event, grants certain rights to us and constitutes a
      legally binding agreement between you and the Foundation. By participating
      in the Event, you agree (i) to be unconditionally bound by the Terms and
      (ii) that all decisions related to the Event that are made pursuant to
      these Terms are final and binding, and that all such decisions are at the
      sole discretion of the Foundation. If you don’t agree to be bound by the
      Terms, you may not participate in the Event. 
    </p>
    <h3>Background</h3>
    <p>
      NEAR is a sharded, developer-friendly, proof-of-stake, layer one
      blockchain (“NEAR Protocol”), and a “blockchain operating system” that is
      a common layer for browsing and interacting with the “open web”
      (compatible with any blockchain) (together, "NEAR"). The Foundation aims
      to support the development, use and growth of NEAR and the NEAR Ecosystem
      (as defined below), and the Foundation is holding the Event to progress
      these goals. The Terms apply to your participation in the Event.
    </p>
    <h2>TERMS AND CONDITIONS</h2>
  </>
);
