import React from 'react';

function LetterSequenceGame() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6 relative overflow-hidden">
      <div className="flex justify-center items-center relative flex-col">
        <img 
          src={process.env.PUBLIC_URL + "/letter-game-logo2.png"} 
          alt="Sequence Game Logo" 
          className="w-24 h-24 mb-4 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h1 className="text-3xl font-bold">Sequence</h1>
        <p className="text-gray-500 italic mt-4 text-center">
          Make words.<br />
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
            TIMED
          </a>
          
          {/* 5-GUESS button (right) */}
          <a 
            href="https://davisenglish.github.io/sequence-game-5-guess/"
            className="bg-white border border-gray-400 text-black w-52 h-16 text-xl font-semibold rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            5-GUESS
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-4 mt-8">
        <p className="text-gray-500 italic text-sm">© 2026 Davis English. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LetterSequenceGame;
