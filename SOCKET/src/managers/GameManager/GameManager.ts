import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IRoom } from "./interfaces/IRoom";

const MAX_PLAYERS = 5;
const ROOM_COUNTDOWN = 10;
const FETCHING_QUESTIONS_COUNTDOWN = 10;
const QUESTION_COUNTDOWN = 10;

class GameManager {
  public rooms: IRoom;
  private roomNumber: number;
  public roomsQueue: string[];
  private io?: Server<DefaultEventsMap, any>;

  constructor(io?: Server<DefaultEventsMap, any>) {
    this.rooms = {};
    this.roomNumber = 0;
    this.roomsQueue = [];
    this.io = io;
  }

  JoinRoom(socket: any, player?: any) {
    if (!socket || !this.io) {
      console.error("Socket or IO is not defined!");
      return;
    }

    const newPlayer = {
      socket_id: socket.id,
      username: player.username,
      current_avatar: player.current_avatar,
      points: 1,
      selectedAnswer: "",
    };

    for (let i = 0; i < this.roomsQueue.length; i++) {
      let room = this.roomsQueue[i];
      if (this.rooms[room] && this.rooms[room].users!.length < MAX_PLAYERS) {
        socket.join(room);
        this.rooms[room].users!.push(newPlayer);
        console.log(`User with ID ${socket.id} joined ${room}`);
        if (this.rooms[room].users!.length === MAX_PLAYERS) {
          console.log(`${room} is full`);
          this.clearRoomTimer(room);
          this.startFetchQuestionCountdown(room);
          this.fillsWithBots(room);
          this.roomsQueue.splice(i, 1);
          i--;
        }
        return;
      }
    }

    let room = `room${this.roomNumber++}`;
    socket.join(room);
    this.roomsQueue.push(room);
    this.rooms[room] = {
      users: [newPlayer],
    };
    console.log(`User with ID ${socket.id} joined ${room}`);
    this.startRoomCountdown(room);
  }

  startRoomCountdown(room: string) {
    this.rooms[room].roomCountdown = ROOM_COUNTDOWN;
    this.rooms[room].roomCountdownTimer = setInterval(() => {
      this.rooms[room].roomCountdown!--;

      this.io?.to(room).emit("WAITING PLAYERS", {
        room: {
          name: room,
          countdown: this.rooms[room].roomCountdown,
          users: this.rooms[room].users,
        },
        type: "WAITING PLAYERS",
      });

      if (this.rooms[room].roomCountdown === 0) {
        clearInterval(this.rooms[room].roomCountdownTimer!);
        this.fillsWithBots(room);
        this.startFetchQuestionCountdown(room);
      }
    }, 1000);
  }

  startFetchQuestionCountdown(room: string) {
    this.rooms[room].fetchingQuestionsCountdown = FETCHING_QUESTIONS_COUNTDOWN;
    this.rooms[room].fetchingQuestionsCountdownTimer = setInterval(() => {
      this.rooms[room].fetchingQuestionsCountdown!--;
      this.io?.to(room).emit("WAITING PLAYERS", {
        room: {
          name: room,
          countdown: this.rooms[room].fetchingQuestionsCountdown,
          users: this.rooms[room].users,
        },
        type: "FETCHING QUESTIONS",
      });

      if (this.rooms[room].fetchingQuestionsCountdown === 0) {
        clearInterval(this.rooms[room].fetchingQuestionsCountdownTimer!);
        this.io?.to(room).emit("GAME START");
        this.startQuestionTimer(room);
      }
    }, 1000);
  }

  startQuestionTimer(room: string) {
    this.rooms[room].questionCountdown = QUESTION_COUNTDOWN;
    this.rooms[room].questionCountdownTimer = setInterval(() => {
      this.rooms[room].questionCountdown!--;
      this.io?.to(room).emit("PLAYING", {
        room: {
          name: room,
          countdown: this.rooms[room].questionCountdown,
        },
        type: "PLAYING",
      });

      if (this.rooms[room].questionCountdown === 0) {
        clearInterval(this.rooms[room].questionCountdownTimer);
      }
    }, 1000);
  }

