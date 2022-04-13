import Banner from "../components/banner_blank";
import Why from "../components/why";

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4  text-white p-2"; //1x

function Thankyou() {
    return (
        <>
            <Banner />
            <div className="grid grid-row grid-cols-12 p-1 bg-black">
                <div className={gutter}></div>
                <div className={body}>
                    {" "}
                    Thank you for reaching out! <br />
                    <br />
                    A service adviser will be contacting you within the next 2 business days to confirm an appointment and review your needs. <br />
                    <br />
                    If you have any questions, or you don't hear from us, don't hesitate to call, text, or email. <br />
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
