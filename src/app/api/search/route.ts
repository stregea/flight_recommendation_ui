import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { departure, arrival, date } = await req.json();

  try {
    const response = await fetch('http://localhost:8080/api/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departure, arrival, date }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
