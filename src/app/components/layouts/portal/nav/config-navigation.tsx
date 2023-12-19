'use client';

// routes
import { PATH } from '../../../../routes/paths';
// componentssvg-color
import SvgColor from '../../../../components/svg-color/page';
import { useLocales } from '../locales/page';

// ----------------------------------------------------------------------

// const { translate } = useLocales();

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon('ic_user'),
  vessel: icon('ic_ship'),
  analytics: icon('ic_analytics'),
  containers: icon('ic_package'),
  appointments: icon('ic_menu_item'),
  gate: icon('ic_calendar'),
  dashboard: icon('ic_dashboard'),
  fight_per_diem: icon('ic_file'),
  terminal: icon('ic_shed'),
  empty: icon('ic_empty'),
};

const useGetNavConfig = () => {
  const { translate } = useLocales();

  const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      subheader: String(translate('general')),
      items: [
        {
          title: translate('dashboard'),
          path: PATH.dashboard,
          icon: ICONS.dashboard,
        },
        {
          title: translate('containers'),
          path: PATH.containers,
          icon: ICONS.containers,
        },
        // { title: translate('my_appointments'), path: PATH.appointments, icon: ICONS.appointments },
        {
          title: translate('empty_receiving'),
          path: PATH.empty,
          icon: ICONS.empty,
        },
        {
          title: translate('gate_schedule'),
          path: PATH.gates,
          icon: ICONS.gate,
        },
        { title: translate('vessel'), path: PATH.vessel, icon: ICONS.vessel },
        {
          title: translate('fight_per_diem'),
          path: PATH.fight_per_diem.root,
          icon: ICONS.fight_per_diem,
          children: [
            {
              title: translate('per_diem_archive'),
              path: PATH.fight_per_diem.archive,
            },
            {
              title: translate('terminal_screenshot'),
              path: PATH.fight_per_diem.screenshot,
            },
          ],
        },
      ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: translate('management'),
      items: [
        {
          title: translate('terminal_credentials'),
          path: PATH.terminals,
          icon: ICONS.terminal,
        },
        {
          title: translate('user'),
          path: PATH.user.root,
          icon: ICONS.user,
          children: [
            {
              title: translate('user_plans_pricing.plans_pricing'),
              path: PATH.user.plans,
            },
            { title: translate('settings'), path: PATH.user.settings },
          ],
        },
      ],
    },
  ];

  return navConfig;
};

export default useGetNavConfig;
