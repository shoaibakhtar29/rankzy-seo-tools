
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SEOHead from "./SEOHead";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ 
  children, 
  title = "SEO Tools - Optimize Your Website For Free", 
  description = "Free online SEO tools to help you optimize your website, improve your content, and boost your search engine rankings.",
  keywords = "seo tools, website optimization, free seo tools, keyword density, meta tag generator"
}: LayoutProps) => {
  return (
    <>
      <SEOHead title={title} description={description} keywords={keywords} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
