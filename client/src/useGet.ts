import useSWR, { SWRResponse } from 'swr'
import type { HttpError } from './error'

export function useGet<T>(url: string | null): SWRResponse<T, HttpError> {
  return useSWR<T, HttpError>(url)
}