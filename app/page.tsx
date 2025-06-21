import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, CreditCard } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">Student Management System</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Student Management System</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive management system for students, courses, fees, and academic administration. Access your
            dashboard to manage enrollments, track payments, and view academic progress.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="px-8 border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white"
              >
                Student Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-2xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-pink-500/50">
            <CardHeader>
              <Users className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <CardTitle className="text-white">Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Manage student profiles, personal information, and academic records
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-2xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-blue-500/50">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Course Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Handle course registrations, lecturer assignments, and TA allocations
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-2xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-purple-500/50">
            <CardHeader>
              <CreditCard className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Fee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Track fee payments, outstanding balances, and financial records
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-2xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <CardTitle className="text-white">Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Monitor grades, course completion, and academic achievements
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 PHAD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
