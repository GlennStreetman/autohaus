import { getAllServices } from "../strapiAPI/getAllServices"



function generateSiteMap(links) {

  console.log(links, console.log(process.env.NEXT_PUBLIC_URL))

  const mapLinks = links.map((el) => {
      return `
    <url>
        <loc>${`${process.env.NEXT_PUBLIC_URL}${el}`}</loc>
    </url>
  `;
    })
    .join('')

    const payload = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${mapLinks}
    </urlset>
  `;

  return payload
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const thisService: string[] = await getAllServices() 

  const allLinks = ["/", "/about", "service", "/contact", "/calendar", ...thisService]
  const sitemap = generateSiteMap(allLinks);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;