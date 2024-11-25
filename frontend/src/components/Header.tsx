import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-md bg-zinc-900/75 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img
          src={"/tunein.png"}
          alt={"Tune In Logo"}
          className="rounded-full size-8"
        />
        TuneIn
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Header;
