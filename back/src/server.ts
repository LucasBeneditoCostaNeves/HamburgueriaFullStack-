import { app } from "./app";
import { connectionClient } from "./database/index"

//rodando o servidor na porta 3001
app.listen(3001, async () => {
    console.log('Server is running!')
    await connectionClient()
})