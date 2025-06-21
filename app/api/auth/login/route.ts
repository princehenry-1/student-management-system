// // import { type NextRequest, NextResponse } from "next/server"
// // import bcrypt from "bcryptjs"

// // // Mock user data for demo purposes
// // const mockUsers = [
// //   {
// //     id: 1,
// //     email: "alice.anderson@student.edu",
// //     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
// //     student_number: "CE2021001",
// //     first_name: "Alice",
// //     last_name: "Anderson",
// //     year_of_study: 3,
// //     status: "active",
// //   },
// //   {
// //     id: 2,
// //     email: "bob.baker@student.edu",
// //     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
// //     student_number: "CE2021002",
// //     first_name: "Bob",
// //     last_name: "Baker",
// //     year_of_study: 3,
// //     status: "active",
// //   },
// // ]

// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json()
// //     const { email, password } = body

// //     // Validate required fields
// //     if (!email || !password) {
// //       return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
// //     }

// //     // Find user by email
// //     const user = mockUsers.find((u) => u.email === email)

// //     if (!user) {
// //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
// //     }

// //     // Verify password
// //     const isValidPassword = await bcrypt.compare(password, user.password_hash)

// //     if (!isValidPassword) {
// //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
// //     }

// //     // Return user info (excluding password)
// //     const userResponse = {
// //       id: user.id,
// //       email: user.email,
// //       student_number: user.student_number,
// //       first_name: user.first_name,
// //       last_name: user.last_name,
// //       year_of_study: user.year_of_study,
// //       status: user.status,
// //     }

// //     return NextResponse.json(
// //       {
// //         message: "Login successful",
// //         user: userResponse,
// //       },
// //       { status: 200 },
// //     )
// //   } catch (error) {
// //     console.error("Login error:", error)
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
// //   }
// // }
// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"

// // Mock user data for demo purposes
// const mockUsers = [
//   {
//     id: 1,
//     email: "alice.anderson@student.edu",
//     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
//     student_number: "CE2021001",
//     first_name: "Alice",
//     last_name: "Anderson",
//     year_of_study: 3,
//     status: "active",
//   },
//   {
//     id: 2,
//     email: "bob.baker@student.edu",
//     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
//     student_number: "CE2021002",
//     first_name: "Bob",
//     last_name: "Baker",
//     year_of_study: 3,
//     status: "active",
//   },
// ]

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { email, password } = body

//     // Validate required fields
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
//     }

//     // Find user by email (case-insensitive and trimmed)
//     const user = mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

//     if (!user) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
//     }

//     // Verify password
//     const isValidPassword = await bcrypt.compare(password, user.password_hash)

//     if (!isValidPassword) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
//     }

//     // Return user info (excluding password)
//     const userResponse = {
//       id: user.id,
//       email: user.email,
//       student_number: user.student_number,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       year_of_study: user.year_of_study,
//       status: user.status,
//     }

//     return NextResponse.json(
//       {
//         message: "Login successful",
//         user: userResponse,
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("Login error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"

// // Temporary in-memory mock user data for demo purposes
// const mockUsers = [
//   {
//     id: 1,
//     email: "alice.anderson@student.edu",
//     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
//     student_number: "CE2021001",
//     first_name: "Alice",
//     last_name: "Anderson",
//     year_of_study: 3,
//     status: "active",
//   },
//   {
//     id: 2,
//     email: "bob.baker@student.edu",
//     password_hash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO", // password123
//     student_number: "CE2021002",
//     first_name: "Bob",
//     last_name: "Baker",
//     year_of_study: 3,
//     status: "active",
//   },
// ]

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { email, password, mode } = body // mode can be 'login' or 'signup'

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
//     }

//     if (mode === "signup") {
//       const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
//       if (existingUser) {
//         return NextResponse.json({ error: "User already exists" }, { status: 400 })
//       }

//       const hashedPassword = await bcrypt.hash(password, 12)

//       const newUser = {
//         id: mockUsers.length + 1,
//         email: email.trim().toLowerCase(),
//         password_hash: hashedPassword,
//         student_number: "TEMP" + String(mockUsers.length + 1).padStart(4, "0"),
//         first_name: "New",
//         last_name: "User",
//         year_of_study: 1,
//         status: "active",
//       }

//       mockUsers.push(newUser)

//       return NextResponse.json(
//         {
//           message: "Signup successful",
//           user: {
//             id: newUser.id,
//             email: newUser.email,
//             student_number: newUser.student_number,
//           },
//         },
//         { status: 201 }
//       )
//     }

//     // LOGIN flow
//     const user = mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

//     if (!user) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password_hash)

//     if (!isValidPassword) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
//     }

//     const userResponse = {
//       id: user.id,
//       email: user.email,
//       student_number: user.student_number,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       year_of_study: user.year_of_study,
//       status: user.status,
//     }

//     return NextResponse.json(
//       {
//         message: "Login successful",
//         user: userResponse,
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("Login error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import pool from "@/lib/db" // Adjust path if necessary

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Query for user by email
    const result = await pool.query("SELECT * FROM students WHERE email = $1", [email.trim().toLowerCase()])
    const user = result.rows[0]

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Prepare response object (excluding password)
    const userResponse = {
      id: user.id,
      email: user.email,
      student_number: user.student_number,
      first_name: user.first_name,
      last_name: user.last_name,
      year_of_study: user.year_of_study,
      //status: user.status,
      enrollment_date: user.enrollment_date,
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
