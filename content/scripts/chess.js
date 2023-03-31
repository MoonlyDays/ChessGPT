/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/Board.ts":
/*!****************************!*\
  !*** ./src/class/Board.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Board = void 0;\nconst Cell_1 = __webpack_require__(/*! ./Cell */ \"./src/class/Cell.ts\");\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\nconst ChessGPT_1 = __webpack_require__(/*! ./ChessGPT */ \"./src/class/ChessGPT.ts\");\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\nconst Bishop_1 = __webpack_require__(/*! ./Figures/Bishop */ \"./src/class/Figures/Bishop.ts\");\nconst King_1 = __webpack_require__(/*! ./Figures/King */ \"./src/class/Figures/King.ts\");\nconst Knight_1 = __webpack_require__(/*! ./Figures/Knight */ \"./src/class/Figures/Knight.ts\");\nconst Pawn_1 = __webpack_require__(/*! ./Figures/Pawn */ \"./src/class/Figures/Pawn.ts\");\nconst Queen_1 = __webpack_require__(/*! ./Figures/Queen */ \"./src/class/Figures/Queen.ts\");\nconst Tower_1 = __webpack_require__(/*! ./Figures/Tower */ \"./src/class/Figures/Tower.ts\");\nconst SelectionBox_1 = __webpack_require__(/*! ./SelectionBox */ \"./src/class/SelectionBox.ts\");\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\nconst Vector_1 = __webpack_require__(/*! ./Util/Vector */ \"./src/class/Util/Vector.ts\");\nclass Board extends DOMEntity_1.DOMEntity {\n    _CellByAddress = new Map();\n    _Figures = new List_1.List();\n    Turn = Constants_1.ETeam.White;\n    SelectionBox = new SelectionBox_1.SelectionBox();\n    GPT = new ChessGPT_1.ChessGPT();\n    constructor() {\n        super();\n        this.CreateFieldCells();\n        this.DOMElement.appendChild(this.SelectionBox.DOMElement);\n    }\n    SetupDOMElement(el) {\n        el.classList.add(\"field\");\n    }\n    CreateFieldCells() {\n        for (var i = 0; i < 8; i++) {\n            for (var j = 0; j < 8; j++) {\n                var cell = new Cell_1.Cell();\n                cell.Team = ((i + j) % 2 == 0) ? Constants_1.ETeam.White : Constants_1.ETeam.Black;\n                this.DOMElement.append(cell.DOMElement);\n                var address = Board.PositionToAddress(new Vector_1.Vector2(j, i));\n                cell.Address = address;\n                this._CellByAddress.set(address, cell);\n            }\n        }\n    }\n    ResetBoard() {\n        this.ClearBoard();\n        //-------------------------------------\n        // Black Row\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.Black, \"A8\");\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.Black, \"B8\");\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.Black, \"C8\");\n        this.CreateFigureAtAddress(Queen_1.Queen, Constants_1.ETeam.Black, \"D8\");\n        this.CreateFigureAtAddress(King_1.King, Constants_1.ETeam.Black, \"E8\");\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.Black, \"F8\");\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.Black, \"G8\");\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.Black, \"H8\");\n        for (var i = 0; i < 8; i++)\n            this.CreateFigureAtPosition(Pawn_1.Pawn, Constants_1.ETeam.Black, new Vector_1.Vector2(i, 1));\n        //-------------------------------------\n        // White Row\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.White, \"A1\");\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.White, \"B1\");\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.White, \"C1\");\n        this.CreateFigureAtAddress(Queen_1.Queen, Constants_1.ETeam.White, \"D1\");\n        this.CreateFigureAtAddress(King_1.King, Constants_1.ETeam.White, \"E1\");\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.White, \"F1\");\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.White, \"G1\");\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.White, \"H1\");\n        for (var i = 0; i < 8; i++)\n            this.CreateFigureAtPosition(Pawn_1.Pawn, Constants_1.ETeam.White, new Vector_1.Vector2(i, 6));\n        this.GPT.AddMessage(ChessGPT_1.EChatGPTRole.System, \"Let's play chess. Tell me your moves in pairs of cell you move from and to. You \");\n    }\n    ClearBoard() {\n        for (var fig of this._Figures)\n            fig.Destroy();\n        this.GPT.Reset();\n    }\n    GetCellByAddress(address) {\n        return this._CellByAddress.get(address);\n    }\n    GetCellByPosition(pos) {\n        var address = Board.PositionToAddress(pos);\n        return this.GetCellByAddress(address);\n    }\n    CreateFigureAtAddress(type, team, address) {\n        var fig = new type();\n        var cell = this.GetCellByAddress(address);\n        if (!cell) {\n            console.warn(`CreateFigureAtAddress -- Cell ${address} doesn't exit.`);\n            return;\n        }\n        fig.MoveToCell(cell);\n        fig.Team = team;\n        return fig;\n    }\n    CreateFigureAtPosition(type, team, pos) {\n        return this.CreateFigureAtAddress(type, team, Board.PositionToAddress(pos));\n    }\n    static PositionToAddress(pos) {\n        var address = String.fromCharCode(65 + pos.X);\n        address += `${8 - pos.Y}`;\n        return address;\n    }\n    static AddressToPosition(address) {\n        var h = address.charCodeAt(0) - 65;\n        var v = 8 - Number(address[1]);\n        return new Vector_1.Vector2(h, v);\n    }\n    CanPlayerMove() { return this.Turn == Constants_1.ETeam.White; }\n    CanBotMove() { return this.Turn == Constants_1.ETeam.Black; }\n    SelectedFigure;\n    async TrySelect(figure) {\n        if (!this.CanPlayerMove())\n            return;\n        if (!figure.IsOwnedByPlayer())\n            return;\n        this.ClearSelection();\n        this.SelectedFigure = figure;\n        this.SelectionBox.MoveTo(figure);\n        figure.FindValidCellsToMove();\n    }\n    ClearSelection() {\n        this.SelectedFigure = null;\n        Chess_1.g_Globals.Game.InvokeMethodOnEntitiesOfType(Cell_1.Cell, x => x.SetHighlightForSelection, false);\n    }\n    OnFigureMoved(figure, cellFrom, cellTo) {\n        if (!(cellFrom && cellTo))\n            return;\n        // If player moved a figure, add this as a message\n        if (figure.IsOwnedByPlayer()) {\n            var capturedFigure = cellTo.Figure;\n            var msg = `I move ${Constants_1.ETeam[figure.Team]} ${figure.constructor.name} from ${cellFrom.Address} to ${cellTo.Address}.`;\n            if (capturedFigure)\n                msg += ` (I captured your ${capturedFigure.constructor.name})`;\n            // To send a message to chat, we need to know both old and new cell.\n            Chess_1.g_Globals.Game.Board.GPT.AddMessage(ChessGPT_1.EChatGPTRole.User, msg);\n        }\n        this.SwitchTurns();\n    }\n    SwitchTurns() {\n        var nextTurn = this.Turn == Constants_1.ETeam.Black\n            ? Constants_1.ETeam.White\n            : Constants_1.ETeam.Black;\n        console.trace(`${Constants_1.ETeam[nextTurn]} turn!`);\n        this.Turn = nextTurn;\n        // Turn of the bot.\n        if (nextTurn == Constants_1.ETeam.Black) {\n            this.QueryResponseFromChatGPT();\n        }\n    }\n    async QueryResponseFromChatGPT() {\n        var response = await this.GPT.GenerateCompletion();\n        var cells = response.match(/[A-Za-z][0-9]/g);\n        var fromAdr = cells[cells.length - 2].toUpperCase();\n        var toAdr = cells[cells.length - 1].toUpperCase();\n        var cellFrom = this.GetCellByAddress(fromAdr);\n        var cellTo = this.GetCellByAddress(toAdr);\n        if (!(cellFrom && cellTo)) {\n            this.GPT.AddMessage(ChessGPT_1.EChatGPTRole.User, \"Can you tell me the pair of cells you moved from and to?\");\n            return;\n        }\n        var figure = cellFrom.Figure;\n        if (!figure) {\n            this.GPT.AddMessage(ChessGPT_1.EChatGPTRole.User, \"Can you tell me the pair of cells you moved from and to?\");\n        }\n        if (figure.Team == Constants_1.ETeam.White) {\n        }\n        var availableCells = Array.from(figure.GenerateCellsToMove());\n        if (!availableCells.includes(cellTo)) {\n            this.GPT.AddMessage(ChessGPT_1.EChatGPTRole.User, \"Your last move is impossible\");\n            this.QueryResponseFromChatGPT();\n            return;\n        }\n        figure.MoveToCell(cellTo);\n        console.log(`ChatGPT moved ${Constants_1.ETeam[figure.Team]} ${figure.constructor.name} from ${fromAdr} to ${toAdr}`);\n    }\n}\nexports.Board = Board;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Board.ts?");

