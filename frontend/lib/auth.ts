import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: "job-project",
            credentials: {
                email: {
                    label: "name@email.com",
                    type: "email"
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Inside")

                try {
                    const payload = {
                        email: credentials["email"],
                        password: credentials["password"]
                    };

                    console.log("payload", payload)

                    const options = {
                        method: 'POST',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        headers: { 'Content-Type': 'application/json' },
                        data: { ...payload }
                    };

                    let resp = await axios
                        .request(options)

                    let resp_data = resp.data
                    console.log(resp_data)

                    if (resp_data.code == 200) {

                        let res = {
                            access_token: resp_data.payload.token,
                            user: {
                                email: payload.email,
                                location: resp_data.payload.location,
                            }
                        };
                        console.log("--+--+")
                        console.log(res)

                        return res;
                    }

                    return null

                } catch (error) {
                    console.log(error)
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/account/login",
        error: "/account/login"
    },
    callbacks: {
        async session({ session, token }) {

            if (token) {
                session.user.email = token.email
                session.user.access_token = token.access_token
                session.user.location = token.location
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.user.email
                token.password = user.user.password
                token.access_token = user.access_token
            }

            return token
        },
    }
}