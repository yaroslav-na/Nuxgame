import { computed, toRef, type MaybeRefOrGetter } from 'vue'

export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS]

export function useRequestStatus(status: MaybeRefOrGetter<RequestStatus>) {
  const statusRef = toRef(status)

  return {
    isIdle: computed(() => statusRef.value === REQUEST_STATUS.IDLE),
    isLoading: computed(() => statusRef.value === REQUEST_STATUS.LOADING),
    isSuccess: computed(() => statusRef.value === REQUEST_STATUS.SUCCESS),
    isError: computed(() => statusRef.value === REQUEST_STATUS.ERROR),
  }
}
