import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  event_type: 'auth_attempt' | 'rate_limit_exceeded' | 'suspicious_activity' | 'data_access' | 'permission_denied';
  user_id?: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip_address?: string;
  user_agent?: string;
}

class SecurityAuditLogger {
  private static instance: SecurityAuditLogger;
  private logQueue: SecurityEvent[] = [];
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds

  private constructor() {
    // Flush logs periodically
    setInterval(() => {
      this.flushLogs();
    }, this.flushInterval);

    // Flush logs before page unload
    window.addEventListener('beforeunload', () => {
      this.flushLogs();
    });
  }

  static getInstance(): SecurityAuditLogger {
    if (!SecurityAuditLogger.instance) {
      SecurityAuditLogger.instance = new SecurityAuditLogger();
    }
    return SecurityAuditLogger.instance;
  }

  logSecurityEvent(event: SecurityEvent) {
    // Add timestamp and browser info
    const enrichedEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      ip_address: event.ip_address || this.getClientIP(),
      user_agent: event.user_agent || navigator.userAgent,
      session_id: this.getSessionId()
    };

    this.logQueue.push(enrichedEvent);

    // Log critical events immediately
    if (event.severity === 'critical') {
      this.flushLogs();
    } else if (this.logQueue.length >= this.batchSize) {
      this.flushLogs();
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', enrichedEvent);
    }
  }

  private async flushLogs() {
    if (this.logQueue.length === 0) return;

    const eventsToFlush = [...this.logQueue];
    this.logQueue = [];

    try {
      // In a real implementation, you'd send to your security log table
      // For now, we'll log to analytics_events
      for (const event of eventsToFlush) {
        await supabase.from('analytics_events').insert({
          event_type: `security_${event.event_type}`,
          event_data: {
            ...event.details,
            severity: event.severity,
            ip_address: event.ip_address,
            user_agent: event.user_agent
          },
          user_id: event.user_id || null
        });
      }
    } catch (error) {
      console.error('Failed to flush security logs:', error);
      // Re-add events to queue for retry
      this.logQueue.unshift(...eventsToFlush);
    }
  }

  private getClientIP(): string {
    // This is a placeholder - in production, you'd get this from your backend
    return 'client_ip_placeholder';
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('security_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('security_session_id', sessionId);
    }
    return sessionId;
  }
}

export const securityLogger = SecurityAuditLogger.getInstance();

// Convenience functions
export function logAuthAttempt(success: boolean, userId?: string, details?: Record<string, any>) {
  securityLogger.logSecurityEvent({
    event_type: 'auth_attempt',
    user_id: userId,
    details: { success, ...details },
    severity: success ? 'low' : 'medium'
  });
}

export function logRateLimitExceeded(userId: string, action: string, remaining: number) {
  securityLogger.logSecurityEvent({
    event_type: 'rate_limit_exceeded',
    user_id: userId,
    details: { action, remaining },
    severity: 'medium'
  });
}

export function logSuspiciousActivity(description: string, userId?: string, details?: Record<string, any>) {
  securityLogger.logSecurityEvent({
    event_type: 'suspicious_activity',
    user_id: userId,
    details: { description, ...details },
    severity: 'high'
  });
}

export function logDataAccess(resource: string, userId: string, action: string) {
  securityLogger.logSecurityEvent({
    event_type: 'data_access',
    user_id: userId,
    details: { resource, action },
    severity: 'low'
  });
}

export function logPermissionDenied(action: string, userId?: string, requiredRole?: string) {
  securityLogger.logSecurityEvent({
    event_type: 'permission_denied',
    user_id: userId,
    details: { action, requiredRole },
    severity: 'medium'
  });
}