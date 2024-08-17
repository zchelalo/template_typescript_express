import { i18n } from 'src/helpers/i18n/config'

export const translateText = (key: string): string => {
  return i18n.t(key)
}