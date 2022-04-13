import Banner from "../components/banner";
import Services from "../components/services";
import Why from "../components/why";

export default function Home() {
    return (
        <>
            <main>
                <section>
                    <Banner />
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
