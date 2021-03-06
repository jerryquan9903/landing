
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    images: {
      upload: 'local',
      local: {
        storagePath: 'public/images',
        baseUrl: '/images'
      }
    },
    files: {
      upload: 'local',
      local: {
        storagePath: 'public/files',
        baseUrl: '/files',
      },
    },
    lists,
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    session,
  })
);
