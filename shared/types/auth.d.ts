declare module "#auth-utils" {
  interface User {
    id: string;
    username: string;
    avatar: string | null;
    admin: boolean;
    createdAt: Date;
  }
}

export {};