/***/ }),

/***/ "./src/class/Cell.ts":
/*!***************************!*\
  !*** ./src/class/Cell.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Cell = void 0;\nconst Board_1 = __webpack_require__(/*! ./Board */ \"./src/class/Board.ts\");\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\nclass Cell extends DOMEntity_1.DOMEntity {\n    Team;\n    Address;\n    get Position() { return Board_1.Board.AddressToPosition(this.Address); }\n    Figure;\n    SelectedCanMoveToThis = false;\n    constructor() {\n        super();\n        this.BindClass(\"white\", () => this.Team == Constants_1.ETeam.White);\n        this.BindClass(\"black\", () => this.Team == Constants_1.ETeam.Black);\n        this.BindClass(\"highlight\", () => this.SelectedCanMoveToThis);\n    }\n    SetupDOMElement(el) {\n        el.classList.add(\"cell\");\n    }\n    SetHighlightForSelection(val) {\n        this.SelectedCanMoveToThis = val;\n    }\n    OnClick(ev) {\n        if (!this.SelectedCanMoveToThis)\n            return;\n        var figure = Chess_1.g_Globals.Game.Board.SelectedFigure;\n        figure.MoveToCell(this);\n        Chess_1.g_Globals.Game.Board.ClearSelection();\n    }\n}\nexports.Cell = Cell;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Cell.ts?");

