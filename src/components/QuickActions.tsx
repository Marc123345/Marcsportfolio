import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: () => void;
  color: string;
  badge?: string;
}

export default function QuickActions() {
  const navigate = useNavigate();
  
  const quickActions: QuickAction[] = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Free Consultation',
      description: 'Get expert advice on your project',
      action: () => navigate('/contact'),
      color: 'bg-[#A3D1FF]/10 text-[#A3D1FF] hover:bg-[#A3D1FF]/20',
      badge: 'Popular'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Schedule Call',
      description: 'Book a strategy session',
      action: () => window.open('https://calendly.com/marc-friedman-web-design--meeting-link/30min', '_blank'),
      color: 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + (index * 0.1), duration: 0.3 }}
            whileHover={{ x: -5 }}
          >
            <button onClick={action.action} className={`mr_btn mr_btn_outline ${action.color}`}>
              <span>{action.label}</span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}