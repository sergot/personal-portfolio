'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { useForm, ValidationError } from '@formspree/react';

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [state, handleSubmit] = useForm("xqaerkyv");
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
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'message':
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
    
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
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

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        errors[key as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    setTouched({
      name: true,
      email: true,
      message: true
    });

    return isValid;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      handleSubmit(e);
      if (state.succeeded) {
        setFormData({ name: '', email: '', message: '' });
        setValidationErrors({});
        setTouched({ name: false, email: false, message: false });
      }
    }
  };

  if (state.succeeded) {
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
              Your message has been sent successfully. I'll get back to you soon!
            </p>
            <button
              onClick={() => window.location.reload()}
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
            <form onSubmit={onSubmit} className="space-y-6">
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
                <ValidationError prefix="Name" field="name" errors={state.errors} />
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
                <ValidationError prefix="Email" field="email" errors={state.errors} />
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
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button
                type="submit"
                disabled={state.submitting || Object.keys(validationErrors).length > 0}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
              <ValidationError errors={state.errors} />
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
                  href="https://github.com/sergot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <SiGithub className="w-8 h-8" />
                </a>
                <a
                  href="https://linkedin.com/in/filipsergot"
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
                  Poland
                </p>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Email</h4>
                <a
                  href="mailto:filip.sergot@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  filip.sergot@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 