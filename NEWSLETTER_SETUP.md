# Newsletter Subscription Setup

This project now includes a backend server to handle newsletter subscriptions. Here's how to set it up:

## Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm run dev:server
   ```
   This will start the Express.js server on port 3001.

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

## API Endpoints

The backend provides the following endpoints:

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscriptions` - Get all subscriptions (admin)
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/health` - Health check

## Frontend Features

The newsletter subscription component includes:

- ✅ Email validation using Zod
- ✅ Loading states and error handling
- ✅ Success feedback with toast notifications
- ✅ Duplicate email prevention
- ✅ Source tracking (book-demo, blog, website)
- ✅ Responsive design

## Data Storage

Subscriptions are stored in `server/data/newsletter-subscriptions.json`. In production, you should:

1. Use a proper database (PostgreSQL, MongoDB, etc.)
2. Add email service integration (Mailchimp, SendGrid, etc.)
3. Implement proper authentication for admin endpoints
4. Add rate limiting and security measures

## Production Deployment

For production deployment:

1. Update the CORS origins in `server/index.js`
2. Set environment variables for production
3. Use a process manager like PM2
4. Set up proper logging and monitoring

## Testing the Setup

1. Start the backend: `npm run dev:server`
2. Start the frontend: `npm run dev`
3. Navigate to `/book-demo` or `/blog`
4. Try subscribing with an email address
5. Check the console for subscription logs
6. Verify data is saved in `server/data/newsletter-subscriptions.json`