/***/ }),

/***/ "./src/class/Chess.ts":
/*!****************************!*\
  !*** ./src/class/Chess.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Chess = exports.g_Globals = void 0;\nconst Board_1 = __webpack_require__(/*! ./Board */ \"./src/class/Board.ts\");\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\nexports.g_Globals = {};\nclass Chess {\n    Container;\n    Instance;\n    Entities = new List_1.List();\n    Board;\n    constructor() {\n        exports.g_Globals.Game = this;\n        setAnimationFrameInterval(this.OnAnimationFrame.bind(this));\n        this.Container = document.querySelector(\"#game_container\");\n        this.Board = new Board_1.Board();\n        this.Container.appendChild(this.Board.DOMElement);\n        requestAnimationFrame(this.StartGame.bind(this));\n    }\n    StartGame() {\n        this.Board.ResetBoard();\n    }\n    OnAnimationFrame(curTime) {\n        exports.g_Globals.Time = curTime / 1000;\n        for (var ent of this.Entities)\n            ent.InvokeFrame();\n    }\n    InvokeMethodOnEntitiesOfType(type, cb, ...args) {\n        for (var ent of this.Entities) {\n            if (!(ent instanceof type))\n                continue;\n            var fn = cb(ent);\n            fn.call(ent, ...args);\n        }\n    }\n}\nexports.Chess = Chess;\n/** Helper function that runs a callback in requestAnimationFrame in a loop. */\nfunction setAnimationFrameInterval(cb) {\n    requestAnimationFrame((currentTime) => {\n        setAnimationFrameInterval(cb.bind(this));\n        cb.call(this, currentTime);\n    });\n}\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Chess.ts?");

/***/ }),

/***/ "./src/class/ChessGPT.ts":
/*!*******************************!*\
  !*** ./src/class/ChessGPT.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ChatGPTMessage = exports.EChatGPTRole = exports.ChessGPT = void 0;\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\nconst API_KEY = \"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\";\nconst AVATAR_USER = \"https://avatars.cloudflare.steamstatic.com/61269e2108073315ae031cc517fcc5a86418b450_full.jpg\";\nconst AVATAR_BOT = \"https://gptapk.com/wp-content/uploads/2023/02/chatgpt-icon.png\";\nconst GPT_TEMPERATURE = 0.7;\nclass ChessGPT {\n    _MessageHistory = new List_1.List();\n    _DOM;\n    constructor() {\n        this._DOM = document.querySelector(\".chatlog .messages\");\n    }\n    Reset() {\n        this._MessageHistory.Clear();\n        this._DOM.innerHTML = \"\";\n    }\n    AddMessage(type, message) {\n        var msg = new ChatGPTMessage();\n        msg.Role = type;\n        msg.Content = message;\n        this._MessageHistory.Add(msg);\n        if (type == EChatGPTRole.System)\n            return;\n        // Add element to \n        var domEl = document.createElement(\"div\");\n        domEl.classList.add(\"message\");\n        if (type == EChatGPTRole.User)\n            domEl.classList.add(\"player\");\n        var avatar = type == EChatGPTRole.User\n            ? AVATAR_USER\n            : AVATAR_BOT;\n        domEl.innerHTML = `\r\n        <div class=\"avatar\">\r\n            <img src=\"${avatar}\" />\r\n        </div>\r\n        <div class=\"text\">${message}</div>\r\n        `;\n        this._DOM.append(domEl);\n    }\n    async GenerateCompletion() {\n        var body = {};\n        body.model = \"gpt-3.5-turbo\";\n        body.temperature = GPT_TEMPERATURE;\n        body.messages = [];\n        for (var msg of this._MessageHistory) {\n            var roleStr = EChatGPTRole[msg.Role].toLocaleLowerCase();\n            body.messages.push({\n                role: roleStr,\n                content: msg.Content\n            });\n        }\n        // Get response\n        var res = await fetch(\"https://api.openai.com/v1/chat/completions\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Authorization\": `Bearer ${API_KEY}`\n            },\n            body: JSON.stringify(body)\n        });\n        // Get JSON\n        var json = await res.json();\n        var reply = json.choices[0].message.content;\n        this.AddMessage(EChatGPTRole.Assistant, reply);\n        return reply;\n    }\n}\nexports.ChessGPT = ChessGPT;\nvar EChatGPTRole;\n(function (EChatGPTRole) {\n    EChatGPTRole[EChatGPTRole[\"User\"] = 0] = \"User\";\n    EChatGPTRole[EChatGPTRole[\"System\"] = 1] = \"System\";\n    EChatGPTRole[EChatGPTRole[\"Assistant\"] = 2] = \"Assistant\";\n})(EChatGPTRole = exports.EChatGPTRole || (exports.EChatGPTRole = {}));\n;\nclass ChatGPTMessage {\n    Role;\n    Content;\n}\nexports.ChatGPTMessage = ChatGPTMessage;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/ChessGPT.ts?");

/***/ }),

