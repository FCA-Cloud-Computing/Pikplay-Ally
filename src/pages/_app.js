import "react-toastify/scss/main.scss"

import "../styles/common.scss";

import React, { useEffect, useState } from "react";

const MyApp = (props) => {
  const { Component, pageProps, router } = props;
  return <Component {...pageProps} key={router.name} />;
};

export default MyApp;
