
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemHealthMonitor } from './SystemHealthMonitor';
import { RateLimitDisplay } from './RateLimitDisplay';
import { useSession } from '@/hooks/useSession';
import { searchRateLimiter, apoRateLimiter, exportRateLimiter, checkRateLimit } from '@/utils/rateLimiting';

export function SystemAdminPanel() {
  const { user } = useSession();

  if (!user) return null;

  const searchStatus = checkRateLimit(searchRateLimiter, user.id);
  const apoStatus = checkRateLimit(apoRateLimiter, user.id);
  const exportStatus = checkRateLimit(exportRateLimiter, user.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">System Monitoring</h2>
        <p className="text-gray-600">Monitor system health and rate limits</p>
      </div>

      <SystemHealthMonitor />

      <Card>
        <CardHeader>
          <CardTitle>Rate Limits Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RateLimitDisplay
            remaining={searchStatus.remaining}
            total={20}
            resetTime={searchStatus.resetTime}
            timeUntilReset={searchStatus.timeUntilReset}
            label="Search Requests"
            variant="search"
          />
          
          <RateLimitDisplay
            remaining={apoStatus.remaining}
            total={5}
            resetTime={apoStatus.resetTime}
            timeUntilReset={apoStatus.timeUntilReset}
            label="APO Analyses"
            variant="analysis"
          />
          
          <RateLimitDisplay
            remaining={exportStatus.remaining}
            total={10}
            resetTime={exportStatus.resetTime}
            timeUntilReset={exportStatus.timeUntilReset}
            label="Export Operations"
            variant="export"
          />
        </CardContent>
      </Card>
    </div>
  );
}
