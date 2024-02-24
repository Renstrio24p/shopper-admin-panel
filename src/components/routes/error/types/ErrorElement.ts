import { ErrorResponse } from "react-router-dom";

export interface RouteError extends ErrorResponse {
    message: string
  }