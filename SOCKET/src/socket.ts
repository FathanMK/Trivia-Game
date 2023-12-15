import { Server } from "socket.io";
import GameManager from "./managers/GameManager/GameManager";

export default function socket(server: any) {
  const io = new Server(server);
  const gameManager = new GameManager(io);

  io.on("connection", (socket: any) => {
    console.log(`User with ID ${socket.id} is connected!`);

    socket.on("JOIN ROOM", (value: any) => {
      gameManager.JoinRoom(socket, value.player);
    });

    socket.on("LEAVE ROOM", () => {
      gameManager.leaveRoom(socket);
    });

    socket.on("RESTART QUESTION TIMER", (value: any) => {
      gameManager.clearQuestionTimer(value.name);
      gameManager.startQuestionTimer(value.name);
    });

    socket.on("START REVEALING ANSWERS", (value: any) => {
      gameManager.clearRevealingAnswersTimer(value.name);
      gameManager.startRevealingAnswersCountdown(value.name);
    });

    socket.on("SELECT ANSWER", (value: any) => {
      gameManager.playerSelectAnswer(
        value.room,
        value.username,
        value.selectedAnswer,
        value.selectTimeAnswer
      );
    });

    socket.on("BOTS SELECT ANSWER", (value: any) => {
      gameManager.botsSelectAnswer(value.room, value.answers);
    });

    socket.on("DISTRIBUTE POINTS", (value: any) => {
      gameManager.distributePoints(
        value.room,
        value.users,
        value.correctAnswer
      );
    });

    socket.on("disconnect", () => {
      gameManager.leaveRoom(socket);
      console.log(`User with ID ${socket.id} is disconnected!`);
    });
  });
}
