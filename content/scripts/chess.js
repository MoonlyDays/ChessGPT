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

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Board = void 0;\r\nconst Cell_1 = __webpack_require__(/*! ./Cell */ \"./src/class/Cell.ts\");\r\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\r\nconst ChessGPT_1 = __webpack_require__(/*! ./ChessGPT */ \"./src/class/ChessGPT.ts\");\r\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\r\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\r\nconst Bishop_1 = __webpack_require__(/*! ./Figures/Bishop */ \"./src/class/Figures/Bishop.ts\");\r\nconst King_1 = __webpack_require__(/*! ./Figures/King */ \"./src/class/Figures/King.ts\");\r\nconst Knight_1 = __webpack_require__(/*! ./Figures/Knight */ \"./src/class/Figures/Knight.ts\");\r\nconst Pawn_1 = __webpack_require__(/*! ./Figures/Pawn */ \"./src/class/Figures/Pawn.ts\");\r\nconst Queen_1 = __webpack_require__(/*! ./Figures/Queen */ \"./src/class/Figures/Queen.ts\");\r\nconst Tower_1 = __webpack_require__(/*! ./Figures/Tower */ \"./src/class/Figures/Tower.ts\");\r\nconst SelectionBox_1 = __webpack_require__(/*! ./SelectionBox */ \"./src/class/SelectionBox.ts\");\r\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\r\nconst Vector_1 = __webpack_require__(/*! ./Util/Vector */ \"./src/class/Util/Vector.ts\");\r\nclass Board extends DOMEntity_1.DOMEntity {\r\n    _CellByAddress = new Map();\r\n    _Figures = new List_1.List();\r\n    Turn = Constants_1.ETeam.White;\r\n    SelectionBox = new SelectionBox_1.SelectionBox();\r\n    GPT = new ChessGPT_1.ChessGPT();\r\n    constructor() {\r\n        super();\r\n        this.CreateFieldCells();\r\n        this.DOMElement.appendChild(this.SelectionBox.DOMElement);\r\n    }\r\n    SetupDOMElement(el) {\r\n        el.classList.add(\"field\");\r\n    }\r\n    CreateFieldCells() {\r\n        for (var i = 0; i < 8; i++) {\r\n            for (var j = 0; j < 8; j++) {\r\n                var cell = new Cell_1.Cell();\r\n                cell.Team = ((i + j) % 2 == 0) ? Constants_1.ETeam.White : Constants_1.ETeam.Black;\r\n                this.DOMElement.append(cell.DOMElement);\r\n                var address = Board.PositionToAddress(new Vector_1.Vector2(j, i));\r\n                cell.Address = address;\r\n                this._CellByAddress.set(address, cell);\r\n            }\r\n        }\r\n    }\r\n    ResetBoard() {\r\n        this.ClearBoard();\r\n        //-------------------------------------\r\n        // Black Row\r\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.Black, \"A8\");\r\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.Black, \"B8\");\r\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.Black, \"C8\");\r\n        this.CreateFigureAtAddress(King_1.King, Constants_1.ETeam.Black, \"D8\");\r\n        this.CreateFigureAtAddress(Queen_1.Queen, Constants_1.ETeam.Black, \"E8\");\r\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.Black, \"F8\");\r\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.Black, \"G8\");\r\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.Black, \"H8\");\r\n        for (var i = 0; i < 8; i++)\r\n            this.CreateFigureAtPosition(Pawn_1.Pawn, Constants_1.ETeam.Black, new Vector_1.Vector2(i, 1));\r\n        //-------------------------------------\r\n        // White Row\r\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.White, \"A1\");\r\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.White, \"B1\");\r\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.White, \"C1\");\r\n        this.CreateFigureAtAddress(King_1.King, Constants_1.ETeam.White, \"D1\");\r\n        this.CreateFigureAtAddress(Queen_1.Queen, Constants_1.ETeam.White, \"E1\");\r\n        this.CreateFigureAtAddress(Bishop_1.Bishop, Constants_1.ETeam.White, \"F1\");\r\n        this.CreateFigureAtAddress(Knight_1.Knight, Constants_1.ETeam.White, \"G1\");\r\n        this.CreateFigureAtAddress(Tower_1.Tower, Constants_1.ETeam.White, \"H1\");\r\n        for (var i = 0; i < 8; i++)\r\n            this.CreateFigureAtPosition(Pawn_1.Pawn, Constants_1.ETeam.White, new Vector_1.Vector2(i, 6));\r\n    }\r\n    ClearBoard() {\r\n        for (var fig of this._Figures)\r\n            fig.Destroy();\r\n    }\r\n    GetCellByAddress(address) {\r\n        return this._CellByAddress.get(address);\r\n    }\r\n    GetCellByPosition(pos) {\r\n        var address = Board.PositionToAddress(pos);\r\n        return this.GetCellByAddress(address);\r\n    }\r\n    CreateFigureAtAddress(type, team, address) {\r\n        var fig = new type();\r\n        var cell = this.GetCellByAddress(address);\r\n        if (!cell) {\r\n            console.warn(`CreateFigureAtAddress -- Cell ${address} doesn't exit.`);\r\n            return;\r\n        }\r\n        fig.MoveToCell(cell);\r\n        fig.Team = team;\r\n        return fig;\r\n    }\r\n    CreateFigureAtPosition(type, team, pos) {\r\n        return this.CreateFigureAtAddress(type, team, Board.PositionToAddress(pos));\r\n    }\r\n    static PositionToAddress(pos) {\r\n        var address = String.fromCharCode(65 + pos.X);\r\n        address += `${8 - pos.Y}`;\r\n        return address;\r\n    }\r\n    static AddressToPosition(address) {\r\n        var h = address.charCodeAt(0) - 65;\r\n        var v = 8 - Number(address[1]);\r\n        return new Vector_1.Vector2(h, v);\r\n    }\r\n    CanPlayerMove() { return this.Turn == Constants_1.ETeam.White; }\r\n    CanBotMove() { return this.Turn == Constants_1.ETeam.Black; }\r\n    SelectedFigure;\r\n    TrySelect(figure) {\r\n        if (!this.CanPlayerMove())\r\n            return;\r\n        if (!figure.IsOwnedByPlayer())\r\n            return;\r\n        this.ClearSelection();\r\n        this.SelectedFigure = figure;\r\n        this.SelectionBox.MoveTo(figure);\r\n        figure.FindValidCellsToMove();\r\n        Chess_1.g_Globals.Game.Board.GPT.StartConversation();\r\n    }\r\n    ClearSelection() {\r\n        this.SelectedFigure = null;\r\n        Chess_1.g_Globals.Game.InvokeMethodOnEntitiesOfType(Cell_1.Cell, x => x.SetHighlightForSelection, false);\r\n    }\r\n}\r\nexports.Board = Board;\r\n\n\n//# sourceURL=webpack://src/./src/class/Board.ts?");

