import cookieCutter from '@boiseitguru/cookie-cutter'
import { create } from 'zustand';

const initialNotification = {
    "nid": 0,
    "uid": 0,
    "detail": "Ingresa con tu # de celu y obtén 15 Pikcoins para poder redimirlos en compras 🤩",
    "coins": null,
    "type_id": "",
    "status": 0,
    "created_at": "2022-04-11T20:33:30.000Z",
    "action": "login",
}

const loadFromLocalStorage = (property) => {
    let value = null
    if (typeof window != 'undefined') {
        value = localStorage.getItem(property) ? JSON.parse(localStorage.getItem(property) || '{}') : value
    }
    return value
}

const useCommonStore = create((set, get) => ({
    steps: env: null,
    experiences: [],
    logout: () => logout(set),
    notifications: [initialNotification],
    userLogged: loadFromLocalStorage('userLogged') || { uid: null },
    setStoreValue: (property, value) => {
        localStorage.setItem([property], JSON.stringify(value))
        set({ [property]: value })
    },
    setUserLogged: (data) => {
        set(state => ({ userLogged: { ...state.userLogged, ...data } }))
    }
}));

export default useCommonStore
