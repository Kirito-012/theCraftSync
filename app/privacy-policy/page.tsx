'use client';

import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 lg:px-12 font-descriptive">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl lg:text-7xl font-heading text-primary mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto opacity-20"></div>
                    </div>
                    
                    <div className="space-y-12 text-foreground/80 leading-relaxed text-lg">
                        <section className="text-center max-w-3xl mx-auto">
                            <p className="text-xl md:text-2xl font-medium text-primary/90 mb-6">
                                At <span className="font-black">TheCraftSync</span>, we are dedicated to shielding and preserving the privacy of our clients and visitors.
                            </p>
                            <p>
                                This statement aims to provide a detailed overview of how TheCraftSync will use and process your personal data. Please note that by visiting, seeing, and using thecraftsync.com, you accept our policy, terms & conditions, and practices mentioned in this Privacy Policy page.
                            </p>
                            <p className="mt-4">
                                This Privacy Policy explains how we utilize the personal information you provide or collect from you while you visit our website. Also, we periodically update this policy page, and we encourage you to review it regularly for any changes.
                            </p>
                        </section>

                        <section className="bg-white p-8 lg:p-12 rounded-3xl border border-border shadow-sm">
                            <h2 className="text-3xl font-heading text-primary mb-6">Information that we collect from you</h2>
                            <p className="mb-8">
                                While visiting our website, we may collect and process the below mentioned information about you:
                            </p>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-primary">Why you are visiting our website?</h3>
                                    <p className="text-base">This involves collecting information about your visits, including the pages you viewed and the resources you accessed. This information encompasses traffic data, communication data, and location data.</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-primary">Information Voluntarily Shared By You</h3>
                                    <p className="text-base">Your voluntarily provided data is an essential component of our personalized service, guaranteeing that your data is handled securely in compliance with our privacy policies.</p>
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <h3 className="text-xl font-bold text-primary">Data That You Provide While You Contact Us</h3>
                                    <p className="text-base">Your communication with us encompasses sharing essential data and fostering a transparent exchange of information that is treated with utmost confidentiality and in compliance with our privacy standards.</p>
                                </div>
                            </div>
                            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-sm text-primary/70">
                                <span className="font-bold uppercase tracking-wider mr-2">Note:</span>
                                We DO NOT save any payment details, including your financial details, credit card, or bank account details while processing any kind of payment.
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-heading text-primary mb-6">Use of cookies</h2>
                            <p className="mb-8">
                                Cookies provide information regarding the operating system used by a visitor. We may use cookies to gather data about your system so that it can assist us in enhancing our website. By using the cookie feature, we may also collect information about general Internet use. As we said earlier, the information we save will not identify you personally. It&apos;s just statistical data and does not identify any personal details whatsoever. If you don&apos;t want us to save your data, you can adjust the settings on your computer to decline the cookies if you wish.
                            </p>
                            
                            <div className="grid gap-6 md:grid-cols-2">
                                {[
                                    {
                                        title: 'Technical Cookies',
                                        desc: 'These cookies manage functions like logging in, filling out forms, and modifying privacy settings necessary for optimal website functionality. Certain site features may not display and perform properly if your browser is set to block these cookies.'
                                    },
                                    {
                                        title: 'Customization Cookies',
                                        desc: 'These cookies help us improve website personalization and functionality, whether established by us or third-party providers. If you disable these cookies, some services on our pages might not work as intended, impacting your customized experience.'
                                    },
                                    {
                                        title: 'Behavioral Advertising Cookies',
                                        desc: 'These cookies are used to build a user profile for targeted advertising on other websites set by our advertising partners. If you reject these cookies, you might see less tailored advertisements when you browse the internet.'
                                    },
                                    {
                                        title: 'Performance Cookies',
                                        desc: 'These cookies allow us to measure and enhance the performance of our site by tracking the number of visits and traffic sources. If you disable these cookies, it will prevent us from tracking your site visits and improve the website\'s performance as a whole.'
                                    }
                                ].map((cookie, i) => (
                                    <div key={i} className="p-8 bg-white rounded-2xl border border-border hover:shadow-md transition-all duration-300">
                                        <h4 className="font-bold text-lg text-primary mb-3">{cookie.title}</h4>
                                        <p className="text-sm leading-relaxed">{cookie.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-primary text-white p-8 lg:p-12 rounded-3xl">
                            <h2 className="text-3xl font-heading mb-6">Use of the Information That We Collect</h2>
                            <p className="mb-6 opacity-90">We just use the data we collect from you to provide you with our services. Additionally, we may use the information for one or more of the below-mentioned purposes:</p>
                            <ul className="grid gap-4 md:grid-cols-2">
                                {[
                                    'To quickly provide you the glance of information that you requested from us related to our products or services',
                                    'To help you provide the information related to other products that may interest you',
                                    'To notify you of the changes to our website, services, and products',
                                    'We may also send you the information and details of our products or services if you have previously availed any of them',
                                    'With your prior consent, we may permit the chosen third parties to use your information',
                                    'You have the option to withdraw your consent at any time'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start p-4 bg-white/10 rounded-xl">
                                        <span className="text-xl">✓</span>
                                        <span className="text-sm opacity-90">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="grid gap-12 md:grid-cols-2">
                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Saving your personal information</h2>
                                <p className="text-base">
                                    By providing your personal information, you agree to this access. We do our best to ensure that all the required steps are taken to save your data securely. Unfortunately, the information you send online is not fully secure and can be intercepted easily.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Disclosing your data</h2>
                                <p className="text-base">
                                    We do not sell, trade, or rent our end-users&apos; personal or identity information to third parties. We may share generic aggregated information with our trusted affiliates, business partners, and advertisers for marketing purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Third-Party Links</h2>
                                <p className="text-base">
                                    Sometimes, we may include links to third parties on the website. This does not mean we endorse or approve our site’s policy towards visitor privacy. It is imperative that users independently evaluate these third-party websites&apos; privacy policies.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Embedded Sharing Widgets</h2>
                                <p className="text-base">
                                    Certain pages might have widgets or embedded share buttons. We advise you to be aware that these social media platforms might use cookies that could allow them to identify you uniquely.
                                </p>
                            </section>
                        </div>

                        <section className="border-t border-border pt-12">
                            <h2 className="text-2xl font-heading text-primary mb-4">Amendments to this privacy policy</h2>
                            <p className="text-base">
                                We hold the right to update this privacy policy anytime, and any amendments will be reflected by revising the updated date on the page. We encourage users to check the page frequently for any changes so that they can stay informed about the steps we are taking to protect the personal information that we collect.
                            </p>
                        </section>

                        <section className="bg-zinc-100 p-8 lg:p-12 rounded-3xl text-center">
                            <h2 className="text-3xl font-heading text-primary mb-6">Your Acceptance</h2>
                            <p className="max-w-2xl mx-auto mb-0">
                                If you are using our website, you signify your acceptance of this privacy policy. And, if you don&apos;t agree to the policy, please do not use TheCraftSync&apos;s site. Your continued use of TheCraftSync&apos;s site following the sharing of changes to this privacy policy will be deemed as your acceptance of those updates and changes.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
