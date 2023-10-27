import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Decks } from '@/pages/decks'
import { useGetDecksQuery } from '@/services/base-api'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const result = useGetDecksQuery()

  console.log(result)

  return <RouterProvider router={router} />
}
