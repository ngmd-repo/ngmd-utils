export const RootDB = {
  countriesMap: {
    eu: 'Europe',
  },
  state: {
    value: 'hide',
  },
  actions: [
    'AccountsInfo',
    'PendingApproval',
    'Pending_mobile',
    'Complete',
    'Another_tab_processing',
    'Another_device_processing',
    'RedirectFromBank',
    'Recovery',
  ],
  header: {
    configs: {
      banks: {
        title: 'title',
        tooltip: 'tooltip',
      },
      iban: {
        title: 'enter',
        tooltip: 'tooltip',
      },
    },
  },
  'mode-map': {
    iban: ['de', 'es', 'nl'],
  },
  'banks-list': {
    schemaIcons: {
      '1': 'watch_later',
      '2': 'offline_bolt',
    },
    schemaTooltips: {
      '1': 'Payments made via this bank might be slow because the bank does not support instant',
      '2': 'Payment will be processed instantly',
    },
  },
} as const;
