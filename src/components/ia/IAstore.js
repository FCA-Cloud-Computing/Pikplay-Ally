import React, { useState } from 'react';
import { create } from 'zustand';
import { handleUserMessage } from './handleUserMessage';

const DEFAULT_EXPRESSION = 'happy'
const checkIAMessage = (set, IAMessage) => {
  const searchParams = new URLSearchParams(window.location.search);
  const message = searchParams.get('message');
  if (IAMessage) return false; // Si ya hay un mensaje mostrandose en IA, entonces no se muestra otro
  if (message) {
    handleUserMessage(message, set);
  }
};

const setIAMessage = (message, options, expression, set) => {
  if (message) set({ IAHTMLMessage: null, IAMessage: message, isVisible: true, IAOptions: options, IAExpression: expression ? expression : DEFAULT_EXPRESSION });
  else set({ IAMessage: null, isVisible: false, IAOptions: null });
};

const middleHandleUserMessage = (message, set, options) => {
  window.location.hash = '#paco'
  if (message === 'hideIA') {
    set('isVisible', false);
    return;
  } else {
    handleUserMessage(message, set, options);
  }
};

export const useIAStore = create((set, get) => ({
  containerHeight: '210px',
  IAOptions: <></>,
  isVisible: false,
  IAMessage: null,
  IAExpression: DEFAULT_EXPRESSION,
  IAHTMLMessage: null,
  numberChosen: null,
  defaultStoreA: null, // KEY para almacenar un valor temporal
  defaultStoreB: null,
  handleUserMessage: (message, options) => middleHandleUserMessage(message, set, options),
  setIAMessage: (message, options, expression) => setIAMessage(message, options, expression, set),
  setIAOptions: (options) => set({ IAOptions: options }),
  setIsvisible: (isVisible) => set({ isVisible: isVisible }),
  setnumberChosen: (numberChosen) => set({ numberChosen: numberChosen }),
  checkIAMessage: (IAMessage) => checkIAMessage(set, IAMessage),
}));
