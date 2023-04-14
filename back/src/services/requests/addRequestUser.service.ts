import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database/config";
import { verifyRequestExist } from "../../middlewares/verifyRequestExist.middlewares";
//pode passar qualquer nome nessa função, mas não se esqueça de mudar no app,
//onde ela está sendo chamada
export async function addRequestService(
  request: Request,
  response: Response
): Promise<void> {
  //Capturando o que o usuário passou no body
  const id = request.user.id;

  //Adicionando o id do usuário alocado no token
  const data: any = {
    id: id,
    ...request.body,
  };
  data.id = id

  //Verificando se o produto já existe no carrinho do usuário
  const verifyExist = await verifyRequestExist(data);
  //Vamos chamar o format para conseguir as ferramentas do pg-formt
  const query: string = format(
    `
      INSERT INTO requests(%I) values(%L) RETURNING *
  `,
    //O format vai passar as chaves no lugar do %I
    Object.keys(data),
    //O format vai passar os valores no lugar do %L
    Object.values(data)
  );

  //Faremos o procedimento padrão, acessando o client com query
  const queryConfig: any = await client.query(query);

  /*Retornando a resposta da request, passando pra resposta justamente os dados
                  que o usuário passou na request.body*/
  response.status(201).send(queryConfig.rows[0]);
}
