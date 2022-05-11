import { SessionProvider } from "next-auth/react";
import Body from "../components/manager/body";
import { PublicHOC } from "../components/publicData";
import prisma from "../lib/prismaPool";

export async function getStaticProps() {
    const data = await prisma.sitesetup.findMany({});
    return {
        props: { data: data },
    };
}

function Manager() {
    return (
        <SessionProvider
            // @ts-ignore
            options={{
                staleTime: 0,
                refetchInterval: 0,
            }}
        >
            <Body />
        </SessionProvider>
    );
}

export default function Main(p) {
    return (
        <PublicHOC {...p}>
            <Manager />
        </PublicHOC>
    );
}