/***/ "./src/class/Constants.ts":
/*!********************************!*\
  !*** ./src/class/Constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Position = exports.ETeam = void 0;\nvar ETeam;\n(function (ETeam) {\n    ETeam[ETeam[\"White\"] = 0] = \"White\";\n    ETeam[ETeam[\"Black\"] = 1] = \"Black\";\n})(ETeam = exports.ETeam || (exports.ETeam = {}));\nclass Position {\n    X;\n    Y;\n}\nexports.Position = Position;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Constants.ts?");

/***/ }),

/***/ "./src/class/DOMEntity.ts":
/*!********************************!*\
  !*** ./src/class/DOMEntity.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DOMEntity = void 0;\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\nclass DOMEntity {\n    DOMElement;\n    Bindings = new Map();\n    constructor() {\n        Chess_1.g_Globals.Game.Entities.Add(this);\n        this.DOMElement = document.createElement(\"div\");\n        this.SetupDOMElement(this.DOMElement);\n        this.SetupElementListeners(this.DOMElement);\n    }\n    _NextClassBindingEvaluate = 0;\n    EvaluateClassBindings() {\n        if (Chess_1.g_Globals.Time < this._NextClassBindingEvaluate)\n            return;\n        this._NextClassBindingEvaluate = Chess_1.g_Globals.Time + .1;\n        for (var pair of this.Bindings) {\n            var cn = pair[0];\n            var cb = pair[1];\n            if (cb.call(this))\n                this.DOMElement.classList.add(cn);\n            else\n                this.DOMElement.classList.remove(cn);\n        }\n    }\n    InvokeFrame() {\n        this.Frame();\n        this.EvaluateClassBindings();\n    }\n    Frame() {\n    }\n    SetupDOMElement(el) { }\n    BindClass(className, cb) {\n        this.Bindings.set(className, cb);\n    }\n    Destroy() {\n        this.DOMElement.remove();\n        Chess_1.g_Globals.Game.Entities.Remove(this);\n    }\n    SetupElementListeners(o) {\n        o.addEventListener(\"click\", e => this.OnClick(e));\n        o.addEventListener(\"dblclick\", e => this.OnDoubleClick(e));\n        o.addEventListener(\"contextmenu\", e => this.OnContextMenu(e));\n        o.addEventListener(\"mouseover\", e => this.OnMouseOver(e));\n        o.addEventListener(\"mouseout\", e => this.OnMouseOut(e));\n        o.addEventListener(\"mousedown\", e => this.OnMouseDown(e));\n        o.addEventListener(\"mouseenter\", e => this.OnMouseEnter(e));\n        o.addEventListener(\"mouseleave\", e => this.OnMouseLeave(e));\n        o.addEventListener(\"mousemove\", e => this.OnMouseMove(e));\n        o.addEventListener(\"mouseup\", e => this.OnMouseUp(e));\n        o.addEventListener(\"touchstart\", e => this.OnTouchStart(e));\n        o.addEventListener(\"touchmove\", e => this.OnTouchMove(e));\n        o.addEventListener(\"touchend\", e => this.OnTouchEnd(e));\n        o.addEventListener(\"touchcancel\", e => this.OnTouchCancel(e));\n    }\n    OnMouseDown(ev) { }\n    OnMouseUp(ev) { }\n    OnMouseOver(ev) { }\n    OnMouseOut(ev) { }\n    OnMouseEnter(ev) { }\n    OnMouseLeave(ev) { }\n    OnMouseMove(ev) { }\n    OnClick(ev) { }\n    OnDoubleClick(ev) { }\n    OnContextMenu(ev) { }\n    OnTouchStart(ev) { }\n    OnTouchMove(ev) { }\n    OnTouchEnd(ev) { }\n    OnTouchCancel(ev) { }\n}\nexports.DOMEntity = DOMEntity;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/DOMEntity.ts?");

/***/ }),

