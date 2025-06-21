// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { GraduationCap, Eye, EyeOff } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const router = useRouter()
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         toast({
//           title: "Login successful",
//           description: "Welcome back!",
//         })
//         router.push("/dashboard")
//       } else {
//         setError(data.error || "Login failed")
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900">
//             <GraduationCap className="h-8 w-8 text-blue-600" />
//             <span>Student Management System</span>
//           </Link>
//           <p className="text-gray-600 mt-2">Sign in to your account</p>
//         </div>

//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Login</CardTitle>
//             <CardDescription>Enter your credentials to access your dashboard</CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="your.email@student.edu"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col space-y-4">
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </Button>

//               <div className="text-center text-sm text-gray-600">
//                 {"Don't have an account? "}
//                 <Link href="/register" className="text-blue-600 hover:underline">
//                   Register here
//                 </Link>
//               </div>
//             </CardFooter>
//           </form>
//         </Card>

//         {/* Demo Credentials */}
//         <Card className="mt-4 bg-blue-50 border-blue-200">
//           <CardContent className="pt-6">
//             <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials:</h4>
//             <div className="text-sm text-blue-800 space-y-1">
//               <p>
//                 <strong>Email:</strong> chris.celeb@student.edu
//               </p>
//               <p>
//                 <strong>Password:</strong> password123
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Login successful", description: "Welcome back!" })
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span>Student Management System</span>
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@student.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-center text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
