// This willl connect everything from sanity server
// Before writing code, we need to install new command 'npm install next-sanity'

// This code is manually wirtten in sonny sangha nextJS video 47:00
import {
    // createImageUrlBuilder,
    createCurrentUserHook,
    createClient,
} from "next-sanity";

import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    /*
      Find ur project ID and dataset in "sanity.json" in your studio project.
      These are considered "public", but you can use environment variables
      if you want differ between local dev and production 
     */
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",

    /*
        - Set useCdn to 'false' if your application require freshest possible data always. (slight slower and bit more expensive)
        - Authenticated request (like preview) will always bypass the CDN(content distributed network)
    */
    useCdn: process.env.NODE_ENV === "production",
};

// Set up the client for fetching data in getProps page functions
export const sanityClient = createClient(config);
 
// set up helper function for generating Image URLs with only asset reference data in your document.
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// After this create new file called '.env.local'. This is used to storing the environment variables such as ID etc
//  SO you need to store ur Sanity ID(sanityyoutube->sanity.json) in .env.local file

// Need to write this in .env.local file
// NEXT_PUBLIC_SANITY_DATASET = production
// NEXT_PUBLIC_SANITY_PROJECT_ID = w7zek3i2 
// This will be visible only on the api for next.js only for api routes. This means your credentials never gets leaked to the client.

// You'll get the error in 1:09:05, urlFor error. 
// For that u need to install 'npm install @sanity/image-url'
//  as well as u need to import this at top 'import createImageUrlBuilder from '@sanity/image-url''