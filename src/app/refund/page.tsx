// pages/refund.js
import Head from "next/head";

export default function Refund() {
  return (
    <div>
      <Head>
        <title>Refund Policy</title>
        <meta name="description" content="Refund Policy page" />
      </Head>
      <main className="max-w-4xl mx-auto p-6 sm:p-12">
        <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>

        <p className="mb-4">Thank you for shopping at [Your Company Name].</p>

        <p className="mb-4">
          If you are not entirely satisfied with your purchase, we`re here to
          help.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Returns</h2>
        <p className="mb-4">
          You have 2 days to return an item from the date you received it.
        </p>
        <p className="mb-4">
          To be eligible for a return, your item must be unused and in the same
          condition that you received it. Your item must be in the original
          packaging.
        </p>
        <p className="mb-4">
          Your item needs to have the receipt or proof of purchase.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Refunds</h2>
        <p className="mb-4">
          Once we receive your item, we will inspect it and notify you that we
          have received your returned item. We will immediately notify you on
          the status of your refund after inspecting the item.
        </p>
        <p className="mb-4">
          If your return is approved, we will initiate a refund to your credit
          card (or original method of payment). You will receive the credit
          within a certain amount of days, depending on your card issuer`s
          policies.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Shipping</h2>
        <p className="mb-4">
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable.
        </p>
        <p className="mb-4">
          If you receive a refund, the cost of return shipping will be deducted
          from your refund.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions on how to return your item to us, contact us
          at [your contact information].
        </p>
      </main>
    </div>
  );
}
