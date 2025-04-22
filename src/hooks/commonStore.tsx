import cookieCutter from '@boiseitguru/cookie-cutter'
import { create } from 'zustand';
import { logout } from '../lib/utils';

const initialNotification = {
  nid: 0,
  uid: 0,
  description: '<b>Dale en Play</b>, ingresa con tu # de celu y obtén tus primeros 5 Pikcoins, compra, refiere amigos, participa y sigue acumulando para ser el mejor',
  type_id: '',
  status: 0,
  created_at: '2022-04-11T20:33:30.000Z',
  action: 'login',
};

const initialMessageTop: string | null = null;

export const loadFromLocalStorage = (property) => {
  let value = null
  if (typeof window != 'undefined' && property) {
    value = localStorage.getItem(property)
      ? JSON.parse(localStorage.getItem(property) || '')
      : value
  }
  return value
}

const defaultUserLogged = {
  uid: null,
  picture: '/images/logos/logo-pikplay-bg-azul.png',
}

const initialLoginStorage = (set) => {
  set({ userLogged: { uid: null } })
  set({ notifications: [initialNotification] })
  logout()
}

interface CommonStoreState {
  userLogged: any;
  setStoreValue: (property: string, value: any) => void;
}

const useCommonStore = create<CommonStoreState>((set, get) => ({
  awardsSummaryModalHTML: null,
  awardSummaryModalDetail: null,
  darkMode: true,
  env: 'dev',
  experiences: [],
  isAwardSummaryModalOpen: false, // Modal de premios
  isFullLoading: false, // Pantalla de carga
  isOnboardingProcess: false,
  isOpenLoginModal: false, // Modal de login
  leftBottomMenuContent: null,
  leftMenuBar: {
    isShow: false
  },
  messageTop: /*<span><b>Bienvenido,</b><br />¡Disfruta de tu experiencia!</span>, */ initialMessageTop, // Banner flotante que se muestra debajo del menu
  notifications: [initialNotification],
  newNotifications: true,
  userLogged: loadFromLocalStorage('userLogged') || defaultUserLogged,
  perfilPage: {
    messageIA: null
  },
  logout: () => initialLoginStorage(set),
  setStoreValue: (property, value) => {
    localStorage.setItem(property, JSON.stringify(value));
    set({ [property]: value });
  },
  setUserLogged: (data) => {
    set((state) => ({ userLogged: { ...state.userLogged, ...data } }));
  },
}));

export default useCommonStore
