import ContactInfo from "./setup/contactInfo";
import Links from "./setup/links";
import Literature from "./setup/Literature";
import BannerImage from "./setup/bannerImage";
import LogoImage from "./setup/logoImage";
import AboutImage from "./setup/aboutImage";
import NextLinkButton from "../nextLinkButton";

interface props {
    show: boolean;
}

function setup(p: props) {
    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            <div className="flex justify-center pb-4">
                <NextLinkButton text="Formatting Help" link="/formattingHelp" icon={<></>} newtab={true} />
            </div>
            <ContactInfo />
            <Links />
            <Literature />
            <BannerImage />
            <LogoImage />
            <AboutImage />
        </div>
    );
}

export default setup;