/***/ }),

/***/ "./src/class/Cell.ts":
/*!***************************!*\
  !*** ./src/class/Cell.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Cell = void 0;\r\nconst Board_1 = __webpack_require__(/*! ./Board */ \"./src/class/Board.ts\");\r\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\r\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\r\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\r\nclass Cell extends DOMEntity_1.DOMEntity {\r\n    Team;\r\n    Address;\r\n    get Position() { return Board_1.Board.AddressToPosition(this.Address); }\r\n    Figure;\r\n    SelectedCanMoveToThis = false;\r\n    constructor() {\r\n        super();\r\n        this.BindClass(\"white\", () => this.Team == Constants_1.ETeam.White);\r\n        this.BindClass(\"black\", () => this.Team == Constants_1.ETeam.Black);\r\n        this.BindClass(\"highlight\", () => this.SelectedCanMoveToThis);\r\n    }\r\n    SetupDOMElement(el) {\r\n        el.classList.add(\"cell\");\r\n    }\r\n    SetHighlightForSelection(val) {\r\n        this.SelectedCanMoveToThis = val;\r\n    }\r\n    OnClick(ev) {\r\n        if (!this.SelectedCanMoveToThis)\r\n            return;\r\n        var figure = Chess_1.g_Globals.Game.Board.SelectedFigure;\r\n        figure.MoveToCell(this);\r\n        Chess_1.g_Globals.Game.Board.ClearSelection();\r\n    }\r\n}\r\nexports.Cell = Cell;\r\n\n\n//# sourceURL=webpack://src/./src/class/Cell.ts?");

/***/ }),

/***/ "./src/class/Chess.ts":
/*!****************************!*\
  !*** ./src/class/Chess.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Chess = exports.g_Globals = void 0;\r\nconst Board_1 = __webpack_require__(/*! ./Board */ \"./src/class/Board.ts\");\r\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\r\nexports.g_Globals = {};\r\nclass Chess {\r\n    Container;\r\n    Instance;\r\n    Entities = new List_1.List();\r\n    Board;\r\n    constructor() {\r\n        exports.g_Globals.Game = this;\r\n        setAnimationFrameInterval(this.OnAnimationFrame.bind(this));\r\n        this.Container = document.querySelector(\"#game_container\");\r\n        this.Board = new Board_1.Board();\r\n        this.Container.appendChild(this.Board.DOMElement);\r\n        requestAnimationFrame(this.StartGame.bind(this));\r\n    }\r\n    StartGame() {\r\n        this.Board.ResetBoard();\r\n    }\r\n    OnAnimationFrame(curTime) {\r\n        exports.g_Globals.Time = curTime / 1000;\r\n        for (var ent of this.Entities)\r\n            ent.InvokeFrame();\r\n    }\r\n    InvokeMethodOnEntitiesOfType(type, cb, ...args) {\r\n        for (var ent of this.Entities) {\r\n            if (!(ent instanceof type))\r\n                continue;\r\n            var fn = cb(ent);\r\n            fn.call(ent, ...args);\r\n        }\r\n    }\r\n}\r\nexports.Chess = Chess;\r\n/** Helper function that runs a callback in requestAnimationFrame in a loop. */\r\nfunction setAnimationFrameInterval(cb) {\r\n    requestAnimationFrame((currentTime) => {\r\n        setAnimationFrameInterval(cb.bind(this));\r\n        cb.call(this, currentTime);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://src/./src/class/Chess.ts?");

