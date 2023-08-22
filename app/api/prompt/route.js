import Prompt from "@models/prompt";
import { ConnectionToDB } from "@utils/database";

export const GET = async (request) => {
    

    try {
        await ConnectionToDB();

        const prompts =await Prompt.find({}).populate('creator')

      
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to get data", { status: 500 });
    }
}
