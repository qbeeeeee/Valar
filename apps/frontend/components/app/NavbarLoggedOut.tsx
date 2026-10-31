import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavbarLoggedOut = () => {
  return (
    <header className="sticky top-0 z-50 h-20 bg-third border-b border-first">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/welcome" className="flex items-center space-x-2.5 group">
          {/* Logo Icon - Black background, Pink letter */}
          <div className="h-9 w-9 rounded-xl bg-first flex items-center justify-center text-third font-black shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            V
          </div>
          <span className="text-lg font-bold tracking-wider text-first">
            Valar
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/sign-in"
            className="text-sm font-bold text-first transition-opacity opacity-80 hover:opacity-100"
          >
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-first hover:bg-first/80 text-third font-bold shadow-md"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarLoggedOut;
