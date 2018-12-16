import ApiError from "./ApiError";

class ApiResponse<T> {
  code: number;
  error?: ApiError;
  payload: T;

  constructor(
    code: number,
    payload: T,
    error?: ApiError,
  ) {
    this.code = code;
    this.payload = payload;
    this.error = error;
  }
}

export default ApiResponse;
