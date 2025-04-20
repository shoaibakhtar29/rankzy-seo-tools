
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-seo-800 via-seo-700 to-seo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful SEO Tools to Boost Your Website Rankings
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Access 100+ free SEO tools to optimize your content, analyze your website, 
            and improve your search engine rankings. No registration required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-seo-800 hover:bg-gray-100"
            >
              <Link to="/tools">
                Explore Tools
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg inline-block">
            <p className="text-sm font-medium">
              💡 Used by over 100,000 marketers and SEO professionals worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
