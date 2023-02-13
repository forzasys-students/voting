export interface Creator {
  id: string;
  name: string;
  profile_image?: any;
}

export interface Player {
  id: number;
  type: string;
  value: string;
}

export interface Team {
  id: number;
  type: string;
  value: string;
}

export interface Tag {
  action: string;
  player: Player;
  team: Team;
}

export interface Event {
  content_source: string;
  description: string;
  from_timestamp: number;
  id: number;
  recording_timestamp: Date;
  tags: Tag[];
  to_timestamp: number;
  video_asset_id: number;
  video_asset_name: string;
}

export interface HomeTeam {
  coach?: any;
  id: number;
  import_id: number;
  import_source: string;
  logo_url: string;
  name: string;
  short_name: string;
}

export interface Tournament {
  id: number;
  league_name: string;
  name: string;
}

export interface VisitingTeam {
  coach?: any;
  id: number;
  import_id: number;
  import_source: string;
  logo_url: string;
  name: string;
  short_name: string;
}

export interface Game {
  attendance: number;
  date: string;
  end_of_1st_half: Date;
  end_of_1st_overtime?: any;
  end_of_2nd_half: Date;
  end_of_2nd_overtime?: any;
  everysport_id?: any;
  extra_referees?: any;
  finished_time: Date;
  home_team: HomeTeam;
  home_team_goals: number;
  id: number;
  import_id: string;
  import_source: string;
  is_available_publicly: boolean;
  officially_closed: boolean;
  phase: string;
  public_release_timestamp: Date;
  referee_external_id?: any;
  referee_name?: any;
  round: number;
  stadium_name?: any;
  start_of_1st_half: Date;
  start_of_1st_overtime?: any;
  start_of_2nd_half: Date;
  start_of_2nd_overtime?: any;
  start_of_penalties?: any;
  start_time: Date;
  stop_periods: any[];
  tournament: Tournament;
  tournament_id: number;
  tournament_name: string;
  visiting_team: VisitingTeam;
  visiting_team_goals: number;
}

export interface Playlist {
  creator: Creator;
  date: Date;
  description: string;
  duration_ms: number;
  events: Event[];
  frontend_url: string;
  game: Game;
  hd_thumbnail_override_url?: any;
  hd_thumbnail_url: string;
  id: string;
  is_accessible: boolean;
  is_available_publicly: boolean;
  is_live: boolean;
  is_placeholder: boolean;
  is_private: boolean;
  minified_frontend_url: string;
  postrolls: any[];
  prerolls: any[];
  public_release_timestamp: Date;
  rating: number;
  thumbnail_override_url?: any;
  thumbnail_url: string;
  usergroups_view: any[];
  video_url: string;
  view_count: number;
}

export interface Response {
  playlists: Playlist[];
  total: number;
}
