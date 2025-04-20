
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-seo-800 via-seo-700 to-seo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Website's SEO?</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Start using our free SEO tools today and see the difference in your website's performance and rankings.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-seo-800 hover:bg-gray-100"
        >
          <Link to="/tools">
            Get Started For Free
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
