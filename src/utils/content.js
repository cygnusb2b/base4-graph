const striptags = require('striptags');
const isObject = require('./is-object');
const Base4 = require('../base4');

const createSeoTitle = (doc) => {
  let title = Base4.extractMutationValue(doc, 'Website', 'seoTitle');
  if (!title) title = Base4.fillMutation(doc, 'Website', 'name');
  return striptags(title || '').trim();
};

const createTitleCompany = async (doc, base4) => {
  const id = Base4.extractRefId(doc.company);
  const company = await base4.findById('website.Content', id);
  if (!company) return null;
  return createSeoTitle(company);
};

const createTitlePrimarySection = async (doc, base4) => {
  const ref = Base4.extractMutationValue(doc, 'Website', 'primarySection');
  const id = Base4.extractRefId(ref);
  const section = await base4.findById('website.Section', id);
  if (!section) return null;
  if (section.seoTitle) return section.seoTitle;
  if (section.fullName) return section.fullName;
  return section.name;
};

const createTitle = async (doc, base4) => {
  if (!isObject(doc)) return null;
  const { type } = doc;
  let title = createSeoTitle(doc);
  if (!title) return null;
  if (type !== 'Product') return title;

  const [sectionTitle, companyTitle] = await Promise.all([
    createTitlePrimarySection(doc, base4),
    createTitleCompany(doc, base4),
  ]);
  if (sectionTitle) title = `${title} in ${sectionTitle}`;
  if (companyTitle) title = `${companyTitle} ${title}`;

  return title;
};

module.exports = { createTitle };
