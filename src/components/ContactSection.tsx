import React, { useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const data = {
      members: [{
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          MESSAGE: message
        }
      }]
    };

    try {
      const response = await fetch('https://us21.api.mailchimp.com/3.0/lists/44677aa4c7/members/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('anystring:f3deda56e933668eb24b10dd6c4877d4-us21'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-12">
          <Mail className="text-[#3ec1d3]" />
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
                <Mail className="text-[#3ec1d3]" />
                <a href="mailto:sujal@dataprofessionacademy.com" className="hover:text-[#3ec1d3] transition-colors">
                  sujal@dataprofessionacademy.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#3ec1d3]" />
                <a href="tel:0410677503" className="hover:text-[#3ec1d3] transition-colors">
                  0410 677 503
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-[#3ec1d3]" />
                <a 
                  href="https://www.linkedin.com/in/dhunganasujal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3ec1d3] transition-colors"
                >
                  linkedin.com/in/dhunganasujal
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[#3ec1d3]" />
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
                      ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <Button
                type="submit"
                className="bg-[#3ec1d3] text-white w-full hover:bg-[#2596be] transition-colors"
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