import IMatch from '../Interfaces/IMatches';
import ILeaderboard from '../Interfaces/ILeaderboard';

const teamInfos = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTeamInfos = () => {
  teamInfos.totalPoints = 0;
  teamInfos.totalGames = 0;
  teamInfos.totalVictories = 0;
  teamInfos.totalDraws = 0;
  teamInfos.totalLosses = 0;
  teamInfos.goalsFavor = 0;
  teamInfos.goalsOwn = 0;
  teamInfos.goalsBalance = 0;
  teamInfos.efficiency = 0;
};

const addVictoriesHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalPoints += 3;
  teamInfos.totalVictories += 1;
  teamInfos.goalsFavor += homeTeamGoals;
  teamInfos.goalsOwn += awayTeamGoals;
};

const addVictoriesAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalPoints += 3;
  teamInfos.totalVictories += 1;
  teamInfos.goalsFavor += awayTeamGoals;
  teamInfos.goalsOwn += homeTeamGoals;
};

const addDrawsHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalPoints += 1;
  teamInfos.totalDraws += 1;
  teamInfos.goalsFavor += homeTeamGoals;
  teamInfos.goalsOwn += awayTeamGoals;
};

const addDrawsAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalPoints += 1;
  teamInfos.totalDraws += 1;
  teamInfos.goalsFavor += awayTeamGoals;
  teamInfos.goalsOwn += homeTeamGoals;
};

const addLosesHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalLosses += 1;
  teamInfos.goalsFavor += homeTeamGoals;
  teamInfos.goalsOwn += awayTeamGoals;
};

const addLosesAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamInfos.totalLosses += 1;
  teamInfos.goalsFavor += awayTeamGoals;
  teamInfos.goalsOwn += homeTeamGoals;
};

const teamEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return Number(efficiency).toFixed(2);
};

const totalPointsHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) addVictoriesHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDrawsHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) addLosesHome(homeTeamGoals, awayTeamGoals);
  });
};

const totalPointsAway = (matches: IMatch[]): void => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }): void => {
    if (homeTeamGoals < awayTeamGoals) addVictoriesAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDrawsAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals > awayTeamGoals) addLosesAway(homeTeamGoals, awayTeamGoals);
  });
};

const scoreboardTeamHome = (name: string, matches: IMatch[]) => {
  if (name !== teamInfos.name) resetTeamInfos();
  teamInfos.name = name;
  totalPointsHome(matches);
  teamInfos.totalGames += 1;
  teamInfos.goalsBalance = teamInfos.goalsFavor - teamInfos.goalsOwn;
  const efficiency = teamEfficiency(teamInfos.totalPoints, teamInfos.totalGames);
  teamInfos.efficiency = Number(efficiency);

  return teamInfos;
};

const scoreboardTeamAway = (name: string, matches: IMatch[]) => {
  if (name !== teamInfos.name) resetTeamInfos();
  teamInfos.name = name;
  totalPointsAway(matches);
  teamInfos.totalGames += 1;
  teamInfos.goalsBalance = teamInfos.goalsFavor - teamInfos.goalsOwn;
  const efficiency = teamEfficiency(teamInfos.totalPoints, teamInfos.totalGames);
  teamInfos.efficiency = Number(efficiency);

  return teamInfos;
};

const classification = (matches: ILeaderboard[]) => matches.sort((teamX, teamY) => (
  teamY.totalPoints - teamX.totalPoints
  || teamY.totalVictories - teamX.totalVictories
  || teamY.goalsBalance - teamX.goalsBalance
  || teamY.goalsFavor - teamX.goalsFavor
  || teamX.goalsOwn - teamY.goalsOwn
));

const createLeaderboard = (homeLeader: ILeaderboard[], awayLeader: ILeaderboard[]) => awayLeader
  .map((elem) => {
    const equals = homeLeader.find((el) => el.name === elem.name);
    if (!equals) return;
    return {
      ...elem,
      totalPoints: elem.totalPoints + equals.totalPoints,
      totalGames: elem.totalGames + equals.totalGames,
      totalVictories: elem.totalVictories + equals.totalVictories,
      totalDraws: elem.totalDraws + equals.totalDraws,
      totalLosses: elem.totalLosses + equals.totalLosses,
      goalsFavor: elem.goalsFavor + equals.goalsFavor,
      goalsOwn: elem.goalsOwn + equals.goalsOwn,
      goalsBalance: elem.goalsBalance + equals.goalsBalance,
      efficiency: (((elem.totalPoints + equals.totalPoints)
      / ((elem.totalGames + equals.totalGames) * 3)) * 100).toFixed(2) };
  });

export {
  scoreboardTeamHome,
  scoreboardTeamAway,
  classification,
  createLeaderboard,
};
