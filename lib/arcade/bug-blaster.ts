/**
 * BUG BLASTER
 * Original Space-Invaders-style pixel arcade game.
 * Pure Canvas 2D, zero external assets, fixed timestep loop, < 15KB.
 */

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type BugType = "NullPointer" | "RaceCondition" | "MemoryLeak";

export interface Bug extends Rect {
  type: BugType;
  hp: number;
  maxHp: number;
  points: number;
  color: string;
  alive: boolean;
  baseX: number;
}

export interface Bullet extends Rect {
  dy: number;
  fromPlayer: boolean;
  alive: boolean;
}

export interface PowerUp extends Rect {
  type: "coffee" | "tryCatch";
  dy: number;
  alive: boolean;
}

export interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function checkAABB(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function calculateBugScore(type: BugType, wave: number): number {
  const base = type === "NullPointer" ? 100 : type === "RaceCondition" ? 150 : 250;
  return base + (wave - 1) * 25;
}

export function createBugWave(waveNumber: number): Bug[] {
  const bugs: Bug[] = [];
  const rows = Math.min(4, 3 + Math.floor((waveNumber - 1) / 2));
  const cols = 6;
  const startX = 50;
  const startY = 60;
  const spacingX = 64;
  const spacingY = 44;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let type: BugType = "NullPointer";
      let hp = 1;
      let color = "#D97757"; // Coral / NullPointer

      if (r === 0) {
        type = "MemoryLeak";
        hp = 2;
        color = "#27C93F"; // Green / Memory Leak
      } else if (r === 1) {
        type = "RaceCondition";
        hp = 1;
        color = "#FFBD2E"; // Amber / Race Condition
      }

      const x = startX + c * spacingX;
      const y = startY + r * spacingY;

      bugs.push({
        x,
        y,
        baseX: x,
        width: 30,
        height: 22,
        type,
        hp,
        maxHp: hp,
        points: calculateBugScore(type, waveNumber),
        color,
        alive: true,
      });
    }
  }
  return bugs;
}

export class BugBlasterGame {
  public width = 480;
  public height = 600;
  public score = 0;
  public lives = 3;
  public wave = 1;
  public gameOver = false;
  public victory = false;
  public isPaused = false;
  public hasShield = false;
  public coffeeTimer = 0;

  public player: Rect = { x: 220, y: 540, width: 36, height: 22 };
  public playerSpeed = 6;
  public bugs: Bug[] = [];
  public bullets: Bullet[] = [];
  public powerUps: PowerUp[] = [];
  public particles: Particle[] = [];

  private bugDirection = 1;
  private bugSpeed = 1.0;
  private bugStepDown = 12;
  private fireCooldown = 0;
  private audioCallback?: (sound: "laser" | "hit" | "powerup" | "explosion") => void;

  constructor(audioCb?: (sound: "laser" | "hit" | "powerup" | "explosion") => void) {
    this.audioCallback = audioCb;
    this.reset();
  }

  public reset(): void {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;
    this.gameOver = false;
    this.victory = false;
    this.isPaused = false;
    this.hasShield = false;
    this.coffeeTimer = 0;
    this.player = { x: 220, y: 540, width: 36, height: 22 };
    this.playerSpeed = 6;
    this.bullets = [];
    this.powerUps = [];
    this.particles = [];
    this.bugDirection = 1;
    this.bugSpeed = 1.0;
    this.bugs = createBugWave(this.wave);
  }

  public moveLeft(): void {
    const speed = this.coffeeTimer > 0 ? this.playerSpeed * 1.3 : this.playerSpeed;
    this.player.x = Math.max(10, this.player.x - speed);
  }

  public moveRight(): void {
    const speed = this.coffeeTimer > 0 ? this.playerSpeed * 1.3 : this.playerSpeed;
    this.player.x = Math.min(this.width - this.player.width - 10, this.player.x + speed);
  }

  public shoot(): void {
    if (this.fireCooldown > 0 || this.gameOver || this.isPaused) return;

    this.bullets.push({
      x: this.player.x + this.player.width / 2 - 2,
      y: this.player.y - 8,
      width: 4,
      height: 12,
      dy: -10,
      fromPlayer: true,
      alive: true,
    });

    this.fireCooldown = this.coffeeTimer > 0 ? 9 : 18;
    this.audioCallback?.("laser");
  }

