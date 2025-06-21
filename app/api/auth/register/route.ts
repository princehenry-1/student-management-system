// /*import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { firstName, lastName, email, phone, dateOfBirth, address, yearOfStudy, password } = body

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password || !yearOfStudy) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Check if email already exists (simulate database check)
//     const existingEmails = ["alice.anderson@student.edu", "bob.baker@student.edu", "carol.clark@student.edu"]

//     if (existingEmails.includes(email)) {
//       return NextResponse.json({ error: "Email already registered" }, { status: 409 })
//     }

//     // Hash password
//     const saltRounds = 12
//     const hashedPassword = await bcrypt.hash(password, saltRounds)

//     // Generate student number
//     const currentYear = new Date().getFullYear()
//     const studentNumber = `CE${currentYear}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

//     // Simulate database insertion
//     const newStudent = {
//       student_number: studentNumber,
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       phone: phone || null,
//       date_of_birth: dateOfBirth || null,
//       address: address || null,
//       year_of_study: Number.parseInt(yearOfStudy),
//       password_hash: hashedPassword,
//       status: "active",
//       enrollment_date: new Date().toISOString().split("T")[0],
//     }

//     console.log("New student registered:", newStudent)

//     return NextResponse.json(
//       {
//         message: "Registration successful",
//         student_number: studentNumber,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error("Registration error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }*/

// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { firstName, lastName, email, password } = body

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Check if email already exists (simulate database check)
//     const existingEmails = ["alice.anderson@student.edu", "bob.baker@student.edu", "carol.clark@student.edu"]

//     if (existingEmails.includes(email)) {
//       return NextResponse.json({ error: "Email already registered" }, { status: 409 })
//     }

//     // Hash password
//     const saltRounds = 12
//     const hashedPassword = await bcrypt.hash(password, saltRounds)

//     // Generate student number
//     const currentYear = new Date().getFullYear()
//     const studentNumber = `CE${currentYear}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

//     // Simulate database insertion (only keeping necessary fields)
//     const newStudent = {
//       student_number: studentNumber,
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       password_hash: hashedPassword,
//       status: "active",
//       enrollment_date: new Date().toISOString().split("T")[0],
//     }

//     console.log("New student registered:", newStudent)

//     return NextResponse.json(
//       {
//         message: "Registration successful",
//         student_number: studentNumber,
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error("Registration error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// /app/api/auth/register/route.ts
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import pool from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, yearOfEnrollment, password } = body

    if (!firstName || !lastName || !email || !password || !yearOfEnrollment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailCheck = await pool.query("SELECT email FROM students WHERE email = $1", [email.trim().toLowerCase()])
    if (emailCheck.rows.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await pool.query(
  `INSERT INTO students (first_name, last_name, email, enrollment_year, password_hash)
   VALUES ($1, $2, $3, $4, $5)`,
  [firstName, lastName, email.trim().toLowerCase(), parseInt(yearOfEnrollment), hashedPassword]
)


    return NextResponse.json(
      {
        message: "Registration successful",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}



