import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormik } from "formik";
import { Filter } from "lucide-react";
import { useState } from "react";

export const UserFilterForm = (props: any = {}) => {
    const { 
        onSubmit = () => {},
        initialValues = {
            email: null,
            name: null,
            role: null
        }
    } = props;
    
    const handleSubmit = (values: any) => {
        onSubmit(values);
    }

    const formik = useFormik({
        initialValues: initialValues || {
            email: null,
            name: null,
            role: null
        },
        onSubmit: handleSubmit
    });

    const handleClearFilter = () => {
        onSubmit({
            email: null,
            name: null,
            role: null
        });
    }

    return (
        <form 
            onSubmit={formik.handleSubmit} 
            className="grid items-start gap-4"
            autoComplete="off"
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input  
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formik.values.name || ''} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.errors.name && (
                    <span className='text-red-500'>{formik.errors.name as string}</span>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    autoComplete="off"
                    value={formik.values.email || ''} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                    value={formik.values.role || ''} 
                    onValueChange={(value: string) => formik.setFieldValue('role', value)}
                >
                    <SelectTrigger 
                        id="role"
                    >
                        <SelectValue placeholder="Selection an option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="CLIENT">Client</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                Search user
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={handleClearFilter}>
                Reset filter
            </Button>
        </form>
    );
}

export const UserFilterPopover = (props: any = {}) => {
    const {
        onFilterSubmit = () => {},
        filterProps = {}
    } = props;
    const [openPopover, setOpenPopover] = useState(false);
    const handleFormSubmit = (values: any) => {
        setOpenPopover(false);
        onFilterSubmit(values);
    }
    return (
        <Popover 
            open={openPopover} 
            onOpenChange={setOpenPopover}    
        >
            <PopoverTrigger asChild>
                <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                >
                    <Filter />

                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <UserFilterForm 
                    {...filterProps}
                    onSubmit={handleFormSubmit.bind(this)}
                />
            </PopoverContent>
        </Popover>
    );
}

export const UserFilter = (props: any = {}) => {
    return (
        <UserFilterPopover 
            {...props}
        />
    )
}