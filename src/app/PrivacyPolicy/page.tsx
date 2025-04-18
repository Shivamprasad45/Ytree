import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-12 mx-auto">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Introduction
          </h2>
          <p>
            Vanagrow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our application. Please read this privacy policy carefully.
            If you do not agree with the terms of this privacy policy, please do
            not access the application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us when using
            the Vanagrow application, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Account Information:</span> When you
              create an account, we collect your name, email address, password,
              and other information you choose to provide.
            </li>
            <li>
              <span className="font-medium">Profile Information:</span>{" "}
              Information you add to your profile, such as a profile picture,
              biography, preferences, and settings.
            </li>
            <li>
              <span className="font-medium">Content:</span> Information you
              provide through the application, including your inputs, uploads,
              and interactions.
            </li>
            <li>
              <span className="font-medium">Communications:</span> When you
              communicate with us directly, we may collect and store those
              communications.
            </li>
            <li>
              <span className="font-medium">Usage Data:</span> We automatically
              collect information about your interactions with our application,
              including the features you use, the time spent on the application,
              and other usage statistics.
            </li>
            <li>
              <span className="font-medium">Device Information:</span> We
              collect information about the device you use to access our
              application, including device type, operating system, unique
              device identifiers, and mobile network information.
            </li>
            <li>
              <span className="font-medium">Third-Party Integration Data:</span>{" "}
              If you connect third-party services to Vanagrow, we may collect
              information from these integrations as authorized by you.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect for various purposes, including
            to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our application and services</li>
            <li>Create and manage your account</li>
            <li>Process transactions and send related information</li>
            <li>
              Personalize your experience and deliver content relevant to your
              interests
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>
              Send you technical notices, updates, security alerts, and support
              messages
            </li>
            <li>
              Communicate with you about products, services, offers, and events
            </li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our application
            </li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and other
              illegal activities
            </li>
            <li>Protect the rights and property of Vanagrow and others</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Data Storage and Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please
            be aware that no method of transmission over the internet or
            electronic storage is 100% secure.
          </p>
          <h3 className="text-xl font-medium mt-4">Data Storage Location</h3>
          <p>
            Your data is stored on secure servers located in certified data
            centers. Depending on your location, your data may be stored and
            processed in your region, the United States, or other countries
            where our service providers maintain facilities.
          </p>
          <h3 className="text-xl font-medium mt-4">Security Measures</h3>
          <p>
            We employ industry-standard security measures to protect your data,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication requirements</li>
            <li>Regular security updates and patches</li>
            <li>Employee training on security and privacy practices</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Data Retention</h3>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. When
            determining how long to retain information, we consider the amount,
            nature, and sensitivity of the information, the potential risk of
            harm from unauthorized use or disclosure, and applicable legal
            requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Access:</span> You can request a
              copy of the personal information we hold about you.
            </li>
            <li>
              <span className="font-medium">Correction:</span> You can request
              that we correct inaccurate or incomplete information about you.
            </li>
            <li>
              <span className="font-medium">Deletion:</span> You can request
              that we delete your personal information in certain circumstances.
            </li>
            <li>
              <span className="font-medium">Restriction:</span> You can request
              that we restrict the processing of your information in certain
              circumstances.
            </li>
            <li>
              <span className="font-medium">Data Portability:</span> You can
              request a copy of your data in a structured, commonly used, and
              machine-readable format.
            </li>
            <li>
              <span className="font-medium">Objection:</span> You can object to
              our processing of your personal information in certain
              circumstances.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4">
            How to Exercise Your Rights
          </h3>
          <p>
            To exercise any of these rights, please contact us using the contact
            information provided at the end of this Privacy Policy. We will
            respond to your request within a reasonable timeframe and in
            accordance with applicable laws. We may need to verify your identity
            before fulfilling your request.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Sharing Your Information
          </h2>
          <p>
            We may share your personal information in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Service Providers:</span> We may
              share your information with third-party vendors, service
              providers, contractors, or agents who perform services for us or
              on our behalf.
            </li>
            <li>
              <span className="font-medium">Business Transfers:</span> If we are
              involved in a merger, acquisition, or sale of all or a portion of
              our assets, your information may be transferred as part of that
              transaction.
            </li>
            <li>
              <span className="font-medium">Legal Requirements:</span> We may
              disclose your information if required to do so by law or in
              response to valid requests by public authorities (e.g., a court or
              government agency).
            </li>
            <li>
              <span className="font-medium">Protection of Rights:</span> We may
              disclose your information to protect the rights, property, or
              safety of Vanagrow, our users, or others.
            </li>
            <li>
              <span className="font-medium">With Your Consent:</span> We may
              share your information with third parties when you have given us
              your consent to do so.
            </li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting the updated Privacy Policy on our application</li>
            <li>
              Sending an email to the email address associated with your account
            </li>
            <li>Providing a notification within the application</li>
          </ul>
          <p className="mt-4">
            The date the Privacy Policy was last revised is identified at the
            top of the page. You are responsible for ensuring we have an
            up-to-date email address for you and for periodically reviewing this
            Privacy Policy to check for any changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="p-4 border rounded-md bg-muted/50">
            <p>Vanagrow</p>
            <p>Email: privacy@vanagrow.com</p>
            <p>Address: 123 Privacy Lane, Data City, DC 10101</p>
          </div>
        </section>

        <div className="pt-6 border-t">
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
