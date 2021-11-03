import { Request, Response } from 'express'

export interface IBaseController {
  delete?: (request: Request, response: Response) => Promise<unknown>
  index?: (request: Request, response: Response) => Promise<unknown>
  store?: (request: Request, response: Response) => Promise<unknown>
  show?: (request: Request, response: Response) => Promise<unknown>
  update?: (request: Request, response: Response) => Promise<unknown>
}