  public update(): void {
    if (this.gameOver || this.isPaused) return;

    if (this.fireCooldown > 0) this.fireCooldown--;
    if (this.coffeeTimer > 0) this.coffeeTimer--;

    // Move player bullets
    for (const b of this.bullets) {
      b.y += b.dy;
      if (b.y < -20 || b.y > this.height + 20) b.alive = false;
    }

    // Move bugs horizontally & check edge bounce
    let hitEdge = false;
    const livingBugs = this.bugs.filter((b) => b.alive);

    if (livingBugs.length === 0) {
      // Wave completed!
      this.wave++;
      this.bugSpeed = 1.0 + this.wave * 0.3;
      this.bugs = createBugWave(this.wave);
      this.audioCallback?.("powerup");
      return;
    }

    for (const b of livingBugs) {
      b.x += this.bugDirection * this.bugSpeed;
      if (b.x <= 15 || b.x + b.width >= this.width - 15) {
        hitEdge = true;
      }
      // Bug reaches player level -> Instant game over
      if (b.y + b.height >= this.player.y) {
        this.lives = 0;
        this.gameOver = true;
        this.audioCallback?.("explosion");
      }
    }

    if (hitEdge) {
      this.bugDirection *= -1;
      for (const b of livingBugs) {
        b.y += this.bugStepDown;
      }
    }

    // Occasional enemy bullet fire
    if (Math.random() < 0.02 + this.wave * 0.005 && livingBugs.length > 0) {
      const shooter = livingBugs[Math.floor(Math.random() * livingBugs.length)];
      this.bullets.push({
        x: shooter.x + shooter.width / 2 - 2,
        y: shooter.y + shooter.height,
        width: 4,
        height: 10,
        dy: 4 + Math.min(4, this.wave * 0.5),
        fromPlayer: false,
        alive: true,
      });
    }

    // Bullet vs Bug collisions
    for (const b of this.bullets.filter((bl) => bl.alive && bl.fromPlayer)) {
      for (const bug of livingBugs) {
        if (checkAABB(b, bug)) {
          b.alive = false;
          bug.hp--;
          this.audioCallback?.("hit");

          if (bug.hp <= 0) {
            bug.alive = false;
            this.score += bug.points;
            this.createExplosion(bug.x + bug.width / 2, bug.y + bug.height / 2, bug.color);

            // Chance to drop powerup
            if (Math.random() < 0.18) {
              const pType: "coffee" | "tryCatch" = Math.random() < 0.5 ? "coffee" : "tryCatch";
              this.powerUps.push({
                x: bug.x + bug.width / 2 - 8,
                y: bug.y + bug.height,
                width: 16,
                height: 16,
                type: pType,
                dy: 2,
                alive: true,
              });
            }
          }
          break;
        }
      }
    }

    // Bullet vs Player collisions
    for (const b of this.bullets.filter((bl) => bl.alive && !bl.fromPlayer)) {
      if (checkAABB(b, this.player)) {
        b.alive = false;
        if (this.hasShield) {
          this.hasShield = false;
          this.audioCallback?.("hit");
          this.createExplosion(this.player.x + 18, this.player.y + 10, "#4D7C79");
        } else {
          this.lives--;
          this.audioCallback?.("explosion");
          this.createExplosion(this.player.x + 18, this.player.y + 10, "#D97757");
          if (this.lives <= 0) {
            this.gameOver = true;
          }
        }
      }
    }

    // Powerup movement and collection
    for (const p of this.powerUps) {
      p.y += p.dy;
      if (p.y > this.height) p.alive = false;
      if (checkAABB(p, this.player)) {
        p.alive = false;
        this.audioCallback?.("powerup");
        if (p.type === "coffee") {
          this.coffeeTimer = 480; // ~8 seconds at 60fps
          this.score += 50;
        } else {
          this.hasShield = true;
          this.score += 50;
        }
      }
    }

    // Filter alive entities
    this.bullets = this.bullets.filter((b) => b.alive);
    this.powerUps = this.powerUps.filter((p) => p.alive);

    // Particles update
    for (const pt of this.particles) {
      pt.x += pt.dx;
      pt.y += pt.dy;
      pt.life++;
    }
    this.particles = this.particles.filter((pt) => pt.life < pt.maxLife);
  }

