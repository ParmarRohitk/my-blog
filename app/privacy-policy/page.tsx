// privacy-policy/page.tsx
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <head>
                <title>Privacy Policy | MovieStreamTV</title>
            </head>
            <div className='p-6 pt-[60px]'>
                <div className="min-h-screen p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                    <div className="flex justify-center mb-9 mt-6 -pt-8">
                        <div className="-max-w-4xl mx-auto space-y-10 rounded-lg p-6 md:p-12 text-md text-gray-300">

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Privacy Policy</h1>

                            {/* Introduction */}
                            <p className="text-lg md:text-xl leading-relaxed">
                                At <span className="font-semibold text-white">MovieStreamTV</span>, we respect your privacy and are committed to protecting any personal information you share with us. Here you will find information on how we collect information, how we use it, and what choices you have with regards to your information.
                            </p>

                            {/* Information We Collect */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">1. Information We Collect</h2>
                                <p>
                                    Data is gathered to better serve your experience when using our services. This may include:
                                </p>
                                <ul className="list-disc list-inside space-y-3">
                                    <li><strong className="text-white">Personal Details:</strong> Your name and email if you do not create an account but other preferences if you create an account.</li>
                                    <li><strong className="text-white">Usage Information:</strong> Information on how you use our site, including the pages you visit and the movies you watch.</li>
                                </ul>
                            </div>

                            {/* How We Use Your Information */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">2. How We Use Your Information</h2>
                                <p>
                                    We use this information to enhance the services we offer, tailor your experience, and keep you informed about updates, products, and services. Your information will not be shared or sold to third parties without your permission.
                                </p>
                            </div>

                            {/* Cookies and Tracking */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">3. Cookies and Tracking</h2>
                                <p>
                                    Cookies help us understand your preferences, thereby enhancing the website. They store your settings and adjust according to them. You can manage cookie settings in your browser.
                                </p>
                            </div>

                            {/* Security of Your Information */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">4. Security of Your Information</h2>
                                <p>
                                    We take various security measures to protect your data from unauthorized access, modification, or disclosure.
                                </p>
                            </div>

                            {/* Your Choices */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">5. Your Choices</h2>
                                <p>
                                    You can edit any information provided in the account or choose to stop receiving any emails from us. Please contact us if you need assistance with these options.
                                </p>
                            </div>

                            {/* Policy Updates */}
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">6. Policy Updates</h2>
                                <p>
                                    We may update this policy from time to time to reflect changes in our processes. We encourage you to check this page often for updates.
                                </p>
                            </div>

                            {/* Contact Us */}
                            {/* <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
                                <p>
                                    For any questions about this privacy policy, please reach out to us at
                                    <a href="mailto:support@moviestremtv.com" className="text-blue-200 underline">
                                        support@moviestremtv.com
                                    </a>.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
