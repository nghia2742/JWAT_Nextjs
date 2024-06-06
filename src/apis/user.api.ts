import { Users, User } from '@/types/user.type';
import http from '@/utils/http';

export const getUsers = () => http.get<Users>('users');

export const getUserByUsername = (username: string) => http.get<User>(`users/${username}`);

export const postUser = (user: User) => http.post<User>('users', user);

export const patchUser = (username: string, user: User) => http.patch<User>(`users/${username}`, user);

export const deleteUser = (username: string) => http.delete(`users/${username}`);



