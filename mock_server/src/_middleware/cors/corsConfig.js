const cors = require('cors');

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

exports.corsConfig = cors({
  origin: CORS_ORIGIN
});