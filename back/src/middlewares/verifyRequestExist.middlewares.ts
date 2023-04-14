import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";

export async function verifyRequestExist(body:any){
    console.log(body)
    const query = `
	SELECT
		*
	FROM
        requests
    WHERE id = $1 AND name = $2
`

    const queryConfig = {
        text: query,
        values: [body.id,body.name]
    }

    const queryResult: QueryResult = await client.query(queryConfig);
    return queryResult
}