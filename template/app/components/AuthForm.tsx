'use client'; 

import { useState, useCallback } from "react";
import { signIn } from 'next-auth/react'; 
import Input from "./inputs/Input";
import Button from "./buttons/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import AuthSocialButton from "./buttons/AuthSocialButton";

import  { BsGithub, BsGoogle } from 'react-icons/bs';

type Action = "Login" | "Register"

const AuthForm = () => {
    const router = useRouter();  
    const [ action, setAction ] = useState <Action> ("Register"); 
    const [ isLoading, setIsLoading ] = useState <Boolean> (false); 

    const toggleAction = useCallback( () => { 
        if(action === "Login")
            setAction("Register"); 
        else 
            setAction("Login"); 
    },  [ action ] ); 

    const { 
        register, 
        handleSubmit, 
        formState: { 
            errors, 
        }
    } = useForm  <FieldValues> ({ 
        defaultValues: { 
            username: "", 
            email: "", 
            password: "", 
        }
    }); 

    const onSubmit: SubmitHandler <FieldValues> = async (data) => { 
        setIsLoading(true); 

        try { 
            if(action === "Login") {  
                signIn('credentials', {
                  ...data, 
                  redirect: false
                }).then((callback: any) => { 
                  console.log(callback); 
                  if(callback.error) { 
                    toast.error('Invalid credentials!')
                  }
          
                  if(callback?.ok && !callback.error) { 
                    router.push("/homepage"); 
                    toast.success('Logged In!')
                  }
                }).finally( () => { 
                  setIsLoading(false); 
                })
            } else { 
                const response =  await fetch("/api/register", { 
                    method: "POST", 
                    mode: "cors",
                    body: JSON.stringify(data), 
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }); 

                if(response.ok) { 
                    signIn("credentials", data); 
                    toast.success("Inregistrat cu succes"); 
                    return; 
                }
            }
        } catch(err: any) { 
            console.log(err);
            toast.error("Ceva nu a functionat corespunzator") 
        } finally { 
            setIsLoading(false); 
        }

    }

    const socialAction = (action: string) => { 
        setIsLoading(true); 
    
        signIn(action, { 
          redirect: false, 
        }).then( (callback) => { 
          if(callback?.error) { 
            toast.error('Invalid Credentials')
          }
    
          if(callback?.ok && !callback.error) { 
            toast.success('Logged In!'); 
            router.push("/homepage"); 
          }
        }).finally( () => { 
          setIsLoading(false); 
        })
      }
  return (
    <div className = 'sm:mx-8 sm:w-full sm:max-w-md'>
        <div className = 'bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit = { handleSubmit(onSubmit)}> 
                { action === "Register" && 
                    <Input 
                        type = 'text' 
                        id = "username"
                        required 
                        register = { register }
                        errors = { errors }
                        label = "Username"
                    /> 
                }

                <Input 
                    label = "Email"
                    id = "email"
                    required
                    type = "email"
                    register = { register }
                    errors = { errors }
                /> 

                <Input
                    label = "Password"
                    id = "password"
                    type =  "password"
                    register = { register }
                    errors = { errors }
                /> 

                <div className = 'flex justify-center mt-4'>
                    <Button 
                        secondary
                        type = "submit"
                    > 
                        { action } 
                    </Button>
                </div>
            </form>

            <div className = 'mt-6'>
              <div className = 'relative'>
                <div className = 'absolute inset-0 flex items-center'>
                  <div className = 'w-full border-t border-gray-300'>
                  </div>
                </div>
                <div className = 'relative flex justify-center text-sm'>
                  <span className = 'bg-white px-2 text-gray-500'>
                    Or continue with 
                  </span>
                </div>
              </div>

              <div className = 'empty-6 flex gap-2'>
                <AuthSocialButton 
                  icon = { BsGithub }
                  onClick = { () => { socialAction("github")}}
                /> 
                <AuthSocialButton 
                  icon = { BsGoogle }
                  onClick = { () => { socialAction("google")}}
                />
              </div>
            </div>
          <div>

            <div className = 'flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
              <div>
                { 
                  action === 'Login' ? 'New to Messenger?' : 'Already have an account?'
                }
              </div>
              <div onClick = { toggleAction } className = 'cursor-pointer underline'>
                { action === 'Login' ? 'Create an account' : 'Login'}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AuthForm