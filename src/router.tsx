import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { DeckCards } from '@/pages/deck-cards'
import { Decks } from '@/pages/decks/decks'
import { SignInPage } from '@/pages/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },

  {
    element: <DeckCards />,
    path: '/cards',
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
