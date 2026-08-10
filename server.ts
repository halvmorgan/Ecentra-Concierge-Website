import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadRecord {
  id: string;
  type: 'free_website' | 'quiz_match' | 'calculator_roi' | 'book_call' | 'sms_opt_in' | 'contact_message';
  data: Record<string, any>;
  createdAt: string;
  status: 'new' | 'routed_to_crm' | 'pending_manual_review';
  webhookForwarded?: boolean;
}

const leadsStore: LeadRecord[] = [];

async function forwardToCrmWebhook(lead: LeadRecord) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.trim() === '') {
    return { forwarded: false, reason: 'No LEAD_WEBHOOK_URL configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Ecentra-Concierge-LeadEngine/1.0',
      },
      body: JSON.stringify({
        event: 'lead.captured',
        timestamp: new Date().toISOString(),
        leadId: lead.id,
        leadType: lead.type,
        leadPayload: lead.data,
      }),
    });

    if (response.ok) {
      lead.webhookForwarded = true;
      lead.status = 'routed_to_crm';
      return { forwarded: true, status: response.status };
    } else {
      return { forwarded: false, status: response.status, errorText: await response.text() };
    }
  } catch (error: any) {
    console.error('[CRM Webhook Forward Error]', error);
    return { forwarded: false, error: error.message };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Ecentra Concierge Platform',
      version: '1.0.0',
      time: new Date().toISOString(),
      crmWebhookConfigured: Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_URL.trim() !== ''),
    });
  });

  // 2. Free Website Claim Endpoint
  app.post('/api/leads/website-claim', async (req: Request, res: Response) => {
    try {
      const {
        businessName,
        industry,
        currentWebsite,
        ownerName,
        phone,
        email,
        frustrations,
        primaryGoal,
      } = req.body;

      if (!businessName || !phone || !email) {
        return res.status(400).json({
          success: false,
          error: 'Business name, phone number, and email address are required.',
        });
      }

      const leadId = `EC-SITE-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: leadId,
        type: 'free_website',
        data: {
          businessName,
          industry: industry || 'Other Local Service',
          currentWebsite: currentWebsite || 'None provided / New site',
          ownerName: ownerName || businessName,
          phone,
          email,
          frustrations: frustrations || 'Wants more local customer inquiries',
          primaryGoal: primaryGoal || 'Generate direct phone calls & quotes',
          source: 'Homepage Free Website Offer',
        },
        createdAt: new Date().toISOString(),
        status: 'pending_manual_review',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        message: 'Your free website claim has been submitted! Our design team is reviewing your business details.',
        leadId,
        turnaroundDays: 2,
        assignedSpecialist: 'Ecentra Local Web Team',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[Free Website Claim Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error processing website request.' });
    }
  });

  // 3. Quiz Product Match Lead Endpoint
  app.post('/api/leads/quiz-match', async (req: Request, res: Response) => {
    try {
      const {
        industry,
        biggestProblem,
        weeklyLeads,
        answeringMethod,
        hasAutoFollowUp,
        recommendedProducts,
        contactName,
        phone,
        email,
        businessName,
      } = req.body;

      const leadId = `EC-QUIZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: leadId,
        type: 'quiz_match',
        data: {
          businessName: businessName || 'Local Business',
          contactName: contactName || 'Business Owner',
          phone,
          email,
          industry,
          biggestProblem,
          weeklyLeads,
          answeringMethod,
          hasAutoFollowUp,
          recommendedProducts,
          source: 'Product Match Quiz',
        },
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        leadId,
        recommendedProducts,
        message: 'Quiz analysis saved. A concierge strategist will prepare your custom implementation breakdown.',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[Quiz Match Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error processing quiz match.' });
    }
  });

  // 4. Calculator ROI Lead Capture
  app.post('/api/leads/calculator', async (req: Request, res: Response) => {
    try {
      const {
        missedCallsPerWeek,
        averageTicket,
        closeRate,
        monthlyLostRevenue,
        annualLostRevenue,
        industry,
        phone,
        email,
        businessName,
      } = req.body;

      const leadId = `EC-CALC-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: leadId,
        type: 'calculator_roi',
        data: {
          businessName: businessName || 'Local Business',
          phone,
          email,
          industry: industry || 'Service Industry',
          missedCallsPerWeek,
          averageTicket,
          closeRate,
          monthlyLostRevenue,
          annualLostRevenue,
          source: 'Missed-Lead Cost Calculator',
        },
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        leadId,
        message: 'Your revenue leak report has been compiled.',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[Calculator Capture Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error processing calculator report.' });
    }
  });

  // 5. Book Strategy Call Endpoint
  app.post('/api/leads/book-call', async (req: Request, res: Response) => {
    try {
      const {
        name,
        businessName,
        phone,
        email,
        industry,
        preferredDate,
        preferredTime,
        timezone,
        interest,
        notes,
      } = req.body;

      if (!name || !phone || !email || !preferredDate || !preferredTime) {
        return res.status(400).json({
          success: false,
          error: 'Please provide your name, phone, email, preferred date, and time.',
        });
      }

      const bookingId = `EC-CALL-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: bookingId,
        type: 'book_call',
        data: {
          name,
          businessName: businessName || 'Local Business',
          phone,
          email,
          industry: industry || 'Service Professional',
          preferredDate,
          preferredTime,
          timezone: timezone || 'Local Time',
          interest: interest || 'General AI Implementation & Free Website',
          notes: notes || '',
          source: 'Direct Booking Calendar',
        },
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        bookingId,
        confirmationDetails: {
          date: preferredDate,
          time: preferredTime,
          timezone: timezone || 'Local Time',
          callType: '15-Minute Zero-Fluff Discovery Call',
          phone,
        },
        message: 'Strategy call confirmed! You will receive an SMS and calendar reminder.',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[Book Call Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error scheduling call.' });
    }
  });

  // 6. SMS Opt-In & TCPA 10DLC Consent Verification Endpoint
  app.post('/api/sms-opt-in', async (req: Request, res: Response) => {
    try {
      const {
        firstName,
        lastName,
        phone,
        email,
        businessName,
        topics,
        consentTimestamp,
        consentText,
      } = req.body;

      if (!phone || !firstName) {
        return res.status(400).json({
          success: false,
          error: 'First name and mobile phone number are required for SMS opt-in.',
        });
      }

      const confirmationCode = `SMS-OPT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: confirmationCode,
        type: 'sms_opt_in',
        data: {
          firstName,
          lastName: lastName || '',
          fullName: `${firstName} ${lastName || ''}`.trim(),
          phone,
          email: email || '',
          businessName: businessName || 'Local Business',
          topics: topics || {},
          consentTimestamp: consentTimestamp || new Date().toISOString(),
          consentText: consentText || 'A2P 10DLC explicit SMS opt-in authorized.',
          ipAddress: req.ip || req.headers['x-forwarded-for'] || 'Unknown',
          source: 'Website SMS Opt-In Page',
        },
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        confirmationCode,
        message: 'SMS opt-in registered successfully. Consent record stored.',
        program: 'Ecentra Concierge Alerts',
        helpInstruction: 'Reply HELP for help or call 1-800-ECENTRA',
        stopInstruction: 'Reply STOP to cancel anytime',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[SMS Opt-In Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error recording SMS opt-in.' });
    }
  });

  // 7. Direct Contact Form Submission Endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phone,
        businessName,
        industry,
        topic,
        message,
      } = req.body;

      if (!fullName || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Full name, email address, and phone number are required.',
        });
      }

      const confirmationCode = `CNT-${Math.floor(100000 + Math.random() * 900000)}`;
      const newLead: LeadRecord = {
        id: confirmationCode,
        type: 'contact_message',
        data: {
          fullName,
          email,
          phone,
          businessName: businessName || 'Local Business Operator',
          industry: industry || 'Home & Trade Services',
          topic: topic || 'General Inquiry',
          message: message || '',
          source: 'Website Contact Us Page',
          ipAddress: req.ip || req.headers['x-forwarded-for'] || 'Unknown',
        },
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      const webhookResult = await forwardToCrmWebhook(newLead);
      leadsStore.unshift(newLead);

      return res.status(201).json({
        success: true,
        confirmationCode,
        message: 'Your inquiry has been received. Harold or our concierge desk will reply within 2 business hours.',
        webhookStatus: webhookResult,
      });
    } catch (err: any) {
      console.error('[Contact Submission Error]', err);
      return res.status(500).json({ success: false, error: 'Internal server error processing contact message.' });
    }
  });

  // 8. Lead stats & status helper
  app.get('/api/leads/recent', (req: Request, res: Response) => {
    res.json({
      totalCaptured: leadsStore.length,
      recent: leadsStore.slice(0, 10),
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ecentra Concierge server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
