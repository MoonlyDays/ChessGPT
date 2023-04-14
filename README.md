# ChessGPT

## What is this?

An experimental project the idea of which is to simulate a game of chess with ChatGPT neural network being the opponent. When player, which is playing as White, makes a move, a prompt is issued to ChatGPT with the information describing which cell they moved from and which cell they moved their piece to. This message is then processed by the AI and it should return a response containing the cells that ChatGPT wants to move from and to. An interactive board displays the current state of the board.

## How to play?

You can play it [here](https://moonlydays.github.io/ChessGPT). You will need a ChatGPT API token. You can get one [here](https://platform.openai.com/account/api-keys).

## How to install?

This project is built using Node.JS. To install all the necessary modules run:

```
npm install
```

To bundle all the scripts files together run 

```
npm run build
```

This will generate the script file that will be used to run the game.

Now just open index.html file in any browser, input your ChatGPT API token in the bottom right field and play the game of chess against ChatGPT.