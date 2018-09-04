const { Router } = require('express');
const Base4 = require('../base4');
const db = require('../connections/base4');
const asyncRoute = require('../utils/async-route');

const router = Router();

router.get('/', asyncRoute(async (req, res) => {
  const base4 = new Base4({ db, tenantKey: 'cygnus_ofcr' });
  const runs = Number(req.query.runs) || 5;
  const { project } = req.query;

  const run = async () => {
    const start = new Date();
    const projection = !project ? {} : {
      // Typical list block projection.
      name: 1,
      teaser: 1,
      published: 1,
      'mutations.Website.primarySection': 1,
    };
    const paginated = await base4.find('platform.Content', {
      pagination: { first: 20 },
      sort: { field: 'id', order: 'desc' },
      criteria: {
        type: 'Article',
        status: 1,
      },
      projection,
    });
    await paginated.getEdges();
    const end = new Date();
    return end.valueOf() - start.valueOf();
  };
  const promises = [];
  for (let i = 0; i < runs; i += 1) {
    promises.push(run());
  }
  const timings = await Promise.all(promises);

  const total = timings.reduce((sum, ms) => {
    const v = sum + ms;
    return v;
  }, 0);
  const avg = total / runs;
  res.json({
    total,
    avg,
    timings,
  });
}));

module.exports = router;
