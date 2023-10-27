import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const decks = useGetDecksQuery()

  console.log(decks)
  if (decks.isLoading) {
    return <div>...loading</div>
  }
  if (decks.isError) {
    return <div>ERROR</div>
  }

  return <div>{JSON.stringify(decks || '')}</div>
}
