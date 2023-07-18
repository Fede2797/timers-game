export enum GameState {
   Win     = 'W',
   Lose    = 'L',
   Idle    = 'I',
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

export const ClocksTimers = {
    Easy:   [5000],
    Normal: [5000, 6000],
    Hard:   [5000, 6000, 7000],
    Pro:    [5000, 6000, 7000, 8000],
};