/***/ }),

/***/ "./src/class/ChessGPT.ts":
/*!*******************************!*\
  !*** ./src/class/ChessGPT.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ChessGPT = void 0;\r\nconst API_KEY = \"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\";\r\nconst ENGINE_ID = \"davinci\";\r\nconst GPT_TEMPERATURE = 0.7;\r\nconst GPT_MAX_TOKENS = 20;\r\nconst GPT_TOP_P = 1;\r\nconst GPT_N = 1;\r\nconst GPT_FREQUENCY_PENALTY = 0;\r\nconst GPT_PRESENCE_PENALTY = 0;\r\nclass ChessGPT {\r\n    async SendPhraseToChatGPT(message) {\r\n        var formData = new FormData();\r\n        formData.append(\"prompt\", message);\r\n        formData.append(\"temperature\", GPT_TEMPERATURE.toString());\r\n        formData.append(\"max_tokens\", GPT_MAX_TOKENS.toString());\r\n        formData.append(\"top_p\", GPT_TOP_P.toString());\r\n        formData.append(\"n\", GPT_N.toString());\r\n        formData.append(\"frequency_penalty\", GPT_FREQUENCY_PENALTY.toString());\r\n        formData.append(\"presence_penalty\", GPT_PRESENCE_PENALTY.toString());\r\n        var res = await fetch(`https://api.openai.com/v1/engine/${ENGINE_ID}/completions`, {\r\n            headers: {\r\n                \"Authorization\": `Bearer ${API_KEY}`,\r\n                \"Content-Type\": \"application/json\"\r\n            },\r\n            method: \"POST\",\r\n            body: formData\r\n        });\r\n        console.log(res);\r\n    }\r\n    StartConversation() {\r\n        this.SendPhraseToChatGPT(\"Hello :)\");\r\n    }\r\n}\r\nexports.ChessGPT = ChessGPT;\r\n\n\n//# sourceURL=webpack://src/./src/class/ChessGPT.ts?");

/***/ }),

/***/ "./src/class/Constants.ts":
/*!********************************!*\
  !*** ./src/class/Constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Position = exports.ETeam = void 0;\r\nvar ETeam;\r\n(function (ETeam) {\r\n    ETeam[ETeam[\"White\"] = 0] = \"White\";\r\n    ETeam[ETeam[\"Black\"] = 1] = \"Black\";\r\n})(ETeam = exports.ETeam || (exports.ETeam = {}));\r\nclass Position {\r\n    X;\r\n    Y;\r\n}\r\nexports.Position = Position;\r\n\n\n//# sourceURL=webpack://src/./src/class/Constants.ts?");

/***/ }),

