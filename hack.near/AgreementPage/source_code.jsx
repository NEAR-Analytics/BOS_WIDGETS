const Container = styled.div`
  background-color: #fff;
  padding: 2em;
`;

const profile =
  context.accountId && Social.getr(`${context.accountId}/profile`);

return (
  <Container>
    <div className="m-2">
      <Widget src="hack.near/widget/profile.dao" />
    </div>
    <hr />
    <div className="m-2">
      <h3>Cooperative</h3>
      <h5>Member Agreement</h5>
      <p>
        <span>
          <i>
            <b>Last updated:</b> October 2023
          </i>
        </span>
      </p>
      <p>
        <span></span>
      </p>
      <p>
        <span>
          This Member Agreement (“Agreement”) is made effective (“Effective
          Date”) on the date that you (referred to as “you”, “your” or “Member”)
          executed it. It provides for your rights and obligations to NEAR
          Builders Cooperative, a Colorado limited cooperative association (the
          “Cooperative”).
        </span>
      </p>
      <h5>
        <span>
          <b>1. PURPOSE AND STRUCTURE OF THE COOPERATIVE</b>
        </span>
      </h5>
      <p>
        <span>High-level explanation of:</span>
      </p>
      <ul>
        <li>
          <b>Purpose:</b> NEAR Builders Cooperative connects developer
          communities around the world to share knowledge, coordinate programs,
          and learn together. Members organize various initiatives focused on
          development, education, and onboarding. The goal is to create a
          positive impact everywhere by increasing accessibility of blockchain
          technology, enhancing the quality of experience for builders, and
          cultivating successful open web applications.
        </li>
        <li>
          <b>Structure as an LCA</b>, which is owned by its members, managed by
          Admins, and with a Council that oversees the financial obligations of
          the Cooperative.
        </li>
        <li>
          Financially, the Cooperative is not intended to generate profit for
          itself, but to benefit its members and the community, by the pulled
          power of the members’ contributions.
        </li>
        <li>Democratic governance with decentralized decision making.</li>
      </ul>
      <h5>
        <span>
          <b>2. STATEMENT OF BACKGROUND INFORMATION</b>
        </span>
      </h5>
      <p>
        <span>
          This document is intended to guide the relationship between the Member
          and the Cooperative in their shared purpose of improving their
          businesses through the Cooperative services.
        </span>
      </p>
      <p>
        <span>
          Once this Agreement is executed by both parties, you will be accepted
          by the board of directors of the Cooperative (“Council”) to become a
          Member of the Cooperative, as defined in the Articles of Organization
          filed with the Secretary of State of Colorado, as amended from time to
          time (“Articles”), Bylaws of the Cooperative, as amended from time to
          time (“Bylaws”), and the Charter. You are encouraged to become
          familiar with these documents; they are incorporated in this Agreement
          by reference.
        </span>
      </p>
      <p>
        <span>
          As a Member, you will be issued one membership interest subject to the
          terms and conditions, rights and obligations contained in the Articles
          of Organization, the Bylaws of the Cooperative, the Charter, and this
          Agreement.
        </span>
      </p>
      <p>
        <span>
          When accessing specific services via the Platform, other terms and
          conditions may apply (&ldquo;Third Party Terms&rdquo;) and you are
          solely responsible for reviewing, understanding and adhering to those
          Third Party Terms.
        </span>
      </p>
      <h5>
        <span>
          <b>3. AGREEMENTS OF THE MEMBER</b>
        </span>
      </h5>
      <p>
        <span>By becoming a Member, you agree to:</span>
      </p>
      <ul>
        <li>
          Help the Cooperative to fulfill its purpose, and to abide by the
          values adopted by the Cooperative and its Members.
        </li>
        <li>
          Pay for membership as set in the Bylaws, if a membership fee is
          required, and periodically updated by the Council.
        </li>
        <li>
          Participate in Cooperative governance functions and responsibilities
          (like voting and engaging with working groups), patronize the
          Cooperative, and remain in good standing as a member. Patronizing the
          Cooperative means you will provide a number of at least eight hours of
          contribution to the Cooperative, by collaborating with projects,
          participating in decisions about the membership class, certain
          governance decisions, as provided for in the Bylaws of the
          Cooperative, and other decisions put to a vote of the members,
          including concerning retroactive compensation. The Cooperative may
          adopt other policies specifying the activities that are considered
          patronage and you will receive notice of those before being obligated
          to engage in such activities.
        </li>
        <li>
          Agree to be bound by Cooperative’s Bylaws and the Articles, the
          Charter and other policies of the Cooperative, and you are aware that
          you can request a copy of the Bylaws.
        </li>
        <li>
          Agree to keep all financial and proprietary information about the
          Cooperative or its Members private and confidential, and not to use it
          without permission even after termination of your membership.
        </li>
      </ul>
      <p>
        <span>
          The Cooperative intends to operate equitably, creating opportunities
          for the members to receive equitable distributions of benefits, and to
          participate in decentralized decision-making. As part of this process,
          we believe that we must reach a number of understandings, described
          below:
        </span>
      </p>
      <ul>
        <li>
          Understand that your membership is not transferable – so you cannot
          transfer it to another person, but the Cooperative may agree to buy it
          back from you. Your membership is also redeemable, which means that
          you are entitled to reimbursement of the membership fee that you paid,
          if any was paid, should you decide to no longer be a member in the
          Cooperative.
        </li>
        <li>
          Understand that the benefits of your membership can be modified by the
          Council and management of the Cooperative at any time, without prior
          notice; however, the Council may not eliminate your financial rights
          and terminate your membership if you are a member in good standing. In
          case of changes to your benefits, the Cooperative will make such
          information available through its website, app, or another technology
          that gives you proper notice, and you accept the use of the
          Cooperative’s technology for these purposes. Future potential
          financial distributions related to your Cooperative membership cannot
          be taken away by the Council.
        </li>
        <li>
          Understand that the Cooperative will engage in fair and decentralized
          decision making, which means you will always have an opportunity to
          share your perspective, feedback, and advice for decisions which
          impact you. Additionally, the Cooperative will make major decisions,
          which impact most members, through a combination of proposals and off
          and on-chain voting, and the Member has the responsibility to work
          with the proposers to improve the proposals.
        </li>
        <li>
          Understand that the Cooperative will engage in fast and fair conflict
          resolution, as provided by the policies of the Cooperative and the
          Charter to find resolution.
        </li>
        <li>
          Understand that in case of dissolution of the Cooperative, or other
          occasion for extraordinary dividends to be paid to Cooperative
          members, you may be entitled to some financial distributions that
          could result in a taxable event that you have a responsibility to
          claim on your tax returns.
        </li>
        <li>
          Understand that, as a Cooperative Member, you have no authority to
          represent the Cooperative in any way. For example, you cannot use the
          name of the Cooperative to obtain credit, or enter into contracts on
          behalf of the Cooperative.
        </li>
        <li>
          Understand that the Cooperative may put a lien on your membership to
          satisfy your financial obligations to the Cooperative; however, you
          may not require that the Cooperative offset any debts or claims that
          you owe to the Cooperative against any amounts that the Cooperative
          may owe to you.
        </li>
        <li>
          Understand that the Council and its representatives and the Admins
          have the authority to enforce the terms of this Agreement.
        </li>
        <li>
          Understand that the Cooperative’s Council or a vote of the Members may
          result in your termination if you fail to fulfil your obligations to
          the Cooperative. You acknowledge that you have access to the Bylaws
          describing the situations where this may happen and the procedure to
          be followed.
        </li>
      </ul>
      <h5>
        <span>
          <b>4. INAPPLICABILITY OF THE AGREEMENT TO CERTAIN SITUATIONS</b>
        </span>
      </h5>
      <p>
        <span>
          This Agreement does not apply in the event of a merger, consolidation,
          sale of assets, or dissolution of the Cooperative. In these cases, the
          provisions of the Bylaws will apply.
        </span>
      </p>
      <h5>
        <span>
          <b>5. MISCELLANEOUS</b>
        </span>
      </h5>
      <ul>
        <li>
          <b>Indemnification.</b> The Member agrees to indemnify, defend, and
          hold harmless the Cooperative, its directors, officers, employees, and
          agents, and their respective successors and assigns, from and against
          any and all damages, liabilities, losses, costs, expenses,
          obligations, claims, suits, judgments, settlements, and demands
          (including reasonable attorneys' fees and costs), incurred or suffered
          by the Cooperative as a result of or arising from: (a) any breach of
          this Agreement by the Member, including any representation or warranty
          made by the Member herein; (b) any act or omission by the Member in
          connection with the Member's participation in the Cooperative; (c) any
          negligence or wilful misconduct by the Member, or its officers,
          employees, agents, affiliates, or representatives, in connection with
          the Member's performance under this Agreement; or (d) any violation of
          any law or regulation by the Member. The Member's obligations under
          this section shall survive any termination or expiration of this
          Agreement.
        </li>
        <li>
          <b>Limitation of Liability.</b> The Cooperative is not responsible for
          any losses or damages that happen because of the Member's membership
          and the Member’s use of information that is beyond the Cooperative's
          control. The Cooperative is not liable for any damages that arise from
          the Member's membership, their use of the Cooperative's services, or
          third-party services, or their Affiliated Parties, or the Member’s
          engagement with the Cooperative ecosystem. The Cooperative's total
          liability to the Member is limited to the membership price, if one was
          required, plus any patronage dividends that were declared but not yet
          paid to the Member at the time of the claim of liability. If none was
          declared, then the total liability is limited to $100 USD or the
          equivalent in stablecoin of the country where the member is based.
        </li>
        <li>
          <b>Specific Enforcement.</b> If either party violates this agreement,
          the other party can ask a court to stop them (an injunctive relief).
          This is in addition to other legal remedies. Both parties agree that
          paying money may not be enough to address the claim.
        </li>
        <li>
          <b>Additional Documentation Required.</b> All parties must sign any
          additional documents that the Cooperative decides that are necessary
          to fulfil this Agreement and the Member’s obligations to the
          Cooperative.
        </li>
        <li>
          <b>Term and Termination.</b> This Agreement lasts for as long as the
          Member is a Member in the Cooperative; and termination of the Member
          is regulated by the Bylaws.
        </li>
        <li>
          <b>Entire Agreement:</b> This Agreement contains all of the details of
          the parties' agreement and supersedes any previous negotiations or
          agreements, written or oral, about the matters in this document. This
          Agreement can only be changed in writing by the Cooperative and all
          Members. If any part of this Agreement is illegal or unenforceable, it
          won't affect the rest of the Agreement. Both parties intend this
          Agreement to be binding and to bind their heirs, legal
          representatives, successors, and assigns, for as long as there is a
          membership relationship between them.
        </li>
        <li>
          The laws of the State of Colorado will govern this Agreement, and the
          parties agree that the venue for enforcement of this Agreement will be
          in the U.S. jurisdiction against whom any claims are brought under
          this Agreement.
        </li>
        <li>
          You and the Cooperative agree that, in the event that (i) a dispute
          arises between you and the Cooperative concerning this Membership
          Agreement, and any other agreements between you and the Cooperative,
          and (ii) if we are unable to resolve the dispute through discussion,
          we agree to submit that dispute to mediation and the dispute
          resolution mechanism indicated in the Charter and other policies of
          the Cooperative, before the dispute is arbitrated or taken to court.
          In any event, you agree to and by signing this Agreement you do WAIVE
          ANY RIGHT TO A JURY.
        </li>
      </ul>
      <br />
      <h3>
        <span>Feedback Welcome</span>
      </h3>
      <hr />
      <p>
        <span>
          All comments, questions, and other communications regarding this
          Agreement should be directed to:{" "}
        </span>
        <span>
          <a
            style={{ color: "#000", textDecoration: "none" }}
            href="mailto:support@nearbuilders.org"
          >
            support@nearbuilders.org
          </a>
        </span>
      </p>

      <div className="m-2">
        {profile ? (
          <span>
            <a
              style={{ color: "#000", textDecoration: "none" }}
              href={`https://www.nearbuilders.org/buildhub.near/widget/app?page=profile&accountId=${context.accountId}`}
            >
              <Widget
                src="hack.near/widget/profile.builder"
                props={{ accountId: context.accountId }}
              />
            </a>
          </span>
        ) : (
          <span>
            {context.accountId && (
              <a
                className="m-2 btn btn-sm btn-light"
                href="/near/widget/ProfileEditor"
              >
                Edit Profile
              </a>
            )}
          </span>
        )}
      </div>
    </div>
  </Container>
);
