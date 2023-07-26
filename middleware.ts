import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log({token});
      if (req.nextUrl.pathname === "/admin-event") {
        return token?.jti != undefined && token?.jti != null;
      }
      return !!token;
    },
  },
})

export const config = { matcher: ["/admin-event", "/admin-event/:id*"] }