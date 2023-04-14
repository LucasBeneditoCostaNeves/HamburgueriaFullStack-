import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/index"
import { AppError } from "../../error"
import { compare } from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { schemaUserLogin } from "../../schemas/user.schemas"
import 'dotenv/config' 

export async function createLoginServer(request: any) : Promise<string>{
    //Validando Zod
    const validate = schemaUserLogin.parse(request.body)

    const query = `
    SELECT
        * 
    FROM 
        users
    WHERE email = $1   
    `

    const queryConfig: QueryConfig = {
        text:query,
        values:[validate.email]
    }

    const queryResult :QueryResult = await client.query(queryConfig) 

    if(queryResult.rowCount == 0){
        throw new AppError("Wrong email/password", 401)
    }

    //Usamos compare do bcryptjs para fazer a comparada da senha passada pelo usuário,
    //e a senha codificada armanezada no banco de dados
    const passwordVerify: boolean = await compare(validate.password, queryResult.rows[0].password)

    if(!passwordVerify){
        throw new AppError("Wrong email/password", 401)
    }

    //Criando o Token
    const token = jwt.sign(
          {
            //Passando os dados que eu quero salvar dentro do meu token
            admin: queryResult.rows[0].admin,
            active: queryResult.rows[0].active
          },
          //Chave secreta necessária para decodificar o token
          process.env.SECRET_KEY!,
          {
            //Configurações do token como validade e o id dele
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString(),
          }      
    )

    //Retornando o token feito com as informações dentro
    return token
}