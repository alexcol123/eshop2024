'use client'

import { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import MyButton from '../components/MyButton'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types'

interface RegisterFormProps {
  currentUser: SafeUser | null
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {

  const router = useRouter()

  const [isLoading, setisLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> =  (data) => {
    setisLoading(true)
    console.log(data)


    axios.post('/api/register', data)
      .then(() => {
        toast.success("Account Created")

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false
        }).then((callback) => {
          if (callback?.ok) {
            router.push('/cart')
            router.refresh()
            toast.success('Logged In')
          }

          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setisLoading(false))


  }

  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser])


  if (currentUser) {
    return <p className='text-center
  '>Register. Redirecting</p>
  }




  return (
    <>
      <Heading title='Sign up for E-shop' />
      < MyButton outline label='Continue with Google' icon={AiOutlineGoogle} onClick={() => { signIn('google')}} />

      <hr className='bg-slate-300 w-full h-px' />

      < Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />

      < Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />

      < Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required type='password' />


      <MyButton label={isLoading ? '... Loading' : 'Sign Up'} onClick={handleSubmit(onSubmit)} />


      <p>Already hanve an account ? <Link className='text-primary font-semibold px-2 rounded-lg  border border-transparent duration-300 hover:border-primary ' href='/login'>Login</Link>  </p>


    </>
  )
}

export default RegisterForm