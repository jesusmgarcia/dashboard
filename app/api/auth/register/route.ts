import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/db/mongoose';
import User from '@/app/lib/models/User';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 12);

  await User.create({ email: email.toLowerCase(), password: hash });

  return NextResponse.json({ message: 'Account created' }, { status: 201 });
}
