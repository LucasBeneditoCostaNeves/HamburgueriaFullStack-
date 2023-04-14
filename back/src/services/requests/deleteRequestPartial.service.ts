import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/config";

//Capturando todos os produtos da DataBase
export async function deleteRequestUserPartial(
  request: Request,
  response: Response
) {
  const id = request.user.id;
  const name = request.body.name;

  const query = `
  DELETE FROM requests
  WHERE id = (
    SELECT id FROM requests
    WHERE name = $1 AND id = $2
    ORDER BY id ASC
    LIMIT 1
  );
`;

  const queryConfig = {
    text: query,
    values: [name, id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  response.status(200).send(queryResult.rows);
}
