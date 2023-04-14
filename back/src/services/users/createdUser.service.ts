import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/config";
import { AppError } from "../../error";
import { schemaUserRegister } from "../../schemas/user.schemas";

export async function createUser(req: Request, res: Response) {
  const body : any = req.body;
  
  const validateRequestBody = schemaUserRegister.parse(body)
    
  const queryUserExist :string = `
    SELECT
        * 
    FROM 
        users
    WHERE email = $1
    `

  const queryConfigExist :QueryConfig = {
    text:queryUserExist,
    values:[body.email]
  }

  const queryResultExist: QueryResult = await client.query(queryConfigExist)

  if(queryResultExist.rowCount > 0){
    throw new AppError('User already exists', 409)
  }

  const query = format(
    `
            INSERT INTO 
                users(%I)
            values(%L)
                RETURNING id,name,email,admin;
        `,
    Object.keys(validateRequestBody),
    Object.values(validateRequestBody)
  );

  const queryResult: QueryResult = await client.query(query);
  return queryResult.rows[0];
}