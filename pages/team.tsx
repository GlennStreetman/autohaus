import prisma from "../lib/prismaPool";
import Image from "next/image";
import Banner from "../components/banner";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const gutterBlack = " hidden lg:block lg:col-span-1 bg-black"; //2x
const employees = "      p-2 col-span-12 md:col-span-12 lg:col-span-10"; //1x
const employeesBlack = " p-2 col-span-12 md:col-span-12 lg:col-span-10 bg-black text-white"; //1x
const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-left m-2 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-right m-2 ";
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

interface employees {
    id: number;
    name: string;
    title: string;
    descrition: string;
    filename: string; //file name
    orderNumber: string;
}

interface props {
    // children: JSX.Element;
    // image: string;
    // black: boolean;
    // name: string;
    // title: string;
    employees: employees[];
}

export async function getStaticProps() {
    const employees = await prisma.team.findMany({
        orderBy: [
            {
                orderNumber: "asc",
            },
        ],
    });
    return {
        props: {
            employees,
        },
        // revalidate: 10,
    };
}

// function isOdd(n) {
//     return Math.abs(n % 2) === 1;
// }

function isOddOrEven(n, length) {
    // console.log("is odd or even");
    if (Math.abs(length % 2) === 1) {
        // console.log("odd length", length, "n", n, Math.abs(n % 2) === 1);
        return Math.abs(n % 2) !== 1;
    } else {
        // console.log("even length", length, "n", n, Math.abs(n % 2) === 1);
        return Math.abs(n % 2) === 1;
    }
}

function why(p: props) {
    const employeeCount = Object.keys(p.employees).length;
    const mapEmployees = Object.values(p.employees).map((val, indx) => {
        const myLoader = () => {
            return `${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${val.filename}`;
        };
        return (
            <section>
                <div className="grid grid-cols-12">
                    <div className={isOddOrEven(indx, employeeCount) ? gutter : gutterBlack} />
                    <div className={isOddOrEven(indx, employeeCount) ? employees : employeesBlack}>
                        <div className={isOddOrEven(indx, employeeCount) ? imgBoxLeft : imgBoxRight}>
                            {/* <img src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${val.filename}`} /> */}
                            <Image loader={myLoader} src={val.name} alt={val.name} layout="fill" objectFit="fill" priority />
                        </div>
                        <div className="text-3xl font-bold">{`${val.name}: ${val.title}`}</div>
                        <div className="whitespace-pre-line">{val.descrition}</div>
                    </div>
                    <div className={isOddOrEven(indx, employeeCount) ? gutter : gutterBlack} />
                </div>
            </section>
        );
    });

    return (
        <>
            <Banner>
                <div className={largeTextStyling}>Meet the Auto Haus Team</div>
            </Banner>
            <div className="flex flex-col">{mapEmployees}</div>
        </>
    );
}

export default why;
