import type { ThemeConfig } from 'antd'
import { FONT_FAMILY, palette } from '#/theme/tokens'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary,
    colorInfo: palette.primary,
    colorSuccess: palette.green,
    colorWarning: palette.amber,
    colorError: palette.red,
    colorTextBase: palette.ink,
    colorBgLayout: palette.paper,
    colorBorderSecondary: palette.line,
    fontFamily: FONT_FAMILY,
    borderRadius: 6,
    borderRadiusLG: 10,
  },
  components: {
    Layout: {
      siderBg: palette.ink,
      headerBg: palette.surface,
      headerHeight: 64,
      headerPadding: '0 24px',
    },
    Menu: {
      darkItemBg: palette.ink,
      darkSubMenuItemBg: palette.ink,
      darkItemSelectedBg: palette.primary,
      darkItemColor: 'rgba(255,255,255,0.72)',
    },
    Card: {
      headerFontSize: 15,
      paddingLG: 20,
    },
    Table: {
      headerBg: palette.surface,
      headerColor: palette.muted,
      headerSplitColor: 'transparent',
    },
    Statistic: {
      contentFontSize: 26,
    },
  },
}
