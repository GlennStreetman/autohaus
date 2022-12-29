import { triggerStaticRegeneration } from '@sls-next/lambda-at-edge/dist/lib/triggerStaticRegeneration'
import S3 from "aws-sdk/clients/s3";

const region = process.env.defaultRegion
const siteSQS = process.env.siteSQS
const websiteBucket = process.env.bucketname
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export async function getBuildId(): Promise<string> {

    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey,
    });

    const data = function() {

        const downloadParams = {
            Key: 'BUILD_ID',
            Bucket: websiteBucket,
        };
        
        return new Promise((res)=>{

        s3.getObject(downloadParams, (err,data)=>{
            if(err) {
                console.log("get BUILD_ID Error: ", err);
            } else {
                res(data.Body.toString())
            }
        })

    })
    }
    const file = await data()
    // @ts-ignore
    return (file || '')
}

export function getPageKey(buildId: string, key: string) {
  return `${getStaticPagesPath(buildId)}/${key}.html`
}
export function getStaticPagesPath(buildId: string) {
  return `static-pages/${buildId}`
}

export function getRegenerationOptions({
  queueName,
  buildId,
  page,
  bucket,
  region,
  counter
}: {
  queueName: string
  buildId: string
  page: string
  bucket: string
  region: string
  counter: number
}) {
  return {
    basePath: '',
    pagePath: 'pages/' + (page || 'index') + '.js',
    pageS3Path: (page ?  page : 'index') + '.html',
    storeName: bucket,
    storeRegion: region,
    request: {
      uri:  (page ? "/" + page : '/'),
      origin: {
        s3: {
          region,
          domainName: `${bucket}.s3.${region}.amazonaws.com`,
          path: '/' + getStaticPagesPath(buildId)
        }
      }
    },
    eTag: Date.now() - 1000 + counter,
    lastModified: Date.now() - 1000 + counter,
    queueName
  }
}
export async function regeneratePage( rawpage: string, counter = 0) { 
    const buildId = await getBuildId()
    const page:string = rawpage.substring(1)
    const options = getRegenerationOptions({
    queueName: siteSQS,
    buildId,
    page,
    bucket: websiteBucket,
    region: region,
    counter
    })

    console.log(
        "params:", 
        {
            queueName: siteSQS,
            buildId,
            page,
            bucket: websiteBucket,
            region: region,
            counter
        },
        "returnd options", 
        options)

    await triggerStaticRegeneration(options as any)

    return true
}