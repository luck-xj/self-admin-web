import type { EventHandlerRequest, H3Event } from 'h3';

import { setResponseStatus } from 'h3';
import crypto from 'node:crypto';

function genNonce(): string {
  return crypto.randomUUID();
}

export function useResponseSuccess<T = any>(data: T) {
  return {
    code: 0,
    message: 'ok',
    nonce: genNonce(),
    success: true,
    value: data,
  };
}

export function usePageResponseSuccess<T = any>(
  page: number | string,
  pageSize: number | string,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(
    Number.parseInt(`${page}`),
    Number.parseInt(`${pageSize}`),
    list,
  );

  return {
    ...useResponseSuccess({
      list: pageData,
      total: list.length,
    }),
    message,
  };
}

export function useResponseError(message: string) {
  return {
    code: -1,
    message,
    nonce: genNonce(),
    success: false,
    value: null,
  };
}

export function useResponseErrorWithCode(code: number, message: string) {
  return {
    code,
    message,
    nonce: genNonce(),
    success: false,
    value: null,
  };
}

export function forbiddenResponse(
  event: H3Event<EventHandlerRequest>,
  message = 'Forbidden Exception',
) {
  setResponseStatus(event, 403);
  return useResponseErrorWithCode(7, message);
}

export function unAuthorizedResponse(event: H3Event<EventHandlerRequest>) {
  setResponseStatus(event, 401);
  return useResponseErrorWithCode(16, 'token 无效或已过期');
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + Number(pageSize));
}
