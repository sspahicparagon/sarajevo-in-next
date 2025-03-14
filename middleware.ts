import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin-event" || req.nextUrl.pathname === '/admin-location' || req.nextUrl.pathname === '/admin-ad') {
        return token?.jti != undefined && token?.jti != null;
      }
      return !!token;
    },
  },
})

export const config = { matcher: [
    "/admin-event", 
    "/admin-event/:id*", 
    "/api/ad/:path*", 
    "/api/event/:path*",
    "/api/location/:path*", 
    "/admin-location", 
    "/admin-location/:id*", 
    "/admin-ad", 
    "/admin-ad/type", 
    "/admin-ad/:id*", 
    "/admin-ad/type/:id*"
  ] 
}