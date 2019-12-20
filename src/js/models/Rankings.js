import axios from "axios";
import { key } from "../config";

export default class Rankings {
  constructor(access_level, version, language_code, season_id, format) {
    this.access_level = access_level;
    this.version = version;
    this.language_code = language_code;
    this.season_id = season_id;
    this.format = format;
  }
  async getResults(access_level, version, language_code, season_id, format) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      //saving promise result to res variable
      const res = await axios(
        //`${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
        `${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
      );
      this.result = res.data;
    } catch (error) {
      console.log(error);
      alert("Problem with Standing func");
    }
  }
}
