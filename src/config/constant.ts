export enum HTTP_STATUS {
  SUCCESS = 200,
  SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  PAYMENT_REQUIRED = 402,
  CREATED = 201,
  CONFLICT = 409,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum UserStatus {
  INACTIVE,
  ACTIVE,
}

export enum ProductType {
  SEED = 1,
  FERTILIZER = 2,
}
