'use client';

import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoginModal from './LoginModal';
import AdminPanel from './AdminPanel';

interface AdminModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * AdminModal encapsulates the portfolio's administrative interface:
 * 1. Admin Login Modal for authentication (Credentials: Mahmudul / Mahmudul@Mahmudul)
 * 2. CMS Drawer (AdminPanel) for modifying all portfolio sections and saving to localStorage
 */
export default function AdminModal({ isOpen, onClose }: AdminModalProps = {}) {
  const { isLoginOpen, isAdminOpen, setIsLoginOpen, setIsAdminOpen, isAuthenticated } = usePortfolioData();

  // If explicit controlled isOpen prop is passed
  React.useEffect(() => {
    if (typeof isOpen === 'boolean') {
      if (isOpen) {
        if (isAuthenticated) {
          setIsAdminOpen(true);
        } else {
          setIsLoginOpen(true);
        }
      } else {
        setIsLoginOpen(false);
        setIsAdminOpen(false);
        if (onClose) onClose();
      }
    }
  }, [isOpen, isAuthenticated, setIsLoginOpen, setIsAdminOpen, onClose]);

  return (
    <div id="admin-modal-root" className="relative z-[100]">
      {/* Admin Login Dialog */}
      <LoginModal />

      {/* Full CMS Drawer */}
      <AdminPanel />
    </div>
  );
}

export { LoginModal, AdminPanel };
