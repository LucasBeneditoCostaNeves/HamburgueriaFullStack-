import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/config";

export async function readData(request:Request,response:Response){
	const query = `
	SELECT
			*
		FROM
			products
`

const queryResult: QueryResult = await client.query(query);
response.status(200).send(queryResult.rows);
}