/***/ "./src/class/DOMEntity.ts":
/*!********************************!*\
  !*** ./src/class/DOMEntity.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.DOMEntity = void 0;\r\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\r\nclass DOMEntity {\r\n    DOMElement;\r\n    Bindings = new Map();\r\n    constructor() {\r\n        Chess_1.g_Globals.Game.Entities.Add(this);\r\n        this.DOMElement = document.createElement(\"div\");\r\n        this.SetupDOMElement(this.DOMElement);\r\n        this.SetupElementListeners(this.DOMElement);\r\n    }\r\n    _NextClassBindingEvaluate = 0;\r\n    EvaluateClassBindings() {\r\n        if (Chess_1.g_Globals.Time < this._NextClassBindingEvaluate)\r\n            return;\r\n        this._NextClassBindingEvaluate = Chess_1.g_Globals.Time + .1;\r\n        for (var pair of this.Bindings) {\r\n            var cn = pair[0];\r\n            var cb = pair[1];\r\n            if (cb.call(this))\r\n                this.DOMElement.classList.add(cn);\r\n            else\r\n                this.DOMElement.classList.remove(cn);\r\n        }\r\n    }\r\n    InvokeFrame() {\r\n        this.Frame();\r\n        this.EvaluateClassBindings();\r\n    }\r\n    Frame() {\r\n    }\r\n    SetupDOMElement(el) { }\r\n    BindClass(className, cb) {\r\n        this.Bindings.set(className, cb);\r\n    }\r\n    Destroy() {\r\n        this.DOMElement.remove();\r\n        Chess_1.g_Globals.Game.Entities.Remove(this);\r\n    }\r\n    SetupElementListeners(o) {\r\n        o.addEventListener(\"click\", e => this.OnClick(e));\r\n        o.addEventListener(\"dblclick\", e => this.OnDoubleClick(e));\r\n        o.addEventListener(\"contextmenu\", e => this.OnContextMenu(e));\r\n        o.addEventListener(\"mouseover\", e => this.OnMouseOver(e));\r\n        o.addEventListener(\"mouseout\", e => this.OnMouseOut(e));\r\n        o.addEventListener(\"mousedown\", e => this.OnMouseDown(e));\r\n        o.addEventListener(\"mouseenter\", e => this.OnMouseEnter(e));\r\n        o.addEventListener(\"mouseleave\", e => this.OnMouseLeave(e));\r\n        o.addEventListener(\"mousemove\", e => this.OnMouseMove(e));\r\n        o.addEventListener(\"mouseup\", e => this.OnMouseUp(e));\r\n        o.addEventListener(\"touchstart\", e => this.OnTouchStart(e));\r\n        o.addEventListener(\"touchmove\", e => this.OnTouchMove(e));\r\n        o.addEventListener(\"touchend\", e => this.OnTouchEnd(e));\r\n        o.addEventListener(\"touchcancel\", e => this.OnTouchCancel(e));\r\n    }\r\n    OnMouseDown(ev) { }\r\n    OnMouseUp(ev) { }\r\n    OnMouseOver(ev) { }\r\n    OnMouseOut(ev) { }\r\n    OnMouseEnter(ev) { }\r\n    OnMouseLeave(ev) { }\r\n    OnMouseMove(ev) { }\r\n    OnClick(ev) { }\r\n    OnDoubleClick(ev) { }\r\n    OnContextMenu(ev) { }\r\n    OnTouchStart(ev) { }\r\n    OnTouchMove(ev) { }\r\n    OnTouchEnd(ev) { }\r\n    OnTouchCancel(ev) { }\r\n}\r\nexports.DOMEntity = DOMEntity;\r\n\n\n//# sourceURL=webpack://src/./src/class/DOMEntity.ts?");

/***/ }),

/***/ "./src/class/Figures/Bishop.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Bishop.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Bishop = void 0;\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nclass Bishop extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        // Forward move.\r\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .MoveUpLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveUpRight(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDownLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDownRight(Tracer_1.MAX_CELLS).Reset()\r\n            .YieldTracedCells();\r\n    }\r\n}\r\nexports.Bishop = Bishop;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Bishop.ts?");

/***/ }),

/***/ "./src/class/Figures/Figure.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Figure.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.EDistanceType = exports.Figure = void 0;\r\nconst Chess_1 = __webpack_require__(/*! ../Chess */ \"./src/class/Chess.ts\");\r\nconst Constants_1 = __webpack_require__(/*! ../Constants */ \"./src/class/Constants.ts\");\r\nconst DOMEntity_1 = __webpack_require__(/*! ../DOMEntity */ \"./src/class/DOMEntity.ts\");\r\nclass Figure extends DOMEntity_1.DOMEntity {\r\n    Team = 0;\r\n    Cell;\r\n    MoveTimes = 0;\r\n    constructor() {\r\n        super();\r\n        this.BindClass(\"white\", () => this.Team == Constants_1.ETeam.White);\r\n        this.BindClass(\"black\", () => this.Team == Constants_1.ETeam.Black);\r\n        this.BindClass(\"clickable\", () => Chess_1.g_Globals.Game.Board.Turn == this.Team && this.IsOwnedByPlayer());\r\n        Chess_1.g_Globals.Game.Board.DOMElement.appendChild(this.DOMElement);\r\n    }\r\n    SetupDOMElement(el) {\r\n        el.classList.add(\"figure\");\r\n        el.classList.add(this.constructor.name.toLowerCase());\r\n    }\r\n    MoveToCell(cell) {\r\n        this.MoveTimes++;\r\n        var oldCell = this.Cell;\r\n        var newCell = cell;\r\n        if (this.Cell) {\r\n            this.Cell.Figure = null;\r\n            this.Cell = null;\r\n        }\r\n        if (cell) {\r\n            this.Cell = cell;\r\n            var contestedFigure = cell.Figure;\r\n            contestedFigure?.Destroy();\r\n            this.Cell.Figure = this;\r\n            var pos = cell.Position;\r\n            this.DOMElement.style.left = `${100 / 8 * pos.X}%`;\r\n            this.DOMElement.style.top = `${100 / 8 * pos.Y}%`;\r\n        }\r\n        this.OnMoved(oldCell, newCell);\r\n    }\r\n    OnMoved(fromCell, toCell) {\r\n    }\r\n    OnClick(ev) {\r\n        Chess_1.g_Globals.Game.Board.TrySelect(this);\r\n    }\r\n    IsOwnedByPlayer() { return this.Team == Constants_1.ETeam.White; }\r\n    IsOwnedByBot() { return this.Team == Constants_1.ETeam.Black; }\r\n    CanMoveToCell(cell) {\r\n        return false;\r\n    }\r\n    *GenerateCellsToMove() { return []; }\r\n    FindValidCellsToMove() {\r\n        for (var cell of this.GenerateCellsToMove())\r\n            cell.SetHighlightForSelection(true);\r\n    }\r\n}\r\nexports.Figure = Figure;\r\nvar EDistanceType;\r\n(function (EDistanceType) {\r\n    EDistanceType[EDistanceType[\"Vertical\"] = 0] = \"Vertical\";\r\n    EDistanceType[EDistanceType[\"Horizontal\"] = 1] = \"Horizontal\";\r\n    EDistanceType[EDistanceType[\"Diagonal\"] = 2] = \"Diagonal\";\r\n})(EDistanceType = exports.EDistanceType || (exports.EDistanceType = {}));\r\n;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Figure.ts?");

