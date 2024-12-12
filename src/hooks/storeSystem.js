import { create } from 'zustand';

const initialNotification = {
  nid: 0,
  uid: 0,
  detail: 'Ingresa con tu # de celu y obtén 15 Pikcoins para poder redimirlos en compras 🤩',
  coins: null,
  type_id: '',
  status: 0,
  created_at: '2022-04-11T20:33:30.000Z',
  action: 'login',
};

const loadFromLocalStorage = (property) => {
  let value = null;
  if (typeof window != 'undefined') {
    value = localStorage.getItem(property) ? JSON.parse(localStorage.getItem(property)) : value;
  }
  return value;
};

const defaultUserLogged = {
  uid: 1234,
  picture: 'https://files.idyllic.app/files/static/308631?width=256&optimizer=image',
};

const useSystemStore = create((set, get) => ({
  darkMode: true,
  env: null,
  experiences: [],
  isAwardSummaryModalOpen: false,
  isOnboardingProcess: false,
  awardsSummaryModalHTML: null,
  logout: () => logout(set),
  notifications: [initialNotification],
  newNotifications: true,
  userLogged: loadFromLocalStorage('userLogged') || defaultUserLogged,
  perfilPage: {
    messageIA: null,
  },
  setStoreValue: (property, value) => {
    console.log('-------- 🚓 LOGGING -------- setStoreValue', property, value);
    localStorage.setItem([property], JSON.stringify(value));
    set({ [property]: value });
  },
  setUserLogged: (data) => {
    set((state) => ({ userLogged: { ...state.userLogged, ...data } }));
  },
}));

export default useSystemStore;
