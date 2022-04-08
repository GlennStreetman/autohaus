import Topper from "../components/topper";
import Logo from "../components/logo";
import Banner from "../components/banner";
import Services from "../components/services";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            <Logo />
            <Topper />
            <main>
                <Banner />
                <Services />
            </main>

            <footer></footer>
        </div>
    );
}
