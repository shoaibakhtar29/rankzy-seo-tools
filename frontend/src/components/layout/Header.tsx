
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-seo-800 to-seo-600 bg-clip-text text-transparent">
              ShoaibAkhtar.org - Online SEO Tools
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/tools" className="transition-colors hover:text-seo-600">
              All Tools
            </Link>
            <Link to="/blog" className="transition-colors hover:text-seo-600">
              Blog
            </Link>
            <Link to="/about" className="transition-colors hover:text-seo-600">
              About
            </Link>
            <Link to="/contact" className="transition-colors hover:text-seo-600">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-seo-600 text-seo-600 hover:bg-seo-50"
          >
            Login
          </Button>
          <Button
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-seo-700 to-seo-600 hover:from-seo-800 hover:to-seo-700"
          >
            Sign Up Free
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