  startRevealingAnswersCountdown(room: string) {
    this.rooms[room].isRevealingAnswers = true;
    if (this.rooms[room].isRevealingAnswers) {
      this.rooms[room].revealingAnswers = QUESTION_COUNTDOWN;
      this.rooms[room].revealingAnswersTimer = setInterval(() => {
        this.rooms[room].revealingAnswers!--;
        this.io?.to(room).emit("PLAYING", {
          room: {
            name: room,
            countdown: this.rooms[room].revealingAnswers,
          },
          type: "FETCHING NEXT QUESTION",
        });

        if (this.rooms[room].revealingAnswers === 0) {
          clearInterval(this.rooms[room].revealingAnswersTimer!);
          this.io?.to(room).emit("NEXT QUESTION");
        }
      }, 1000);
    }
  }

  clearQuestionTimer(room: string) {
    clearInterval(this.rooms[room].questionCountdownTimer);
  }

  clearRoomTimer(room: string) {
    clearInterval(this.rooms[room].roomCountdownTimer);
  }

  clearRevealingAnswersTimer(room: string) {
    clearInterval(this.rooms[room].revealingAnswersTimer);
  }

  fillsWithBots(room: string) {
    for (let i = this.rooms[room].users!.length; i < MAX_PLAYERS; i++) {
      this.rooms[room].users!.push({
        socket_id: `bot_${i}`,
        username: `Bot ${i}`,
        current_avatar: 0,
        points: 1,
        selectedAnswer: "",
      });
    }
  }

  playerSelectAnswer(
    room: string,
    username: string,
    selectedAnswer: string,
    countdown: number
  ) {
    if (room === "" || selectedAnswer === "") {
      return;
    }
    let user;
    user = this.rooms[room].users!.find((item) => item.username === username);
    const newUser = {
      ...user,
      selectedAnswer,
      selectTimeAnswer: countdown,
    };

    //@ts-ignore
    this.rooms[room].users = this.rooms[room].users.map((item) =>
      item.username === username ? newUser : item
    );
  }

  botsSelectAnswer(room: string, answers: string[]) {
    if (room === "") {
      return;
    }
    const bots = this.rooms[room].users!.filter((item) =>
      item.socket_id?.includes("bot_")
    );
    for (const bot of bots) {
      const newBot = {
        ...bot,
        selectedAnswer: answers[Math.floor(Math.random() * answers.length)],
        selectTimeAnswer:
          Math.floor(Math.random() * (QUESTION_COUNTDOWN - 1)) + 1,
      };
      this.rooms[room].users = this.rooms[room].users!.map((item) =>
        item.socket_id === bot.socket_id ? newBot : item
      );
    }
    this.io?.to(room).emit("RETURN ANSWERS", {
      users: this.rooms[room].users,
    });
  }

  distributePoints(room: string, users: any, correctAnswer: any) {
    if (room === "") {
      return;
    }
    for (const user of users) {
      if (user.selectedAnswer === correctAnswer) {
        const newUser = {
          ...user,
          points: user.points + 10 * user.selectTimeAnswer,
        };
        this.rooms[room].users = this.rooms[room].users!.map((item) =>
          item.username === user.username ? newUser : item
        );
      }
    }
    this.io?.to(room).emit("RETURN POINTS", {
      users: this.rooms[room].users,
    });
  }

  leaveRoom(socket: any) {
    if (!socket || !this.io) {
      console.error("Socket or IO is not defined!");
      return;
    }

    for (let room in this.rooms) {
      if (this.rooms[room]) {
        this.rooms[room].users = this.rooms[room].users!.filter(
          (item) => item.socket_id !== socket.id
        );
        socket.leave(room);
        console.log(`User with ID ${socket.id} left ${room}`);
        if (
          !this.rooms[room].users!.some(
            (item) => !item.username.startsWith("Bot")
          )
        ) {
          this.rooms[room].users = this.rooms[room].users!.filter(
            (item) => !item.username.startsWith("Bot")
          );
          console.log(`Bots Leave ${room}`);
        }
        if (this.rooms[room].users!.length === 0) {
          clearInterval(this.rooms[room].roomCountdownTimer);
          clearInterval(this.rooms[room].fetchingQuestionsCountdownTimer);
          clearInterval(this.rooms[room].revealingAnswersTimer);
          delete this.rooms[room];
          this.roomsQueue = this.roomsQueue.filter((roomId) => roomId !== room);
          console.log(`${room} is deleted`);
        } else {
          if (this.rooms[room].users!.length < MAX_PLAYERS) {
            if (!this.roomsQueue.includes(room)) {
              console.log(`${room} added to queue`);
              this.roomsQueue.unshift(room);
            }
          }
        }
      }
    }
  }
}

export default GameManager;
