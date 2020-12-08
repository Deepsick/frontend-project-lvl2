import yaml from 'js-yaml';

const Format = {
  JSON: 'json',
  YML: 'yml',
  YAML: 'yaml',
};

const parse = (data, format) => {
  if (format === Format.JSON) {
    return JSON.parse(data);
  }

  if (format === Format.YAML || format === Format.YML) {
    return yaml.safeLoad(data);
  }

  throw new Error('There is no such format');
};

export default parse;
