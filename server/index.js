import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your actual domain
    : ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Data storage (in production, you'd use a proper database)
const DATA_FILE = join(__dirname, 'data', 'newsletter-subscriptions.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load existing subscriptions
async function loadSubscriptions() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save subscriptions to file
async function saveSubscriptions(subscriptions) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(subscriptions, null, 2));
}

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, source = 'website' } = req.body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Load existing subscriptions
    const subscriptions = await loadSubscriptions();

    // Check if email already exists
    const existingSubscription = subscriptions.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Add new subscription
    const newSubscription = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      source,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };

    subscriptions.push(newSubscription);
    await saveSubscriptions(subscriptions);

    // Log subscription (in production, you might want to send to a service like Mailchimp)
    console.log(`New newsletter subscription: ${email} from ${source}`);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        id: newSubscription.id,
        email: newSubscription.email
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.'
    });
  }
});

// Get all subscriptions (for admin purposes)
app.get('/api/newsletter/subscriptions', async (req, res) => {
  try {
    const subscriptions = await loadSubscriptions();
    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load subscriptions'
    });
  }
});

// Unsubscribe endpoint
app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriptions = await loadSubscriptions();
    const subscriptionIndex = subscriptions.findIndex(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (subscriptionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in subscriptions'
      });
    }

    // Update status to unsubscribed
    subscriptions[subscriptionIndex].status = 'unsubscribed';
    subscriptions[subscriptionIndex].unsubscribedAt = new Date().toISOString();

    await saveSubscriptions(subscriptions);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Newsletter API available at http://localhost:${PORT}/api/newsletter`);
  console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
});
