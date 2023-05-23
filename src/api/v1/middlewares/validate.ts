import { Request, Response,NextFunction } from "express";
import { failureResponse } from "../utils/apiResponse";
import { type ObjectSchema } from 'joi';

export const validateSchema = (schema : ObjectSchema) => {
   return async (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     try {
        await schema.validateAsync(req.body);
       next();
     } catch (error: any) {
       return failureResponse(res,{
        message: error.message,
        status: 500,
       })
     }

}
}

