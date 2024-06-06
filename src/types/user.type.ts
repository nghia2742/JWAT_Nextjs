export interface User {
    username: string;
    fullname: string;
    role: string;
    project: string[];
}

export type Users = User[]