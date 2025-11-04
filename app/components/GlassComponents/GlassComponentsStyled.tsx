import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// ============================================
// TYPE DEFINITIONS
// ============================================

type GlassVariant = 'light' | 'dark' | 'frosted' | 'gradient' | 'neumorphic' | 'minimal';

interface GlassCardProps {
  $blur?: number;
  $borderRadius?: string;
  $padding?: string;
  $variant?: GlassVariant;
  $hover?: boolean;
  $shimmer?: boolean;
}

interface StatGroupProps {
  $gap?: string;
}

interface StatValueProps {
  $size?: string;
  $gradient?: boolean;
}

interface FeatureProps {
  $spacing?: string;
}

interface FeatureTitleProps {
  $size?: string;
}

interface GlassButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'success';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
}

interface GlassInputProps {
  $size?: 'small' | 'medium' | 'large';
  $error?: boolean;
}

interface GlassNotificationProps {
  $type?: 'info' | 'success' | 'warning' | 'error';
}

interface GlassContainerProps {
  $background?: string;
}

interface ParticleProps {
  $size: number;
  $left: number;
  $duration: number;
  $delay: number;
}

interface GlassGridProps {
  $minWidth?: string;
  $gap?: string;
}

// ============================================
// ANIMATIONS
// ============================================

const float = keyframes`
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
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
`;

// ============================================
// GLASS VARIANTS MIXIN
// ============================================

const glassVariants = {
  light: css`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 35, 0.37),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  `,
  dark: css`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
  `,
  frosted: css`
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1),
                inset 0 0 20px rgba(255, 255, 255, 0.2);
  `,
  gradient: css`
    background: linear-gradient(135deg, 
                rgba(255, 0, 150, 0.1), 
                rgba(0, 150, 255, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(255, 0, 150, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
  `,
  neumorphic: css`
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: none;
    box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.3),
                -20px -20px 60px rgba(255, 255, 255, 0.1),
                inset 1px 1px 1px rgba(255, 255, 255, 0.2),
                inset -1px -1px 1px rgba(0, 0, 0, 0.2);
  `,
  minimal: css`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `,
};

// ============================================
// STYLED COMPONENTS
// ============================================

// Base Glass Card
export const GlassCard = styled.div<GlassCardProps>`
  backdrop-filter: blur(${props => props.$blur || 10}px);
  -webkit-backdrop-filter: blur(${props => props.$blur || 10}px);
  border-radius: ${props => props.$borderRadius || '20px'};
  padding: ${props => props.$padding || '40px 35px'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${props => glassVariants[props.$variant || 'light']}
  
  ${props => props.$hover && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 40px rgba(31, 38, 35, 0.4),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.15);
    }
  `}
  
  ${props => props.$shimmer && css`
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 70%
      );
      transform: rotate(45deg);
      animation: ${shimmer} 3s infinite;
    }
  `}
`;

// Glass Title
export const GlassTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

// Stat Components
export const StatGroup = styled.div<StatGroupProps>`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.$gap || '20px'};
  margin-bottom: 40px;
`;

export const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

export const StatValue = styled.div<StatValueProps>`
  font-size: ${props => props.$size || '36px'};
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${props => props.$gradient && css`
    background: linear-gradient(135deg, #FF0096, #0096FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
  `}
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 0.5px;
`;

// Feature Components
export const Feature = styled.div<FeatureProps>`
  margin-bottom: ${props => props.$spacing || '30px'};
`;

export const FeatureTitle = styled.div<FeatureTitleProps>`
  font-size: ${props => props.$size || '32px'};
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 5px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FeatureDescription = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  font-weight: 300;
`;

// Button Component
const buttonVariants = {
  primary: css`
    background: rgba(0, 150, 255, 0.2);
    &:hover { background: rgba(0, 150, 255, 0.3); }
  `,
  secondary: css`
    background: rgba(255, 255, 255, 0.2);
    &:hover { background: rgba(255, 255, 255, 0.3); }
  `,
  danger: css`
    background: rgba(255, 0, 100, 0.2);
    &:hover { background: rgba(255, 0, 100, 0.3); }
  `,
  success: css`
    background: rgba(0, 255, 150, 0.2);
    &:hover { background: rgba(0, 255, 150, 0.3); }
  `,
};

const buttonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: 12px;
  `,
  medium: css`
    padding: 12px 24px;
    font-size: 14px;
  `,
  large: css`
    padding: 16px 32px;
    font-size: 16px;
  `,
};

