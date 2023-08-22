import Prompt from "@models/prompt";
import { ConnectionToDB } from "@utils/database";


//GET The Post that we want to delete or update
export const GET = async (request,{params}) => {
    

    try {
        await ConnectionToDB();

        const prompt =await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response("Prompt Not Found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to get data", { status: 500 });
    }
}

//patch(update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await ConnectionToDB();

        // Find the existing prompt by ID
        const toUpdatePost = await Prompt.findById(params.id);

        if (!toUpdatePost) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        toUpdatePost.prompt = prompt;
        toUpdatePost.tag = tag;

        await toUpdatePost.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};


//Delete

export const DELETE = async (request, { params }) => {
    try {
        await ConnectionToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};