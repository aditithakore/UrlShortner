const { nanoid, urlAlphabet } = require('nanoid');
const URL = require('../models/url');

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: 'URL is required' });

  const shortID = nanoid(8);
  console.log(`Generated short ID: ${shortID}`);

  const newUrl = await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  console.log('Document created:', newUrl);

  return res.json({ id: shortID });
}

async function returnToUrl(req, res) {
  const shortID = req.params.id;
  console.log(`Received request to redirect for short ID: ${shortID}`);

  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    console.error(`Short URL not found for ID: ${shortID}`);
    return res.status(404).json({ error: 'Short URL not found' });
  }

  console.log(`Redirecting to: ${entry.redirectURL}`);
  res.redirect(entry.redirectURL);
}

async function getAnalytics(req, res){
  const shortID = req.params.id;
  const result= await URL.findOne({ shortId: shortID});
  return res.json({totalClicks:result.visitHistory.length, analytic: result.visitHistory});
}
module.exports = { generateShortUrl, returnToUrl, getAnalytics };
