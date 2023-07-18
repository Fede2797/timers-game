export enum GameState {
   Win = 'W',
   Lose = 'L',
   Idle = 'I',
   Running = 'R',
}

export enum Difficulty {
    Easy   = 'E',
    Normal = 'N',
    Hard   = 'H',
    Pro    = 'P',
}

export enum WinCondition {
    Easy   = 500,
    Normal = 750,
    Hard   = 1000,
    Pro    = 1250,
}