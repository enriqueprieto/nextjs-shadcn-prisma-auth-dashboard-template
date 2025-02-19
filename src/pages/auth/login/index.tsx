import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div className="flex items-center justify-center h-screen">
      <form 
        onSubmit={formik.handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <fieldset>
          <legend className="text-xl font-bold mb-4">Welcome to Pantore dashboard</legend>

          <div>
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

          <div className="mt-4">
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
            className="mt-4 w-full"
            disabled={isLoading || !formik.isValid}
          >
            { isLoading ? 'Loading...' : 'Log in' }
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
