import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin-event" || req.nextUrl.pathname === '/admin-location') {
        return token?.jti != undefined && token?.jti != null;
      }
      return !!token;
    },
  },
})

export const config = { matcher: ["/admin-event", "/admin-event/:id*", "/api/:path*", "/admin-location", "/admin-location/:id*"] }