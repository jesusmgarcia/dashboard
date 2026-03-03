"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProfileAvatar from "./ProfileAvatar";
import { updateProfile, type ProfileFormState } from "./actions";

interface ProfileData {
  email: string;
  profile?: {
    fullName?: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    zip?: string;
    role?: string;
  };
}

export default function ProfileForm({ data }: { data: ProfileData }) {
  const [state, formAction, isPending] = useActionState<ProfileFormState, FormData>(
    updateProfile,
    null
  );

  const p = data.profile ?? {};

  return (
    <Card className="overflow-hidden shadow-md dark:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Left panel — avatar + identity */}
        <div className="flex flex-col items-center justify-center gap-4 px-8 py-10 bg-muted/40 dark:bg-muted/20 border-b md:border-b-0 md:border-r border-border md:w-56 lg:w-64 shrink-0">
          <ProfileAvatar fullName={p.fullName} email={data.email} />
          <div className="text-center">
            <p className="font-semibold text-base leading-tight">
              {p.fullName || "Your Name"}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5 break-all">{data.email}</p>
          </div>
        </div>

        {/* Right panel — editable form */}
        <div className="flex-1 p-6 sm:p-8">
          <form action={formAction} className="flex flex-col gap-6">
            {/* Information section */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  name="fullName"
                  defaultValue={p.fullName}
                  placeholder="John Doe"
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  defaultValue={data.email}
                  placeholder="you@example.com"
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  defaultValue={p.phone}
                  placeholder="+1 (555) 000-0000"
                />
                <Field
                  label="User Role"
                  name="role"
                  defaultValue={p.role}
                  placeholder="e.g. Administrator, Manager"
                />
              </div>
            </section>

            {/* Address section */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Country"
                  name="country"
                  defaultValue={p.country}
                  placeholder="United States"
                />
                <Field
                  label="State / Region"
                  name="state"
                  defaultValue={p.state}
                  placeholder="California"
                />
                <Field
                  label="City"
                  name="city"
                  defaultValue={p.city}
                  placeholder="San Francisco"
                />
                <Field
                  label="ZIP / Postal Code"
                  name="zip"
                  defaultValue={p.zip}
                  placeholder="94105"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Address"
                    name="address"
                    defaultValue={p.address}
                    placeholder="123 Main St, Apt 4"
                  />
                </div>
              </div>
            </section>

            {/* Feedback message */}
            {state && (
              <p
                className={`text-sm font-medium ${
                  state.success
                    ? "text-green-600 dark:text-green-400"
                    : "text-destructive"
                }`}
              >
                {state.message}
              </p>
            )}

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} className="min-w-36">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="dark:bg-background/50"
      />
    </div>
  );
}
