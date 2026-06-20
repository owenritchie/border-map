export default function Logo({ size = 'large' }) {
  return (
    <h1 className={`logo logo--${size}`}>
      <span className="logo__border">Border</span>{' '}
      <span className="logo__map">Map</span>
    </h1>
  )
}
