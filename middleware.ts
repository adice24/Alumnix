import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;

      // Public routes
      if (
        pathname === "/" ||
        pathname.startsWith("/auth") ||
        pathname === "/admin/login" ||
        pathname.startsWith("/api/auth")
      ) {
        return true;
      }

      // Require login
      if (!token) return false;

      // Admin gating
      if (pathname.startsWith("/admin")) {
        return (token as any)?.role === "ADMIN";
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/gigs/:path*",
    "/events/:path*",
    "/feed/:path*",
    "/network/:path*",
    "/applications/:path*",
    "/profile/:path*",
    "/notifications/:path*",
    "/admin/:path*",
  ],
};

