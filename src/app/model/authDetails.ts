export interface AuthDetails {
  type: string;
  token: string;
  refreshToken: string;
  userid: number;
  fullname: string;
  username: string;
  roles: string[];
}
