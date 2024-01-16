import "next-auth";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: User;
    role?: string;
  }
}