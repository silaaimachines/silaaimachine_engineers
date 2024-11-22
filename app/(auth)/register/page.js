"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
import { registerUserAction } from "@/app/data/actions/auth-actions";
import { useActionState } from "react";
import { ZodErrors } from "@/app/_components/zod-errors";
import { StrapiErrors } from "@/app/_components/strapi-errors";

const INITIAL_STATE = {
  data: null,
};

export default function RegistrationForm() {
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );

  console.log(formState);

  return (
    <div className="py-10 px-5 lg:py-32">
      <form action={formAction}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details below to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                />
                <ZodErrors error={formState?.zodErrors?.username} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
                <ZodErrors error={formState?.zodErrors?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <ZodErrors error={formState?.zodErrors?.password} />
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
              <StrapiErrors error={formState?.strapiErrors} />
              <Button variant="outline" className="w-full">
                Register with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
