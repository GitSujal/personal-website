/**
 * Mailchimp API Service
 * Handles all communication with Mailchimp API
 */

export interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

export interface MailchimpError {
  type: 'error' | 'success';
  message: string;
}

/**
 * Submits a contact form to Mailchimp
 * @throws Error with message if submission fails
 * @returns Success message
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<string> {
  const apiEndpoint = import.meta.env.VITE_MAILCHIMP_API_ENDPOINT;
  const apiKey = import.meta.env.VITE_MAILCHIMP_API_KEY;

  if (!apiEndpoint || !apiKey) {
    throw new Error(
      'Mailchimp configuration is missing. Please set VITE_MAILCHIMP_API_ENDPOINT and VITE_MAILCHIMP_API_KEY in .env'
    );
  }

  const payload = {
    members: [
      {
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: data.firstName,
          LNAME: data.lastName,
          MESSAGE: data.message,
        },
      },
    ],
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit contact form');
    }

    return 'Thank you for your message! I will get back to you soon.';
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('An unexpected error occurred. Please try again later.', {
      cause: error,
    });
  }
}
