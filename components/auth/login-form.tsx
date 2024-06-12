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
import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"



export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })



  return(
    <CardWrapper headerLabel="Welcome Back" backButtonHref="/auth/register" backButtonLabel="Dont have an account" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}
          className="space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="JohnDoe.example.com" type="email"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>

            </div>

            <Button type="submit" className="w-full">Login</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}