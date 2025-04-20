
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout
      title="Page Not Found - RankReadyTools"
      description="The page you're looking for doesn't exist."
    >
      <div className="py-20 text-center">
        <h1 className="text-6xl font-bold text-seo-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-seo-600 text-white rounded-md hover:bg-seo-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