/***/ }),

/***/ "./src/class/Figures/King.ts":
/*!***********************************!*\
  !*** ./src/class/Figures/King.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.King = void 0;\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nclass King extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        // Forward move.\r\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .MoveUp().Reset()\r\n            .MoveDown().Reset()\r\n            .MoveLeft().Reset()\r\n            .MoveRight().Reset()\r\n            .MoveUpLeft().Reset()\r\n            .MoveUpRight().Reset()\r\n            .MoveDownLeft().Reset()\r\n            .MoveDownRight().Reset()\r\n            .YieldTracedCells();\r\n    }\r\n}\r\nexports.King = King;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/King.ts?");

/***/ }),

/***/ "./src/class/Figures/Knight.ts":
/*!*************************************!*\
  !*** ./src/class/Figures/Knight.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Knight = void 0;\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Vector_1 = __webpack_require__(/*! ../Util/Vector */ \"./src/class/Util/Vector.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nclass Knight extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        for (var i = 0; i < 4; i++) {\r\n            var ang = Math.PI * i / 2;\r\n            var x = Math.round(Math.cos(ang));\r\n            var y = Math.round(Math.sin(ang));\r\n            var fwd = new Vector_1.Vector2(x, y);\r\n            var toRight = new Vector_1.Vector2(y, -x);\r\n            var trR = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n                .WithCollisions(false)\r\n                .Move(fwd.Scale(2))\r\n                .Move(toRight);\r\n            yield* this.GetCellsFromCurvedTrace(trR);\r\n            var toLeft = new Vector_1.Vector2(-y, x);\r\n            var trL = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n                .WithCollisions(false)\r\n                .Move(fwd.Scale(2))\r\n                .Move(toLeft);\r\n            yield* this.GetCellsFromCurvedTrace(trL);\r\n        }\r\n    }\r\n    *GetCellsFromCurvedTrace(trace) {\r\n        if (trace.HasCollided)\r\n            return;\r\n        var cell = trace.Cell;\r\n        if (cell.Figure) {\r\n            if (cell.Figure.Team == this.Team)\r\n                return;\r\n        }\r\n        yield cell;\r\n    }\r\n}\r\nexports.Knight = Knight;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Knight.ts?");

/***/ }),

/***/ "./src/class/Figures/Pawn.ts":
/*!***********************************!*\
  !*** ./src/class/Figures/Pawn.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Pawn = void 0;\r\nconst Chess_1 = __webpack_require__(/*! ../Chess */ \"./src/class/Chess.ts\");\r\nconst Constants_1 = __webpack_require__(/*! ../Constants */ \"./src/class/Constants.ts\");\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nconst Queen_1 = __webpack_require__(/*! ./Queen */ \"./src/class/Figures/Queen.ts\");\r\nclass Pawn extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        var maxFwdMoves = this.MoveTimes == 1 ? 2 : 1;\r\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .CanContestEnemyCells(false)\r\n            .MoveUp(maxFwdMoves)\r\n            .YieldTracedCells();\r\n        // check L/R cells for cells with enemy figures\r\n        var sideCells = Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .MoveUpLeft().Reset()\r\n            .MoveUpRight().Reset()\r\n            .YieldTracedCells();\r\n        for (var sideCell of sideCells) {\r\n            if (!sideCell.Figure)\r\n                continue;\r\n            if (sideCell.Figure.Team == this.Team)\r\n                continue;\r\n            yield sideCell;\r\n        }\r\n    }\r\n    OnMoved(fromCell, toCell) {\r\n        var edgeY = this.Team == Constants_1.ETeam.Black ? 7 : 0;\r\n        if (toCell.Position.Y == edgeY) {\r\n            setTimeout(() => {\r\n                Chess_1.g_Globals.Game.Board.CreateFigureAtAddress(Queen_1.Queen, this.Team, toCell.Address);\r\n                this.Destroy();\r\n            }, 100);\r\n        }\r\n    }\r\n}\r\nexports.Pawn = Pawn;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Pawn.ts?");

