import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

export async function verifyData(object: any) {
  const query = `
	SELECT
		*
	FROM
	    products
	WHERE name = $1 
`;

  const queryConfig: QueryConfig = {
    text: query,
    values: [object.name],
  };

  const queryResult = await client.query(queryConfig);
  return queryResult.rows;
}

export async function postData(array: any): Promise<void> {

  for (let i = 0; i < array.length; i++) {
    const len: any = await verifyData(array[i]);
    if (len.length == 0) {

      const query: string = format(
        `
			INSERT INTO products(%I) values(%L) RETURNING *
		`,
        //O format vai passar as chaves no lugar do %I
        Object.keys(array[i]),
        //O format vai passar os valores no lugar do %L
        Object.values(array[i])
      );

      //Faremos o procedimento padrão, acessando o client com query
      const queryConfig = await client.query(query);
      console.log(queryConfig);
    }
  }
}