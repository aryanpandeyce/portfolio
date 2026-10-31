/**
 * PACKET SNAKE
 * Original retro data-packet grid traversal game.
 * The snake is a data stream collecting technologies from Aryan's verified stack.
 * Pure Canvas 2D, zero external assets, fixed timestep loop, < 15KB.
 */

export interface Point {
  x: number;
  y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface TechToken {
  x: number;
  y: number;
  label: string;
  color: string;
}

export const RESUME_TECH_TOKENS: { label: string; color: string }[] = [
  { label: "Go", color: "#00ADD8" },
  { label: "Kafka", color: "#FFBD2E" },
  { label: "K8s", color: "#326CE5" },
  { label: "Java", color: "#D97757" },
  { label: "Redis", color: "#DC382D" },
  { label: "Docker", color: "#2496ED" },
  { label: "Saga", color: "#27C93F" },
  { label: "gRPC", color: "#4D7C79" },
];

export function getNextHeadPosition(head: Point, dir: Direction): Point {
  switch (dir) {
    case "UP":
      return { x: head.x, y: head.y - 1 };
    case "DOWN":
      return { x: head.x, y: head.y + 1 };
    case "LEFT":
      return { x: head.x - 1, y: head.y };
    case "RIGHT":
      return { x: head.x + 1, y: head.y };
  }
}

export function isOppositeDirection(a: Direction, b: Direction): boolean {
  return (
    (a === "UP" && b === "DOWN") ||
    (a === "DOWN" && b === "UP") ||
    (a === "LEFT" && b === "RIGHT") ||
    (a === "RIGHT" && b === "LEFT")
  );
}

export function checkGridCollision(
  p: Point,
  gridCols: number,
  gridRows: number,
  body: Point[]
): boolean {
  // Wall collision
  if (p.x < 0 || p.x >= gridCols || p.y < 0 || p.y >= gridRows) {
    return true;
  }
  // Self collision (exclude tail when moving unless growing)
  for (let i = 0; i < body.length - 1; i++) {
    if (body[i].x === p.x && body[i].y === p.y) {
      return true;
    }
  }
  return false;
}

export class PacketSnakeGame {
  public width = 480;
  public height = 600;
  public cellSize = 20;
  public gridCols = 24;
  public gridRows = 30;

  public score = 0;
  public packetsDelivered = 0;
  public gameOver = false;
  public isPaused = false;

  public snake: Point[] = [
    { x: 12, y: 15 },
    { x: 12, y: 16 },
    { x: 12, y: 17 },
  ];
  public direction: Direction = "UP";
  public nextDirection: Direction = "UP";

  public currentToken: TechToken = { x: 12, y: 8, label: "Go", color: "#00ADD8" };
  private moveInterval = 120; // ms
  private timeSinceLastMove = 0;
  private audioCallback?: (sound: "blip" | "coin" | "hit" | "explosion") => void;

  constructor(audioCb?: (sound: "blip" | "coin" | "hit" | "explosion") => void) {
    this.audioCallback = audioCb;
    this.reset();
  }

  public reset(): void {
    this.score = 0;
    this.packetsDelivered = 0;
    this.gameOver = false;
    this.isPaused = false;
    this.snake = [
      { x: 12, y: 15 },
      { x: 12, y: 16 },
      { x: 12, y: 17 },
    ];
    this.direction = "UP";
    this.nextDirection = "UP";
    this.moveInterval = 120;
    this.timeSinceLastMove = 0;
    this.spawnToken();
  }

  public setDirection(newDir: Direction): void {
    if (!isOppositeDirection(this.direction, newDir)) {
      this.nextDirection = newDir;
    }
  }

  public spawnToken(): void {
    let randX = 0;
    let randY = 0;
    let valid = false;

    while (!valid) {
      randX = Math.floor(Math.random() * (this.gridCols - 2)) + 1;
      randY = Math.floor(Math.random() * (this.gridRows - 4)) + 2;
      valid = !this.snake.some((seg) => seg.x === randX && seg.y === randY);
    }

    const tech =
      RESUME_TECH_TOKENS[this.packetsDelivered % RESUME_TECH_TOKENS.length];
    this.currentToken = {
      x: randX,
      y: randY,
      label: tech.label,
      color: tech.color,
    };
  }