/***/ "./src/class/Figures/Bishop.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Bishop.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Bishop = void 0;\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nclass Bishop extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        // Forward move.\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .MoveUpLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveUpRight(Tracer_1.MAX_CELLS).Reset()\n            .MoveDownLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveDownRight(Tracer_1.MAX_CELLS).Reset()\n            .YieldTracedCells();\n    }\n}\nexports.Bishop = Bishop;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Bishop.ts?");

/***/ }),

/***/ "./src/class/Figures/Figure.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Figure.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EDistanceType = exports.Figure = void 0;\nconst Chess_1 = __webpack_require__(/*! ../Chess */ \"./src/class/Chess.ts\");\nconst Constants_1 = __webpack_require__(/*! ../Constants */ \"./src/class/Constants.ts\");\nconst DOMEntity_1 = __webpack_require__(/*! ../DOMEntity */ \"./src/class/DOMEntity.ts\");\nclass Figure extends DOMEntity_1.DOMEntity {\n    Team = 0;\n    Cell;\n    MoveTimes = 0;\n    constructor() {\n        super();\n        this.BindClass(\"white\", () => this.Team == Constants_1.ETeam.White);\n        this.BindClass(\"black\", () => this.Team == Constants_1.ETeam.Black);\n        this.BindClass(\"clickable\", () => Chess_1.g_Globals.Game.Board.Turn == this.Team && this.IsOwnedByPlayer());\n        Chess_1.g_Globals.Game.Board.DOMElement.appendChild(this.DOMElement);\n    }\n    SetupDOMElement(el) {\n        el.classList.add(\"figure\");\n        el.classList.add(this.constructor.name.toLowerCase());\n    }\n    MoveToCell(cell) {\n        this.MoveTimes++;\n        var oldCell = this.Cell;\n        var newCell = cell;\n        if (this.Cell) {\n            this.Cell.Figure = null;\n            this.Cell = null;\n        }\n        this.OnMoved(oldCell, newCell);\n        Chess_1.g_Globals.Game.Board.OnFigureMoved(this, oldCell, newCell);\n        if (cell) {\n            this.Cell = cell;\n            var contestedFigure = cell.Figure;\n            contestedFigure?.Destroy();\n            this.Cell.Figure = this;\n            var pos = cell.Position;\n            this.DOMElement.style.left = `${100 / 8 * pos.X}%`;\n            this.DOMElement.style.top = `${100 / 8 * pos.Y}%`;\n        }\n    }\n    OnMoved(fromCell, toCell) {\n    }\n    OnClick(ev) {\n        Chess_1.g_Globals.Game.Board.TrySelect(this);\n    }\n    IsOwnedByPlayer() { return this.Team == Constants_1.ETeam.White; }\n    IsOwnedByBot() { return this.Team == Constants_1.ETeam.Black; }\n    CanMoveToCell(cell) {\n        return false;\n    }\n    *GenerateCellsToMove() { return []; }\n    FindValidCellsToMove() {\n        for (var cell of this.GenerateCellsToMove())\n            cell.SetHighlightForSelection(true);\n    }\n}\nexports.Figure = Figure;\nvar EDistanceType;\n(function (EDistanceType) {\n    EDistanceType[EDistanceType[\"Vertical\"] = 0] = \"Vertical\";\n    EDistanceType[EDistanceType[\"Horizontal\"] = 1] = \"Horizontal\";\n    EDistanceType[EDistanceType[\"Diagonal\"] = 2] = \"Diagonal\";\n})(EDistanceType = exports.EDistanceType || (exports.EDistanceType = {}));\n;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Figure.ts?");

/***/ }),

/***/ "./src/class/Figures/King.ts":
/*!***********************************!*\
  !*** ./src/class/Figures/King.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.King = void 0;\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nclass King extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        // Forward move.\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .MoveUp().Reset()\n            .MoveDown().Reset()\n            .MoveLeft().Reset()\n            .MoveRight().Reset()\n            .MoveUpLeft().Reset()\n            .MoveUpRight().Reset()\n            .MoveDownLeft().Reset()\n            .MoveDownRight().Reset()\n            .YieldTracedCells();\n    }\n}\nexports.King = King;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/King.ts?");

/***/ }),