/***/ }),

/***/ "./src/class/Figures/Queen.ts":
/*!************************************!*\
  !*** ./src/class/Figures/Queen.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Queen = void 0;\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nclass Queen extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        // Forward move.\r\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .MoveUp(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDown(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveRight(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveUpLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveUpRight(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDownLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDownRight(Tracer_1.MAX_CELLS).Reset()\r\n            .YieldTracedCells();\r\n    }\r\n}\r\nexports.Queen = Queen;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Queen.ts?");

/***/ }),

/***/ "./src/class/Figures/Tower.ts":
/*!************************************!*\
  !*** ./src/class/Figures/Tower.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Tower = void 0;\r\nconst Tracer_1 = __webpack_require__(/*! ../Tracer */ \"./src/class/Tracer.ts\");\r\nconst Figure_1 = __webpack_require__(/*! ./Figure */ \"./src/class/Figures/Figure.ts\");\r\nclass Tower extends Figure_1.Figure {\r\n    *GenerateCellsToMove() {\r\n        // Forward move.\r\n        yield* Tracer_1.Tracer.StartAt(this.Cell, this.Team)\r\n            .MoveUp(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveDown(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveLeft(Tracer_1.MAX_CELLS).Reset()\r\n            .MoveRight(Tracer_1.MAX_CELLS).Reset()\r\n            .YieldTracedCells();\r\n    }\r\n}\r\nexports.Tower = Tower;\r\n\n\n//# sourceURL=webpack://src/./src/class/Figures/Tower.ts?");

/***/ }),

/***/ "./src/class/SelectionBox.ts":
/*!***********************************!*\
  !*** ./src/class/SelectionBox.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.SelectionBox = void 0;\r\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\r\nconst DOMEntity_1 = __webpack_require__(/*! ./DOMEntity */ \"./src/class/DOMEntity.ts\");\r\nclass SelectionBox extends DOMEntity_1.DOMEntity {\r\n    constructor() {\r\n        super();\r\n        this.BindClass(\"visible\", () => !!Chess_1.g_Globals.Game.Board.SelectedFigure);\r\n    }\r\n    SetupDOMElement(el) {\r\n        el.classList.add(\"selection_box\");\r\n    }\r\n    MoveTo(figure) {\r\n        var cell = figure.Cell;\r\n        var pos = cell.Position;\r\n        this.DOMElement.style.left = `${100 / 8 * pos.X}%`;\r\n        this.DOMElement.style.top = `${100 / 8 * pos.Y}%`;\r\n    }\r\n}\r\nexports.SelectionBox = SelectionBox;\r\n\n\n//# sourceURL=webpack://src/./src/class/SelectionBox.ts?");

/***/ }),

