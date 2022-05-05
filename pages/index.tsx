import prisma from "./../lib/prismaPool";
import Banner from "../components/banner";
import Services from "../components/services";
import Why from "../components/why";
import { service } from "../components/manager/ourServices";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased`;
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

export async function getStaticProps() {
    const services = await prisma.services.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });
    return {
        props: {
            services: services,
        },
    };
}

interface props {
    services: service[];
}

export default function Home(p: props) {
    return (
        <>
            <main>
                <section>
                    <Banner>
                        <div>
                            <div className={largeTextStyling}>Auto Haus is now open for business!</div>
                            <div className={smallTextStyling}>Located just off the 10, close to the Santa Monica Airport.</div>
                            <div className={smallTextStyling}>Santa Monica&#39;s Porsche repair and restoration specialists.</div>
                            <div className={smallTextStyling}> New, vintage, exotic, racing, if it&#39;s a Porsche, we can fix it.</div>
                        </div>
                    </Banner>
                </section>
                <section>
                    <Services services={p.services} />
                </section>
                <section>
                    <Why />
                </section>
            </main>

            <footer></footer>
        </>
    );
}
