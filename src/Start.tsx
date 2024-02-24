import { RouterProvider } from 'react-router-dom'
import './app.css'
import { router } from './components/routes/Router'

type props = {}

export default function Start({}:props) {

  return (
        <RouterProvider router={router} />
  )

}
