export type Response<T> =
  | { isSuccess: true; value: T; error: null; isAborted: false }
  | { isSuccess: false; value: null; error: string; isAborted: boolean }

const ABORTED_ERROR_MESSAGE = 'Request was aborted'

export const toSuccess = <T>(value: T): Response<T> => ({
  isSuccess: true,
  value,
  error: null,
  isAborted: false,
})

export const toError = <T>(error: string): Response<T> => ({
  isSuccess: false,
  value: null,
  error,
  isAborted: error === ABORTED_ERROR_MESSAGE,
})

export const handleRequest = async <T>(promise: Promise<T>): Promise<Response<T>> => {
  try {
    return toSuccess(await promise)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return toError(ABORTED_ERROR_MESSAGE)
    }

    return toError('An error occurred')
  }
}

export const createAbortableRequest = <T extends unknown[], R>(
  requestFunc: (abortController: AbortController, ...rest: T) => R,
) => {
  let abortController = new AbortController()

  const exec = (...params: T): R => {
    abortController.abort()
    abortController = new AbortController()

    return requestFunc(abortController, ...params)
  }

  return Object.assign(exec, {
    abort: () => abortController.abort(),
  })
}
