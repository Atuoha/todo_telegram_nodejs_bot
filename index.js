"use strict";

const Telegram = require("telegram-node-bot");
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram(
  "5092273599:AAFHjbabT1f88vK6i1Gm8AAjPi_pAsRXhCA",
  { workers: 1 }
);

const TodoController = require("./controllers/todo"),
  OtherwiseController = require("./controllers/otherwise");

const todoCtrl = new TodoController();

tg.router
  .when(new TextCommand("/add", "addCommand"), todoCtrl)
  .when(new TextCommand("/gettodos", "getCommand"), todoCtrl)
  .when(new TextCommand("/check", "checkCommand"), todoCtrl)
  .otherwise(new OtherwiseController());
