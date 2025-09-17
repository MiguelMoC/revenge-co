'use client'
import { useRouter } from "next/navigation";
import { ShippingAddress, shippingAddressDefaultValues } from "@/types";
import { toast } from 'sonner';
import { useTransition } from "react";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import {z} from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, CircleX, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateuserAddress } from "@/lib/actions/user.actions";
const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit:SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
        startTransition(async () => {
            const res = await updateuserAddress(values);
            if (!res.success) {
                toast(res.message as string, {
                    icon: (<CircleX className="text-red-700" />),
                    position: "top-right",
                    duration: 2500,
                })
                return
            }
            router.push('/payment-method')
        })
    }

    return (<>
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt4">
                Shipping Address
            </h1>
            <p className="text-sm text muted-foreground">Please enter an address to ship to:</p>
            <Form {...form}>
                <form method='post' className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5 ">
                        <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'>}) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'>}) => (
                            <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter street address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <FormField
                        control={form.control}
                        name="city"
                        render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'>}) => (
                            <FormItem>
                            <FormLabel>Enter City</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter City" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'>}) => (
                            <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <FormField
                        control={form.control}
                        name="country"
                        render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'>}) => (
                            <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Country" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button>
                             {isPending ? (
                                <Loader className="w-4 h-4 animation-spin"/>
                            ): (
                                <ArrowRight className="w-4 h-4"/>
                            )} Continue
                       </Button>
                    </div>
                </form>
            </Form>
        </div>
    </>);
}
 
export default ShippingAddressForm;