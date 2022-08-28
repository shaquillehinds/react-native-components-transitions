interface Config {
  mode: 'staging' | 'dev' | 'prod';
  version: string;
}

const DEVEOPMENT: Config = {
  mode: 'dev',
  version: 'dev',
};

const STAGING: Config = {
  mode: 'staging',
  version: 'staging',
};

const PRODUCTION: Config = {
  mode: 'prod',
  version: '0.1',
};

export default STAGING;
