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
                            <h2 className="text-3xl font-heading text-primary mb-6">Data Collection & Sources</h2>
                            <p className="mb-8">
                                To provide our high-end digital services, we may gather specific data points through your interactions with our platform:
                            </p>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-primary">Platform Analytics</h3>
                                    <p className="text-base">We monitor general engagement patterns, including page views, navigation paths, and resource utilization. This data includes traffic insights and regional location metrics.</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-primary">Voluntary Submissions</h3>
                                    <p className="text-base">Information you directly provide allows us to tailor our responses. We ensure all personal data is handled with strict adherence to our security protocols.</p>
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <h3 className="text-xl font-bold text-primary">Contact & Inquiry Data</h3>
                                    <p className="text-base">Dialogue initiated through our contact forms involves sharing essential details necessary for a transparent and professional exchange of information.</p>
                                </div>
                            </div>
                            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-sm text-primary/70">
                                <span className="font-bold uppercase tracking-wider mr-2">Financial Note:</span>
                                TheCraftSync does not store sensitive payment identifiers, credit card numbers, or banking credentials on our servers.
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-heading text-primary mb-6">Cookie Policy & Digital Tracking</h2>
                            <p className="mb-8">
                                We utilize cookies to understand your system environment and optimize your browsing experience. These small data files assist us in refining platform performance and understanding general internet usage trends. Importantly, this data is statistical and does not reveal your personal identity. You maintain full control over these settings via your browser configurations should you wish to decline data recording.
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
                            <h2 className="text-3xl font-heading mb-6">How We Utilize Your Information</h2>
                            <p className="mb-6 opacity-90">Data collected is used exclusively to facilitate and improve our service delivery. We may process your information for the following professional purposes:</p>
                            <ul className="grid gap-4 md:grid-cols-2">
                                {[
                                    'Delivering requested information regarding our products or services',
                                    'Introducing you to new solutions that align with your interests',
                                    'Notifying you of vital updates to our platform or service terms',
                                    'Providing insights based on services you have previously utilized',
                                    'Collaborating with vetted third parties with your explicit consent',
                                    'Allowing you to manage or withdraw your consent at any time'
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
                                <h2 className="text-2xl font-heading text-primary mb-4">Data Security & Storage</h2>
                                <p className="text-base">
                                    By sharing your details, you acknowledge our storage protocols. We implement rigorous measures to safeguard your data. However, as no electronic transmission is 100% secure, data sent to us is done so at the user&apos;s own discretion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Information Sharing Policy</h2>
                                <p className="text-base">
                                    TheCraftSync does not sell, lease, or trade personal data. We only share anonymized, aggregated demographic insights with trusted partners for strategic marketing and platform analysis.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">External Integrations & Links</h2>
                                <p className="text-base">
                                    Our platform may feature links to external websites. While we curate our partners, we do not control their independent privacy standards. We encourage users to verify the policies of any third-party sites they visit.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-heading text-primary mb-4">Social Widgets & Interactivity</h2>
                                <p className="text-base">
                                    Embedded social sharing tools may utilize their own cookies to identify your unique profile. These interactions are governed by the respective social media platform&apos;s privacy terms.
                                </p>
                            </section>
                        </div>

                        <section className="border-t border-border pt-12">
                            <h2 className="text-2xl font-heading text-primary mb-4">Policy Updates & Notifications</h2>
                            <p className="text-base">
                                TheCraftSync reserves the right to modify this policy as necessary. Significant changes will be noted via an updated revision date. We recommend periodic reviews to stay informed on how we protect your information.
                            </p>
                        </section>

                        <section className="bg-zinc-100 p-8 lg:p-12 rounded-3xl text-center">
                            <h2 className="text-3xl font-heading text-primary mb-6">Agreement to Terms</h2>
                            <p className="max-w-2xl mx-auto mb-0">
                                Usage of this website constitutes your explicit agreement with the terms outlined above. If you do not agree with our data practices, we respectfully ask that you refrain from using TheCraftSync&apos;s platform.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
