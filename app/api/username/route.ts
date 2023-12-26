import {NextResponse } from 'next/server'
import { getUser } from '../utils';
export async function GET() {
    try {
      const {username} = await getUser()
      const res = NextResponse.json(username)
      return res;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while fetching the username' });
    }
  }