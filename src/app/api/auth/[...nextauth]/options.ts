import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from "next-auth"

export const options: AuthOptions = {
  providers: [
    GithubProvider({
      name: "GitHub",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  //   signOut: "/logout",
  // },
}
