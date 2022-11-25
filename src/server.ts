import express from 'express';

import { AppDependencies } from './lib/di';

function serverFactory(deps: AppDependencies) {
  const { config } = deps;
  const app = express();

  const port = config.HTTP.port;

  app.get('/', (req, res) => {
    res.send('App is Running!');
  });

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}

export default serverFactory;
