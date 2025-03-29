import { UserRegistrationForm } from "@/components/user-registration-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl">
        <UserRegistrationForm />
      </div>
    </div>
  )
}

