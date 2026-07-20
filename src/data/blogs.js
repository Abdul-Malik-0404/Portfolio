export const blogs = [
  {
    id: 'securing-jeb-wso2-asgardeo',
    title: 'Securing Jeb: My Journey Integrating WSO2 Asgardeo into a Next.js & FastAPI Application',
    date: 'Jul 21, 2026',
    readTime: '4 min read',
    summary: 'A deep dive into integrating WSO2 Asgardeo as an IAM solution for a modern web app built with Next.js (App Router) and FastAPI, navigating SSR challenges along the way.',
    tags: ['Security', 'Next.js', 'FastAPI', 'WSO2 Asgardeo'],
    content: `
Building **Jeb**—an autonomous job scout and resume tailor—has been a thrilling engineering journey. But as the application grew, a critical requirement emerged: **Security**. I needed a robust Identity and Access Management (IAM) solution that was not only highly secure but also developer-friendly. Enter **WSO2 Asgardeo**.

In this post, I want to share my experience integrating WSO2 Asgardeo into a modern stack consisting of a **Next.js (App Router)** frontend and a **FastAPI** backend, including the technical hurdles I overcame along the way.

---

## Why WSO2 Asgardeo?

When evaluating IAM providers, I was looking for a few key things:
1. **Seamless Developer Experience:** I didn't want to spend weeks configuring OAuth 2.0 flows manually.
2. **Standard Protocols:** Full support for OIDC (OpenID Connect) and JWTs.
3. **Enterprise Grade:** A platform backed by industry leaders in API management.

Asgardeo checked all these boxes perfectly. They provide a fantastic React SDK (\`@asgardeo/auth-react\`) which abstracts away the heavy lifting of the PKCE authorization code flow.

## The Architecture

The architecture of Jeb is split into two main components:
- **Frontend:** Next.js using the new App Router.
- **Backend:** FastAPI (Python) interacting with a PostgreSQL database.

The goal was simple: 
1. Authenticate users on the frontend using Asgardeo.
2. Securely transmit the resulting Access Token (JWT) to the FastAPI backend.
3. Validate the token on the backend to ensure data isolation (so users only see their own job hunts and CVs).

## Challenge 1: The Next.js SSR Conundrum

The integration started incredibly smoothly. I installed \`@asgardeo/auth-react\` and wrapped my application in the \`<AuthProvider>\`. But immediately, I hit a roadblock that crashed my development server:

\`\`\`text
Runtime Error: origin is not defined
\`\`\`

**The Problem:** Next.js App Router aggressively leverages Server-Side Rendering (SSR). Even when you mark a component with \`"use client"\`, Next.js still attempts a pre-render on the Node.js server. The Asgardeo React SDK is designed for Single Page Applications (SPAs) and expects browser globals (like \`window.location.origin\`) to exist. When the Node server attempted to evaluate the module, it crashed.

**The Solution:** I needed to strictly insulate the Asgardeo SDK from the Next.js server environment. Instead of polluting my pages with dynamic imports, I created an elegant bridge:

First, I created a custom, SSR-safe React Context:
\`\`\`tsx
"use client";
import { createContext, useContext } from "react";

const defaultAuthContext = {
  state: { isAuthenticated: false, isLoading: true },
  getAccessToken: async () => "",
  signIn: () => {},
  signOut: () => {},
};
export const AuthContext = createContext<any>(defaultAuthContext);
export const useCustomAuth = () => useContext(AuthContext) || defaultAuthContext;
\`\`\`

Then, I created an \`AsgardeoProvider\` that utilizes the real SDK, and dynamically imported it into my root layout with \`{ ssr: false }\`. This component grabs the real auth state and feeds it into my custom context. 

Finally, all my pages simply import \`useCustomAuth()\` instead of \`@asgardeo/auth-react\`. Problem solved! The server renders perfectly, and Asgardeo smoothly takes over on the client side.

## Challenge 2: Securing FastAPI

With the frontend securely acquiring JWTs, the next step was locking down the backend.

In FastAPI, I implemented a custom dependency \`get_current_user\`. This function intercepts the \`Authorization: Bearer <token>\` header on every protected route. 

Instead of writing a custom authentication layer, I utilized the \`PyJWT\` and \`cryptography\` libraries to decode the token. Because Asgardeo uses asymmetric cryptography (RS256), my backend dynamically fetches my organization's **JSON Web Key Set (JWKS)** directly from Asgardeo's servers. 

\`\`\`python
# A snippet of the logic
decoded_token = jwt.decode(
    token,
    key=public_key,
    algorithms=["RS256"],
    audience=CLIENT_ID,
    issuer=ASGARDEO_ISSUER
)
\`\`\`

If the signature is valid, the token hasn't expired, and the issuer matches, FastAPI grants access and extracts the user's unique \`sub\` (subject ID). This ID is then seamlessly injected into my database models to ensure strict data isolation.

## The Result

The integration was a massive success. Clicking the "Sign In" button seamlessly redirects to Asgardeo's highly polished, secure login portal. Upon return, the frontend transparently attaches the access token to API calls, and FastAPI independently verifies the token's cryptographic signature.

Working with WSO2 Asgardeo has been a fantastic experience. It allowed me to transform Jeb from a simple prototype into a secure, multi-tenant application without having to reinvent the wheel of authentication. 

If you are building a modern web application and need a secure, developer-centric IAM platform, I highly recommend giving Asgardeo a try!
`
  }
];
