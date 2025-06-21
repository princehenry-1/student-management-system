# Student Management System

A comprehensive student management system built with Next.js 14, TypeScript, and PostgreSQL.

## Features

- **Student Management**: Personal information, enrollment tracking, and academic records
- **Course Management**: Course enrollment, lecturer assignments, and TA allocations
- **Fee Management**: Payment tracking, outstanding balances, and financial records
- **Authentication**: Secure login/register system with password hashing
- **Dashboard**: Interactive student dashboard with course and fee information
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: bcryptjs for password hashing
- **Database**: PostgreSQL (scripts included)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ce-department-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up the database:
   - Run the SQL scripts in the `database/` folder in order:
     - `01-create-database.sql`
     - `02-create-tables.sql`
     - `03-insert-sample-data.sql`
     - `04-create-functions.sql`
     - `05-create-views.sql`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- **Email**: alice.anderson@student.edu
- **Password**: password123

## Database Schema

The system uses a PostgreSQL database with three main schemas:

- **users**: Students, lecturers, and teaching assistants
- **academic**: Courses, enrollments, and assignments
- **financial**: Fee structure and payments

### Key Features

- Outstanding fees calculation function
- Comprehensive views for dashboards
- Proper indexing for performance
- Sample data with realistic information

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── database/            # SQL scripts
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
