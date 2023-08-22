import Prompt from "@models/prompt";
import { connectionToDB } from "@utils/database";

export const GET = async (request,{params}) => {
    

    try {
        await connectionToDB();

        const prompts =await Prompt.find({creator:params.id}).populate('creator')

      
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to get data", { status: 500 });
    }
}
