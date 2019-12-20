import Rankings from "./modules/Rankings";
import Competitions from "./modules/Competitions";
import Seasons from "./modules/Seasons";

const rankingState = {};
const competitionState = {};
const seasonsState = {};
const rankings = [];

const controlSearch = async () => {
  const access_level = "trial";
  const version = "v2";
  const language_code = "en";
  //ID that is provide from Competitions.js query
  const competition_id = "sr:competition:132";
  //ID that is provide from Seasons.js query
  const season_id = "sr:season:68176";
  const format = "json";
  const name = "NBA";

  if (access_level) {
    rankingState.search = new Rankings(
      access_level,
      version,
      language_code,
      season_id,
      format
    );
    competitionState.search = new Competitions(
      access_level,
      version,
      language_code,
      format
    );
    seasonsState.search = new Seasons(
      access_level,
      version,
      language_code,
      competition_id,
      format
    );

    try {
      //RANKING QUERY--------------------
      await rankingState.search.getResults();
      console.log("---------RANKINGS---------");
      console.log(rankingState.search.result);
      rankings.all =
        rankingState.search.result.standings[0].groups[0].standings;
      //console.log(rankings.all);
      rankings.teams = rankings.all.map(el => {
        return {
          rank: el.rank,
          team: el.competitor.name
        };
      });
      console.log(rankings.teams);
      //RANKING QUERY----------------END

      //COMPETITION QUERY--------------------
      await competitionState.search.getResults();
      console.log("---------COMPETITIONS---------");
      console.log(competitionState.search.result);
      //COMPETITION QUERY-----------------END

      //SEASONS QUERY--------------------
      await seasonsState.search.getResults();
      console.log("---------SEASONS---------");
      console.log(seasonsState.search.result);
    } catch (error) {
      console.log(error);
      alert("Something went wrong with controlSearch func");
    }
  }
};
window.addEventListener("load", e => {
  e.preventDefault();
  controlSearch();
});
