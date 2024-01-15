'use client';

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS = '/portal';

export const PATH_AUTH = {
  login: '/login',
};

export const PATH = {
  root: ROOTS,
  dashboard: path(ROOTS, '/dashboard'),
  containers: path(ROOTS, '/containers'),
  appointments: path(ROOTS, '/appointments'),
  gates: path(ROOTS, '/gate-schedules'),
  vessel: path(ROOTS, '/vessel-schedules'),
  empty: path(ROOTS, '/empty'),
  fight_per_diem: {
    root: path(ROOTS, '/fight-per-diem/archive'),
    screenshot: path(ROOTS, '/fight-per-diem/screenshot'),
    archive: path(ROOTS, '/fight-per-diem/archive'),
  },
  terminals: path(ROOTS, '/terminals'),
  checkout: path(ROOTS, '/checkout'),
  user: {
    root: path(ROOTS, '/user'),
    settings: path(ROOTS, '/user/account'),
    plans: path(ROOTS, '/user/plans'),
  },
};
