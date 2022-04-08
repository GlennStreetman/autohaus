import Topper from "../components/topper";
import Logo from "../components/logo";
import Banner from "../components/banner";
import Services from "../components/services";
import Why from "../components/why";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            <Logo />
            <Topper />
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
        </div>
    );
}
