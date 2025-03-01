'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { personal } from '@/data/personal';

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters long';
        }
        if (value.trim().length > 1000) {
          return 'Message must be less than 1000 characters';
        }
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Always validate on change, not just when touched
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error // This will be undefined if there's no error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(key => {
      const fieldKey = key as keyof typeof formData;
      const error = validateField(key, formData[fieldKey]);
      if (error) {
        errors[fieldKey as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    // Only set validation errors if there are any
    setValidationErrors(errors);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Use environment variable for Formspree ID
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      
      if (!formspreeId) {
        throw new Error('Formspree ID not configured');
      }

      // Construct the full Formspree endpoint URL using the ID
      const formspreeEndpoint = `https://formspree.io/f/${formspreeId}`;

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setValidationErrors({});
        setTouched({ name: false, email: false, message: false });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your message has been sent successfully. I&apos;ll get back to you soon!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    touched.name && validationErrors.name
                      ? 'border-red-500 dark:border-red-400'
                      : 'dark:border-gray-600'
                  } dark:bg-gray-700 focus:ring-2 ${
                    touched.name && validationErrors.name
                      ? 'focus:ring-red-500 dark:focus:ring-red-400'
                      : 'focus:ring-blue-500 dark:focus:ring-blue-400'
                  } outline-none transition-shadow`}
                  required
                />
                {touched.name && validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {validationErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    touched.email && validationErrors.email
                      ? 'border-red-500 dark:border-red-400'
                      : 'dark:border-gray-600'
                  } dark:bg-gray-700 focus:ring-2 ${
                    touched.email && validationErrors.email
                      ? 'focus:ring-red-500 dark:focus:ring-red-400'
                      : 'focus:ring-blue-500 dark:focus:ring-blue-400'
                  } outline-none transition-shadow`}
                  required
                />
                {touched.email && validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    touched.message && validationErrors.message
                      ? 'border-red-500 dark:border-red-400'
                      : 'dark:border-gray-600'
                  } dark:bg-gray-700 focus:ring-2 ${
                    touched.message && validationErrors.message
                      ? 'focus:ring-red-500 dark:focus:ring-red-400'
                      : 'focus:ring-blue-500 dark:focus:ring-blue-400'
                  } outline-none transition-shadow`}
                  required
                />
                {touched.message && validationErrors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {validationErrors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={
                  isSubmitting || 
                  Object.values(validationErrors).some(error => error !== undefined)
                }
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                You can also find me on these platforms:
              </p>
              <div className="flex space-x-6">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <SiGithub className="w-8 h-8" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <SiLinkedin className="w-8 h-8" />
                </a>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {personal.location}
                </p>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Email</h4>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {personal.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 