/***/ "./src/class/Figures/Knight.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Knight.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Knight = void 0;\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Vector_1 = __webpack_require__(/*! ../Util/Vector */ \"./src/class/Util/Vector.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nclass Knight extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        for (var i = 0; i < 4; i++) {\n            var ang = Math.PI * i / 2;\n            var x = Math.round(Math.cos(ang));\n            var y = Math.round(Math.sin(ang));\n            var fwd = new Vector_1.Vector2(x, y);\n            var toRight = new Vector_1.Vector2(y, -x);\n            var trR = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n                .WithCollisions(false)\n                .Move(fwd.Scale(2))\n                .Move(toRight);\n            yield* this.GetCellsFromCurvedTrace(trR);\n            var toLeft = new Vector_1.Vector2(-y, x);\n            var trL = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n                .WithCollisions(false)\n                .Move(fwd.Scale(2))\n                .Move(toLeft);\n            yield* this.GetCellsFromCurvedTrace(trL);\n        }\n    }\n    *GetCellsFromCurvedTrace(trace) {\n        if (trace.HasCollided)\n            return;\n        var cell = trace.Cell;\n        if (cell.Figure) {\n            if (cell.Figure.Team == this.Team)\n                return;\n        }\n        yield cell;\n    }\n}\nexports.Knight = Knight;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Knight.ts?");

/***/ }),

/***/ "./src/class/Figures/Pawn.ts":
/*!***********************************!*\
  !*** ./src/class/Figures/Pawn.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Pawn = void 0;\nconst Chess_1 = __webpack_require__(/*! ../Chess */ \"./src/class/Chess.ts\");\nconst Constants_1 = __webpack_require__(/*! ../Constants */ \"./src/class/Constants.ts\");\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nconst Queen_1 = __webpack_require__(/*! ./Queen */ \"./src/class/Figures/Queen.ts\");\nclass Pawn extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        var maxFwdMoves = this.MoveTimes == 1 ? 2 : 1;\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .CanContestEnemyCells(false)\n            .MoveUp(maxFwdMoves)\n            .YieldTracedCells();\n        // check L/R cells for cells with enemy figures\n        var sideCells = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .MoveUpLeft().Reset()\n            .MoveUpRight().Reset()\n            .YieldTracedCells();\n        for (var sideCell of sideCells) {\n            if (!sideCell.Figure)\n                continue;\n            if (sideCell.Figure.Team == this.Team)\n                continue;\n            yield sideCell;\n        }\n    }\n    OnMoved(fromCell, toCell) {\n        var edgeY = this.Team == Constants_1.ETeam.Black ? 7 : 0;\n        if (toCell.Position.Y == edgeY) {\n            setTimeout(() => {\n                Chess_1.g_Globals.Game.Board.CreateFigureAtAddress(Queen_1.Queen, this.Team, toCell.Address);\n                this.Destroy();\n            }, 100);\n        }\n    }\n}\nexports.Pawn = Pawn;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Pawn.ts?");

/***/ }),

/***/ "./src/class/Figures/Queen.ts":
/*!************************************!*\
  !*** ./src/class/Figures/Queen.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Queen = void 0;\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nclass Queen extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        // Forward move.\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .MoveUp(Tracer_1.MAX_CELLS).Reset()\n            .MoveDown(Tracer_1.MAX_CELLS).Reset()\n            .MoveLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveRight(Tracer_1.MAX_CELLS).Reset()\n            .MoveUpLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveUpRight(Tracer_1.MAX_CELLS).Reset()\n            .MoveDownLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveDownRight(Tracer_1.MAX_CELLS).Reset()\n            .YieldTracedCells();\n    }\n}\nexports.Queen = Queen;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Queen.ts?");

/***/ }),

/***/ "./src/class/Figures/Tower.ts":
/*!************************************!*\
  !*** ./src/class/Figures/Tower.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Tower = void 0;\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\nclass Tower extends Figure_1.Figure {\n    *GenerateCellsToMove() {\n        // Forward move.\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\n            .MoveUp(Tracer_1.MAX_CELLS).Reset()\n            .MoveDown(Tracer_1.MAX_CELLS).Reset()\n            .MoveLeft(Tracer_1.MAX_CELLS).Reset()\n            .MoveRight(Tracer_1.MAX_CELLS).Reset()\n            .YieldTracedCells();\n    }\n}\nexports.Tower = Tower;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Figures/Tower.ts?");

/***/ }),

/***/ "./src/class/SelectionBox.ts":
/*!***********************************!*\
  !*** ./src/class/SelectionBox.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SelectionBox = void 0;\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\nclass SelectionBox extends DOMEntity_1.DOMEntity {\n    constructor() {\n        super();\n        this.BindClass(\"visible\", () => !!Chess_1.g_Globals.Game.Board.SelectedFigure);\n    }\n    SetupDOMElement(el) {\n        el.classList.add(\"selection_box\");\n    }\n    MoveTo(figure) {\n        var cell = figure.Cell;\n        var pos = cell.Position;\n        this.DOMElement.style.left = `${100 / 8 * pos.X}%`;\n        this.DOMElement.style.top = `${100 / 8 * pos.Y}%`;\n    }\n}\nexports.SelectionBox = SelectionBox;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/SelectionBox.ts?");

/***/ }),

