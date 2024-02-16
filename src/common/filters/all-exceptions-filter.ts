import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
// import { FastifyReply, FastifyRequest } from "fastify";
import { Logger } from "../logging/Logger";
import { ErrorMessages } from "../constants";

import { Request, Response } from "express"

interface customException {
  timestamp: string;
  message: string;
  httpStatus: number;
  customErrorNumber: number;
  query ?: string
  code?: string
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger: Logger;

  constructor() {
    this.logger = new Logger("HttpExceptionFilter");
  }

  catch(err: customException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const tag = request.url;
    if (!err) err = ErrorMessages.systemError.oopsSomethingWentWrong;
    if (err.query) err = ErrorMessages.systemError.dbError;
    if (err.code === "ERR_OSSL_WRONG_FINAL_BLOCK_LENGTH") err = ErrorMessages.systemError.invalidApiKey;

    const ip = request.headers["x-ip"] as string;
    
    this.logger.error(err, { tag, data: err, ctx: { ip } });
    this.logger.logRoute(request, response, { ...err });
    void response.status(err?.httpStatus ||400).send(err);
  }
}
