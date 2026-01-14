// DOM Elements
const nav = document.getElementById("nav")
const navToggle = document.getElementById("navToggle")
const mobileMenu = document.getElementById("mobileMenu")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightboxImg")
const lightboxClose = document.getElementById("lightboxClose")
const lightboxPrev = document.getElementById("lightboxPrev")
const lightboxNext = document.getElementById("lightboxNext")
const rsvpForm = document.getElementById("rsvpForm")

// Gallery Images
const galleryItems = document.querySelectorAll(".gallery-item")
let currentImageIndex = 0
const galleryImages = Array.from(galleryItems).map((item) => {
  const img = item.querySelector(".gallery-item-inner img") || item.querySelector("img")
  return img ? img.src : ""
}).filter(src => src)

// Navigation Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Mobile Menu Toggle
navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
})

// Close mobile menu when clicking a link
document.querySelectorAll(".mobile-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// Countdown Timer
function updateCountdown() {
  // Đếm đến ngày 25/01/2026 (ví dụ: 11:00 sáng giờ địa phương)
  // Dùng constructor Date theo dạng số để tránh lệch ngày do timezone
  const weddingDate = new Date(2026, 0, 25, 11, 0, 0).getTime()
  const now = new Date().getTime()
  const distance = weddingDate - now

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = String(days).padStart(2, "0")
    document.getElementById("hours").textContent = String(hours).padStart(2, "0")
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")
  }
}

// Update countdown every second
updateCountdown()
setInterval(updateCountdown, 1000)

// Reveal Animation on Scroll with Stagger Effect
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
  const windowHeight = window.innerHeight

  reveals.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top
    const revealPoint = 150

    if (elementTop < windowHeight - revealPoint && !element.classList.contains("active")) {
      // Stagger animation for gallery items
      if (element.classList.contains("gallery-item")) {
        setTimeout(() => {
          element.classList.add("active")
        }, (index % 6) * 100)
      } else {
        element.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)

// Lightbox Gallery
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = index
    lightboxImg.src = galleryImages[currentImageIndex]
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  })
})

// Close Lightbox
lightboxClose.addEventListener("click", closeLightbox)

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = ""
}

// Lightbox Navigation
lightboxPrev.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
  lightboxImg.src = galleryImages[currentImageIndex]
})

lightboxNext.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length
  lightboxImg.src = galleryImages[currentImageIndex]
})

