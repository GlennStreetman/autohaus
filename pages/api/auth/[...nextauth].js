import NextAuth from "next-auth";
// import { getSession } from "next-auth/react";
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import PrismaClient from "./../../../lib/prismaPool";
import EmailProvider from "next-auth/providers/email";

// import EmailProvider from "next-auth/providers/email";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import SlackProvider from "next-auth/providers/slack";
// import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const prisma = PrismaClient;

// const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
// const cookiePrefix = useSecureCookies ? "__Secure-" : "";
// const hostName = new URL(process.env.NEXTAUTH_URL).hostname;
// console.log('HOST NAME----------------', hostName, useSecureCookies)

export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },

    debug: process.env.DEBUG,
});

/*
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
      
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    // */
// FacebookProvider({
//   clientId: process.env.FACEBOOK_ID,
//   clientSecret: process.env.FACEBOOK_SECRET,
// }),

// GoogleProvider({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_SECRET,
// }),
// GithubProvider({
//     clientId: process.env.GITHUB_ID,
//     clientSecret: process.env.GITHUB_SECRET,
//     // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
// }),
// SlackProvider({
//     clientId: process.env.SLACK_CLIENT_ID,
//     clientSecret: process.env.SLACK_CLIENT_SECRET,
// }),

// TwitterProvider({
//   clientId: process.env.TWITTER_ID,
//   clientSecret: process.env.TWITTER_SECRET,
// }),
// Auth0Provider({
//   clientId: process.env.AUTH0_ID,
//   clientSecret: process.env.AUTH0_SECRET,
//   issuer: process.env.AUTH0_ISSUER,
// }),
// ],
// The secret should be set to a reasonably long random string.
// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
// a separate secret is defined explicitly for encrypting the JWT.

// cookies: {
//     sessionToken: {
//         name: `${cookiePrefix}next-auth.session-token`,
//         options: {
//             httpOnly: true,
//             sameSite: "lax",
//             path: "/",
//             secure: useSecureCookies,
//             domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
//         },
//     },
// },

// JSON Web tokens are only used for sessions if the `jwt: true` session
// option is set - or by default if no database is specified.
// https://next-auth.js.org/configuration/options#jwt
// jwt: {
//     // You can define your own encode/decode functions for signing and encryption
//     // if you want to override the default behaviour.
//     // encode: async ({ secret, token, maxAge }) => {},
//     // decode: async ({ secret, token, maxAge }) => {},
// },

// You can define custom pages to override the built-in ones. These will be regular Next.js pages
// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
// The routes shown here are the default URLs that will be used when a custom
// pages is not specified for that route.
// https://next-auth.js.org/configuration/pages
// pages: {
//     signIn: "/login", // Displays signin buttons
//     // signOut: '/auth/signout', // Displays form with sign out button
//     // error: '/auth/error', // Error code passed in query string as ?error=
//     // verifyRequest: '/auth/verify-request', // Used for check email page
//     // newUser: null // If set, new users will be directed here on first sign in
// },

// Callbacks are asynchronous functions you can use to control what happens
// when an action is performed.
// https://next-auth.js.org/configuration/callbacks
// callbacks: {
//     // async signIn({ user, account, profile, email, credentials }) {
//     //     console.log("--signin called--", user);
//     //     // const session = await getSession();
//     //     // console.log("session", session);
//     //     return true;
//     //     // return `/login?email=${user.email}`;
//     // },
//     // async redirect({ url, baseUrl }) {
//     //     console.log("--redirect called--", url);
//     //     return baseUrl;
//     // },
//     // async session({ session, token, user }) {
//     //     console.log("--Session CALLED--", session, "--user--", user, "--token--", token);
//     //     return session;
//     // },
//     // async jwt({ token, user, account, profile, isNewUser }) {
//     //     console.log("--JWT CALLED--", "--user--", user, "--account--", account, "--profile--", profile, "email", email, "creds", credentials);
//     //     return token;
//     // },
// },

// Events are useful for logging
// https://next-auth.js.org/configuration/events
// events: {},

// You can set the theme to 'light', 'dark' or use 'auto' to default to the
// whatever prefers-color-scheme is set to in the browser. Default is 'auto'
// theme: {
//     colorScheme: "light",
// },

// Enable debug messages in the console if you are having problems