/***/ "./src/class/Tracer.ts":
/*!*****************************!*\
  !*** ./src/class/Tracer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Tracer = exports.MAX_CELLS = void 0;\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\nconst Vector_1 = __webpack_require__(/*! ./Util/Vector */ \"./src/class/Util/Vector.ts\");\nexports.MAX_CELLS = 8;\nclass Tracer {\n    Cell;\n    HasCollided = false;\n    TracedCells = new List_1.List();\n    _OriginalCell;\n    _UseCollisions = true;\n    _ContestEnemyCells = true;\n    _Team = Constants_1.ETeam.White;\n    _TracedEnemy = false;\n    static StartAt(cell, team) {\n        var t = new Tracer();\n        t._OriginalCell = cell;\n        t.Cell = cell;\n        t._Team = team;\n        return t;\n    }\n    WithCollisions(val = true) {\n        this._UseCollisions = val;\n        return this;\n    }\n    CanContestEnemyCells(val = true) {\n        this._ContestEnemyCells = val;\n        return this;\n    }\n    MoveUp(steps = 1) { return this.Move(Vector_1.Vector2.Up.Scale(steps)); }\n    MoveDown(steps = 1) { return this.Move(Vector_1.Vector2.Down.Scale(steps)); }\n    MoveRight(steps = 1) { return this.Move(Vector_1.Vector2.Right.Scale(steps)); }\n    MoveLeft(steps = 1) { return this.Move(Vector_1.Vector2.Left.Scale(steps)); }\n    MoveUpLeft(steps = 1) { return this.Move(new Vector_1.Vector2(-1, 1).Scale(steps)); }\n    MoveUpRight(steps = 1) { return this.Move(new Vector_1.Vector2(1, 1).Scale(steps)); }\n    MoveDownLeft(steps = 1) { return this.Move(new Vector_1.Vector2(-1, -1).Scale(steps)); }\n    MoveDownRight(steps = 1) { return this.Move(new Vector_1.Vector2(1, -1).Scale(steps)); }\n    Move(steps) {\n        if (this.HasCollided)\n            return this;\n        var myPos = this.Cell.Position;\n        var dir = Vector_1.Vector2.Zero;\n        if (steps.X != 0)\n            dir.X = steps.X / Math.abs(steps.X);\n        if (steps.Y != 0)\n            dir.Y = steps.Y / Math.abs(steps.Y);\n        if (dir.Length == 0)\n            return this;\n        var absDir = dir.Copy();\n        if (this._Team == Constants_1.ETeam.White)\n            absDir.Y *= -1;\n        var newPos = myPos.Add(absDir);\n        var newCell = Chess_1.g_Globals.Game.Board.GetCellByPosition(newPos);\n        if (!this.CheckForCollision(newCell))\n            return this;\n        this.TracedCells.Add(newCell);\n        this.Cell = newCell;\n        return this.Move(steps.Subtract(dir));\n    }\n    CanTraceToCell(cell) {\n        // No cell exists.\n        if (!cell)\n            return false;\n        // Collisions are disabled (knight)\n        if (!this._UseCollisions)\n            return true;\n        // All cell movements after we traced an enemy are not permitted.\n        if (this._TracedEnemy)\n            return false;\n        // Figure is already on this cell\n        var figure = cell.Figure;\n        if (figure) {\n            if (figure.Team == this._Team)\n                return false;\n            if (!this._ContestEnemyCells)\n                return false;\n            this._TracedEnemy = true;\n        }\n        return true;\n    }\n    CheckForCollision(cell) {\n        if (!this.CanTraceToCell(cell)) {\n            this.HasCollided = true;\n            return false;\n        }\n        return true;\n    }\n    Reset() {\n        this.Cell = this._OriginalCell;\n        this._TracedEnemy = false;\n        this.HasCollided = false;\n        return this;\n    }\n    *YieldTracedCells() {\n        for (var cell of this.TracedCells)\n            yield cell;\n    }\n}\nexports.Tracer = Tracer;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Tracer.ts?");

/***/ }),

/***/ "./src/class/Util/List.ts":
/*!********************************!*\
  !*** ./src/class/Util/List.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.List = void 0;\nclass List {\n    _elements = [];\n    Add(el) {\n        if (this.Contains(el))\n            return;\n        this._elements.push(el);\n    }\n    Remove(el) {\n        if (!this.Contains(el))\n            return;\n        this.RemoveAt(this.IndexOf(el));\n    }\n    RemoveAt(idx) {\n        this._elements.splice(idx, 1);\n    }\n    Clear() {\n        this._elements = [];\n    }\n    Contains(el) {\n        return this._elements.includes(el);\n    }\n    IndexOf(el) {\n        return this._elements.indexOf(el);\n    }\n    At(idx) {\n        return this._elements[idx];\n    }\n    *[Symbol.iterator]() {\n        for (var el of this._elements)\n            yield el;\n    }\n    Filter(predicate, thisArg) {\n        return this._elements.filter(predicate, thisArg);\n    }\n    Copy() {\n        var copy = new List();\n        Object.assign(copy._elements, this._elements);\n        return copy;\n    }\n    get Length() { return this._elements.length; }\n}\nexports.List = List;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Util/List.ts?");

/***/ }),

