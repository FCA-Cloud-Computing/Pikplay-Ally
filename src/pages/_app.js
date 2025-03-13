import "react-toastify/scss/main.scss"
import "../styles/common.scss";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Custom
import useCommonStore from "@/hooks/commonStore";

const MyApp = (props) => {
  const router = useRouter()
  const { Component, pageProps } = props;
  const {
    setStoreValue,
  } = useCommonStore((state => state))

  const handleStart = (url) => {
    console.log("Inicia cambio a", url)
    setStoreValue('isFullLoading', true)
  }

  const handleComplete = (url) => {
    console.log("Página cargada:", url);
    setStoreValue('isFullLoading', false)
  }

  const handleError = () => {
    console.log("Página con error :( ", url);
    setStoreValue('isFullLoading', false)
  }

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
    return () => {
    };
  }, [])

  return <Component {...pageProps} key={router.name} />;
};

export default MyApp;
