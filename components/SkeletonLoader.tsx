interface SkeletonLoaderProps {
  variant?: 'dashboard' | 'form' | 'page' | 'card'
  className?: string
}

export default function SkeletonLoader({ variant = 'page', className = '' }: SkeletonLoaderProps) {
  if (variant === 'dashboard') {
    return (
      <div className={`skeleton-container ${className}`}>
        <div className="dashboard-container">
          {/* Header skeleton */}
          <div className="dashboard-header">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
          </div>

          {/* Stats grid skeleton */}
          <div className="stats-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-stat-card">
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-number"></div>
                <div className="skeleton skeleton-label"></div>
              </div>
            ))}
          </div>

          {/* Cards skeleton */}
          <div className="skeleton-card">
            <div className="skeleton skeleton-card-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className={`skeleton-container ${className}`}>
        <div className="waitlist-container">
          {/* Hero section skeleton */}
          <div className="waitlist-hero">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
            <div className="skeleton skeleton-count"></div>
          </div>

          {/* Form skeleton */}
          <div className="skeleton-form">
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`skeleton-container ${className}`}>
        <div className="skeleton-card">
          <div className="skeleton skeleton-card-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    )
  }

  // Default page skeleton
  return (
    <div className={`skeleton-container ${className}`}>
      <div className="hero">
        <div className="hero-content">
          <div className="skeleton skeleton-hero-title"></div>
          <div className="skeleton skeleton-hero-subtitle"></div>
          <div className="skeleton skeleton-hero-description"></div>
          <div className="skeleton-buttons">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
