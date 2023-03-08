import "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    id: string;
    userId: number;
  }

  interface Session {
    user: User;
  }
}
