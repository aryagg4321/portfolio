import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      {/* Error Icon with Cyber Effect */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-2 border-red-500/30 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-red-500/50 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        {/* Glitch Effect Lines */}
        <div className="absolute -top-2 -left-2 w-24 h-1 bg-red-500/30 animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-1 bg-red-500/50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Error Message */}
      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-red-500 font-mono">
          System Error
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {message}
        </p>
        
        {/* Error Code Effect */}
        <div className="font-mono text-xs text-red-400/60 border border-red-500/20 p-2 bg-black/50 rounded">
          ERROR_CODE: DATA_FETCH_FAILED
        </div>
      </div>

      {/* Retry Button */}
      {showRetry && onRetry && (
        <div className="mt-8">
          <Button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-600 text-black font-bold px-8 py-3 rounded-none border-0 btn-cyber"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Connection
          </Button>
        </div>
      )}

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255, 7, 58, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 7, 58, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;