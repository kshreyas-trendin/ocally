# Glass Components for React 🪟

Beautiful, customizable glassmorphism React components that you can drop directly into your product. Zero dependencies, TypeScript support, and multiple styling options.

![Glass Components Preview](preview.png)

## Features ✨

- 🎨 **6 Glass Variants**: Light, Dark, Frosted, Gradient, Neumorphic, Minimal
- 📦 **11 Components**: Cards, Buttons, Inputs, Stats, Notifications, and more
- 🎯 **TypeScript Support**: Full type definitions included
- 💅 **Multiple Styling Options**: CSS-in-JS, Styled Components, or plain CSS
- 🚀 **Zero Dependencies**: Uses only React (styled-components version optional)
- 📱 **Responsive**: Works on all screen sizes
- ⚡ **Performance Optimized**: Hardware-accelerated CSS effects
- 🎭 **Customizable**: Easily adjust blur, opacity, colors, and more

## Quick Start 🚀

### Installation

Simply copy the component file you need into your project:

```bash
# For TypeScript projects
cp GlassComponents.tsx your-project/src/components/

# For JavaScript projects
cp GlassComponents.jsx your-project/src/components/

# For styled-components users
cp GlassComponentsStyled.tsx your-project/src/components/
```

### Basic Usage

```jsx
import { GlassCard, GlassButton } from './components/GlassComponents';

function App() {
  return (
    <GlassCard variant="frosted" hover>
      <h2>Welcome to Glass UI</h2>
      <p>Beautiful glassmorphism effects for modern web apps</p>
      <GlassButton variant="primary" onClick={() => alert('Clicked!')}>
        Get Started
      </GlassButton>
    </GlassCard>
  );
}
```

## Components 📦

### 1. GlassCard

The main container component with glass effect.

```jsx
<GlassCard 
  variant="frosted"     // 'light' | 'dark' | 'frosted' | 'gradient' | 'neumorphic' | 'minimal'
  hover={true}          // Enable hover effects
  title="Card Title"    // Optional title with border
  blur={10}            // Backdrop blur amount (px)
  opacity={0.1}        // Background opacity
  padding="40px"       // Custom padding
  borderRadius="20px"  // Custom border radius
>
  {/* Your content here */}
</GlassCard>
```

### 2. GlassButton

Interactive button with glass effect.

```jsx
<GlassButton 
  variant="primary"    // 'primary' | 'secondary' | 'danger' | 'success'
  size="medium"        // 'small' | 'medium' | 'large'
  fullWidth={false}    // Take full container width
  disabled={false}     // Disabled state
  onClick={() => {}}   // Click handler
>
  Click Me
</GlassButton>
```

### 3. GlassInput

Form input with glass effect.

```jsx
<GlassInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  size="medium"        // 'small' | 'medium' | 'large'
  error="Invalid email" // Error message
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### 4. GlassStat & GlassStatGroup

Display statistics with glass styling.

```jsx
<GlassStatGroup gap="20px">
  <GlassStat value="2.4K" label="Users" />
  <GlassStat value="89%" label="Growth" />
  <GlassStat value="$12K" label="Revenue" />
</GlassStatGroup>
```

### 5. GlassFeature

Feature display component.

```jsx
<GlassFeature 
  title="AI Powered" 
  description="Advanced machine learning algorithms" 
/>
```

### 6. GlassNotification

Toast/notification component.

```jsx
<GlassNotification
  type="success"         // 'info' | 'success' | 'warning' | 'error'
  title="Success!"
  message="Your changes have been saved."
  onClose={() => {}}    // Optional close handler
/>
```

### 7. GlassContainer

Full-page container with animated background particles.

```jsx
<GlassContainer 
  particleCount={20}
  backgroundImage="url(...)"  // Optional background image
  backgroundStyle={{}}         // Custom background styles
>
  {/* Your app content */}
</GlassContainer>
```

### 8. RobotSpecsCard

Pre-built example card matching the original design.

```jsx
<RobotSpecsCard hover={true} />
```

## Glass Variants 🎨

### Light (Default)
```jsx
<GlassCard variant="light">
  Clean and subtle glass effect
