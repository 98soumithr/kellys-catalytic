/** Per-route wrapper/main class strings, measured from the reference DOM. */
export const SHELL = {
  home: {
    wrapper: 'min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 text-gray-900',
    main: '',
  },
  about: {
    wrapper: 'min-h-screen bg-slate-50 text-gray-900 font-sans',
    main: 'pt-24',
  },
  resourceCenter: {
    wrapper: 'min-h-screen bg-slate-50 text-gray-900 font-sans',
    main: 'pt-24 pb-20',
  },
  article: {
    wrapper: 'min-h-screen bg-white text-gray-900 font-sans',
    main: 'pt-24 pb-20',
  },
  serviceAreas: {
    wrapper: 'min-h-screen bg-white text-gray-900 font-sans',
    main: 'pt-24 pb-20',
  },
  column: {
    wrapper: 'min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900',
    main: 'flex-grow pt-32 pb-20',
  },
} as const;
