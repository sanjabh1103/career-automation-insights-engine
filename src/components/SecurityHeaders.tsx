
import React, { useEffect } from 'react';

export function SecurityHeaders() {
  useEffect(() => {
    // Set Content Security Policy
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https:;
      connect-src 'self' https://kvunnankqgfokeufvsrv.supabase.co https://api.openai.com https://serpapi.com;
      frame-ancestors 'none';
    `.replace(/\s+/g, ' ').trim();
    
    document.head.appendChild(meta);

    // Set other security headers via meta tags
    const headers = [
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { name: 'Permissions-Policy', content: 'geolocation=(), microphone=(), camera=()' }
    ];

    headers.forEach(({ name, content }) => {
      const meta = document.createElement('meta');
      meta.httpEquiv = name;
      meta.content = content;
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup function to remove meta tags if component unmounts
      const metaTags = document.querySelectorAll('meta[http-equiv]');
      metaTags.forEach(tag => {
        if (tag.getAttribute('http-equiv')?.includes('Content-Security-Policy') ||
            tag.getAttribute('http-equiv')?.includes('X-Frame-Options') ||
            tag.getAttribute('http-equiv')?.includes('X-Content-Type-Options') ||
            tag.getAttribute('http-equiv')?.includes('X-XSS-Protection') ||
            tag.getAttribute('http-equiv')?.includes('Referrer-Policy') ||
            tag.getAttribute('http-equiv')?.includes('Permissions-Policy')) {
          tag.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