</GlassCard>
```

### Dark
```jsx
<GlassCard variant="dark">
  Dark glass with higher contrast
</GlassCard>
```

### Frosted
```jsx
<GlassCard variant="frosted">
  Heavy blur with saturation boost
</GlassCard>
```

### Gradient
```jsx
<GlassCard variant="gradient">
  Colorful gradient glass effect
</GlassCard>
```

### Neumorphic
```jsx
<GlassCard variant="neumorphic">
  Soft 3D appearance with subtle shadows
</GlassCard>
```

### Minimal
```jsx
<GlassCard variant="minimal">
  Ultra-light glass with minimal blur
</GlassCard>
```

## Customization 🎨

### Custom Styling

All components accept standard React style and className props:

```jsx
<GlassCard
  style={{ maxWidth: '500px', margin: '0 auto' }}
  className="my-custom-class"
>
  Content
</GlassCard>
```

### Custom Blur and Opacity

```jsx
<GlassCard
  blur={20}        // Stronger blur
  opacity={0.2}    // More opaque background
>
  Custom glass effect
</GlassCard>
```

### Theme Integration

The components use CSS custom properties that you can override:

```css
.glass-card {
  --glass-blur: 10px;
  --glass-opacity: 0.1;
  --glass-border-color: rgba(255, 255, 255, 0.2);
  --glass-text-color: rgba(255, 255, 255, 0.9);
}
```

## Complete Example 💻

```jsx
import React, { useState } from 'react';
import {
  GlassContainer,
  GlassCard,
  GlassButton,
  GlassInput,
  GlassNotification
} from './GlassComponents';

function App() {
  const [email, setEmail] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  };

  return (
    <GlassContainer particleCount={15}>
      <GlassCard variant="frosted" hover title="Newsletter">
        <form onSubmit={handleSubmit}>
          <GlassInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <GlassButton type="submit" variant="primary" fullWidth>
            Subscribe
          </GlassButton>
        </form>
      </GlassCard>

      {showNotif && (
        <div style={{ position: 'fixed', top: 20, right: 20 }}>
          <GlassNotification
            type="success"
            title="Subscribed!"
            message="Thanks for subscribing to our newsletter."
            onClose={() => setShowNotif(false)}
          />
        </div>
      )}
    </GlassContainer>
  );
}
```

## Browser Support 🌐

The glass effect uses `backdrop-filter` which is supported in:
- Chrome 76+
- Safari 9+
- Firefox 103+
- Edge 79+

For older browsers, the components gracefully fallback to semi-transparent backgrounds without blur.

## Performance Tips ⚡

1. **Limit Blur Radius**: Higher blur values (>20px) can impact performance
2. **Reduce Particle Count**: For GlassContainer, use fewer particles on mobile
3. **Avoid Overlapping**: Multiple overlapping glass elements can cause lag
4. **Use CSS Transform**: The components use transform for animations (hardware accelerated)

## File Versions 📁

- **GlassComponents.tsx** - TypeScript version with full type definitions
- **GlassComponents.jsx** - JavaScript version for non-TypeScript projects
- **GlassComponentsStyled.tsx** - Styled Components version
- **ExampleUsage.tsx** - Complete example showing all components

## CSS Properties Used 🎨

The glass effect is created using:

```css
.glass {
  /* Semi-transparent background */
  background: rgba(255, 255, 255, 0.1);
  
  /* The magic - backdrop blur */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* Border for definition */
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Shadows for depth */
  box-shadow: 
    0 8px 32px rgba(31, 38, 35, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  
  /* Smooth corners */
  border-radius: 20px;
}
```

## Contributing 🤝

Feel free to customize these components for your needs! If you create new variants or improvements, we'd love to see them.

## License 📄

These components are free to use in your projects. No attribution required (but appreciated!).

## Credits 👏

Created with ❤️ for the React community. Inspired by modern glassmorphism design trends.