/***/ "./src/class/Tracer.ts":
/*!*****************************!*\
  !*** ./src/class/Tracer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Tracer = exports.MAX_CELLS = void 0;\r\nconst Chess_1 = __webpack_require__(/*! ./Chess */ \"./src/class/Chess.ts\");\r\nconst Constants_1 = __webpack_require__(/*! ./Constants */ \"./src/class/Constants.ts\");\r\nconst List_1 = __webpack_require__(/*! ./Util/List */ \"./src/class/Util/List.ts\");\r\nconst Vector_1 = __webpack_require__(/*! ./Util/Vector */ \"./src/class/Util/Vector.ts\");\r\nexports.MAX_CELLS = 8;\r\nclass Tracer {\r\n    Cell;\r\n    HasCollided = false;\r\n    TracedCells = new List_1.List();\r\n    _OriginalCell;\r\n    _UseCollisions = true;\r\n    _ContestEnemyCells = true;\r\n    _Team = Constants_1.ETeam.White;\r\n    _TracedEnemy = false;\r\n    static StartAt(cell, team) {\r\n        var t = new Tracer();\r\n        t._OriginalCell = cell;\r\n        t.Cell = cell;\r\n        t._Team = team;\r\n        return t;\r\n    }\r\n    WithCollisions(val = true) {\r\n        this._UseCollisions = val;\r\n        return this;\r\n    }\r\n    CanContestEnemyCells(val = true) {\r\n        this._ContestEnemyCells = val;\r\n        return this;\r\n    }\r\n    MoveUp(steps = 1) { return this.Move(Vector_1.Vector2.Up.Scale(steps)); }\r\n    MoveDown(steps = 1) { return this.Move(Vector_1.Vector2.Down.Scale(steps)); }\r\n    MoveRight(steps = 1) { return this.Move(Vector_1.Vector2.Right.Scale(steps)); }\r\n    MoveLeft(steps = 1) { return this.Move(Vector_1.Vector2.Left.Scale(steps)); }\r\n    MoveUpLeft(steps = 1) { return this.Move(new Vector_1.Vector2(-1, 1).Scale(steps)); }\r\n    MoveUpRight(steps = 1) { return this.Move(new Vector_1.Vector2(1, 1).Scale(steps)); }\r\n    MoveDownLeft(steps = 1) { return this.Move(new Vector_1.Vector2(-1, -1).Scale(steps)); }\r\n    MoveDownRight(steps = 1) { return this.Move(new Vector_1.Vector2(1, -1).Scale(steps)); }\r\n    Move(steps) {\r\n        if (this.HasCollided)\r\n            return this;\r\n        var myPos = this.Cell.Position;\r\n        var dir = Vector_1.Vector2.Zero;\r\n        if (steps.X != 0)\r\n            dir.X = steps.X / Math.abs(steps.X);\r\n        if (steps.Y != 0)\r\n            dir.Y = steps.Y / Math.abs(steps.Y);\r\n        if (dir.Length == 0)\r\n            return this;\r\n        var absDir = dir.Copy();\r\n        if (this._Team == Constants_1.ETeam.White)\r\n            absDir.Y *= -1;\r\n        var newPos = myPos.Add(absDir);\r\n        var newCell = Chess_1.g_Globals.Game.Board.GetCellByPosition(newPos);\r\n        if (!this.CheckForCollision(newCell))\r\n            return this;\r\n        this.TracedCells.Add(newCell);\r\n        this.Cell = newCell;\r\n        return this.Move(steps.Subtract(dir));\r\n    }\r\n    CanTraceToCell(cell) {\r\n        // No cell exists.\r\n        if (!cell)\r\n            return false;\r\n        // Collisions are disabled (knight)\r\n        if (!this._UseCollisions)\r\n            return true;\r\n        // All cell movements after we traced an enemy are not permitted.\r\n        if (this._TracedEnemy)\r\n            return false;\r\n        // Figure is already on this cell\r\n        var figure = cell.Figure;\r\n        if (figure) {\r\n            if (figure.Team == this._Team)\r\n                return false;\r\n            if (!this._ContestEnemyCells)\r\n                return false;\r\n            this._TracedEnemy = true;\r\n        }\r\n        return true;\r\n    }\r\n    CheckForCollision(cell) {\r\n        if (!this.CanTraceToCell(cell)) {\r\n            this.HasCollided = true;\r\n            return false;\r\n        }\r\n        return true;\r\n    }\r\n    Reset() {\r\n        this.Cell = this._OriginalCell;\r\n        this._TracedEnemy = false;\r\n        this.HasCollided = false;\r\n        return this;\r\n    }\r\n    *YieldTracedCells() {\r\n        for (var cell of this.TracedCells)\r\n            yield cell;\r\n    }\r\n}\r\nexports.Tracer = Tracer;\r\n\n\n//# sourceURL=webpack://src/./src/class/Tracer.ts?");

/***/ }),

/***/ "./src/class/Util/List.ts":
/*!********************************!*\
  !*** ./src/class/Util/List.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.List = void 0;\r\nclass List {\r\n    _elements = [];\r\n    Add(el) {\r\n        if (this.Contains(el))\r\n            return;\r\n        this._elements.push(el);\r\n    }\r\n    Remove(el) {\r\n        if (!this.Contains(el))\r\n            return;\r\n        this.RemoveAt(this.IndexOf(el));\r\n    }\r\n    RemoveAt(idx) {\r\n        this._elements.splice(idx, 1);\r\n    }\r\n    Clear() {\r\n        this._elements = [];\r\n    }\r\n    Contains(el) {\r\n        return this._elements.includes(el);\r\n    }\r\n    IndexOf(el) {\r\n        return this._elements.indexOf(el);\r\n    }\r\n    At(idx) {\r\n        return this._elements[idx];\r\n    }\r\n    *[Symbol.iterator]() {\r\n        for (var el of this._elements)\r\n            yield el;\r\n    }\r\n    Filter(predicate, thisArg) {\r\n        return this._elements.filter(predicate, thisArg);\r\n    }\r\n    Copy() {\r\n        var copy = new List();\r\n        Object.assign(copy._elements, this._elements);\r\n        return copy;\r\n    }\r\n    get Length() { return this._elements.length; }\r\n}\r\nexports.List = List;\r\n\n\n//# sourceURL=webpack://src/./src/class/Util/List.ts?");

/***/ }),