/***/ "./src/class/Util/Vector.ts":
/*!**********************************!*\
  !*** ./src/class/Util/Vector.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Vector2 = void 0;\nclass Vector2 {\n    X = 0;\n    Y = 0;\n    static get Zero() { return new Vector2(0, 0); }\n    static get One() { return new Vector2(1, 1); }\n    static get Left() { return new Vector2(-1, 0); }\n    static get Right() { return new Vector2(1, 0); }\n    static get Up() { return new Vector2(0, 1); }\n    static get Down() { return new Vector2(0, -1); }\n    static Random() {\n        return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);\n    }\n    static FromArray(array) {\n        return new Vector2(array[0] || 0, array[1] || 0);\n    }\n    constructor(x = 0, y = 0) {\n        this.X = x;\n        this.Y = y;\n    }\n    WithX(x) {\n        return new Vector2(x, this.Y);\n    }\n    WithY(y) {\n        return new Vector2(this.X, y);\n    }\n    DistanceTo(point, squared = false) {\n        var x = this.X - point.X;\n        var y = this.Y - point.Y;\n        if (squared)\n            return x * x + y * y;\n        return Math.sqrt(x * x + y * y);\n    }\n    get Length() {\n        return Math.sqrt(this.X * this.X + this.Y * this.Y);\n    }\n    Normalize() {\n        var length = this.Length;\n        if (length == 0)\n            return new Vector2();\n        return new Vector2(this.X / length, this.Y / length);\n    }\n    WithLength(length) {\n        var normalized = this.Normalize();\n        return normalized.Scale(length);\n    }\n    ProjectOn(vector) {\n        var dot = this.Dot(vector);\n        var length = vector.Length;\n        return dot / length;\n    }\n    Dot(vector) {\n        return this.X * vector.X + this.Y * vector.Y;\n    }\n    /**\n     * Adds another vector to us and returns the result\n     */\n    Add(vector) {\n        return new Vector2(this.X + vector.X, this.Y + vector.Y);\n    }\n    Scale(scale) {\n        if (scale instanceof Vector2)\n            return new Vector2(this.X * scale.X, this.Y * scale.Y);\n        return new Vector2(this.X * scale, this.Y * scale);\n    }\n    Divide(scale) {\n        if (scale instanceof Vector2)\n            return new Vector2(this.X / scale.X, this.Y / scale.Y);\n        return new Vector2(this.X / scale, this.Y / scale);\n    }\n    /**\n     * Subtracts another vector from us and returns the result\n     */\n    Subtract(vector) {\n        return new Vector2(this.X - vector.X, this.Y - vector.Y);\n    }\n    toString() {\n        return `Vector2[${Math.round(this.X * 100) / 100}, ${Math.round(this.Y * 100) / 100}]`;\n        // return `Vector2[${this.X}, ${this.Y}]`;\n    }\n    IsEqual(vector) {\n        return this.X == vector.X && this.Y == vector.Y;\n    }\n    IsNearlyEqual(vector, delta = 0.001) {\n        return Math.abs(this.X - vector.X) < delta && Math.abs(this.Y - vector.Y) < delta;\n    }\n    Min(vector) {\n        return new Vector2(Math.min(this.X, vector.X), Math.min(this.Y, vector.Y));\n    }\n    Max(vector) {\n        return new Vector2(Math.max(this.X, vector.X), Math.max(this.Y, vector.Y));\n    }\n    Lerp(vector, t) {\n        return new Vector2(this.X + (vector.X - this.X) * t, this.Y + (vector.Y - this.Y) * t);\n    }\n    Abs() {\n        return new Vector2(Math.abs(this.X), Math.abs(this.Y));\n    }\n    AngleDifference(vector) {\n        return vector.Angle() - this.Angle();\n    }\n    Angle() {\n        return Math.atan2(this.Y, this.X);\n    }\n    Copy() {\n        return new Vector2(this.X, this.Y);\n    }\n}\nexports.Vector2 = Vector2;\n\n\n//# sourceURL=webpack://chessgpt/./src/class/Util/Vector.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Chess_1 = __webpack_require__(/*! ./class/Chess */ \"./src/class/Chess.ts\");\nconst g_Chess = new Chess_1.Chess();\n\n\n//# sourceURL=webpack://chessgpt/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;