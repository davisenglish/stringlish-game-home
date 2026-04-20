import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBug } from '@fortawesome/free-solid-svg-icons';

/** First line of contact / bug-report email body (Home hub) */
const CONTACT_VERSION_LINE = 'Version: Stringlish Home';
/** Contact and bug forms open the mail app addressed to this inbox */
const CONTACT_TO_EMAIL = 'info@stringlish.com';

function LetterSequenceGame() {
  const [showContactModal, setShowContactModal] = useState(false);
  /** Which footer link opened the shared form (header title + icon only). */
  const [contactModalMode, setContactModalMode] = useState('contact');
  const [contactModalClosing, setContactModalClosing] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  /** Version line is only in the outgoing email body, not shown in the modal. */
  const buildContactMailBody = () => {
    const msg = contactMessage.trim();
    let bodyText = `${CONTACT_VERSION_LINE}\n\n`;
    const em = contactEmail.trim();
    if (em) {
      bodyText += `From: ${em}\n\n`;
    }
    bodyText += msg;
    return bodyText;
  };

  const closeContactModal = () => {
    setContactModalClosing(true);
    setShowContactModal(false);
    setTimeout(() => {
      setContactModalClosing(false);
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      setContactModalMode('contact');
    }, 200);
  };

  /** Opens the user’s mail client with messages addressed to this inbox */
  const handleContactSend = () => {
    const msg = contactMessage.trim();
    if (!msg) return;
    const subject = encodeURIComponent(
      (contactSubject.trim() || 'Stringlish - Home').slice(0, 200)
    );
    const body = encodeURIComponent(buildContactMailBody());
    window.location.href = `mailto:${CONTACT_TO_EMAIL}?subject=${subject}&body=${body}`;
    closeContactModal();
  };

  return (
    <div className="w-full min-h-[100dvh] pb-[5.5rem]">
      <div className="p-6 max-w-xl mx-auto text-center space-y-6 relative overflow-hidden">
        <div className="flex justify-center items-center relative flex-col">
          <img
            src={process.env.PUBLIC_URL + '/letter-game-logo2.png'}
            alt="Stringlish Game Logo"
            className="w-24 h-24 mb-4 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-3xl font-bold">Stringlish</h1>
          <p className="text-gray-500 italic mt-4 text-center">
            Make words.
            <br />
            Tickle your brain.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3">
          {/* Game Mode Buttons */}
          <div className="flex flex-wrap justify-center items-start gap-3">
            {/* TIMED button (left) */}
            <a
              href="https://davisenglish.github.io/sequence-game-timed/"
              className="bg-white border border-gray-400 text-black w-52 h-16 text-xl font-semibold rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="mr-1.5" aria-hidden="true">
                ⏰
              </span>
              TIMED
            </a>

            {/* 4-GUESS button (right) */}
            <a
              href="https://davisenglish.github.io/sequence-game-5-guess/"
              className="bg-white border border-gray-400 text-black w-52 h-16 text-xl font-semibold rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="mr-1.5" aria-hidden="true">
                🔮
              </span>
              4-GUESS
            </a>
          </div>
        </div>
      </div>

      {/* Contact / Report a Bug — same shell as Rules modal: sticky header / scroll body / sticky footer (ver2 layout) */}
      {(showContactModal || contactModalClosing) && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] ${contactModalClosing ? 'modal-fade-out' : 'modal-fade-in'}`}
          style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}
          onClick={closeContactModal}
          role="presentation"
        >
          <div
            className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md mx-4 sm:mx-6 flex flex-col max-h-[min(90vh,90dvh)] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="contact-modal-title"
            aria-modal="true"
          >
            <div className="flex items-center justify-between flex-shrink-0 p-4 sm:p-6 pb-3 border-b border-gray-200 bg-white z-10">
              <h2 id="contact-modal-title" className="text-lg font-bold text-left flex items-center gap-2">
                <FontAwesomeIcon
                  icon={contactModalMode === 'bug' ? faBug : faEnvelope}
                  className="text-gray-600"
                  aria-hidden
                />
                {contactModalMode === 'bug' ? 'Report a Bug' : 'Contact'}
              </h2>
              <button
                type="button"
                onClick={closeContactModal}
                className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl font-bold leading-none p-1 -mr-1 -mt-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto text-left px-4 sm:px-6 py-4 space-y-4">
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[140px] resize-y"
                  placeholder="Your message…"
                />
              </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4 sm:px-6 flex flex-row justify-between items-center gap-3 w-full">
              <button
                type="button"
                onClick={closeContactModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleContactSend}
                disabled={!contactMessage.trim()}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modal-fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .modal-fade-in {
          animation: modal-fade-in 0.2s ease-out forwards;
        }

        @keyframes modal-fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .modal-fade-out {
          animation: modal-fade-out 0.2s ease-out forwards;
        }
      `}</style>

      {/* Footer - hidden on mobile during gameplay when keyboard is shown */}
      <footer className="text-center flex flex-col items-center gap-1.5 fixed bottom-0 left-0 right-0 z-[15] bg-white border-t border-gray-200 pt-2 pb-[max(8px,env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <button
            type="button"
            onClick={() => {
              setContactModalMode('contact');
              setContactModalClosing(false);
              setShowContactModal(true);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => {
              setContactModalMode('bug');
              setContactModalClosing(false);
              setShowContactModal(true);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
          >
            Report a Bug
          </button>
        </div>
        <p className="text-gray-500 italic text-sm leading-tight">© 2026 Davis English. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LetterSequenceGame;
