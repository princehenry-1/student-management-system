"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, BookOpen, LogOut, DollarSign, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface StudentData {
  student_id: number
  student_number: string
  full_name: string
  email: string
  year_of_study: number
  status: string
  enrolled_courses: number
  total_fees_due: number
  total_payments_made: number
  outstanding_balance: number
}

interface Course {
  course_code: string
  course_name: string
  credits: number
  lecturer_name: string
  status: string
  grade?: string
}

interface FeeDetail {
  fee_type: string
  amount_due: number
  amount_paid: number
  balance: number
  due_date: string
  status: string
  semester: string
  academic_year: string
}

export default function DashboardPage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [feeDetails, setFeeDetails] = useState<FeeDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock data for demo purposes
      const mockStudentData: StudentData = {
        student_id: 1,
        student_number: "2234556",
        full_name: "Chris Celeb",
        email: "chris.celeb@student.edu",
        year_of_study: 3,
        status: "active",
        enrolled_courses: 4,
        total_fees_due: 5550.0,
        total_payments_made: 5450.0,
        outstanding_balance: 100.0,
      }

      const mockCourses: Course[] = [
        {
          course_code: "CPEN401",
          course_name: "Software Engineering",
          credits: 3,
          lecturer_name: "Dr. Michael Brown",
          status: "enrolled",
        },
        {
          course_code: "CPEN402",
          course_name: "Database Systems",
          credits: 3,
          lecturer_name: "Dr. Michael Brown",
          status: "enrolled",
        },
        {
          course_code: "CPEN403",
          course_name: "Computer Networks",
          credits: 4,
          lecturer_name: "Dr. Emily Davis",
          status: "enrolled",
        },
        {
          course_code: "CPEN404",
          course_name: "Artificial Intelligence",
          credits: 3,
          lecturer_name: "Dr. Emily Davis",
          status: "enrolled",
        },
      ]

      const mockFeeDetails: FeeDetail[] = [
        {
          fee_type: "Tuition Fee",
          amount_due: 5000.0,
          amount_paid: 5000.0,
          balance: 0.0,
          due_date: "2024-09-15",
          status: "paid",
          semester: "Fall",
          academic_year: "2024",
        },
        {
          fee_type: "Lab Fee",
          amount_due: 300.0,
          amount_paid: 300.0,
          balance: 0.0,
          due_date: "2024-09-15",
          status: "paid",
          semester: "Fall",
          academic_year: "2024",
        },
        {
          fee_type: "Library Fee",
          amount_due: 150.0,
          amount_paid: 150.0,
          balance: 0.0,
          due_date: "2024-09-15",
          status: "paid",
          semester: "Fall",
          academic_year: "2024",
        },
        {
          fee_type: "Student Activity Fee",
          amount_due: 100.0,
          amount_paid: 0.0,
          balance: 100.0,
          due_date: "2024-09-15",
          status: "pending",
          semester: "Fall",
          academic_year: "2024",
        },
      ]

      setStudentData(mockStudentData)
      setCourses(mockCourses)
      setFeeDetails(mockFeeDetails)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load student data</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Return to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Student Management System</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Year of Study</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Year {studentData.year_of_study}</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary" className="mt-1">
                  {studentData.status}
                </Badge>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.enrolled_courses}</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${studentData.outstanding_balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {studentData.outstanding_balance > 0 ? "Payment due" : "All paid up!"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${studentData.total_payments_made.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest academic activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">Library fee payment processed</p>
                    </div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Course enrollment</p>
                      <p className="text-xs text-gray-500">Enrolled in Artificial Intelligence</p>
                    </div>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Grade updated</p>
                      <p className="text-xs text-gray-500">Database Systems assignment graded</p>
                    </div>
                    <span className="text-xs text-gray-400">2 weeks ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Enrollments</CardTitle>
                <CardDescription>Your courses for the current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">
                              {course.course_code} - {course.course_name}
                            </h4>
                            <p className="text-sm text-gray-600">Instructor: {course.lecturer_name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{course.credits} Credits</Badge>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{course.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Summary</CardTitle>
                <CardDescription>Your financial overview for the academic year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Total Due</p>
                    <p className="text-2xl font-bold text-blue-900">${studentData.total_fees_due.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Total Paid</p>
                    <p className="text-2xl font-bold text-green-900">${studentData.total_payments_made.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">Outstanding</p>
                    <p className="text-2xl font-bold text-red-900">${studentData.outstanding_balance.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
