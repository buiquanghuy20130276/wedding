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
  const weddingDate = new Date("2026-01-24T08:00:00").getTime()
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

// RSVP Form Submission
rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const submitBtn = rsvpForm.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const originalText = btnText.textContent
  
  // Show loading state
  submitBtn.disabled = true
  submitBtn.classList.add("loading")
  btnText.textContent = "Đang gửi..."

  const formData = new FormData(rsvpForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission with delay
  setTimeout(() => {
    // Simulate form submission
    console.log("RSVP Form submitted:", data)

    // Show success message with better UI
    const successMessage = document.createElement("div")
    successMessage.className = "rsvp-success-message"
    successMessage.innerHTML = `
      <div class="success-content">
        <span class="success-icon">💕</span>
        <h3>Cảm ơn bạn rất nhiều!</h3>
        <p>Chúng tôi đã nhận được xác nhận tham dự của bạn. Chúng tôi rất mong được gặp bạn trong ngày trọng đại!</p>
        <button onclick="this.parentElement.parentElement.remove()" class="success-close-btn">Đóng</button>
      </div>
    `
    rsvpForm.appendChild(successMessage)

    // Reset form
    setTimeout(() => {
      rsvpForm.reset()
      successMessage.remove()
    }, 5000)
    
    // Reset button
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
    btnText.textContent = originalText
  }, 1500)
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

// Email Configuration
const emailConfigForm = document.getElementById("emailConfigForm")
const sendEmailForm = document.getElementById("sendEmailForm")
const emailStatus = document.getElementById("emailStatus")

// Load saved email config from localStorage
function loadEmailConfig() {
  const savedConfig = localStorage.getItem("weddingEmailConfig")
  if (savedConfig) {
    const config = JSON.parse(savedConfig)
    document.getElementById("senderEmail").value = config.senderEmail || ""
    document.getElementById("senderName").value = config.senderName || ""
    document.getElementById("appPassword").value = config.appPassword || ""
    document.getElementById("recipientEmails").value = config.recipientEmails || ""
    document.getElementById("emailSubject").value = config.emailSubject || "Thiệp mời đám cưới - Minh & Linh"
    document.getElementById("emailMessage").value = config.emailMessage || ""
  }
}

// Save email config to localStorage
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

  showEmailStatus("success", "Cấu hình email đã được lưu thành công!")
  
  // Clear status after 3 seconds
  setTimeout(() => {
    emailStatus.style.display = "none"
  }, 3000)
})

// Send emails using EmailJS or fetch API
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

// Function to show email status
function showEmailStatus(type, message) {
  emailStatus.className = `email-status ${type}`
  emailStatus.textContent = message
  emailStatus.style.display = "block"
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
