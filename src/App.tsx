import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import './App.scss'

interface IForm {
  email: string
  message: string
}

export const App: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // getValues,
    
  } = useForm<IForm>({
    defaultValues: {},
    mode: 'onChange',
  })

  const emailError = errors.email?.message

  const onSubmit: SubmitHandler<IForm> = data => {
    console.log(data)
    reset()
  }

  return (
    <>
      <h1>React hook form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='enter email:'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email',
            },
          })}
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <textarea
          placeholder='enter message:'
          {...register('message', {
            required: 'This field is required',
          })}
        ></textarea>
        <button type='submit'>Send</button>
      </form>
    </>
  )
}
