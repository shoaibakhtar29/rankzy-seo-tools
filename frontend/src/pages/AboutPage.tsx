
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout
      title="About Us | ShoaibAkhtar.org - Online SEO Tools"
      description="Learn about ShoaibAkhtar.org - Online SEO Tools - your trusted resource for free SEO tools and website optimization solutions."
      keywords="about ShoaibAkhtar.org - Online SEO Tools, seo tools, free seo tools, website optimization"
    >
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About ShoaibAkhtar.org - Online SEO Tools</h1>

            <div className="prose prose-lg max-w-none">
              <p>
                ShoaibAkhtar.org - Online SEO Tools is a comprehensive platform providing free SEO tools to help website owners,
                content creators, and digital marketers improve their online presence and search engine rankings.
              </p>

              <p>
                Founded in 2023, our mission is to make professional SEO tools accessible to everyone,
                regardless of their technical expertise or budget constraints. We believe that quality
                SEO shouldn't be limited to those who can afford expensive software or services.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>

              <p>
                Our mission is to democratize SEO by providing free, high-quality tools that empower
                individuals and businesses to optimize their online presence. We are committed to:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Making SEO accessible to everyone, regardless of technical expertise</li>
                <li>Providing tools that deliver accurate and actionable insights</li>
                <li>Continuously improving our platform based on user feedback</li>
                <li>Staying current with the latest SEO best practices and algorithms</li>
                <li>Maintaining a user-friendly interface that simplifies complex SEO tasks</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose ShoaibAkhtar.org - Online SEO Tools?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">100% Free</h3>
                  <p className="text-gray-600">
                    All of our tools are completely free to use with no hidden fees, premium features,
                    or usage restrictions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">User-Friendly</h3>
                  <p className="text-gray-600">
                    Our intuitive interface makes it easy for anyone to use our tools, regardless of
                    their technical expertise.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Comprehensive</h3>
                  <p className="text-gray-600">
                    We offer a wide range of tools covering all aspects of SEO, from content optimization
                    to technical SEO.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Privacy-Focused</h3>
                  <p className="text-gray-600">
                    We respect your privacy and do not store your data or share it with third parties.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>

              <p>
                ShoaibAkhtar.org - Online SEO Tools is developed and maintained by a team of SEO experts, web developers, and
                digital marketing professionals with years of experience in the industry. We are passionate
                about helping businesses and individuals improve their online visibility and achieve their
                digital marketing goals.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>

              <p>
                We're always looking to improve our tools and services. If you have any questions,
                suggestions, or feedback, please don't hesitate to contact us at
                <a href="mailto:contact@rankreaddytools.com" className="text-seo-600 ml-1">
                  contact@rankreaddytools.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
