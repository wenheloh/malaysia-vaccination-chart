// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const {Nuxt} = require("nuxt-start");

// Fetch injected environmental variable
const firebaseConfig = functions.config();
process.env.API_BASE_URL = firebaseConfig.ssrapp.api_base_url;
process.env.GOOGLE_MAP_API_KEY = firebaseConfig.ssrapp.google_map_api_key;

console.log("🙂 process.env.API_BASE_URL: ", process.env.API_BASE_URL);
console.log(
    "🙂 process.env.GOOGLE_MAP_API_KEY: ",
    process.env.GOOGLE_MAP_API_KEY,
);

const nuxtConfig = require("./nuxt.config.js");
const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: "nuxt",
};
const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});
