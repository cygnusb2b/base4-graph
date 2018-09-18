const inflection = require('inflection');

const altFrom = (value) => {
  const pos = value.lastIndexOf('.');
  if (pos === -1) return value;
  const offset = value.length - pos;
  if (offset < 6) {
    const replaced = value.replace(value.substring(pos), '');
    const titleized = inflection.titleize(replaced);
    return titleized.replace(/\./g, ' ');
  }
  return value;
};

module.exports = {
  /**
   *
   */
  PlatformAssetImage: {
    src: (image, { input }) => {
      const { host, size } = input;
      const { filePath, fileName } = image;
      const file = size === 'original' ? fileName : fileName.replace(/\.png$/, '.jpg');
      return `https://${host}/${filePath}/${size}/${file}`;
    },
    alt: (image) => {
      const { caption, name, fileName } = image;
      if (name) return altFrom(name);
      if (caption) return caption;
      return altFrom(fileName);
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    platformAssetImage: async (root, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform.Asset', id, { type: 'Image' });
    },
  },
};
