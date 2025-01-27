import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function PrivacyPolicy() {
  return (
    <>
      <div className="mx-auto max-w-4xl p-6 text-gray-300">
        <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="mb-6 text-lg">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and
          protect your information when you use our website.
        </p>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect the following types of information when you use our website:
          </p>
          <ul className="ml-6 list-disc">
            <li>Personal information you provide, such as your name and email address.</li>
            <li>Usage data, including your IP address, browser type, and pages visited.</li>
            <li>Cookies and tracking technologies to improve your experience.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="ml-6 list-disc">
            <li>Provide and maintain our services.</li>
            <li>Improve the functionality and user experience of our website.</li>
            <li>Send updates, promotional content, or respond to your inquiries.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">3. How We Protect Your Information</h2>
          <p className="mb-4">
            We implement industry-standard security measures to safeguard your information. However,
            no method of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">4. Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell or rent your personal information. We may share your information with
            third-party service providers only when necessary to operate our website or provide our
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="ml-6 list-disc">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of receiving promotional emails.</li>
            <li>Contact us with any privacy-related questions or concerns.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">6. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We encourage you to review it
            periodically for any changes.
          </p>
        </section>
      </div>
    </>
  )
}
