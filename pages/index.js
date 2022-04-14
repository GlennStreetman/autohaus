import Banner from "../components/banner";
import Services from "../components/services";
import Why from "../components/why";

const smallTextStyling = `font-heading bold text-1xl sm:text-2xl lg:text-3xl`;
const largeTextStyling = `font-heading bold text-3xl sm:text-4xl lg:text-6xl3`;

export default function Home() {
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
                    <Services />
                </section>
                <section>
                    <Why />
                </section>
            </main>

            <footer></footer>
        </>
    );
}
