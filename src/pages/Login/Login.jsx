import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Pill,
  HeartPulse,
  MapPin,
  ShieldPlus,
  ExternalLink,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // =========================================
  // ADD YOUR PROJECT WEBPAGE LINK HERE
  // =========================================

  const projectLink = "https://ayushmithra.netlify.app/";

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = (e) => {
  e.preventDefault();
  navigate("/dashboard");
};

  // =========================================
  // FORGOT PASSWORD
  // =========================================

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!resetEmail) {
      alert("Please enter your email address.");
      return;
    }

    // Firebase reset will come later.
    setResetSent(true);
  };

  return (
    <div className="login-page">

      {/* =========================================
          FLOATING MEDICAL BUBBLES
      ========================================= */}

      <div className="bubble bubble1">
        <Pill size={34} strokeWidth={2} />
      </div>

      <div className="bubble bubble2">
        <HeartPulse size={34} strokeWidth={2} />
      </div>

      <div className="bubble bubble3">
        <MapPin size={34} strokeWidth={2} />
      </div>

      <div className="bubble bubble4">
        <ShieldPlus size={34} strokeWidth={2} />
      </div>

      {/* =========================================
          HEARTBEAT LINE
      ========================================= */}

      <div className="heartbeat-line">
        <svg
          viewBox="0 0 600 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 70 L70 70 L95 45 L120 95 L150 30 L180 70 L260 70 L290 40 L330 95 L380 25 L430 70 L520 70 L560 50 L600 70"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className="glow-circle glow1"></div>
      <div className="glow-circle glow2"></div>

      {/* =========================================
          LOGIN CARD
      ========================================= */}

      <div className="login-card">

        {/* LOGO */}
        <div className="logo-container">

          <div className="logo-circle">
            💊
          </div>

          <h1>AyushMithra</h1>

          <p>
            Smart Medication &amp; Health Monitoring
          </p>

        </div>

        {/* WELCOME */}
        <h2>Welcome Back!</h2>

        {/* =========================================
            LOGIN FORM
        ========================================= */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-group">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Email or Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* REMEMBER + FORGOT */}

          <div className="login-options">

            <label>

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              Remember Me

            </label>

            <button
              type="button"
              className="forgot-link"
              onClick={() => {
                setShowForgotModal(true);
                setResetSent(false);
                setResetEmail("");
              }}
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            className="login-btn"
            type="submit"
          >
            LOGIN
          </button>

          {/* DIVIDER */}

          <div className="divider">
            <span>OR</span>
          </div>

          {/* GOOGLE */}

          <button
            type="button"
            className="google-btn"
          >

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />

            Continue with Google

          </button>

          {/* SIGN UP */}

          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </button>

        </form>

      </div>

      {/* =========================================
          PROJECT INFORMATION CARD
          
          IMPORTANT:
          This is OUTSIDE the login-card.
          Therefore it will NOT overlap the login form.
      ========================================= */}

      <div className="project-details-card">

        <div className="project-details-icon">
          <Pill size={19} />
        </div>

<div className="project-details-content">
  <h4>NOTE:</h4>

  <p>
    Please do check out this link , it 
    <br />
    has the complete explanation of
    <br />
    this project.
  </p>

  <a
    href={projectLink}
    target="_blank"
    rel="noopener noreferrer"
    className="project-details-link"
  >
    View Project
    <ExternalLink size={13} />
  </a>
</div>
      </div>

      {/* =========================================
          FORGOT PASSWORD MODAL
      ========================================= */}

      {showForgotModal && (

        <div
          className="forgot-overlay"
          onClick={() =>
            setShowForgotModal(false)
          }
        >

          <div
            className="forgot-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="close-modal"
              onClick={() =>
                setShowForgotModal(false)
              }
            >
              ✕
            </button>

            <h2>
              Forgot Password?
            </h2>

            <p>
              Enter your registered Gmail address
              and we'll send a password reset link.
            </p>

            {!resetSent ? (

              <form onSubmit={handleResetPassword}>

                <div className="input-group">

                  <Mail size={18} />

                  <input
                    type="email"
                    placeholder="Enter your Gmail"
                    value={resetEmail}
                    onChange={(e) =>
                      setResetEmail(e.target.value)
                    }
                  />

                </div>

                <button
                  className="login-btn"
                  type="submit"
                >
                  Send Reset Link
                </button>

              </form>

            ) : (

              <div className="success-message">

                <div className="success-icon">
                  ✅
                </div>

                <h3>
                  Reset Link Sent!
                </h3>

                <p>
                  We've sent a password reset link to
                  <br />
                  <strong>{resetEmail}</strong>
                </p>

                <button
                  className="login-btn"
                  onClick={() =>
                    setShowForgotModal(false)
                  }
                >
                  Back to Login
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}