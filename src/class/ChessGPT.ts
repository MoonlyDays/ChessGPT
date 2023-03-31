const API_KEY = "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";
const ENGINE_ID = "davinci";

const GPT_TEMPERATURE = 0.7;
const GPT_MAX_TOKENS = 20;
const GPT_TOP_P = 1;
const GPT_N = 1;
const GPT_FREQUENCY_PENALTY = 0;
const GPT_PRESENCE_PENALTY = 0;

export class ChessGPT
{
    private async SendPhraseToChatGPT(message: string)
    {
        var formData = new FormData();
        formData.append("prompt",       message);
        formData.append("temperature",  GPT_TEMPERATURE.toString());
        formData.append("max_tokens",   GPT_MAX_TOKENS.toString());
        formData.append("top_p",        GPT_TOP_P.toString());
        formData.append("n",            GPT_N.toString());
        formData.append("frequency_penalty", GPT_FREQUENCY_PENALTY.toString());
        formData.append("presence_penalty", GPT_PRESENCE_PENALTY.toString());

        var res = await fetch(`https://api.openai.com/v1/engine/${ENGINE_ID}/completions`, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: formData
        });

        console.log(res);
    }

    public StartConversation()
    {
        this.SendPhraseToChatGPT("Hello :)");
    }
}