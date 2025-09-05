import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = forgotPasswordSchema.parse(body)
    const { email } = validatedData

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token to database
    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token: resetToken,
        expires: resetTokenExpiry,
        userId: user.id,
      },
    })

    // Send password reset email
    try {
      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetToken,
      })
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      // Still return success to user for security reasons
    }
    
    return NextResponse.json(
      { message: 'If an account with that email exists, we have sent a password reset link.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)

    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}