export const GlassButton = styled.button<GlassButtonProps>`
  ${props => buttonVariants[props.$variant || 'primary']}
  ${props => buttonSizes[props.$size || 'medium']}
  
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  display: inline-block;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  text-align: center;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Input Component
export const GlassInputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const GlassLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const GlassInput = styled.input<GlassInputProps>`
  width: 100%;
  padding: ${props => {
    const sizes = { small: '8px 12px', medium: '12px 16px', large: '16px 20px' };
    return sizes[props.$size || 'medium'];
  }};
  font-size: ${props => {
    const sizes = { small: '12px', medium: '14px', large: '16px' };
    return sizes[props.$size || 'medium'];
  }};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$error ? 'rgba(255, 100, 100, 0.5)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

export const GlassError = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: rgba(255, 100, 100, 0.9);
`;

// Notification Component
export const GlassNotification = styled.div<GlassNotificationProps>`
  padding: 16px 20px;
  background: ${props => {
    const colors = {
      info: 'rgba(0, 150, 255, 0.2)',
      success: 'rgba(0, 255, 150, 0.2)',
      warning: 'rgba(255, 200, 0, 0.2)',
      error: 'rgba(255, 0, 100, 0.2)',
    };
    return colors[props.$type || 'info'];
  }};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  position: relative;
`;

export const NotificationTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
`;

export const NotificationMessage = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

export const NotificationClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

// Container Component
export const GlassContainer = styled.div<GlassContainerProps>`
  min-height: 100vh;
  position: relative;
  background: ${props => props.$background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  padding: 50px 20px;
`;

export const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

export const Particle = styled.div<ParticleProps>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  left: ${props => props.$left}%;
  animation: ${float} ${props => props.$duration}s ${props => props.$delay}s infinite;
`;

// Grid Layout
export const GlassGrid = styled.div<GlassGridProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.$minWidth || '350px'}, 1fr));
  gap: ${props => props.$gap || '30px'};
  position: relative;
  z-index: 1;
`;

// ============================================
// COMPOUND COMPONENTS
// ============================================

// Complete Robot Specs Card
export const RobotSpecsCard = ({ hover = true }) => (
  <GlassCard $variant="light" $hover={hover}>
    <StatGroup>
      <Stat>
        <StatValue>5'6"</StatValue>
        <StatLabel>Height</StatLabel>
      </Stat>
      <Stat>
        <StatValue>66 lbs</StatValue>
        <StatLabel>Weight</StatLabel>
      </Stat>
    </StatGroup>
    
    <Feature>
      <FeatureTitle>4 Hours</FeatureTitle>
      <FeatureDescription>Battery Life with Fast Charging</FeatureDescription>
    </Feature>
    
    <Feature>
      <FeatureTitle>Soft Body</FeatureTitle>
      <FeatureDescription>Made from 3D Lattice Polymer</FeatureDescription>
    </Feature>
    
    <Feature>
      <FeatureTitle>1X Cortex</FeatureTitle>
      <FeatureDescription>Based on NVIDIA Jetson Thor</FeatureDescription>
    </Feature>
    
    <Feature>
      <FeatureTitle>22 DoF</FeatureTitle>
      <FeatureDescription>Human-Level Hand Dexterity</FeatureDescription>
    </Feature>
  </GlassCard>
);

// Export everything
export default {
  GlassCard,
  GlassTitle,
  StatGroup,
  Stat,
  StatValue,
  StatLabel,
  Feature,
  FeatureTitle,
  FeatureDescription,
  GlassButton,
  GlassInputWrapper,
  GlassLabel,
  GlassInput,
  GlassError,
  GlassNotification,
  NotificationTitle,
  NotificationMessage,
  NotificationClose,
  GlassContainer,
  ParticlesContainer,
  Particle,
  GlassGrid,
  RobotSpecsCard,
};
