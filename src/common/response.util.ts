import { ApiResponse } from './dto/response.dto';

export const successResponse = <T>(
  message: string,
  data?: T,
): ApiResponse<T> => {
  return new ApiResponse<T>(true, message, data);
};

export const errorResponse = (message: string): ApiResponse<null> => {
  return new ApiResponse<null>(false, message, null);
};
