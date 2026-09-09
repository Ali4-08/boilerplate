## Common Imports

### Next.js Server:
- `import { NextResponse, NextRequest } from "next/server"`
- `import { cookies } from "next/headers"`
- `import { redirect } from "next/navigation"`

### Next.js Client:
- `import { useState } from "react"`
- `import { useRouter } from "next/navigation"`
- `import Link from "next/link"`

### Database:
- `import pool from "@/lib/db"`

### Auth:
- `import { getUserFromToken } from "@/lib/auth"`
- `import bcrypt from "bcryptjs"`
- `import { verifyToken, createToken } from "@/lib/jwt";`

### Types:
- `import type { User, PublicUser, AuthResponse } from "@/lib/types"`