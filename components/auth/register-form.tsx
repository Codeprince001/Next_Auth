"use client"

import { CardWrapper } from "./card-wrapper"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z  from "zod"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"
import { startTransition, useState, useTransition } from "react"



export const RegisterForm = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {


    setError("")
    setSuccess("")

    startTransition(() => {
      register(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }


  return(
    <CardWrapper headerLabel="Create Account" backButtonHref="/auth/login" backButtonLabel="Already have an account" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="John Doe" type="text"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="JohnDoe.example.com" type="email"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="******" type="password"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

            </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>Create account</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}