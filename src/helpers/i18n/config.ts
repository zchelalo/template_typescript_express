import i18n from 'i18next'
import FsBackend, { FsBackendOptions } from 'i18next-fs-backend'
import path from 'path'
import { fileURLToPath } from 'url'

await i18n
  .use(FsBackend)
  .init<FsBackendOptions>({
    backend: {
      loadPath: path.join(path.dirname(fileURLToPath(import.meta.url)), 'langs', '{{lng}}', '{{ns}}.json'),
    },

    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'es'],

    ns: ['validations'],
    defaultNS: 'validations'
  })

export { i18n }