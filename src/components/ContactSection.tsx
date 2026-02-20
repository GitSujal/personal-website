import React, { useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitContactForm } from '../services/mailchimp';
import { THEME } from '../config/theme';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const message = formData.get('message') as string;

    try {
      const successMessage = await submitContactForm({
        email,
        firstName,
        lastName,
        message,
      });

      setFormStatus({
        type: 'success',
        message: successMessage,
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={THEME.backgrounds.section}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-12">
          <Mail className={THEME.components.icon.primary} />
          <h2 className="text-3xl font-bold">Get in Touch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className={THEME.components.icon.primary} />
                <a href="mailto:sujal@dataprofessionacademy.com" className={THEME.components.link}>
                  sujal@dataprofessionacademy.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className={THEME.components.icon.primary} />
                <a href="tel:0410677503" className={THEME.components.link}>
                  0410 677 503
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className={THEME.components.icon.primary} />
                <a
                  href="https://www.linkedin.com/in/dhunganasujal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={THEME.components.link}
                >
                  linkedin.com/in/dhunganasujal
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className={THEME.components.icon.primary} />
                <span>Perth, Western Australia</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  required
                  isDisabled={isSubmitting}
                />
                <Input
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  required
                  isDisabled={isSubmitting}
                />
              </div>
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                required
                isDisabled={isSubmitting}
              />
              <Textarea
                name="message"
                label="Message"
                placeholder="Enter your message"
                minRows={4}
                required
                isDisabled={isSubmitting}
              />
              {formStatus.message && (
                <div
                  className={`p-4 rounded-lg ${
                    formStatus.type === 'success'
                      ? `${THEME.colors.success.lightBg} ${THEME.colors.success.lightText} ${THEME.colors.success.darkBg} ${THEME.colors.success.darkText}`
                      : `${THEME.colors.error.lightBg} ${THEME.colors.error.lightText} ${THEME.colors.error.darkBg} ${THEME.colors.error.darkText}`
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <Button
                type="submit"
                className={THEME.components.button.primary}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}