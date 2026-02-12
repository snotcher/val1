import React, { useState } from 'react';
import Confetti from 'react-confetti';
import Typewriter from 'typewriter-effect';
import './App.css';
import FallingHearts from './FallingHearts';

function App() {
  const [yesSize, setYesSize] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState("Processing answer...");
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const playerRef = React.useRef(null);

  // ... (useEffect remains same)

  const handleSendMessage = async () => {
    if (!noteContent.trim()) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: noteContent }),
      });

      if (response.ok) {
        setMessageSubmitted(true);
      } else {
        alert("Failed to send message. Please try again! 😢");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please check your connection! 😢");
    } finally {
      setIsSending(false);
    }
  };

  React.useEffect(() => {
    // 1. Load YouTube IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 2. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'SOJpE1KMUbo',
        playerVars: {
          'autoplay': 1,
          'loop': 1,
          'playlist': 'SOJpE1KMUbo',
          'controls': 0,
          'showinfo': 0,
          'enablejsapi': 1,
          'playsinline': 1 // Crucial for mobile
        },
        events: {
          'onReady': onPlayerReady,
        }
      });
    };

    return () => {
      // Cleanup global callback if component unmounts
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const onPlayerReady = (event) => {
    setMusicReady(true);
    event.target.playVideo(); // Try auto-play (works on desktop)
    event.target.setVolume(50); // Set volume
  };

  const handleStart = () => {
    setStarted(true);
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo(); // Force play on user interaction (Mobile fix)
      playerRef.current.unMute(); // Ensure unmuted
    }
  };

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // When "No" is clicked, make "Yes" bigger and change text!
  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesSize(yesSize * 1.5);
  };

  const handleYes = () => {
    setCurrentStep(9); // Go to loading screen (Updated index)

    // Simulate loading
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);

      if (p === 30) setLoadingText("Checking compatibility...");
      if (p === 70) setLoadingText("Soulmate match detected: 100%");

      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep(10); // Go to success screen (Updated index)
        }, 1000);
      }
    }, 40); // 4 seconds total
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Steps content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="story-step" key={0}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Hey the prettiest Soumia')
                    .pauseFor(1000)
                    .callFunction(() => {
                      // Show button after typing
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 75,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 1:
        return (
          <div className="story-step" key={1}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('I have something to ask you.')
                    .pauseFor(1000)
                    .callFunction(() => {
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 50,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 2:
        return (
          <div className="story-step" key={2}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('But before I ask...')
                    .pauseFor(1000)
                    .callFunction(() => {
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 50,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 3:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You make my days better.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 4:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You’re my favorite notification.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 5:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You’re the best thing that happened to me.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 6:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>I love the night calls with you.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 7:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>Every moment with you is a gift.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 8:
        return (
          <div className="question-container fade-in-final">
            <img
              src={process.env.PUBLIC_URL + '/a21ab405465b371794a8aebd6c121a2d-removebg-preview.png'}
              alt="Cute bear"
              className="valentine-image"
            />
            <h1 className="main-question">Will you be my Valentine?</h1>
            <div className="buttons-container">
              <button
                className="yes-button"
                style={{ fontSize: `${yesSize}rem` }}
                onClick={handleYes}
              >
                Yes
              </button>
              <button className="no-button" onClick={handleNoClick}>
                {getNoButtonText()}
              </button>
            </div>
          </div>
        );
      case 9: // Fake Loading Screen
        return (
          <div className="loading-container">
            <h2 className="loading-text">{loadingText}</h2>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-percent">{progress}%</p>
          </div>
        );
      case 10: // Success Screen
        return (
          <div className="success-container fade-in-final">
            {/* Confetti Explosion */}
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
            <h1 className="success-message">YEEY 💘 You’re officially stuck with me.</h1>
            <div className="gif-container">
              <iframe src="https://giphy.com/embed/MDJ9IbxxvDUQM" width="480" height="351" frameBorder="0" className="giphy-embed" allowFullScreen title="love-gif"></iframe>
            </div>

            {!messageSubmitted ? (
              <div className="personalized-area">
                <p className="instruction">Write something sweet here for your bobo:</p>
                <textarea
                  className="love-note"
                  placeholder="I love you because..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                <button
                  className="screenshot-btn"
                  onClick={handleSendMessage}
                  disabled={!noteContent.trim() || isSending}
                >
                  {isSending ? "Sending... 💌" : "Click here to send 💌"}
                </button>
              </div>
            ) : (
              <div className="fade-in-final">
                <div className="paper-container">
                  <div className="paper-lines">
                    <p className="paper-text">{noteContent}</p>
                  </div>
                </div>
                <p className="screenshot-instruction">Screenshot this message and send it to me 📸</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* YouTube Player Container - Always in DOM but hidden */}
      <div id="youtube-player" style={{ position: 'absolute', top: -9999, left: -9999 }}></div>

      {!started ? (
        <button className="start-button" onClick={handleStart}>
          {musicReady ? "Tap to Open 💌" : "Loading... 💌"}
        </button>
      ) : (
        <>
          {/* Falling Hearts Animation Background */}
          <FallingHearts />

          {renderStep()}
        </>
      )}
    </div>
  );
}

export default App;
