import React, { CSSProperties, ReactNode } from 'react';

// ============================================
// TYPES & INTERFACES
// ============================================

interface BaseGlassProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'aside' | 'main';
  hover?: boolean;
  padding?: string | number;
  borderRadius?: string | number;
}

interface GlassCardProps extends BaseGlassProps {
  variant?: 'light' | 'dark' | 'frosted' | 'gradient' | 'neumorphic' | 'minimal';
  title?: string;
  blur?: number;
  opacity?: number;
}

interface StatProps {
  value: string | number;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
  variant?: 'light' | 'dark';
}

interface FeatureProps {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

// ============================================
// STYLE CONSTANTS
// ============================================

const baseGlassStyle: CSSProperties = {
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
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(30px) saturate(200%) brightness(1.1)',
    WebkitBackdropFilter: 'blur(30px) saturate(200%) brightness(1.1)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12), inset 0 0 30px rgba(255, 255, 255, 0.15)',
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

const hoverStyles: CSSProperties = {
  transform: 'translateY(-5px) scale(1.02)',
  boxShadow: '0 15px 40px rgba(31, 38, 35, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
  cursor: 'pointer',
};

// ============================================
// BASE GLASS CARD COMPONENT
// ============================================

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  as: Component = 'div',
  hover = false,
  variant = 'light',
  title,
  blur,
  opacity,
  padding,
  borderRadius,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variantStyles = glassVariants[variant] || glassVariants.light;
  
  const customStyles: CSSProperties = {
    ...baseGlassStyle,
    ...variantStyles,
    ...(blur && { backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }),
    ...(opacity && { background: `rgba(255, 255, 255, ${opacity})` }),
    ...(padding && { padding }),
    ...(borderRadius && { borderRadius }),
    ...(hover && isHovered && hoverStyles),
    ...style,
  };

  const props = {
    className: `glass-card ${variant} ${className}`.trim(),
    style: customStyles,
    onClick,
    onMouseEnter: hover ? () => setIsHovered(true) : undefined,
    onMouseLeave: hover ? () => setIsHovered(false) : undefined,
  };

  return React.createElement(
    Component,
    props,
    <>
      {title && (
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.8)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '30px',
          paddingBottom: '15px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}>
          {title}
        </div>
      )}
      {children}
    </>
  );
};

// ============================================
// STAT COMPONENT
// ============================================

