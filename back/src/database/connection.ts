import { client } from "./config"
import {  postData } from "../services/data/addData.service"
import { array } from "../services/data/data"

export async function connectionClient(){
    await client.connect()
    await postData(array)
    console.log('Database connected! Port: 3001')
}