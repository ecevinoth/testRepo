import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    const { email, displayName } = await req.json();

    // Check if email exists in users table
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('email, is_registered')
      .eq('email', email)
      .single();

    if (userCheckError) {
      return NextResponse.json({ message: 'Error checking user existence' }, { status: 500 });
    }

    if (!existingUser) {
      return NextResponse.json({ message: 'Email not found. Please contact the game organizer.' }, { status: 400 });
    }

    if (existingUser.is_registered) {
      return NextResponse.json({ message: 'You are already registered for the lucky draw!' }, { status: 200 });
    }

    // Update user record
    const { error: updateError } = await supabase
      .from('users')
      .update({ display_name: displayName, is_registered: true })
      .eq('email', email);

    if (updateError) {
      return NextResponse.json({ message: 'Error updating user record' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
