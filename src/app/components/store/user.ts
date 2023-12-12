"use client";

import { atom, selector } from 'recoil';
import { generateKey } from '../../utils/recoil';
import { hooksState } from './hooks';
import { UserProfile } from '../@types/user';

export const userSelector = selector<UserProfile | undefined>({
  key: generateKey('userProfile'),
  get: async ({ get }) => {
    const user: UserProfile | undefined = await get(hooksState).getUser();
    return user;
  },
});

export const userState = atom<UserProfile | undefined>({
  key: generateKey('user'),
  default: undefined,
});
