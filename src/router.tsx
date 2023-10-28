import { useState } from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { TextField } from '@/components/ui/text-field'
import { Decks } from '@/pages/decks'
import { SignIn } from '@/pages/sign-in.tsx'
import { useGetDecksQuery } from '@/services/decks/decks'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
]

const Component = () => {
  const [search, setSearch] = useState('')
  const { data } = useGetDecksQuery()

  console.log(data)

  return (
    <div>
      Component 2
      <TextField
        label={'Search by name'}
        onChange={e => setSearch(e.currentTarget.value)}
        value={search}
      />
    </div>
  )
}
const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <Component />,
    path: '/2',
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
