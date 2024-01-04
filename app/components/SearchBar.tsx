'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const SearchBar = () => {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push('/')

    const url = queryString.stringifyUrl({
      url: '/',
      query: { searchTerm: data.searchTerm }
    },
      { skipNull: true })

    router.push(url)

  }


  return (
    <div className="flex items-center">
      <input
        {...register('searchTerm')}
        className="p-2 pl-4 border-gray-300 rounded-l-md fucus:outline-none fucus:border-[0.5px] fucus:border-slate-500  w-80" type="text"
        placeholder="Explore E-Shop"
        autoComplete="off" />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-primary/80 hover:opacity-80 text-white rounded-r-md p-2">Search</button>
    </div>
  )
}

export default SearchBar