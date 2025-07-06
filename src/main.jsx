import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider, Switch} from '@chakra-ui/react'
import theme from "./theme.js";
import Redirects from "./Redirects.jsx";


createRoot(document.getElementById('root')).render(
      <ChakraProvider theme={theme}>

                <Redirects/>

      </ChakraProvider>,
)