export const GlassStat: React.FC<StatProps> = ({
  value,
  label,
  valueClassName = '',
  labelClassName = '',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div
        className={`glass-stat-value ${valueClassName}`.trim()}
        style={{
          fontSize: '36px',
          fontWeight: 300,
          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
          marginBottom: '5px',
          textShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        {value}
      </div>
      <div
        className={`glass-stat-label ${labelClassName}`.trim()}
        style={{
          fontSize: '14px',
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          fontWeight: 300,
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ============================================
// STAT GROUP COMPONENT
// ============================================

export const GlassStatGroup: React.FC<{ children: ReactNode; gap?: string | number }> = ({
  children,
  gap = '20px',
}) => {
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

export const GlassFeature: React.FC<FeatureProps> = ({
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
          color: 'rgba(0, 0, 0, 0.9)',
          marginBottom: '5px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        {title}
      </div>
      <div
        className={`glass-feature-description ${descriptionClassName}`.trim()}
        style={{
          fontSize: '13px',
          color: 'rgba(0, 0, 0, 0.6)',
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

interface GlassButtonProps extends BaseGlassProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  theme?: 'light' | 'dark';
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  style = {},
  theme = 'light',
  type = 'button',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const isDark = theme === 'dark';

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '12px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' },
  };

  // Theme-aware gradient colors
  const getGradientBackground = () => {
    if (isDark) {
      return 'linear-gradient(135deg, rgba(118, 186, 153, 0.3) 0%, rgba(90, 157, 125, 0.4) 50%, rgba(118, 186, 153, 0.3) 100%)';
    }
    return 'linear-gradient(135deg, rgba(118, 186, 153, 0.4) 0%, rgba(90, 157, 125, 0.5) 50%, rgba(118, 186, 153, 0.4) 100%)';
  };

  const variantColors = {
    primary: 'rgba(118, 186, 153, 0.3)', // #76ba99 - Primary action color
    secondary: 'rgba(255, 255, 255, 0.2)',
    danger: 'rgba(255, 0, 100, 0.2)',
    success: 'rgba(118, 186, 153, 0.3)', // Same as primary
    gradient: getGradientBackground(),
  };

  // Determine text color based on variant and theme
  const getTextColor = () => {
    if (variant === 'primary' || variant === 'success' || variant === 'gradient') {
      return '#ffffff';
    }
    return isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
  };

  // Theme-aware styling for gradient buttons
  const getGradientBorderColor = () => {
    if (isDark) {
      return 'rgba(255, 255, 255, 0.4)';
    }
    return 'rgba(255, 255, 255, 0.6)';
  };

  const getGradientShadow = () => {
    if (isDark) {
      return '0 8px 32px rgba(118, 186, 153, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
    }
    return '0 8px 32px rgba(118, 186, 153, 0.4), 0 2px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(0, 0, 0, 0.08)';
  };

  const getGradientHoverShadow = () => {
    if (isDark) {
      return '0 16px 48px rgba(118, 186, 153, 0.45), 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.15)';
    }
    return '0 16px 48px rgba(118, 186, 153, 0.5), 0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
  };

  const buttonStyles: CSSProperties = {
    ...sizeStyles[size],
    background: variantColors[variant],
    backdropFilter: variant === 'gradient' ? 'blur(20px) saturate(180%)' : 'blur(10px)',
    WebkitBackdropFilter: variant === 'gradient' ? 'blur(20px) saturate(180%)' : 'blur(10px)',
    borderWidth: variant === 'gradient' ? 1.5 : 1,
    borderStyle: 'solid',
    borderColor: variant === 'gradient'
      ? getGradientBorderColor()
      : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'),
    borderRadius: variant === 'gradient' ? '16px' : '12px',
    color: getTextColor(),
    fontWeight: variant === 'gradient' ? 600 : 500,
    letterSpacing: variant === 'gradient' ? '0.8px' : '0.5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-block',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: variant === 'gradient' ? getGradientShadow() : 'none',
    ...(isHovered && !disabled && {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: variant === 'gradient' 
        ? getGradientHoverShadow()
        : '0 8px 24px rgba(0, 0, 0, 0.2)',
      borderColor: variant === 'gradient' ? (isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.8)') : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'),
    }),
    ...(isPressed && !disabled && {
      transform: 'translateY(-1px) scale(0.98)',
      boxShadow: variant === 'gradient' 
        ? (isDark 
            ? '0 4px 16px rgba(118, 186, 153, 0.35), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            : '0 4px 16px rgba(118, 186, 153, 0.4), 0 1px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)')
        : '0 2px 8px rgba(0, 0, 0, 0.2)',
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
      {variant === 'gradient' && (
        <>
          {/* Shimmer overlay effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transform: isHovered ? 'translateX(200%)' : 'translateX(0)',
              transition: 'transform 0.6s ease',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle glow overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(118, 186, 153, 0.2), transparent 70%)',
              opacity: isHovered ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              borderRadius: '16px',
            }}
          />
        </>
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

// ============================================
// GLASS INPUT COMPONENT
// ============================================

interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
}

export const GlassInput: React.FC<GlassInputProps> = ({
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

  const inputStyles: CSSProperties = {
    ...sizeStyles[size],
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${error ? 'rgba(255, 100, 100, 0.5)' : 'rgba(0, 0, 0, 0.15)'}`,
    borderRadius: '8px',
    color: 'rgba(0, 0, 0, 0.9)',
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
          color: 'rgba(0, 0, 0, 0.8)',
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
      <style>{`
        .glass-input::placeholder {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
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

interface GlassContainerProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundStyle?: CSSProperties;
  particleCount?: number;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
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

  const containerStyle: CSSProperties = {
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
// PRE-BUILT ROBOT SPECS CARD (FROM YOUR IMAGE)
// ============================================

export const RobotSpecsCard: React.FC<{ hover?: boolean }> = ({ hover = true }) => {
  return (
    <GlassCard variant="light" hover={hover}>
      <GlassStatGroup>
        <GlassStat value="5'6" label="Height" />
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

interface GlassNotificationProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

export const GlassNotification: React.FC<GlassNotificationProps> = ({
  title,
  message,
  type = 'info',
  onClose,
}) => {
  const typeColors = {
    info: 'rgba(118, 186, 153, 0.2)', // Primary color
    success: 'rgba(118, 186, 153, 0.2)', // Primary color
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
        color: 'rgba(0, 0, 0, 0.9)',
        marginBottom: '4px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.7)',
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
            color: 'rgba(0, 0, 0, 0.5)',
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
