import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database/config";

export async function deleteRequestFull(request:Request,response:Response){
    const id = request.user.id

        console.log(request)
    const query = `
    DELETE FROM requests WHERE id = $1 AND name = $2
    `;
    //Usamos queryConfig para passar o id sem interpolação
    const queryConfig: QueryConfig = {
      text: query,
      values: [id, request.body.name],
    };

    //Fazendo o comando
    await client.query(queryConfig);
    response.status(204).send();
}