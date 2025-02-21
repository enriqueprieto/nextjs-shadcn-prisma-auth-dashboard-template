import { useFormik } from "formik"
import * as Yup from 'yup'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"

import { UserModel } from "@/models/user/types"

interface UserFormProps {
    [key: string]: any;
    user?: UserModel | null;
    onSubmit?: (values: any) => Promise<void> | void;
}

export const UserForm = ({ 
    className, 
    children, 
    user, 
    onSubmit = () => {} 
}: UserFormProps) => {
    let initialValues: any = {
        id: 'create',
        name: '',
        email: '',
        role: '',
        password: ''
    };
    if (user) {
        initialValues = {...user};
    }

    const formik = useFormik({
        validateOnMount: true,
        validationSchema: Yup.object({
            name: Yup.string().required('This field is required'),
            email: Yup.string().email().required('This field is required.'),
            role: Yup.string().required('This field is required.')
        }),
        initialValues,
        onSubmit: onSubmit
    });
    return (
        <form 
            id="user__form"
            onSubmit={formik.handleSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input  
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formik.values.name} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    required 
                    className={[
                        formik.errors?.name ? 'border-red-500': ''
                    ].join(' ')}
                />

                {formik.errors.name && (
                    <span className='text-red-500'>{formik.errors.name as string}</span>
                )}
            </div>
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
                    <span className='text-red-500'>{formik.errors.email as string}</span>
                )}
            </div>

            {formik.values.id === 'create' && (
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        name="password"
                        type="password" 
                        placeholder="Password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={[
                            formik.errors?.password ? 'border-red-500': ''
                        ].join(' ')}
                        required 
                    />

                    {formik.errors.password && (
                        <span className='text-red-500'>{formik.errors.password as string}</span>
                    )}
                </div>

            )}

            <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formik.values.role} onValueChange={(value: string) => formik.setFieldValue('role', value)}>
                    <SelectTrigger 
                        id="role"
                        className={[
                            "w-full",
                            formik.errors?.role ? 'border-red-500': ''
                        ].join(' ')}
                    >
                        <SelectValue placeholder="Selection an option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="CLIENT">Client</SelectItem>
                    </SelectContent>
                </Select>

                {formik.errors.role && (
                    <span className='text-red-500'>{formik.errors.role as string}</span>
                )}
            </div>

            {children}
        </form>
    )
}