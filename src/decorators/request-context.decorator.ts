import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {Request , Response} from "express"

export interface IReqCtx {
  ip: string;
}

export const ReqCtx = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IReqCtx => {
    const request: Request = ctx.switchToHttp().getRequest();
    const ip = request.headers["x-ip"] as string;

    return { ip };
  }
);

export const emptyCtx = (): IReqCtx => ({ ip: "" });
