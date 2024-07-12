import NextAuth from "next-auth" 
import authConfig from "./auth.config"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes
} from "./routes"


const {auth} = NextAuth(authConfig)


export default auth(async (req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth
  

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  console.log("apiAuthRote", isApiAuthRoute)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  console.log("isPublicRoute",isPublicRoute)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  console.log("isAuthRoute",isAuthRoute)

  if(isApiAuthRoute){
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return 
  }

  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return 
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

