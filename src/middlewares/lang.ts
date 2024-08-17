import { Request, Response, NextFunction } from 'express'
import { i18n } from 'src/helpers/i18n/config'

export const changeLanguage = (req: Request, res: Response, next: NextFunction) => {
  const lang = req.header('Accept-Language')
  if (lang) {
    i18n.changeLanguage(lang, err => {
      if (err) {
        console.error(err)
      }
    })
  }
  next()
}