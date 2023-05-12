import { createClient } from "contentful";
import safeJsonStringify from "safe-json-stringify";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
 })

export async function contentfulClient(contentType) {
  let Response = await client.getEntries({ content_type: contentType });
  Response = safeJsonStringify(Response);
  const data = JSON.parse(Response);

  return data;
}


