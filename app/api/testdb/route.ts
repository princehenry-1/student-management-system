import { NextResponse } from "next/server";
import pool from "@/lib/db"; // ✅ Adjust this path based on where you saved your db.js or db.ts file

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()"); // Simple test query
    return NextResponse.json({ connected: true, time: result.rows[0].now });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
  }
}
