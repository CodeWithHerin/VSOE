import { z } from 'zod';

export const bookingSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters").regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number").regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
    guests: z.number().min(1, "At least one guest is required").max(4, "Max 4 guests per cabin booking"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