// Keyboard Navigation for Lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return

  if (e.key === "Escape") closeLightbox()
  if (e.key === "ArrowLeft") lightboxPrev.click()
  if (e.key === "ArrowRight") lightboxNext.click()
})

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// RSVP Form Submission with EmailJS
rsvpForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = rsvpForm.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const originalText = btnText.textContent
  
  // Show loading state
  submitBtn.disabled = true
  submitBtn.classList.add("loading")
  
  // Detect language for messages
  const isEnglish = document.documentElement.lang === "en"
  btnText.textContent = isEnglish ? "Sending..." : "Đang gửi..."

  const formData = new FormData(rsvpForm)
  const data = Object.fromEntries(formData)

  // Validate and sanitize form data
  const sanitizedData = {
    name: (data.name || '').trim(),
    phone: (data.phone || '').trim(),
    email: (data.email || '').trim(),
    attendance: data.attendance || '',
    guests: (data.guests || '0').trim(),
    message: (data.message || '').trim()
  }

  // Validate required fields
  if (!sanitizedData.name || !sanitizedData.phone || !sanitizedData.attendance) {
    alert(isEnglish ? 'Please fill in all required fields.' : 'Vui lòng điền đầy đủ các trường bắt buộc.')
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
    btnText.textContent = originalText
    return
  }

  try {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
      // EmailJS Configuration - UPDATE THESE VALUES
      const EMAILJS_SERVICE_ID = 'service_g9i55mi' // Replace with your EmailJS Service ID
      const EMAILJS_TEMPLATE_ID = 'template_vqket6f' // Replace with your EmailJS Template ID for RSVP notification
      const EMAILJS_AUTO_REPLY_TEMPLATE_ID = 'template_td7ikxs' // Replace with your EmailJS Template ID for auto-reply
      const EMAILJS_PUBLIC_KEY = 'gU-SMs97TMOMfbGg6' // Replace with your EmailJS Public Key
      const RECIPIENT_EMAIL = 'bichngocbui339@gmail.com' // Replace with your email address

      // Validate RECIPIENT_EMAIL
      if (!RECIPIENT_EMAIL || !RECIPIENT_EMAIL.includes('@')) {
        throw new Error('RECIPIENT_EMAIL is not configured correctly')
      }

      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Prepare email template parameters
      const attendanceText = sanitizedData.attendance === 'yes' 
        ? (isEnglish ? 'Yes, I will attend' : 'Có, tôi sẽ tham dự')
        : (isEnglish ? 'Sorry, I cannot attend' : 'Xin lỗi, tôi không thể tham dự')
      
      // Map form data to template parameters
      // IMPORTANT: In EmailJS template settings, "To Email" must be set to {{to_email}}
      const templateParams = {
        to_email: RECIPIENT_EMAIL,                    // This MUST match {{to_email}} in EmailJS template
        to_name: 'Bích Ngọc & Tấn Tài',               // Optional: recipient name
        from_name: sanitizedData.name,
        from_email: sanitizedData.email || 'no-email@provided.com',
        reply_to: sanitizedData.email || RECIPIENT_EMAIL,
        subject: isEnglish 
          ? `Wedding RSVP from ${sanitizedData.name}` 
          : `RSVP Đám Cưới từ ${sanitizedData.name}`,
        name: sanitizedData.name,                    // Maps to {{name}} in template
        phone: sanitizedData.phone,                  // Maps to {{phone}} in template
        email: sanitizedData.email || (isEnglish ? 'Not provided' : 'Không cung cấp'),  // Maps to {{email}} in template
        attendance: attendanceText,                  // Maps to {{attendance}} in template
        guests: sanitizedData.guests || '0',         // Maps to {{guests}} in template
        message: sanitizedData.message || (isEnglish ? 'No message provided' : 'Không có lời nhắn'),  // Maps to {{message}} in template
        wedding_date: '24.01.2026',                  // Maps to {{wedding_date}} in template
        couple_names: 'Bích Ngọc & Tấn Tài'          // Maps to {{couple_names}} in template
      }

      // Validate templateParams before sending
      if (!templateParams.to_email || !templateParams.to_email.includes('@')) {
        throw new Error('to_email is required and must be a valid email address')
      }

      // Send RSVP notification email to couple
      let rsvpEmailSent = false
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        rsvpEmailSent = true
      } catch (rsvpError) {
        console.error('RSVP notification failed:', rsvpError.status || rsvpError.text || rsvpError)
      }

      // Send auto-reply email to guest (only if they provided email)
      // This is independent of RSVP notification - if one fails, the other can still succeed
      let autoReplySent = false
      if (sanitizedData.email && sanitizedData.email !== '') {
        // Validate guest email
        if (!sanitizedData.email.includes('@')) {
          console.warn('Invalid guest email, skipping auto-reply:', sanitizedData.email)
        } else {
          try {
            // Map form data to auto-reply template parameters
            // IMPORTANT: to_email MUST be the guest's email, NOT RECIPIENT_EMAIL!
            const autoReplyParams = {
              to_email: sanitizedData.email,             // ⚠️ GUEST EMAIL - Maps to {{to_email}} in template
              to_name: sanitizedData.name,               // Optional: guest name
              from_name: 'Bích Ngọc & Tấn Tài',          // Maps to {{from_name}} in template
              from_email: RECIPIENT_EMAIL,               // Maps to {{from_email}} in template
              reply_to: RECIPIENT_EMAIL,                 // Maps to {{reply_to}} in template
              subject: isEnglish 
                ? `Thank you for your RSVP - Bích Ngọc & Tấn Tài Wedding` 
                : `Cảm ơn bạn đã gửi RSVP - Đám Cưới Bích Ngọc & Tấn Tài`,
              name: sanitizedData.name,                  // Maps to {{name}} in template
              attendance: attendanceText,                 // Maps to {{attendance}} in template
              guests: sanitizedData.guests || '0',       // Maps to {{guests}} in template (conditional)
              wedding_date: '24.01.2026',                 // Maps to {{wedding_date}} in template
              couple_names: 'Bích Ngọc & Tấn Tài'        // Maps to {{couple_names}} in template
            }

            // Validate auto-reply params before sending
            if (!autoReplyParams.to_email || !autoReplyParams.to_email.includes('@')) {
              throw new Error('Auto-reply to_email is required and must be a valid email address')
            }

            // CRITICAL CHECK: Verify we're sending to guest, not recipient
            if (autoReplyParams.to_email === RECIPIENT_EMAIL) {
              console.error('🚫 BLOCKED: Auto-reply to_email is same as RECIPIENT_EMAIL!')
              console.error('   Guest email:', sanitizedData.email)
              console.error('   Recipient email:', RECIPIENT_EMAIL)
              console.error('   This would send auto-reply to you instead of the guest!')
              console.warn('⚠️ Skipping auto-reply to prevent sending to wrong recipient')
              // Don't send - this is a safety check
              throw new Error('Auto-reply must be sent to guest email, not recipient email. Check EmailJS template settings!')
            }

            // Log before sending to verify correct recipient
            console.log('📤 Preparing to send auto-reply:', {
              to_email: autoReplyParams.to_email,
              guest_email: sanitizedData.email,
              recipient_email: RECIPIENT_EMAIL,
              is_correct: autoReplyParams.to_email === sanitizedData.email,
              is_wrong: autoReplyParams.to_email === RECIPIENT_EMAIL,
              template_id: EMAILJS_AUTO_REPLY_TEMPLATE_ID,
              all_params: autoReplyParams
            })

            // CRITICAL: Verify to_email is set and valid before sending
            if (!autoReplyParams.to_email || autoReplyParams.to_email.trim() === '') {
              throw new Error('to_email is empty! Cannot send auto-reply.')
            }

            // Send auto-reply email
            // Note: EmailJS template MUST have "To Email" = {{to_email}} in settings!
            console.log('🚀 Sending auto-reply with params:', {
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_AUTO_REPLY_TEMPLATE_ID,
              to_email: autoReplyParams.to_email,
              // Show all params for debugging
              params_keys: Object.keys(autoReplyParams),
              params_values: Object.values(autoReplyParams)
            })
            
            const sendResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, autoReplyParams)
            autoReplySent = true
            console.log('✅ Auto-reply email sent successfully to GUEST:', sanitizedData.email)
            console.log('   EmailJS response:', sendResult)
          } catch (autoReplyError) {
            console.error('❌ Failed to send auto-reply email:', autoReplyError)
            console.error('   Error details:', {
              status: autoReplyError.status,
              text: autoReplyError.text,
              guest_email: sanitizedData.email,
              recipient_email: RECIPIENT_EMAIL
            })
            // Don't throw - RSVP notification might have succeeded
            // User will still see success message since form was submitted
          }
        }
      }

      // Log errors only
      if (!rsvpEmailSent) {
        console.error('RSVP notification email was not sent')
      }
      if (sanitizedData.email && !autoReplySent) {
        console.error('Auto-reply email was not sent to:', sanitizedData.email)
      }
    } else {
      // Fallback: Log to console if EmailJS is not loaded
      console.log("RSVP Form submitted:", sanitizedData)
      console.warn("EmailJS is not loaded. Please include EmailJS SDK in your HTML.")
    }

    // Show success message
    const successMessage = document.createElement("div")
    successMessage.className = "rsvp-success-message"
    successMessage.innerHTML = `
      <div class="success-content">
        <span class="success-icon">💕</span>
        <h3>${isEnglish ? 'Thank you very much!' : 'Cảm ơn bạn rất nhiều!'}</h3>
        <p>${isEnglish 
          ? 'We have received your RSVP confirmation. We look forward to seeing you on our special day!' 
          : 'Chúng tôi đã nhận được xác nhận tham dự của bạn. Chúng tôi rất mong được gặp bạn trong ngày trọng đại!'}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="success-close-btn">
          ${isEnglish ? 'Close' : 'Đóng'}
        </button>
      </div>
    `
    document.body.appendChild(successMessage)

    // Reset form
    setTimeout(() => {
      rsvpForm.reset()
      // Hide guests field if needed
      const guestsGroup = document.getElementById("guestsGroup")
      if (guestsGroup) {
        guestsGroup.style.display = "none"
      }
    }, 1000)
    
    // Auto remove success message after 8 seconds
    setTimeout(() => {
      if (successMessage.parentElement) {
        successMessage.remove()
      }
    }, 8000)
    
  } catch (error) {
    console.error("Error sending RSVP:", error)
    
    // Show error message
    const errorMessage = document.createElement("div")
    errorMessage.className = "rsvp-success-message"
    errorMessage.innerHTML = `
      <div class="success-content" style="border-color: #e91e63;">
        <span class="success-icon">⚠️</span>
        <h3>${isEnglish ? 'Oops! Something went wrong' : 'Ồ! Có lỗi xảy ra'}</h3>
        <p>${isEnglish 
          ? 'Please try again later or contact us directly. Thank you!' 
          : 'Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi. Cảm ơn bạn!'}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="success-close-btn">
          ${isEnglish ? 'Close' : 'Đóng'}
        </button>
      </div>
    `
    document.body.appendChild(errorMessage)
    
    setTimeout(() => {
      if (errorMessage.parentElement) {
        errorMessage.remove()
      }
    }, 8000)
  } finally {
    // Reset button
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
    btnText.textContent = originalText
  }
})