/***/ "./src/class/Util/Vector.ts":
/*!**********************************!*\
  !*** ./src/class/Util/Vector.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Vector2 = void 0;\r\nclass Vector2 {\r\n    X = 0;\r\n    Y = 0;\r\n    static get Zero() { return new Vector2(0, 0); }\r\n    static get One() { return new Vector2(1, 1); }\r\n    static get Left() { return new Vector2(-1, 0); }\r\n    static get Right() { return new Vector2(1, 0); }\r\n    static get Up() { return new Vector2(0, 1); }\r\n    static get Down() { return new Vector2(0, -1); }\r\n    static Random() {\r\n        return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);\r\n    }\r\n    static FromArray(array) {\r\n        return new Vector2(array[0] || 0, array[1] || 0);\r\n    }\r\n    constructor(x = 0, y = 0) {\r\n        this.X = x;\r\n        this.Y = y;\r\n    }\r\n    WithX(x) {\r\n        return new Vector2(x, this.Y);\r\n    }\r\n    WithY(y) {\r\n        return new Vector2(this.X, y);\r\n    }\r\n    DistanceTo(point, squared = false) {\r\n        var x = this.X - point.X;\r\n        var y = this.Y - point.Y;\r\n        if (squared)\r\n            return x * x + y * y;\r\n        return Math.sqrt(x * x + y * y);\r\n    }\r\n    get Length() {\r\n        return Math.sqrt(this.X * this.X + this.Y * this.Y);\r\n    }\r\n    Normalize() {\r\n        var length = this.Length;\r\n        if (length == 0)\r\n            return new Vector2();\r\n        return new Vector2(this.X / length, this.Y / length);\r\n    }\r\n    WithLength(length) {\r\n        var normalized = this.Normalize();\r\n        return normalized.Scale(length);\r\n    }\r\n    ProjectOn(vector) {\r\n        var dot = this.Dot(vector);\r\n        var length = vector.Length;\r\n        return dot / length;\r\n    }\r\n    Dot(vector) {\r\n        return this.X * vector.X + this.Y * vector.Y;\r\n    }\r\n    /**\r\n     * Adds another vector to us and returns the result\r\n     */\r\n    Add(vector) {\r\n        return new Vector2(this.X + vector.X, this.Y + vector.Y);\r\n    }\r\n    Scale(scale) {\r\n        if (scale instanceof Vector2)\r\n            return new Vector2(this.X * scale.X, this.Y * scale.Y);\r\n        return new Vector2(this.X * scale, this.Y * scale);\r\n    }\r\n    Divide(scale) {\r\n        if (scale instanceof Vector2)\r\n            return new Vector2(this.X / scale.X, this.Y / scale.Y);\r\n        return new Vector2(this.X / scale, this.Y / scale);\r\n    }\r\n    /**\r\n     * Subtracts another vector from us and returns the result\r\n     */\r\n    Subtract(vector) {\r\n        return new Vector2(this.X - vector.X, this.Y - vector.Y);\r\n    }\r\n    toString() {\r\n        return `Vector2[${Math.round(this.X * 100) / 100}, ${Math.round(this.Y * 100) / 100}]`;\r\n        // return `Vector2[${this.X}, ${this.Y}]`;\r\n    }\r\n    IsEqual(vector) {\r\n        return this.X == vector.X && this.Y == vector.Y;\r\n    }\r\n    IsNearlyEqual(vector, delta = 0.001) {\r\n        return Math.abs(this.X - vector.X) < delta && Math.abs(this.Y - vector.Y) < delta;\r\n    }\r\n    Min(vector) {\r\n        return new Vector2(Math.min(this.X, vector.X), Math.min(this.Y, vector.Y));\r\n    }\r\n    Max(vector) {\r\n        return new Vector2(Math.max(this.X, vector.X), Math.max(this.Y, vector.Y));\r\n    }\r\n    Lerp(vector, t) {\r\n        return new Vector2(this.X + (vector.X - this.X) * t, this.Y + (vector.Y - this.Y) * t);\r\n    }\r\n    Abs() {\r\n        return new Vector2(Math.abs(this.X), Math.abs(this.Y));\r\n    }\r\n    AngleDifference(vector) {\r\n        return vector.Angle() - this.Angle();\r\n    }\r\n    Angle() {\r\n        return Math.atan2(this.Y, this.X);\r\n    }\r\n    Copy() {\r\n        return new Vector2(this.X, this.Y);\r\n    }\r\n}\r\nexports.Vector2 = Vector2;\r\n\n\n//# sourceURL=webpack://src/./src/class/Util/Vector.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Chess_1 = __webpack_require__(/*! ./class/Chess */ \"./src/class/Chess.ts\");\r\nconst g_Chess = new Chess_1.Chess();\r\n\n\n//# sourceURL=webpack://src/./src/index.ts?");

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