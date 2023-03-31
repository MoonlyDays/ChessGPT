import { List } from "./Util/List";

const AVATAR_USER   = "https://avatars.cloudflare.steamstatic.com/61269e2108073315ae031cc517fcc5a86418b450_full.jpg";
const AVATAR_BOT    = "https://gptapk.com/wp-content/uploads/2023/02/chatgpt-icon.png";
const AVATAR_SYSTEM = "https://files.softicons.com/download/application-icons/free-flat-icons-by-grafikartes/ico/systemPreferences.ico";
const GPT_TEMPERATURE = 1;

export class ChessGPT
{
    private _MessageHistory = new List<ChatGPTMessage>();
    private _DOM: HTMLElement;
    private _ApiInput: HTMLInputElement;

    constructor()
    {
        this._DOM = document.querySelector(".chatlog .messages");
        this._ApiInput = document.querySelector("#gpt_api_key");
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

        // Add element to 
        var domEl = document.createElement("div");
        domEl.classList.add("message");
        var sAvatar = "";

        switch(type)
        {
            case EChatGPTRole.Assistant:
                sAvatar = AVATAR_BOT;
                break;
                
            case EChatGPTRole.User:
                sAvatar = AVATAR_USER;
                domEl.classList.add("player");
                break;
            
            case EChatGPTRole.System:
                sAvatar = AVATAR_SYSTEM;
                domEl.classList.add("system");
                break;
        }

        domEl.innerHTML = `
        <div class="avatar">
            <img src="${sAvatar}" />
        </div>
        <div class="text">${message}</div>
        `;

        this._DOM.prepend(domEl);
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
                "Authorization": `Bearer ${this._ApiInput.value}`
            },
            body: JSON.stringify(body)
        });

        // Get JSON
        var json = await res.json();
        if(json.error)
        {
            alert(json.error.message);
            console.error(json.error.message);
            return "";
        }

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