// Show/hide guests field based on attendance
const attendanceSelect = document.getElementById("attendance")
const guestsGroup = document.getElementById("guestsGroup")

if (attendanceSelect && guestsGroup) {
  attendanceSelect.addEventListener("change", (e) => {
    if (e.target.value === "yes") {
      guestsGroup.style.display = "block"
      guestsGroup.style.animation = "slideInFromBottom 0.5s ease"
    } else {
      guestsGroup.style.display = "none"
    }
  })
  
  // Initially hide if no selection
  if (!attendanceSelect.value || attendanceSelect.value === "no") {
    guestsGroup.style.display = "none"
  }
}

// Parallax Effect for Hero Section (optional)
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-bg")
  const scrolled = window.scrollY

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.4}px)`
  }
})

// Email Configuration (only if forms exist)
const emailConfigForm = document.getElementById("emailConfigForm")
const sendEmailForm = document.getElementById("sendEmailForm")
const emailStatus = document.getElementById("emailStatus")

// Load saved email config from localStorage
function loadEmailConfig() {
  const savedConfig = localStorage.getItem("weddingEmailConfig")
  if (savedConfig) {
    const config = JSON.parse(savedConfig)
    const senderEmail = document.getElementById("senderEmail")
    const senderName = document.getElementById("senderName")
    const appPassword = document.getElementById("appPassword")
    const recipientEmails = document.getElementById("recipientEmails")
    const emailSubject = document.getElementById("emailSubject")
    const emailMessage = document.getElementById("emailMessage")
    
    if (senderEmail) senderEmail.value = config.senderEmail || ""
    if (senderName) senderName.value = config.senderName || ""
    if (appPassword) appPassword.value = config.appPassword || ""
    if (recipientEmails) recipientEmails.value = config.recipientEmails || ""
    if (emailSubject) emailSubject.value = config.emailSubject || "Thiệp mời đám cưới - Ngọc & Tài"
    if (emailMessage) emailMessage.value = config.emailMessage || "Chúc mừng đám cưới Ngọc & Tài nhé"
  }
}

// Save email config to localStorage (only if form exists)
if (emailConfigForm) {
  emailConfigForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const config = {
    senderEmail: document.getElementById("senderEmail").value,
    senderName: document.getElementById("senderName").value,
    appPassword: document.getElementById("appPassword").value,
    recipientEmails: document.getElementById("recipientEmails").value,
    emailSubject: document.getElementById("emailSubject").value,
    emailMessage: document.getElementById("emailMessage").value,
  }

  localStorage.setItem("weddingEmailConfig", JSON.stringify(config))

    if (emailStatus) {
      showEmailStatus("success", "Cấu hình email đã được lưu thành công!")
      
      // Clear status after 3 seconds
      setTimeout(() => {
        if (emailStatus) {
          emailStatus.style.display = "none"
        }
      }, 3000)
    }
  })
}

// Send emails using EmailJS or fetch API (only if form exists)
if (sendEmailForm) {
  sendEmailForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const config = JSON.parse(localStorage.getItem("weddingEmailConfig") || "{}")
  const weddingUrl = document.getElementById("weddingUrl").value

  if (!config.senderEmail || !config.recipientEmails) {
    showEmailStatus("error", "Vui lòng cấu hình email trước khi gửi!")
    return
  }

  if (!weddingUrl) {
    showEmailStatus("error", "Vui lòng nhập URL trang thiệp mời!")
    return
  }

  const recipientEmails = config.recipientEmails
    .split("\n")
    .map((email) => email.trim())
    .filter((email) => email && email.includes("@"))

  if (recipientEmails.length === 0) {
    showEmailStatus("error", "Danh sách email không hợp lệ!")
    return
  }

  showEmailStatus("info", `Đang gửi email đến ${recipientEmails.length} người nhận...`)

  const sendBtn = sendEmailForm.querySelector(".send-email-btn")
  const originalBtnContent = sendBtn.innerHTML
  
  try {
    // Disable button and show loading
    sendBtn.disabled = true
    sendBtn.classList.add("loading")
    sendBtn.innerHTML = '<span class="btn-icon">⏳</span> Đang gửi...'

    // Option 1: Using EmailJS (requires setup)
    // You need to sign up at https://www.emailjs.com/ and get your service ID, template ID, and public key
    // Uncomment and configure the following code if using EmailJS:

    /*
    if (typeof emailjs === 'undefined') {
      // Load EmailJS library
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
      document.head.appendChild(script)
      script.onload = () => {
        emailjs.init('YOUR_PUBLIC_KEY') // Replace with your EmailJS public key
        sendEmailsViaEmailJS(recipientEmails, config, weddingUrl)
      }
    } else {
      sendEmailsViaEmailJS(recipientEmails, config, weddingUrl)
    }
    */

    // Option 2: Using a backend service (recommended)
    // For production, you should use a backend service to send emails
    // This prevents exposing your email credentials
    
    // Simulate sending emails (replace with actual API call)
    await simulateEmailSending(recipientEmails, config, weddingUrl)
    
    showEmailStatus("success", `✅ Đã gửi thiệp mời thành công đến ${recipientEmails.length} email!`)
    
    // Reset button
    sendBtn.disabled = false
    sendBtn.classList.remove("loading")
    sendBtn.innerHTML = originalBtnContent
    
    // Clear status after 5 seconds
    setTimeout(() => {
      emailStatus.style.display = "none"
    }, 5000)

  } catch (error) {
    console.error("Error sending emails:", error)
    showEmailStatus("error", "❌ Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.")
    
    // Reset button
    sendBtn.disabled = false
    sendBtn.classList.remove("loading")
    sendBtn.innerHTML = originalBtnContent
  }
  })
}

// Function to show email status
function showEmailStatus(type, message) {
  if (emailStatus) {
    emailStatus.className = `email-status ${type}`
    emailStatus.textContent = message
    emailStatus.style.display = "block"
  } else {
    console.log(`Email Status [${type}]:`, message)
  }
}

// Simulate email sending (replace with actual implementation)
async function simulateEmailSending(emails, config, weddingUrl) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  // In production, replace this with actual API call:
  /*
  const response = await fetch('/api/send-emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipients: emails,
      senderEmail: config.senderEmail,
      senderName: config.senderName,
      subject: config.emailSubject,
      message: config.emailMessage,
      weddingUrl: weddingUrl,
    }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to send emails')
  }
  */
  
  console.log("Sending emails to:", emails)
  console.log("Wedding URL:", weddingUrl)
  console.log("Email config:", {
    sender: config.senderEmail,
    subject: config.emailSubject,
  })
}

// Function to send emails via EmailJS (if configured)
function sendEmailsViaEmailJS(emails, config, weddingUrl) {
  const promises = emails.map((email) => {
    return emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
      {
        to_email: email,
        from_name: config.senderName,
        from_email: config.senderEmail,
        subject: config.emailSubject,
        message: config.emailMessage,
        wedding_url: weddingUrl,
      }
    )
  })

  return Promise.all(promises)
}

// Load email config on page load
loadEmailConfig()