  private createExplosion(x: number, y: number, color: string): void {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      this.particles.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 20 + Math.random() * 15,
        color,
      });
    }
  }

  public render(ctx: CanvasRenderingContext2D, isLowPerf = false): void {
    // Clear retro dark background
    ctx.fillStyle = "#141312";
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw Subtle Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Draw Player Ship (Debugger Terminal Ship)
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(this.player.x + 14, this.player.y, 8, 4); // tip
    ctx.fillStyle = "#D97757"; // Coral accent
    ctx.fillRect(this.player.x + 8, this.player.y + 4, 20, 10); // hull
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(this.player.x, this.player.y + 12, 36, 6); // base wings
    ctx.fillStyle = "#27C93F";
    ctx.fillRect(this.player.x + 16, this.player.y + 8, 4, 4); // engine core

    // Try/Catch Shield Aura
    if (this.hasShield) {
      ctx.strokeStyle = "#4D7C79";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        24,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    // Draw Bugs
    for (const bug of this.bugs.filter((b) => b.alive)) {
      ctx.fillStyle = bug.color;
      // Pixel bug body
      ctx.fillRect(bug.x + 4, bug.y + 4, bug.width - 8, bug.height - 8);
      // Bug antennae
      ctx.fillRect(bug.x + 2, bug.y, 4, 4);
      ctx.fillRect(bug.x + bug.width - 6, bug.y, 4, 4);
      // Bug legs
      ctx.fillRect(bug.x, bug.y + 8, 3, 6);
      ctx.fillRect(bug.x + bug.width - 3, bug.y + 8, 3, 6);
      ctx.fillRect(bug.x + 2, bug.y + bug.height - 3, 4, 3);
      ctx.fillRect(bug.x + bug.width - 6, bug.y + bug.height - 3, 4, 3);
      // Eyes
      ctx.fillStyle = "#141312";
      ctx.fillRect(bug.x + 8, bug.y + 8, 3, 3);
      ctx.fillRect(bug.x + bug.width - 11, bug.y + 8, 3, 3);
    }

    // Draw Bullets
    for (const b of this.bullets) {
      ctx.fillStyle = b.fromPlayer ? "#FFBD2E" : "#D97757";
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    // Draw Power-ups
    for (const p of this.powerUps) {
      if (p.type === "coffee") {
        ctx.fillStyle = "#D97757";
        ctx.fillRect(p.x + 2, p.y + 2, 12, 12);
        ctx.fillStyle = "#FAF8F5";
        ctx.font = "8px monospace";
        ctx.fillText("☕", p.x + 3, p.y + 11);
      } else {
        ctx.fillStyle = "#4D7C79";
        ctx.fillRect(p.x + 2, p.y + 2, 12, 12);
        ctx.fillStyle = "#FAF8F5";
        ctx.font = "8px monospace";
        ctx.fillText("🛡️", p.x + 3, p.y + 11);
      }
    }

    // Draw Particles (skip in low performance mode)
    if (!isLowPerf) {
      for (const pt of this.particles) {
        ctx.fillStyle = pt.color;
        const size = Math.max(1, 3 * (1 - pt.life / pt.maxLife));
        ctx.fillRect(pt.x, pt.y, size, size);
      }
    }

    // HUD Header Bar
    ctx.fillStyle = "rgba(20, 19, 18, 0.85)";
    ctx.fillRect(0, 0, this.width, 34);
    ctx.strokeStyle = "#383531";
    ctx.strokeRect(0, 0, this.width, 34);

    ctx.fillStyle = "#FAF8F5";
    ctx.font = "12px monospace";
    ctx.fillText(`SCORE: ${this.score}`, 16, 22);
    ctx.fillText(`WAVE: ${this.wave}`, 190, 22);

    // Lives icons
    ctx.fillText(`LIVES:`, 360, 22);
    for (let l = 0; l < this.lives; l++) {
      ctx.fillStyle = "#D97757";
      ctx.fillRect(415 + l * 14, 13, 8, 8);
    }

    // Active Coffee Boost Indicator
    if (this.coffeeTimer > 0) {
      ctx.fillStyle = "#FFBD2E";
      ctx.font = "10px monospace";
      ctx.fillText(`☕ TURBO BOOST`, 16, 50);
    }

    // Game Over Overlay
    if (this.gameOver) {
      ctx.fillStyle = "rgba(20, 19, 18, 0.88)";
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = "#D97757";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("SYSTEM CRASH", this.width / 2, 240);

      ctx.fillStyle = "#FAF8F5";
      ctx.font = "14px monospace";
      ctx.fillText(`FINAL SCORE: ${this.score}`, this.width / 2, 280);
      ctx.fillText(`WAVES CLEARED: ${this.wave - 1}`, this.width / 2, 306);

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
      ctx.fillText("SYSTEM PAUSED", this.width / 2, 280);
      ctx.font = "12px monospace";
      ctx.fillText("PRESS P OR ESC TO RESUME", this.width / 2, 310);
      ctx.textAlign = "left";
    }
  }
}
