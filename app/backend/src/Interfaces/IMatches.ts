export default interface IMatch {
  id: number,
  homeTeam?: number,
  homeTeamGoals: number,
  awayTeam?: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}
