import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    return (
        <div className="py-10 px-5 lg:py-32">
            <Card className="mx-auto max-w-sm ">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login or Register</CardTitle>
                    <CardDescription>
                        Enter your phone number to Register or Login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="1234567890"
                                required
                                pattern="\d{10}"
                                title="Please enter a valid 10-digit phone number."
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}