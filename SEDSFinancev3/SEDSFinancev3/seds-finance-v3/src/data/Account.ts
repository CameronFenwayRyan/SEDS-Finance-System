/**
 * Account datatype
 * 
 * @description This class describes an account that money can be taken out of
 */

export class Account {
  name: string;
  source: string;
  account_type: string;
  project_team: string;
  subteam: string;
  module: string;
  northeastern_account: string;
  budget: number;

  constructor(
    name: string,
    source: string,
    account_type: string,
    project_team: string,
    northeastern_account: string,
    subteam: string = "",
    module: string = "",
    budget: number = 0
  ) {
    this.name = name;
    this.source = source;
    this.account_type = account_type;
    this.project_team = project_team;
    this.subteam = subteam;
    this.module = module;
    this.northeastern_account = northeastern_account;
    this.budget = budget;
  }

  /** Get the icon for the account */
  get_icon(): string{
    return "/assets/" + this.subteam.toLowerCase() + "-logo.png";
  }
}