/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import CVReader from './components/cv-reader.tsx'
import Home from './components/Home.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/cv-extractor" element={<CVReader />} />
  </Route>,
)

export default routes
