import React, { useState } from 'react';
import {
  GlassCard,
  GlassStat,
  GlassStatGroup,
  GlassFeature,
  GlassButton,
  GlassInput,
  GlassContainer,
  RobotSpecsCard,
  GlassNotification,
} from './GlassComponents';

// ============================================
// EXAMPLE USAGE OF ALL GLASS COMPONENTS
// ============================================

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'light' | 'dark' | 'frosted' | 'gradient' | 'neumorphic' | 'minimal'>('light');

  return (
    <GlassContainer 
      particleCount={15}
      backgroundStyle={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '30px',
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontSize: '48px',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}>
            Glass Components Gallery
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '18px' 
          }}>
            Beautiful glassmorphism React components for your product
          </p>
        </div>

        {/* Variant Selector */}
        <GlassCard variant="dark" title="Select Glass Variant">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(['light', 'dark', 'frosted', 'gradient', 'neumorphic', 'minimal'] as const).map(variant => (
              <GlassButton
                key={variant}
                variant={selectedVariant === variant ? 'primary' : 'secondary'}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </GlassButton>
            ))}
          </div>
        </GlassCard>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
        }}>
          
          {/* Example 1: Robot Specs Card */}
          <RobotSpecsCard hover={true} />

          {/* Example 2: Dynamic Glass Card */}
          <GlassCard variant={selectedVariant} title="Dashboard Stats" hover>
            <GlassStatGroup>
              <GlassStat value="2.4K" label="Users" />
              <GlassStat value="89%" label="Growth" />
            </GlassStatGroup>
            
            <GlassFeature 
              title="Revenue" 
              description="$12,456 this month" 
            />
            
            <GlassFeature 
              title="Active Projects" 
              description="24 ongoing projects" 
            />
          </GlassCard>

          {/* Example 3: Form Card */}
          <GlassCard variant="frosted" title="Subscribe">
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowNotification(true);
              setTimeout(() => setShowNotification(false), 3000);
            }}>
              <GlassInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="medium"
              />
              
              <GlassInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                size="medium"
              />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <GlassButton type="submit" variant="primary" fullWidth>
                  Subscribe
                </GlassButton>
                <GlassButton variant="secondary" fullWidth>
                  Cancel
                </GlassButton>
              </div>
            </form>
          </GlassCard>

          {/* Example 4: Feature Card */}
          <GlassCard variant="gradient" title="AI Features" hover>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <h3 style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  marginBottom: '8px' 
                }}>
                  🤖 Machine Learning
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '14px' 
                }}>
                  Advanced neural networks for pattern recognition
                </p>
              </div>
              
              <div>
                <h3 style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  marginBottom: '8px' 
                }}>
                  👁️ Computer Vision
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '14px' 
                }}>
                  Real-time object detection and tracking
                </p>
              </div>
              
              <div>
                <h3 style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  marginBottom: '8px' 
                }}>
                  🎯 Precision Control
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '14px' 
                }}>
                  Sub-millimeter accuracy in movements
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Example 5: Button Showcase */}
          <GlassCard variant="minimal" title="Button Variations">
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <GlassButton variant="primary" size="small">Small</GlassButton>
                <GlassButton variant="primary" size="medium">Medium</GlassButton>
                <GlassButton variant="primary" size="large">Large</GlassButton>
              </div>
              
              <GlassButton variant="primary" fullWidth>Primary Action</GlassButton>
              <GlassButton variant="secondary" fullWidth>Secondary Action</GlassButton>
              <GlassButton variant="success" fullWidth>Success Action</GlassButton>
              <GlassButton variant="danger" fullWidth>Danger Action</GlassButton>
              <GlassButton variant="primary" fullWidth disabled>Disabled Button</GlassButton>
            </div>
          </GlassCard>

          {/* Example 6: Custom Content Card */}
          <GlassCard 
            variant="neumorphic" 
            hover
            blur={8}
            padding="30px"
            borderRadius="24px"
          >
            <h2 style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              Custom Styled Card
            </h2>
            
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              marginBottom: '20px',
            }}>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '14px',
                lineHeight: '1.6',
              }}>
                This card demonstrates custom blur, padding, and border radius props. 
                You can easily customize any glass component to match your design system.
              </p>
            </div>
            
            <GlassStatGroup gap="10px">
              <GlassStat value="100%" label="Customizable" />
              <GlassStat value="0ms" label="Lag" />
            </GlassStatGroup>
          </GlassCard>

        </div>

        {/* Notifications */}
        {showNotification && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out',
          }}>
            <GlassNotification
              type="success"
              title="Success!"
              message="Your subscription has been confirmed."
              onClose={() => setShowNotification(false)}
            />
          </div>
        )}

        {/* Input Examples */}
        <GlassCard variant="dark" title="Form Elements">
          <div style={{ display: 'grid', gap: '20px' }}>
            <GlassInput
              label="Username"
              placeholder="Enter your username"
              size="medium"
            />
            
            <GlassInput
              label="Email with Error"
              type="email"
              placeholder="your@email.com"
              error="Please enter a valid email address"
              size="medium"
            />
            
            <GlassInput
              label="Large Input"
              placeholder="This is a large input field"
              size="large"
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <GlassInput
                placeholder="First Name"
                size="small"
              />
              <GlassInput
                placeholder="Last Name"
                size="small"
              />
            </div>
          </div>
        </GlassCard>

        {/* Code Example */}
        <GlassCard variant="dark" title="Quick Start Code" style={{ gridColumn: '1 / -1' }}>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            lineHeight: '1.5',
          }}>
{`import { GlassCard, GlassButton } from './GlassComponents';

function MyComponent() {
  return (
    <GlassCard variant="frosted" hover>
      <h2>Hello Glass!</h2>
      <GlassButton variant="primary">
        Click Me
      </GlassButton>
    </GlassCard>
  );
}`}
          </pre>
        </GlassCard>

      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </GlassContainer>
  );
};

export default App;
