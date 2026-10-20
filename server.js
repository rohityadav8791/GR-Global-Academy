/**
 * GR Global Academy - Express Server with Resend
 *
 * This server provides a server-side /api/admission-enquiry endpoint
 * that sends admission enquiry and contact form emails via Resend.
 * The API key is never exposed to the frontend.
 *
 * Setup:
 *   1. Copy .env.example to .env and fill in your real values
 *   2. npm install
 *   3. npm run server          (start the API server)
 *   4. npm run dev             (start the Vite dev server, in another terminal)
 *   5. npm run build && npm start   (production: build + serve)
 */

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Validate required environment variables at startup
if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
  console.warn(
    'WARNING: RESEND_API_KEY is not set or is a placeholder. ' +
    'Email sending will fail until you configure a real Resend API key in .env'
  )
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMISSION_EMAIL = process.env.ADMISSION_EMAIL
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

let resendClient
if (RESEND_API_KEY && RESEND_API_KEY !== 're_your_api_key_here') {
  resendClient = new Resend(RESEND_API_KEY)
}

// Simple in-memory rate limiter: max 5 submissions per IP per 5 minutes
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip) {
  const now = Date.now()
  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }

  if (now > record.resetAt) {
    record.count = 1
    record.resetAt = now + RATE_LIMIT_WINDOW_MS
    rateLimitMap.set(ip, record)
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  rateLimitMap.set(ip, record)
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

// Middleware
app.use(cors({ origin: true }))
app.use(express.json({ limit: '100kb' }))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gr-global-academy-api' })
})

// POST /api/admission-enquiry
app.post('/api/admission-enquiry', async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown'

  // Rate limiting
  const rate = checkRateLimit(ip)
  if (!rate.allowed) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    })
  }

  const {
    studentName,
    parentName,
    contactNumber,
    email,
    classOfInterest,
    message,
    _honeypot, // spam protection field - should be empty
  } = req.body

  // Spam protection: honeypot field must be empty
  if (_honeypot && String(_honeypot).trim() !== '') {
    return res.status(400).json({ error: 'Invalid submission.' })
  }

  // Server-side validation
  const errors = {}

  if (!studentName || String(studentName).trim().length < 2) {
    errors.studentName = "Student's name is required (at least 2 characters)."
  }

  if (!parentName || String(parentName).trim().length < 2) {
    errors.parentName = "Parent/guardian name is required (at least 2 characters)."
  }

  if (!contactNumber || !/^[\d\s\-\+\(\)]{10,}$/.test(String(contactNumber).trim())) {
    errors.contactNumber = 'Please enter a valid contact number.'
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!classOfInterest || String(classOfInterest).trim().length < 1) {
    errors.classOfInterest = 'Please select a class of interest.'
  }

  // Message is optional but validate length if provided
  if (message && String(message).trim().length > 2000) {
    errors.message = 'Message must be under 2000 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', fields: errors })
  }

  // Check if Resend is configured
  if (!RESEND_API_KEY || RESEND_API_KEY === 're_your_api_key_here' || !ADMISSION_EMAIL || ADMISSION_EMAIL === 'your-school-email@example.com') {
    return res.status(500).json({
      error:
        'Email service is not configured. Please set RESEND_API_KEY in .env and restart the server.',
    })
  }

  let resendClient
  if (RESEND_API_KEY && RESEND_API_KEY !== 're_your_api_key_here') {
    resendClient = new Resend(RESEND_API_KEY)
  }

  try {
    if (!resendClient) {
      return res.status(500).json({
        error:
          'Email service is not configured. Please set RESEND_API_KEY in .env and restart the server.',
      })
    }

    const emailSubject = `New Admission Enquiry - ${classOfInterest} - Gr Global Academy`

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: 'Lato', 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #292929; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #7A263A; color: #FFFFFF; padding: 24px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.5px;">Gr Global Academy</h1>
            <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">New Admission Enquiry</p>
          </div>
          <div style="background: #F8F1E5; padding: 24px; border-radius: 0 0 10px 10px; border: 1px solid #E8DED2; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A; width: 40%;">Student's Name</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(studentName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A;">Parent/Guardian Name</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(parentName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A;">Contact Number</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(contactNumber)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A;">Email Address</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(email)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A;">Class of Interest</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(classOfInterest)}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #7A263A; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; color: #666666;">${escapeHtml(message)}</td>
              </tr>
              ` : ''}
            </table>
            <p style="margin-top: 20px; font-size: 13px; color: #666666;">
              Submitted via the Gr Global Academy website admission enquiry form.
            </p>
          </div>
        </body>
      </html>
    `

    const response = await resendClient.emails.send({
      from: `Gr Global Academy <${RESEND_FROM_EMAIL}>`,
      to: [ADMISSION_EMAIL],
      subject: emailSubject,
      html: emailHtml,
      replyTo: email,
    })

    return res.status(200).json({
      success: true,
      message: 'Your admission enquiry has been sent successfully.',
      id: response.data?.id || null,
    })
  } catch (err) {
    console.error('Resend error:', err.message)
    return res.status(500).json({
      error: 'Failed to send enquiry. Please try again later.',
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`GR Global Academy API server running on http://localhost:${PORT}`)
  console.log(`Admission enquiry endpoint: POST http://localhost:${PORT}/api/admission-enquiry`)
  if (!resendClient) {
    console.log('WARNING: Resend not configured. Set RESEND_API_KEY in .env to enable email sending.')
  }
})

// Serve static frontend (always, since this server hosts both API and UI)
app.use(express.static(path.join(__dirname, 'dist')))
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

/**
 * Escape HTML to prevent XSS in email output
 */
function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
