import { JwtPayload } from "jwt-decode";

export default interface UsernameInterface extends JwtPayload {
  username: string;
}
