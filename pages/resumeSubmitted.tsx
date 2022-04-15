import Banner from "../components/banner";
import Why from "../components/why";

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4  text-white p-2"; //1x

function Thankyou() {
    return (
        <>
            {/* height="h-72" */}
            <Banner>
                <></>
            </Banner>
            <div className="grid grid-row grid-cols-12 p-1 bg-black">
                <div className={gutter}></div>
                <div className={body}>
                    {" "}
                    Thank you for reaching out! <br />
                    <br />
                    We have saved a copy of your resume. <br />
                    <br />
                    We will reach out next time we find an open possition that your skills match. <br />
                    <br />
                    -- The Autohaus team
                </div>
                <div className={gutter}></div>
            </div>
            <Why />
        </>
    );
}

export default Thankyou;