  public update(deltaMs: number): void {
    if (this.gameOver || this.isPaused) return;

    this.timeSinceLastMove += deltaMs;
    if (this.timeSinceLastMove < this.moveInterval) {
      return;
    }
    this.timeSinceLastMove = 0;
    this.direction = this.nextDirection;

    const head = this.snake[0];
    const newHead = getNextHeadPosition(head, this.direction);

    // Check collision with walls or body
    if (checkGridCollision(newHead, this.gridCols, this.gridRows, this.snake)) {
      this.gameOver = true;
      this.audioCallback?.("explosion");
      return;
    }

    this.snake.unshift(newHead);

    // Check tech packet ingestion
    if (newHead.x === this.currentToken.x && newHead.y === this.currentToken.y) {
      this.packetsDelivered++;
      this.score += 100 + Math.floor((120 - this.moveInterval) * 2);
      this.audioCallback?.("coin");

      // Ramp speed slightly
      this.moveInterval = Math.max(65, 120 - this.packetsDelivered * 2);
      this.spawnToken();
    } else {
      this.snake.pop();
    }
  }

  public render(ctx: CanvasRenderingContext2D, isLowPerf = false): void {
    // Background
    ctx.fillStyle = "#141312";
    ctx.fillRect(0, 0, this.width, this.height);

    // Subtle Circuit Grid (skipped in low performance mode)
    if (!isLowPerf) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let c = 0; c < this.gridCols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * this.cellSize, 34);
        ctx.lineTo(c * this.cellSize, this.height);
        ctx.stroke();
      }
      for (let r = 2; r < this.gridRows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * this.cellSize);
        ctx.lineTo(this.width, r * this.cellSize);
        ctx.stroke();
      }
    }

    // Draw Tech Token (Item to collect)
    const token = this.currentToken;
    const px = token.x * this.cellSize;
    const py = token.y * this.cellSize;

    ctx.fillStyle = token.color;
    ctx.fillRect(px + 1, py + 1, this.cellSize - 2, this.cellSize - 2);

    ctx.fillStyle = "#141312";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(token.label, px + this.cellSize / 2, py + this.cellSize / 2 + 3);
    ctx.textAlign = "left";

    // Draw Data Packet Stream (Snake)
    this.snake.forEach((seg, idx) => {
      const sx = seg.x * this.cellSize;
      const sy = seg.y * this.cellSize;

      if (idx === 0) {
        // Packet Header (Head)
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(sx + 1, sy + 1, this.cellSize - 2, this.cellSize - 2);
        ctx.fillStyle = "#D97757";
        ctx.fillRect(sx + 4, sy + 4, this.cellSize - 8, this.cellSize - 8);
      } else {
        // Packet Payload Segments (Body)
        ctx.fillStyle = idx % 2 === 0 ? "#27C93F" : "#4D7C79";
        ctx.fillRect(sx + 2, sy + 2, this.cellSize - 4, this.cellSize - 4);
      }
    });

    // HUD Header Bar
    ctx.fillStyle = "rgba(20, 19, 18, 0.85)";
    ctx.fillRect(0, 0, this.width, 34);
    ctx.strokeStyle = "#383531";
    ctx.strokeRect(0, 0, this.width, 34);

    ctx.fillStyle = "#FAF8F5";
    ctx.font = "12px monospace";
    ctx.fillText(`THROUGHPUT: ${this.score}`, 16, 22);
    ctx.fillText(`PACKETS: ${this.packetsDelivered}`, 240, 22);

    const speedPct = Math.round(((120 - this.moveInterval) / 55) * 100);
    ctx.fillStyle = "#FFBD2E";
    ctx.fillText(`STREAM: ${speedPct}%`, 380, 22);

    // Game Over Overlay
    if (this.gameOver) {
      ctx.fillStyle = "rgba(20, 19, 18, 0.88)";
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = "#D97757";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("PACKET COLLISION", this.width / 2, 240);

      ctx.fillStyle = "#FAF8F5";
      ctx.font = "14px monospace";
      ctx.fillText(`FINAL THROUGHPUT: ${this.score}`, this.width / 2, 280);
      ctx.fillText(`PACKETS INGESTED: ${this.packetsDelivered}`, this.width / 2, 306);

      ctx.fillStyle = "#FFBD2E";
      ctx.font = "12px monospace";
      ctx.fillText("PRESS START / ENTER TO REBOOT", this.width / 2, 350);
      ctx.textAlign = "left";
    }

    // Pause Overlay
    if (this.isPaused && !this.gameOver) {
      ctx.fillStyle = "rgba(20, 19, 18, 0.75)";
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = "#FAF8F5";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText("STREAM PAUSED", this.width / 2, 280);
      ctx.font = "12px monospace";
      ctx.fillText("PRESS P OR ESC TO RESUME", this.width / 2, 310);
      ctx.textAlign = "left";
    }
  }
}
