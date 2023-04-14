import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../../database";

export async function getUser(request:Request,response:Response){
	const query = `
	SELECT
			*
		FROM
			users
`

const queryResult: QueryResult = await client.query(query);
 return queryResult.rows;
}