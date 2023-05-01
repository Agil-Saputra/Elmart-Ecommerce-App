import { createClient } from 'contentful'
import safeJsonStringify from "safe-json-stringify";

async function contentfulClient (contentType) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
   })
    
      let Response = await client.getEntries({content_type : contentType})
      Response = safeJsonStringify(Response)
      const data = JSON.parse(Response);

      return data
       
}



export default contentfulClient
  

