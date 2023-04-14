import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/config";

//Capturando todos os produtos da DataBase
export async function readRequestUser(request:Request,response:Response){
	const id = request.user.id;
	console.log(id)

	const query = `
	SELECT
		*
	FROM
		requests
	WHERE id = $1
`

const queryConfig: QueryConfig = {
	text:query,
	values:[id]
}

const queryResult: QueryResult = await client.query(queryConfig);
response.status(200).send(queryResult.rows);
}