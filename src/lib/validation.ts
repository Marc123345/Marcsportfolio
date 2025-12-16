// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: any;
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  const sanitized = email.trim().toLowerCase();
  const errors: string[] = [];
  
  if (!sanitized) {
    errors.push('Email is required');
  } else if (sanitized.length > 254) {
    errors.push('Email address is too long');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized
  };
}

// Name validation (first name, last name)
export function validateName(name: string, fieldName: string, required: boolean = true): ValidationResult {
  const sanitized = name.trim();
  const errors: string[] = [];
  
  if (!sanitized && required) {
    errors.push(`${fieldName} is required`);
  } else if (sanitized.length > 50) {
    errors.push(`${fieldName} must be less than 50 characters`);
  } else if (sanitized && !/^[a-zA-Z\s'-]+$/.test(sanitized)) {
    errors.push(`${fieldName} contains invalid characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized
  };
}

// Text field validation (messages, descriptions)
export function validateText(text: string, fieldName: string, minLength: number = 10, maxLength: number = 2000): ValidationResult {
  const sanitized = text.trim();
  const errors: string[] = [];
  
  if (!sanitized) {
    errors.push(`${fieldName} is required`);
  } else if (sanitized.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters`);
  } else if (sanitized.length > maxLength) {
    errors.push(`${fieldName} must be less than ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized
  };
}

// Phone number validation
export function validatePhone(phone: string): ValidationResult {
  const sanitized = phone.trim();
  const errors: string[] = [];
  
  if (sanitized && !/^[\+]?[1-9][\d]{0,15}$/.test(sanitized.replace(/[\s\-\(\)]/g, ''))) {
    errors.push('Please enter a valid phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized
  };
}

// URL validation
export function validateUrl(url: string): ValidationResult {
  let sanitized = url.trim();
  const errors: string[] = [];
  
  if (!sanitized) {
    errors.push('URL is required');
    return { isValid: false, errors };
  }
  
  // Add protocol if missing
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    sanitized = 'https://' + sanitized;
  }
  
  try {
    const urlObj = new URL(sanitized);
    
    // Security check - only allow http/https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      errors.push('Please enter a valid HTTP or HTTPS URL');
    }
    
    // Check for suspicious patterns
    if (urlObj.hostname === 'localhost' || urlObj.hostname.includes('127.0.0.1')) {
      errors.push('Local URLs cannot be analyzed');
    }
    
  } catch (e) {
    errors.push('Please enter a valid URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized
  };
}

// Numeric input validation
export function validateNumericInput(value: string, fieldName: string, min: number = 0, max: number = Infinity): ValidationResult {
  const numericValue = parseFloat(value);
  const errors: string[] = [];
  
  if (isNaN(numericValue)) {
    errors.push(`${fieldName} must be a valid number`);
  } else if (numericValue < min) {
    errors.push(`${fieldName} must be at least ${min}`);
  } else if (numericValue > max) {
    errors.push(`${fieldName} must be less than ${max}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: numericValue
  };
}

// Sanitize HTML content to prevent XSS
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting check (client-side basic check)
export function checkRateLimit(email: string): boolean {
  const key = `rate_limit_${email}`;
  const now = Date.now();
  const stored = localStorage.getItem(key);
  
  if (stored) {
    const { count, timestamp } = JSON.parse(stored);
    const timeDiff = now - timestamp;
    
    // Allow 3 submissions per hour
    if (timeDiff < 3600000 && count >= 3) {
      return false;
    }
    
    // Reset if more than an hour has passed
    if (timeDiff >= 3600000) {
      localStorage.setItem(key, JSON.stringify({ count: 1, timestamp: now }));
      return true;
    }
    
    // Increment count
    localStorage.setItem(key, JSON.stringify({ count: count + 1, timestamp }));
    return true;
  }
  
  // First submission
  localStorage.setItem(key, JSON.stringify({ count: 1, timestamp: now }));
  return true;
}