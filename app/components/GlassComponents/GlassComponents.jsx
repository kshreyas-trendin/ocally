import React, { useState } from 'react';

// ============================================
// STYLE CONSTANTS
// ============================================

const baseGlassStyle = {
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '40px 35px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
};

const glassVariants = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(31, 38, 35, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  frosted: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.2)',
  },
  gradient: {
    background: 'linear-gradient(135deg, rgba(255, 0, 150, 0.1), rgba(0, 150, 255, 0.1))',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(255, 0, 150, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  neumorphic: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: 'none',
    boxShadow: `
      20px 20px 60px rgba(0, 0, 0, 0.3),
      -20px -20px 60px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.2),
      inset -1px -1px 1px rgba(0, 0, 0, 0.2)
    `,
  },
  minimal: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

const hoverStyles = {
  transform: 'translateY(-5px) scale(1.02)',
  boxShadow: '0 15px 40px rgba(31, 38, 35, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
  cursor: 'pointer',
};

// ============================================
// GLASS CARD COMPONENT
// ============================================

export const GlassCard = ({
  children,
  className = '',
  style = {},
  onClick,
  as = 'div',
  hover = false,
  variant = 'light',
  title,
  blur,
  opacity,
  padding,
  borderRadius,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Component = as;

  const variantStyles = glassVariants[variant] || glassVariants.light;
  
  const customStyles = {
    ...baseGlassStyle,
    ...variantStyles,
    ...(blur && { backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }),
    ...(opacity && { background: `rgba(255, 255, 255, ${opacity})` }),
    ...(padding && { padding }),
    ...(borderRadius && { borderRadius }),
    ...(hover && isHovered && hoverStyles),
    ...style,
  };

  return (
    <Component
      className={`glass-card ${variant} ${className}`.trim()}
      style={customStyles}
      onClick={onClick}
      onMouseEnter={hover ? () => setIsHovered(true) : undefined}
      onMouseLeave={hover ? () => setIsHovered(false) : undefined}
    >
      {title && (
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.9)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '30px',
          paddingBottom: '15px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {title}
        </div>
      )}
      {children}
    </Component>
  );
};

// ============================================
// STAT COMPONENTS
// ============================================

export const GlassStat = ({
  value,
  label,
  valueClassName = '',
  labelClassName = '',
}) => {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div
        className={`glass-stat-value ${valueClassName}`.trim()}
        style={{
          fontSize: '36px',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '5px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {value}
      </div>
      <div
        className={`glass-stat-label ${labelClassName}`.trim()}
        style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 300,
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const GlassStatGroup = ({ children, gap = '20px' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap,
      marginBottom: '40px',
    }}>
      {children}
    </div>
  );
};

// ============================================
// FEATURE COMPONENT
// ============================================

export const GlassFeature = ({
  title,
  description,
  titleClassName = '',
  descriptionClassName = '',
}) => {
  return (
    <div style={{ marginBottom: '30px' }}>
      <div
        className={`glass-feature-title ${titleClassName}`.trim()}
        style={{
          fontSize: '32px',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '5px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {title}
      </div>
      <div
        className={`glass-feature-description ${descriptionClassName}`.trim()}
        style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.65)',
          textAlign: 'center',
          fontWeight: 300,
        }}
      >
        {description}
      </div>
    </div>
  );
};

// ============================================
// GLASS BUTTON COMPONENT
// ============================================

export const GlassButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  style = {},
  type = 'button',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '12px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' },
  };

  const variantColors = {
    primary: 'rgba(0, 150, 255, 0.2)',
    secondary: 'rgba(255, 255, 255, 0.2)',
    danger: 'rgba(255, 0, 100, 0.2)',
    success: 'rgba(0, 255, 150, 0.2)',
  };

  const buttonStyles = {
    ...sizeStyles[size],
    background: variantColors[variant],
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    letterSpacing: '0.5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    display: 'inline-block',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    outline: 'none',
    ...(isHovered && !disabled && {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    }),
    ...(isPressed && !disabled && {
      transform: 'translateY(0)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    }),
    ...style,
  };

  return (
    <button
      type={type}
      className={`glass-button ${className}`.trim()}
      style={buttonStyles}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ============================================
// GLASS INPUT COMPONENT
// ============================================

export const GlassInput = ({
  label,
  error,
  size = 'medium',
  className = '',
  style = {},
  ...inputProps
}) => {
  const sizeStyles = {
    small: { padding: '8px 12px', fontSize: '12px' },
    medium: { padding: '12px 16px', fontSize: '14px' },
    large: { padding: '16px 20px', fontSize: '16px' },
  };

  const inputStyles = {
    ...sizeStyles[size],
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${error ? 'rgba(255, 100, 100, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    transition: 'all 0.2s ease',
    ...style,
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500,
        }}>
          {label}
        </label>
      )}
      <input
        className={`glass-input ${className}`.trim()}
        style={inputStyles}
        {...inputProps}
      />
      {error && (
        <span style={{
          display: 'block',
          marginTop: '4px',
          fontSize: '12px',
          color: 'rgba(255, 100, 100, 0.9)',
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

// ============================================
// GLASS CONTAINER WITH BACKGROUND
// ============================================

export const GlassContainer = ({
  children,
  backgroundImage,
  backgroundStyle = {},
  particleCount = 20,
}) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    animationDelay: Math.random() * 20,
    animationDuration: Math.random() * 20 + 20,
  }));

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    background: backgroundImage
      ? `url(${backgroundImage})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '50px 20px',
    ...backgroundStyle,
  };

  return (
    <div style={containerStyle}>
      {/* Floating Particles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              left: `${particle.left}%`,
              animation: `float ${particle.animationDuration}s ${particle.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Keyframe Animation Style */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================
// PRE-BUILT ROBOT SPECS CARD
// ============================================

export const RobotSpecsCard = ({ hover = true }) => {
  return (
    <GlassCard variant="light" hover={hover}>
      <GlassStatGroup>
        <GlassStat value="5'6"" label="Height" />
        <GlassStat value="66 lbs" label="Weight" />
      </GlassStatGroup>
      
      <GlassFeature title="4 Hours" description="Battery Life with Fast Charging" />
      <GlassFeature title="Soft Body" description="Made from 3D Lattice Polymer" />
      <GlassFeature title="1X Cortex" description="Based on NVIDIA Jetson Thor" />
      <GlassFeature title="22 DoF" description="Human-Level Hand Dexterity" />
    </GlassCard>
  );
};

// ============================================
// GLASS NOTIFICATION/TOAST COMPONENT
// ============================================

export const GlassNotification = ({
  title,
  message,
  type = 'info',
  onClose,
}) => {
  const typeColors = {
    info: 'rgba(0, 150, 255, 0.2)',
    success: 'rgba(0, 255, 150, 0.2)',
    warning: 'rgba(255, 200, 0, 0.2)',
    error: 'rgba(255, 0, 100, 0.2)',
  };

  return (
    <div style={{
      padding: '16px 20px',
      background: typeColors[type],
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      position: 'relative',
    }}>
      <div style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.95)',
        marginBottom: '4px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.7)',
      }}>
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

// ============================================
// EXPORT ALL COMPONENTS
// ============================================

export default {
  GlassCard,
  GlassStat,
  GlassStatGroup,
  GlassFeature,
  GlassButton,
  GlassInput,
  GlassContainer,
  RobotSpecsCard,
  GlassNotification,
};
