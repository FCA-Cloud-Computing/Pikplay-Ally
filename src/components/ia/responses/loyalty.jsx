import React from "react"
import Button from "../../button/Button"
import { useIAStore } from "../IAstore"

const HTML = ""

const Message = (title, description) => (
  <>
    <h2>{title}</h2>
    <p>{description}</p>
  </>
)

const Options = () => {}

export { HTML, Message, Options }
