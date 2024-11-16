import React from "react";

export const metadata = {
  title: "Terms of Service",

  openGraph: {
    title: "Terms of Service",
    url: `https://silaaimachines.com/terms-of-service`,
    siteName: "Silaaimachine Engineers",
  },
};

export default function termPage() {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold text-center mb-5 bg-black text-white w-full py-10 md:py-20">
        Terms Of Service
      </h1>
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <p className="text-lg font-semibold  mb-5">
          Last updated October 26, 2024
        </p>
        <h1 className="text-sm md:text-lg font-semibold  mb-5 ">
          AGREEMENT TO OUR LEGAL TERMS
        </h1>
        <p>
          We are Silaaimachine Engineers ('Company', 'we', 'us', or 'our'), a
          company registered in India at Bisra road, Near Sani mandir, Rourkele,
          Odisha 769001.{" "}
        </p>
        <br />
        <p>
          We operate the website https://silaaimachines.com (the 'Site'), as
          well as any other related products and services that refer or link to
          these legal terms (the 'Legal Terms') (collectively, the 'Services').
        </p>
        <br />
        <p>
          You can contact us by email at support@silaaimachines.com or by mail
          to Bisra road, Near Sani mandir, Rourkele, Odisha 769001, India.
        </p>
        <br />
        <p>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ('you'), and
          Silaaimachine Engineers, concerning your access to and use of the
          Services. You agree that by accessing the Services, you have read,
          understood, and agreed to be bound by all of these Legal Terms. IF YOU
          DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
          PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE
          IMMEDIATELY.
        </p>
        <br />
        <p>
          Supplemental terms and conditions or documents that may be posted on
          the Services from time to time are hereby expressly incorporated
          herein by reference. We reserve the right, in our sole discretion, to
          make changes or modifications to these Legal Terms at any time and for
          any reason. We will alert you about any changes by updating the 'Last
          updated' date of these Legal Terms, and you waive any right to receive
          specific notice of each such change. It is your responsibility to
          periodically review these Legal Terms to stay informed of updates. You
          will be subject to, and will be deemed to have been made aware of and
          to have accepted, the changes in any revised Legal Terms by your
          continued use of the Services after the date such revised Legal Terms
          are posted.
        </p>
        <br />
        <p>
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Services.
          If you are a minor, you must have your parent or guardian read and
          agree to these Legal Terms prior to you using the Services.
        </p>
        <br />
        <p>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </p>
        <br />
        <br />

        {/* Section 1: Our Services */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Our Services</h2>
          <p className=" mb-4">
            The information provided through our Services is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would violate local laws
            or regulations or subject us to any registration requirement within
            that jurisdiction or country.
          </p>
          <p className="">
            If you choose to access the Services from outside our intended
            operational locations, you do so on your own initiative and are
            solely responsible for ensuring compliance with local laws, where
            applicable.
          </p>
        </section>

        {/* Section 2: Intellectual Property Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Intellectual Property Rights
          </h2>

          {/* Subsection: Our Intellectual Property */}
          <h3 className="text-xl font-medium mb-2">
            Our Intellectual Property
          </h3>
          <p className=" mb-4">
            We own or are licensed to use all intellectual property rights
            associated with our Services. This includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside  mb-4">
            <li>Source code</li>
            <li>Databases</li>
            <li>Functionality</li>
            <li>Software</li>
            <li>Website designs</li>
            <li>
              Audio, video, text, photographs, and graphics (collectively, the
              "Content")
            </li>
          </ul>
          <p className=" mb-4">
            Additionally, the trademarks, service marks, and logos contained in
            the Services (the "Marks") are also our property or licensed to us.
            The Content and Marks are protected by copyright, trademark laws,
            and other intellectual property laws worldwide.
          </p>
          <p className=" mb-4">
            The Content and Marks are provided in or through the Services "AS
            IS" for your personal, non-commercial use or internal business
            purposes only.
          </p>

          {/* Subsection: Your Use of Our Services */}
          <h3 className="text-xl font-medium mb-2">Your Use of Our Services</h3>
          <p className=" mb-4">
            Subject to your compliance with these Legal Terms, including the
            "Prohibited Activities" section below, we grant you a non-exclusive,
            non-transferable, revocable license to:
          </p>
          <ul className="list-disc list-inside  mb-4">
            <li>Access the Services</li>
            <li>
              Download or print a copy of any portion of the Content to which
              you have properly gained access, solely for your personal,
              non-commercial use or internal business purpose.
            </li>
          </ul>
          <p className=" mb-4">
            Except as set out in this section or elsewhere in our Legal Terms,
            no part of the Services, Content, or Marks may be copied,
            reproduced, aggregated, republished, uploaded, posted, publicly
            displayed, encoded, translated, transmitted, distributed, sold,
            licensed, or otherwise exploited for any commercial purpose without
            our express prior written permission.
          </p>
          <p className=" mb-4">
            If you wish to make any use of the Services, Content, or Marks other
            than as set out in this section or elsewhere in our Legal Terms,
            please address your request to:{" "}
            <a
              href="mailto:support@silaaimachines.com"
              className="text-blue-500 underline"
            >
              support@silaaimachines.com
            </a>
            .
          </p>
          <p className=" mb-4">
            If we grant you permission to post, reproduce, or publicly display
            any part of our Services or Content, you must identify us as the
            owners or licensors of the Services, Content, or Marks and ensure
            that any copyright or proprietary notice appears or is visible on
            posting, reproducing, or displaying our Content.
          </p>
          <p className=" mb-4">
            We reserve all rights not expressly granted to you in and to the
            Services, Content, and Marks. Any breach of these Intellectual
            Property Rights will constitute a material breach of our Legal Terms
            and your right to use our Services will terminate immediately.
          </p>
        </section>
        {/* Your Submissions Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Your Submissions</h2>
          <p className=" mb-4">
            Please review this section and the "Prohibited Activities" section
            carefully prior to using our Services to understand:
          </p>
          <ul className="list-disc list-inside  mb-4">
            <li>The rights you give us when you post or upload any content.</li>
            <li>The obligations you have when using our Services.</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Submissions</h3>
          <p className=" mb-4">
            By directly sending us any question, comment, suggestion, idea,
            feedback, or other information about the Services ("Submissions"),
            you agree to assign to us all intellectual property rights in such
            Submission. You agree that:
          </p>
          <ul className="list-disc list-inside  mb-4">
            <li>
              We shall own the Submission and be entitled to its unrestricted
              use and dissemination for any lawful purpose, commercial or
              otherwise, without acknowledgment or compensation to you.
            </li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Your Responsibilities</h3>
          <p className=" mb-4">
            By sending us Submissions through any part of the Services, you:
          </p>
          <ul className="list-disc list-inside  mb-4">
            <li>
              Confirm that you have read and agree with our "Prohibited
              Activities" section and will not post, send, publish, upload, or
              transmit any Submission that is illegal, harassing, hateful,
              defamatory, obscene, or otherwise harmful or inappropriate.
            </li>
            <li>
              To the extent permitted by applicable law, waive any and all moral
              rights to such Submissions.
            </li>
            <li>
              Warrant that the Submissions are original to you or that you have
              the necessary rights and licenses to submit them.
            </li>
            <li>
              Represent that the Submissions do not contain any confidential
              information.
            </li>
          </ul>
          <p className="">
            You are solely responsible for your Submissions and expressly agree
            to reimburse us for any losses we may incur as a result of your
            breach of:
          </p>
          <ul className="list-disc list-inside ">
            <li>This section.</li>
            <li>Any third party’s intellectual property rights.</li>
            <li>Applicable law.</li>
          </ul>
        </section>

        {/* User Representations Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">User Representations</h2>
          <p className=" mb-4">
            By using the Services, you represent and warrant that:
          </p>
          <ul className="list-decimal list-inside  mb-4">
            <li>
              All registration information you submit will be true, accurate,
              current, and complete.
            </li>
            <li>
              You will maintain the accuracy of such information and promptly
              update it as necessary.
            </li>
            <li>
              You have the legal capacity and agree to comply with these Legal
              Terms.
            </li>
            <li>
              You are not a minor in the jurisdiction where you reside, or, if a
              minor, you have received parental permission to use the Services.
            </li>
            <li>
              You will not access the Services through automated or non-human
              means, whether through a bot, script, or otherwise.
            </li>
            <li>
              You will not use the Services for any illegal or unauthorized
              purpose.
            </li>
            <li>
              Your use of the Services will not violate any applicable law or
              regulation.
            </li>
          </ul>
          <p className="">
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Services (or any portion thereof).
          </p>
        </section>
        {/* User Registration Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
          <p className="">
            You may be required to register to use the Services. You agree to
            keep your password confidential and will be responsible for all use
            of your account and password. We reserve the right to remove,
            reclaim, or change a username you select if we determine, in our
            sole discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </p>
        </section>

        {/* Products Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <p className="">
            We make every effort to display as accurately as possible the
            colours, features, specifications, and details of the products
            available on the Services. However, we do not guarantee that the
            colours, features, specifications, and details of the products will
            be accurate, complete, reliable, current, or free of other errors,
            and your electronic display may not accurately reflect the actual
            colours and details of the products.
          </p>
          <p className="">
            All products are subject to availability, and we cannot guarantee
            that items will be in stock. We reserve the right to discontinue any
            products at any time for any reason. Prices for all products are
            subject to change.
          </p>
        </section>

        {/* Purchases and Payment Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Purchases and Payment</h2>
          <p className=" mb-4">We accept the following forms of payment:</p>
          <ul className="list-disc list-inside  mb-4">
            <li>Visa</li>
            <li>Mastercard</li>
            <li>UPI</li>
            <li>RUPAY</li>
          </ul>
          <p className=" mb-4">
            You agree to provide current, complete, and accurate purchase and
            account information for all purchases made via the Services. You
            further agree to promptly update account and payment information,
            including email address, payment method, and payment card expiration
            date, so that we can complete your transactions and contact you as
            needed.
          </p>
          <p className=" mb-4">
            Sales tax will be added to the price of purchases as deemed required
            by us. We may change prices at any time. All payments shall be in
            Indian Rupees.
          </p>
          <p className=" mb-4">
            You agree to pay all charges at the prices then in effect for your
            purchases and any applicable shipping fees, and you authorise us to
            charge your chosen payment provider for any such amounts upon
            placing your order. We reserve the right to correct any errors or
            mistakes in pricing, even if we have already requested or received
            payment.
          </p>
          <p className="">
            We reserve the right to refuse any order placed through the
            Services. We may, in our sole discretion, limit or cancel quantities
            purchased per person, per household, or per order. These
            restrictions may include orders placed by or under the same customer
            account, the same payment method, and/or orders that use the same
            billing or shipping address. We reserve the right to limit or
            prohibit orders that, in our sole judgement, appear to be placed by
            dealers, resellers, or distributors.
          </p>
        </section>

        {/* Return Policy Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="">
            Please review our Return Policy posted on the Services prior to
            making any purchases.
          </p>
        </section>

        {/* Prohibited Activities Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
          <p className=" mb-4">
            You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used in connection with any commercial endeavours except those
            that are specifically endorsed or approved by us.
          </p>
          <p className=" mb-4">As a user of the Services, you agree not to:</p>
          <ul className="list-disc list-inside  space-y-2">
            <li>
              Systematically retrieve data or other content from the Services to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related
              features of the Services.
            </li>
            <li>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Services.
            </li>
            <li>
              Use any information obtained from the Services in order to harass,
              abuse, or harm another person.
            </li>
            <li>
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </li>
            <li>
              Use the Services in a manner inconsistent with any applicable laws
              or regulations.
            </li>
            <li>
              Engage in unauthorised framing of or linking to the Services.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material that interferes with the use and
              enjoyment of the Services.
            </li>
            <li>
              Engage in any automated use of the system, such as using scripts
              or bots.
            </li>
            <li>
              Delete the copyright or other proprietary rights notice from any
              Content.
            </li>
            <li>
              Attempt to impersonate another user or person or use the username
              of another user.
            </li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Services
              or the networks or services connected to the Services.
            </li>
            <li>
              Use the Services as part of any effort to compete with us or for
              any revenue-generating endeavour or commercial enterprise.
            </li>
          </ul>
        </section>

        {/* User Generated Contributions Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            User Generated Contributions
          </h2>
          <p className=" mb-4">
            The Services does not offer users to submit or post content. We may
            provide you with the opportunity to create, submit, post, display,
            transmit, perform, publish, distribute, or broadcast content and
            materials to us or on the Services (collectively, "Contributions").
            Contributions may be viewable by other users and through third-party
            websites. As such, any Contributions you transmit may be treated in
            accordance with the Services' Privacy Policy.
          </p>
          <p className=" mb-4">
            When you create or make available any Contributions, you thereby
            represent and warrant that:
          </p>
          <ul className="list-disc list-inside  space-y-2">
            <li>
              The creation, distribution, transmission, public display, or
              performance, and the accessing, downloading, or copying of your
              Contributions do not and will not infringe any third-party rights.
            </li>
            <li>
              You are the creator and owner of or have the necessary licences,
              rights, consents, and permissions to use your Contributions.
            </li>
            <li>
              You have written consent, release, and/or permission of each
              identifiable individual person in your Contributions.
            </li>
            <li>
              Your Contributions are not false, inaccurate, or misleading.
            </li>
            <li>
              Your Contributions are not unsolicited advertising, promotional
              materials, spam, or other forms of solicitation.
            </li>
            <li>
              Your Contributions are not obscene, lewd, violent, harassing,
              libellous, or otherwise objectionable.
            </li>
            <li>
              Your Contributions do not violate any applicable law or
              regulation, including child protection laws.
            </li>
            <li>
              Your Contributions do not ridicule, mock, disparage, intimidate,
              or abuse anyone.
            </li>
            <li>
              Your Contributions do not include offensive comments connected to
              race, national origin, gender, sexual preference, or physical
              handicap.
            </li>
          </ul>
          <p className=" mt-4">
            Any use of the Services in violation of the foregoing violates these
            Legal Terms and may result in termination or suspension of your
            rights to use the Services.
          </p>
        </section>

        <section className="mb-10">
          {" "}
          <h1 className="text-2xl font-semibold mb-4">CONTRIBUTION LICENCE</h1>
          <p>
            You and Services agree that we may access, store, process, and use
            any information and personal data that you provide following the
            terms of the <a>Privacy Policy</a>
            and your choices (including settings).
          </p>
          <p>
            By submitting suggestions or other feedback regarding the Services,
            you agree that we can use and share such feedback for any purpose
            without compensation to you.
          </p>
          <p>
            We do not assert any ownership over your Contributions. You retain
            full ownership of all of your Contributions and any intellectual
            property rights or other proprietary rights associated with your
            Contributions. We are not liable for any statements or
            representations in your Contributions provided by you in any area on
            the Services.
          </p>
          <p>
            You are solely responsible for your Contributions to the Services
            and you expressly agree to exonerate us from any and all
            responsibility and to refrain from any legal action against us
            regarding your Contributions.
          </p>
        </section>
        <br />
        <section className="mb-10">
          {" "}
          <h1 className="text-2xl font-semibold mb-4">
            THIRD-PARTY WEBSITES AND CONTENT
          </h1>
          <p>
            The Services may contain (or you may be sent via the Site) links to
            other websites ('Third-Party Websites') as well as articles,
            photographs, text, graphics, pictures, designs, music, sound, video,
            information, applications, software, and other content or items
            belonging to or originating from third parties ('Third-Party
            Content'). Such Third-Party Websites and Third-Party Content are not
            investigated, monitored, or checked for accuracy, appropriateness,
            or completeness by us, and we are not responsible for any
            Third-Party Websites accessed through the Services or any
            Third-Party Content posted on, available through, or installed from
            the Services, including the content, accuracy, offensiveness,
            opinions, reliability, privacy practices, or other policies of or
            contained in the Third-Party Websites or the Third-Party Content.
            Inclusion of, linking to, or permitting the use or installation of
            any Third-Party Websites or any Third-Party Content does not imply
            approval or endorsement thereof by us. If you decide to leave the
            Services and access the Third-Party Websites or to use or install
            any Third-Party Content, you do so at your own risk, and you should
            be aware these Legal Terms no longer govern. You should review the
            applicable terms and policies, including privacy and data gathering
            practices, of any website to which you navigate from the Services or
            relating to any applications you use or install from the Services.
            Any purchases you make through Third-Party Websites will be through
            other websites and from other companies, and we take no
            responsibility whatsoever in relation to such purchases which are
            exclusively between you and the applicable third party. You agree
            and acknowledge that we do not endorse the products or services
            offered on Third-Party Websites and you shall hold us blameless from
            any harm caused by your purchase of such products or services.
            Additionally, you shall hold us blameless from any losses sustained
            by you or harm caused to you relating to or resulting in any way
            from any Third-Party Content or any contact with Third-Party
            Websites.
          </p>
          <br />
          <section className="mb-10">
            {""}
            <h1 className="text-2xl font-semibold mb-4">ADVERTISERS</h1>
            <p>
              We allow advertisers to display their advertisements and other
              information in certain areas of the Services, such as sidebar
              advertisements or banner advertisements. We simply provide the
              space to place such advertisements, and we have no other
              relationship with advertisers.
            </p>
          </section>
          <section className="mb-10">
            {/* Section for "Services Management" */}
            <h1 className="text-2xl font-semibold mb-4">SERVICES MANAGEMENT</h1>
            <p className="text-base ">
              We reserve the right, but not the obligation, to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ">
              <li>
                (1) monitor the Services for violations of these Legal Terms;
              </li>
              <li>
                (2) take appropriate legal action against anyone who, in our
                sole discretion, violates the law or these Legal Terms,
                including without limitation, reporting such user to law
                enforcement authorities;
              </li>
              <li>
                (3) in our sole discretion and without limitation, refuse,
                restrict access to, limit the availability of, or disable (to
                the extent technologically feasible) any of your Contributions
                or any portion thereof;
              </li>
              <li>
                (4) in our sole discretion and without limitation, notice, or
                liability, to remove from the Services or otherwise disable all
                files and content that are excessive in size or are in any way
                burdensome to our systems;
              </li>
              <li>
                (5) otherwise manage the Services in a manner designed to
                protect our rights and property and to facilitate the proper
                functioning of the Services.
              </li>
            </ul>

            {/* Section for "Privacy Policy" */}
            <h1 className="text-2xl font-semibold mt-8 mb-4">PRIVACY POLICY</h1>
            <p className="text-base ">
              We care about data privacy and security. Please review our Privacy
              Policy:{" "}
              <a
                href="https://silaaimachines.com/privacy-policy"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://silaaimachines.com/privacy-policy
              </a>
              . By using the Services, you agree to be bound by our Privacy
              Policy, which is incorporated into these Legal Terms. Please be
              advised the Services are hosted in India. If you access the
              Services from any other region of the world with laws or other
              requirements governing personal data collection, use, or
              disclosure that differ from applicable laws in India, then through
              your continued use of the Services, you are transferring your data
              to India, and you expressly consent to have your data transferred
              to and processed in India.
            </p>
          </section>
          <h1 className="text-2xl font-semibold mb-6">TERM AND TERMINATION</h1>
          <ul className="list-disc pl-5 space-y-3 ">
            <li>
              These Legal Terms shall remain in full force and effect while you
              use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
              LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
              WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE
              SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON
              FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR
              BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
              THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
              TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR
              ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY
              TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </li>
            <li>
              If we terminate or suspend your account for any reason, you are
              prohibited from registering and creating a new account under your
              name, a fake or borrowed name, or the name of any third party,
              even if you may be acting on behalf of the third party. In
              addition to terminating or suspending your account, we reserve the
              right to take appropriate legal action, including without
              limitation pursuing civil, criminal, and injunctive redress.
            </li>
          </ul>
          <h1 className="text-2xl font-semibold mt-8 mb-6">
            MODIFICATIONS AND INTERRUPTIONS
          </h1>
          <p className="text-base  leading-relaxed">
            We reserve the right to change, modify, or remove the contents of
            the Services at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Services. We also reserve the right to modify or
            discontinue all or part of the Services without notice at any time.
            We will not be liable to you or any third party for any
            modification, price change, suspension, or discontinuance of the
            Services.
          </p>
          <p className="text-base  leading-relaxed mt-4">
            We cannot guarantee the Services will be available at all times. We
            may experience hardware, software, or other problems or need to
            perform maintenance related to the Services, resulting in
            interruptions, delays, or errors. We reserve the right to change,
            revise, update, suspend, discontinue, or otherwise modify the
            Services at any time or for any reason without notice to you. You
            agree that we have no liability whatsoever for any loss, damage, or
            inconvenience caused by your inability to access or use the Services
            during any downtime or discontinuance of the Services. Nothing in
            these Legal Terms will be construed to obligate us to maintain and
            support the Services or to supply any corrections, updates, or
            releases in connection therewith.
          </p>
          <h1 className="text-2xl font-semibold mt-8 mb-6">GOVERNING LAW</h1>
          <p className="text-base  leading-relaxed">
            These Legal Terms shall be governed by and defined following the
            laws of India. Silaaimachine Engineers and yourself irrevocably
            consent that the courts of India shall have exclusive jurisdiction
            to resolve any dispute which may arise in connection with these
            Legal Terms.
          </p>
          <h1 className="text-2xl font-semibold mt-8 mb-6">
            DISPUTE RESOLUTION
          </h1>
          <h2 className="text-xl font-semibold mb-4">Informal Negotiations</h2>
          <p className="text-base  leading-relaxed">
            To expedite resolution and control the cost of any dispute,
            controversy, or claim related to these Legal Terms (each a 'Dispute'
            and collectively, the 'Disputes') brought by either you or us
            (individually, a 'Party' and collectively, the 'Parties'), the
            Parties agree to first attempt to negotiate any Dispute (except
            those Disputes expressly provided below) informally for at least 15
            days before initiating arbitration. Such informal negotiations
            commence upon written notice from one Party to the other Party.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Binding Arbitration
          </h2>
          <p className="text-base  leading-relaxed">
            Any dispute arising out of or in connection with these Legal Terms,
            including any question regarding its existence, validity, or
            termination, shall be referred to and finally resolved by the
            International Commercial Arbitration Court under the European
            Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146)
            according to the Rules of this ICAC, which, as a result of referring
            to it, is considered as part of this clause. The number of
            arbitrators shall be three. The seat, or legal place, of arbitration
            shall be India. The language of the proceedings shall be English.
            The governing law of these Legal Terms shall be the substantive law
            of India.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Restrictions</h2>
          <p>
            The Parties agree that any arbitration shall be limited to the
            Dispute between the Parties individually. To the full extent
            permitted by law, (a) no arbitration shall be joined with any other
            proceeding; (b) there is no right or authority for any Dispute to be
            arbitrated on a class-action basis or to utilise class action
            procedures; and (c) there is no right or authority for any Dispute
            to be brought in a purported representative capacity on behalf of
            the general public or any other persons.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Exceptions to Informal Negotiations and Arbitration
          </h2>
          <p>
            The Parties agree that the following Disputes are not subject to the
            above provisions concerning informal negotiations binding
            arbitration: (a) any Disputes seeking to enforce or protect, or
            concerning the validity of, any of the intellectual property rights
            of a Party; (b) any Dispute related to, or arising from, allegations
            of theft, piracy, invasion of privacy, or unauthorised use; and (c)
            any claim for injunctive relief. If this provision is found to be
            illegal or unenforceable, then neither Party will elect to arbitrate
            any Dispute falling within that portion of this provision found to
            be illegal or unenforceable and such Dispute shall be decided by a
            court of competent jurisdiction within the courts listed for
            jurisdiction above, and the Parties agree to submit to the personal
            jurisdiction of that court.
          </p>
          <h1 className="text-2xl font-semibold mt-6 mb-4"> CORRECTIONS</h1>
          <p>
            There may be information on the Services that contains typographical
            errors, inaccuracies, or omissions, including descriptions, pricing,
            availability, and various other information. We reserve the right to
            correct any errors, inaccuracies, or omissions and to change or
            update the information on the Services at any time, without prior
            notice.
          </p>
        </section>
        <section className="space-y-8">
          {/* Disclaimer Section */}
          <h1 className="text-2xl font-semibold mt-6 mb-4">DISCLAIMER</h1>
          <p className="text-base  leading-relaxed">
            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
            AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO
            THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
            EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE
            THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF
            ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
            WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY:
          </p>
          <ul className="list-disc pl-6 space-y-2 ">
            <li>Errors, mistakes, or inaccuracies of content and materials;</li>
            <li>
              Personal injury or property damage resulting from your access to
              and use of the Services;
            </li>
            <li>
              Unauthorized access to or use of our secure servers and/or any
              personal or financial information stored therein;
            </li>
            <li>
              Interruption or cessation of transmission to or from the Services;
            </li>
            <li>
              Bugs, viruses, Trojan horses, or the like which may be transmitted
              to or through the Services by any third party;
            </li>
            <li>
              Errors or omissions in any content and materials or any loss or
              damage incurred as a result of using any content posted,
              transmitted, or made available via the Services.
            </li>
          </ul>
          <p className="text-base  leading-relaxed mt-6 mb-4">
            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR
            ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY
            THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR
            MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING. WE
            WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING
            ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF
            PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE
            THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
            JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
          </p>

          {/* Limitations of Liability */}
          <h1 className="text-2xl font-semibold  mb-6">
            LIMITATIONS OF LIABILITY
          </h1>
          <p className="text-base  leading-relaxed">
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
            PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
            YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE
            CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE
            WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
            TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO
            US OR 1000. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT
            ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR
            LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR
            ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU,
            AND YOU MAY HAVE ADDITIONAL RIGHTS.
          </p>

          {/* Indemnification */}
          <h1 className="text-2xl font-semibold  mb-6">INDEMNIFICATION</h1>
          <p className="text-base  leading-relaxed">
            You agree to defend, indemnify, and hold us harmless, including our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, from and against any loss, damage,
            liability, claim, or demand, including reasonable attorneys’ fees
            and expenses, made by any third party due to or arising out of:
          </p>
          <ul className="list-disc pl-6 space-y-2 ">
            <li>Use of the Services;</li>
            <li>Breaching these Legal Terms;</li>
            <li>
              Any breach of your representations and warranties set forth in
              these Legal Terms;
            </li>
            <li>
              Your violation of the rights of a third party, including but not
              limited to intellectual property rights;
            </li>
            <li>
              Any overt harmful act toward any other user of the Services with
              whom you connected via the Services.
            </li>
          </ul>
          <p className="text-base  leading-relaxed mt-4">
            Notwithstanding the foregoing, we reserve the right, at your
            expense, to assume the exclusive defense and control of any matter
            for which you are required to indemnify us, and you agree to
            cooperate, at your expense, with our defense of such claims. We will
            use reasonable efforts to notify you of any such claim, action, or
            proceeding which is subject to this indemnification upon becoming
            aware of it.
          </p>

          {/* User Data */}
          <h1 className="text-2xl font-semibold  mb-6">USER DATA</h1>
          <p className="text-base  leading-relaxed">
            We will maintain certain data that you transmit to the Services for
            the purpose of managing the performance of the Services, as well as
            data relating to your use of the Services. Although we perform
            regular routine backups of data, you are solely responsible for all
            data that you transmit or that relates to any activity you have
            undertaken using the Services. You agree that we shall have no
            liability to you for any loss or corruption of any such data, and
            you hereby waive any right of action against us arising from any
            such loss or corruption of such data.
          </p>

          {/* Electronic Communications, Transactions, and Signatures */}
          <h1 className="text-2xl font-semibold  mb-6">
            ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </h1>
          <p className="text-base  leading-relaxed">
            Visiting the Services, sending us emails, and completing online
            forms constitute electronic communications. You consent to receive
            electronic communications, and you agree that all agreements,
            notices, disclosures, and other communications we provide to you
            electronically, via email and on the Services, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
            SERVICES. You hereby waive any rights or requirements under any
            statutes, regulations, rules, ordinances, or other laws in any
            jurisdiction which require an original signature or delivery or
            retention of non-electronic records, or to payments or the granting
            of credits by any means other than electronic means.
          </p>
        </section>
        <section className="space-y-6">
          {/* SMS Text Messaging Section */}
          <h1 className="text-2xl font-semibold  mb-6 mt-4">
            SMS TEXT MESSAGING
          </h1>

          {/* Opting Out */}
          <h2 className="text-xl font-semibold  mb-4">Opting Out</h2>
          <p className="text-base  leading-relaxed">
            If at any time you wish to stop receiving SMS messages from us,
            simply reply to the text with "STOP.” You may receive an SMS message
            confirming your opt out.
          </p>

          {/* Message and Data Rates */}
          <h2 className="text-xl font-semibold  mb-4">
            Message and Data Rates
          </h2>
          <p className="text-base  leading-relaxed">
            Please be aware that message and data rates may apply to any SMS
            messages sent or received. The rates are determined by your carrier
            and the specifics of your mobile plan.
          </p>

          {/* Support */}
          <h2 className="text-xl font-semibold  mb-4">Support</h2>
          <p className="text-base  leading-relaxed">
            If you have any questions or need assistance regarding our SMS
            communications, please email us at{" "}
            <a
              href="mailto:support@silaaimachines.com"
              className="text-blue-600 hover:text-blue-800"
            >
              support@silaaimachines.com
            </a>
            .
          </p>

          {/* Miscellaneous Section */}
          <h1 className="text-2xl font-semibold  mb-6">MISCELLANEOUS</h1>
          <p className="text-base  leading-relaxed">
            These Legal Terms and any policies or operating rules posted by us
            on the Services or in respect to the Services constitute the entire
            agreement and understanding between you and us. Our failure to
            exercise or enforce any right or provision of these Legal Terms
            shall not operate as a waiver of such right or provision. These
            Legal Terms operate to the fullest extent permissible by law. We may
            assign any or all of our rights and obligations to others at any
            time. We shall not be responsible or liable for any loss, damage,
            delay, or failure to act caused by any cause beyond our reasonable
            control. If any provision or part of a provision of these Legal
            Terms is determined to be unlawful, void, or unenforceable, that
            provision or part of the provision is deemed severable from these
            Legal Terms and does not affect the validity and enforceability of
            any remaining provisions. There is no joint venture, partnership,
            employment or agency relationship created between you and us as a
            result of these Legal Terms or use of the Services. You agree that
            these Legal Terms will not be construed against us by virtue of
            having drafted them. You hereby waive any and all defenses you may
            have based on the electronic form of these Legal Terms and the lack
            of signing by the parties hereto to execute these Legal Terms.
          </p>

          {/* Contact Us Section */}
          <h1 className="text-2xl font-semibold  mb-6">CONTACT US</h1>
          <p className="text-base  leading-relaxed">
            In order to resolve a complaint regarding the Services or to receive
            further information regarding the use of the Services, please
            contact us at:
          </p>
          <address className="text-base  leading-relaxed">
            Silaaimachine Engineers <br />
            Bisra road <br />
            Near Sani mandir <br />
            Rourkela, Odisha 769001 <br />
            India
          </address>
          <p className="text-base  leading-relaxed">
            Email:{" "}
            <a
              href="mailto:support@silaaimachines.com"
              className="text-blue-600 hover:text-blue-800"
            >
              support@silaaimachines.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
