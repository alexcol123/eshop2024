'use client'

import { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'
import { register } from 'module'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import MyButton from '../components/MyButton'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SafeUser } from '@/types'


interface LoginFormProps {
  currentUser: SafeUser | null
}


const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {

  const router = useRouter()

  const [isLoading, setisLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',

    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true)
    // console.log(data)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setisLoading(false)


      if (callback?.ok) {
        router.push('/cart')
        router.refresh()
        toast.success('Logged In')
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }


  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser])


  if (currentUser) {
    return <p className='text-center
  '>Logged In. Redirecting</p>
  }



  return (
    <>
      <Heading title='Sign In to E-shop' />
      < MyButton outline label='Continue with Google' icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />

      <hr className='bg-slate-300 w-full h-px' />



      < Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />

      < Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required type='password' />

      <MyButton label={isLoading ? '... Loading' : 'Login'} onClick={handleSubmit(onSubmit)} />

      <p>Don&apos;t have and  account ? <Link className='text-primary font-semibold px-2 rounded-lg  border border-transparent duration-300 hover:border-primary ' href='/register'>Register</Link>  </p>


    </>
  )
}

export default LoginForm