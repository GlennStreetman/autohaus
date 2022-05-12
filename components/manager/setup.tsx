import ContactInfo from "./setup/contactInfo";
import Links from "./setup/links";
import Literature from "./setup/Literature";
import BannerImage from "./setup/bannerImage";
import LogoImage from "./setup/logoImage";
import AboutImage from "./setup/aboutImage";

interface props {
    show: boolean;
}

function setup(p: props) {
    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
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
