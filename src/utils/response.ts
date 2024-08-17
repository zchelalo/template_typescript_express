import { Meta } from "src/helpers/meta"

type Data = string | object

export interface SuccessResponse {
  status: number
  message: string
  data: Data | null
  meta: Meta | null
}

export interface ErrorResponse {
  status: number
  message: string
  details: object | null
}