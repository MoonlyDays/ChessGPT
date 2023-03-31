import { DOMEntity } from "./DOMEntity";
import { List } from "./Util/List";

const API_KEY = "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";
const AVATAR_USER   = "https://avatars.cloudflare.steamstatic.com/61269e2108073315ae031cc517fcc5a86418b450_full.jpg";
const AVATAR_BOT    = "https://gptapk.com/wp-content/uploads/2023/02/chatgpt-icon.png";
const GPT_TEMPERATURE = 0.7;

export class ChessGPT
{
    private _MessageHistory = new List<ChatGPTMessage>();
    private _DOM: HTMLElement;

    constructor()
    {
        this._DOM = document.querySelector(".chatlog .messages");
    }

    public Reset()
    {
        this._MessageHistory.Clear();
        this._DOM.innerHTML = "";
    }

    public AddMessage(type: EChatGPTRole, message: string)
    {
        var msg = new ChatGPTMessage();
        msg.Role = type;
        msg.Content = message;
        this._MessageHistory.Add(msg);

        if(type == EChatGPTRole.System)
            return;

        // Add element to 
        var domEl = document.createElement("div");
        domEl.classList.add("message");

        if(type == EChatGPTRole.User)
            domEl.classList.add("player");

        var avatar = type == EChatGPTRole.User
            ? AVATAR_USER
            : AVATAR_BOT

        domEl.innerHTML = `
        <div class="avatar">
            <img src="${avatar}" />
        </div>
        <div class="text">${message}</div>
        `;

        this._DOM.append(domEl);
    }
    
    public async GenerateCompletion(): Promise<string>
    {
        var body: any = {};
        body.model = "gpt-3.5-turbo";
        body.temperature = GPT_TEMPERATURE;
        body.messages = [];

        for(var msg of this._MessageHistory)
        {
            var roleStr = EChatGPTRole[msg.Role].toLocaleLowerCase();
            body.messages.push({
                role: roleStr,
                content: msg.Content
            });
        }

        // Get response
        var res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(body)
        });

        // Get JSON
        var json = await res.json();
        var reply = json.choices[0].message.content;
        this.AddMessage(EChatGPTRole.Assistant, reply);
        return reply;
    }
}

export enum EChatGPTRole
{
    User,
    System,
    Assistant
};

export class ChatGPTMessage
{
    public Role: EChatGPTRole;
    public Content: string;
}