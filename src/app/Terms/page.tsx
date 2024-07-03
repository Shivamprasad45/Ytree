// pages/terms.js
import Head from "next/head";

export default function Terms() {
  return (
    <div>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions page" />
      </Head>
      <main className="max-w-4xl mx-auto p-6 sm:p-12">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

        <p className="mb-4">Welcome to Our Plant Selling Website!</p>

        <p className="mb-4">
          These terms and conditions outline the rules and regulations for the
          use of our Website.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">1. Terms</h2>
        <p className="mb-4">
          By accessing this Website, you agree to be bound by these Website
          Terms and Conditions of Use and agree that you are responsible for
          compliance with any applicable local laws. If you disagree with any of
          these terms, you are prohibited from accessing this site.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the
          materials on our Website for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license, you may not:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Modify or copy the materials;</li>
          <li>
            Use the materials for any commercial purpose or for any public
            display;
          </li>
          <li>
            Attempt to reverse engineer any software contained on our Website;
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li>
            Transfer the materials to another person or ``mirror`` the materials
            on any other server.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on our Website are provided ``as is``. We make no
          warranties, expressed or implied, and hereby disclaim and negate all
          other warranties, including without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of
          rights.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Limitations</h2>
        <p className="mb-4">
          In no event shall we or our suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption) arising out of the use or inability to
          use the materials on our Website, even if we or an authorized
          representative has been notified orally or in writing of the
          possibility of such damage.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          5. Revisions and Errata
        </h2>
        <p className="mb-4">
          The materials appearing on our Website could include technical,
          typographical, or photographic errors. We do not warrant that any of
          the materials on our Website are accurate, complete, or current. We
          may make changes to the materials contained on our Website at any time
          without notice.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">6. Links</h2>
        <p className="mb-4">
          We have not reviewed all of the sites linked to our Website and are
          not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by us. Use of any
          such linked website is at the user`s own risk.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          7. Site Terms of Use Modifications
        </h2>
        <p className="mb-4">
          We may revise these Terms of Use for our Website at any time without
          notice. By using this Website, you are agreeing to be bound by the
          then current version of these Terms and Conditions of Use.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">8. Your Privacy</h2>
        <p className="mb-4">Please read our Privacy Policy.</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          Any claim related to our Website shall be governed by the laws of our
          country without regard to its conflict of law provisions.
        </p>
      </main>
    </div>
  );
}
