
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedTools from "@/components/home/FeaturedTools";
import Benefits from "@/components/home/Benefits";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout
      title="ShoaibAkhtar.org - Free SEO Tools to Optimize Your Website"
      description="Access 100+ free SEO tools to improve your website's rankings, analyze content, and boost your online presence. No registration required."
      keywords="seo tools, free seo tools, website optimization, meta tag generator, keyword density, plagiarism checker"
    >
      <Hero />
      <FeaturedTools />
      <Benefits />
      <Stats />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
