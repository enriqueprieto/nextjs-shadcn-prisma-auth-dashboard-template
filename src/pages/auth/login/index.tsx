import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  const[isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email().required('This field is required.'),
      password: Yup.string().required('This field is required.')
    }),
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setIsLoading(false);

      if (res?.error) {
        alert("Invalid email or password");
      } else {
        // Redirect to dashboard if successful
        router.push("/dashboard");
      }
    }
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="text-3xl flex items-center gap-2 self-center font-bold">
          Pantore Dev
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} >
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        name="email"
                        type="email" 
                        placeholder="Email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={[
                          formik.errors?.email ? 'border-red-500': ''
                        ].join(' ')}
                        required 
                      />

                      {formik.errors.email && (
                        <span className='text-red-500'>{formik.errors.email}</span>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input  
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        required 
                        className={[
                          formik.errors?.password ? 'border-red-500': ''
                        ].join(' ')}
                      />

                      {formik.errors.password && (
                        <span className='text-red-500'>{formik.errors.password}</span>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || !formik.isValid}
                    >
                      { isLoading ? 'Loading...' : 'Log in' }
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
