import { Router } from 'express';
import { z } from 'zod';
import { careerOverview, careerEras, championshipTrophies, products, missionInitiatives, fanMessages, radioClips, circuits, helmets } from '../data/mockData.js';
import { telemetrySimulator } from '../services/telemetrySimulator.js';
export const apiRouter = Router();
// Health Check
apiRouter.get('/health', (_req, res) => {
    res.json({
        status: 'ONLINE',
        system: 'LH44 High-Performance Telemetry & Experience Platform',
        driver: 'Sir Lewis Hamilton MBE #44',
        team: 'Scuderia Ferrari HP / Mission 44 / +44',
        timestamp: new Date().toISOString()
    });
});
// Career Endpoints
apiRouter.get('/career/overview', (_req, res) => {
    res.json({ success: true, data: careerOverview });
});
apiRouter.get('/career/eras', (_req, res) => {
    res.json({ success: true, data: careerEras });
});
apiRouter.get('/career/trophies', (_req, res) => {
    res.json({ success: true, data: championshipTrophies });
});
// Telemetry Snapshot
apiRouter.get('/telemetry/snapshot', (_req, res) => {
    const current = telemetrySimulator.getCurrentTelemetry();
    res.json({ success: true, data: current });
});
// Circuits & Multi-Track Switching
apiRouter.get('/circuits', (_req, res) => {
    res.json({
        success: true,
        data: circuits,
        activeTrackId: telemetrySimulator.getActiveTrack().id
    });
});
apiRouter.post('/telemetry/track', (req, res) => {
    const { trackId } = req.body;
    if (!trackId || typeof trackId !== 'string') {
        return res.status(400).json({ success: false, error: 'trackId is required' });
    }
    const switched = telemetrySimulator.setTrack(trackId);
    if (!switched) {
        return res.status(404).json({ success: false, error: 'Circuit not found' });
    }
    res.json({
        success: true,
        activeTrack: telemetrySimulator.getActiveTrack()
    });
});
// Helmet Vault Endpoints
apiRouter.get('/helmets', (req, res) => {
    const category = req.query.category;
    if (category && category !== 'All') {
        const filtered = helmets.filter(h => h.category.toLowerCase() === category.toLowerCase());
        return res.json({ success: true, data: filtered });
    }
    res.json({ success: true, data: helmets });
});
apiRouter.get('/helmets/:id', (req, res) => {
    const helmet = helmets.find(h => h.id === req.params.id);
    if (!helmet) {
        return res.status(404).json({ success: false, error: 'Helmet not found' });
    }
    res.json({ success: true, data: helmet });
});
// Store & Merchandise Endpoints
apiRouter.get('/store/products', (req, res) => {
    const category = req.query.category;
    if (category && category !== 'All') {
        const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        return res.json({ success: true, data: filtered });
    }
    res.json({ success: true, data: products });
});
apiRouter.get('/store/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
});
// Checkout schema
const checkoutItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    size: z.string(),
    color: z.string(),
    price: z.number().positive(),
});
const checkoutSchema = z.object({
    items: z.array(checkoutItemSchema).min(1, 'Cart cannot be empty'),
    customer: z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Valid email is required'),
        country: z.string().min(2, 'Country is required'),
        city: z.string().min(2, 'City is required'),
        address: z.string().min(4, 'Street address is required'),
    }),
});
apiRouter.post('/store/checkout', (req, res) => {
    const parseResult = checkoutSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            success: false,
            errors: parseResult.error.flatten().fieldErrors
        });
    }
    const { items, customer } = parseResult.data;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15;
    const total = subtotal + shipping;
    const orderId = `LH44-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    res.status(201).json({
        success: true,
        data: {
            orderId,
            customerName: customer.name,
            email: customer.email,
            itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shipping,
            total,
            status: 'CONFIRMED',
            estimatedDelivery: '3-5 Business Days (Express Courier)',
            message: 'Thank you for supporting +44 WORLD. A portion of proceeds goes directly to Mission 44 initiatives.'
        }
    });
});
// Mission 44 Endpoints
apiRouter.get('/mission44', (_req, res) => {
    res.json({
        success: true,
        data: {
            totalPledged: '£20 Million+',
            studentsImpacted: '150,000+',
            grantsAwarded: '85+',
            initiatives: missionInitiatives
        }
    });
});
// Paddock & Radio Clips
apiRouter.get('/paddock/radio', (_req, res) => {
    res.json({ success: true, data: radioClips });
});
apiRouter.get('/paddock/messages', (_req, res) => {
    res.json({ success: true, data: fanMessages });
});
const postMessageSchema = z.object({
    author: z.string().min(2, 'Author name required').max(50),
    handle: z.string().min(2, 'Handle required').max(30),
    country: z.string().min(2, 'Country required').max(50),
    flag: z.string().min(1).max(8),
    message: z.string().min(5, 'Message must be at least 5 characters').max(300),
});
apiRouter.post('/paddock/messages', (req, res) => {
    const parseResult = postMessageSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            success: false,
            errors: parseResult.error.flatten().fieldErrors
        });
    }
    const newMessage = {
        id: `msg-${Date.now()}`,
        ...parseResult.data,
        timestamp: 'Just now',
        likes: 1
    };
    fanMessages.unshift(newMessage);
    if (fanMessages.length > 50) {
        fanMessages.pop();
    }
    res.status(201).json({ success: true, data: newMessage });
});
// Contact & Media Inquiries
const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    subject: z.string().min(3, 'Subject is required'),
    category: z.enum(['Partnership', 'Press & Media', 'Mission 44 Grant', 'General Inquiry']),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});
apiRouter.post('/contact', (req, res) => {
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            success: false,
            errors: parseResult.error.flatten().fieldErrors
        });
    }
    res.status(200).json({
        success: true,
        message: 'Your dispatch has been securely routed to Project 44 Management. We will respond within 48 hours.',
        ticketNumber: `INQ-${Math.floor(100000 + Math.random() * 900000)}`
    });
});
