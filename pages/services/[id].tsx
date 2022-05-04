// export async function getStaticProps({ params }) {
//     const allPostsData = getSortedPostsData();
//     const filteredPosts = allPostsData.reduce((prev, curr) => {
//         if (curr.project === params.id) {
//             prev.push(curr);
//         }
//         return prev;
//     }, []);
//     return {
//         props: {
//             ...projectRegister[params.id],
//             filteredPosts,
//         },
//     };
// }

// export async function getStaticPaths() {
//     const paths = getAllProjectIds();
//     return {
//         paths,
//         fallback: false,
//     };
// }

import React from "react";

function ID() {
    return <div>test</div>;
}

export default ID;

//DB
//service table
//id
//service name
//banner image
//banner text

//servicesection table
//id
//fkey
//section image {optional}
//section text
//order

//API
//getService <--remember to fire rerender
//postService  <--remember to fire rerender

//pages
//slug
// /manager/services
