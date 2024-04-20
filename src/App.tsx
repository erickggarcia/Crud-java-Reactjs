import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./styles/globals"
import { Router } from "./Router"

export function App() {

  return (
    <BrowserRouter>
    <Router/>
      <GlobalStyle/>
    </BrowserRouter>
  )
}