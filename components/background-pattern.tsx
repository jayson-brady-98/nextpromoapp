export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M20 20h20v20H20zM60 20h20v20H60zM100 20h20v20H100zM20 60h20v20H20zM60 60h20v20H60zM100 60h20v20H100z'/%3E%3Cpath d='M28 28h4v4h-4zM68 28h4v4h-4zM108 28h4v4h-4zM28 68h4v4h-4zM68 68h4v4h-4zM108 68h4v4h-4z'/%3E%3Cpath d='M24 24h12v12H24zM64 24h12v12H64zM104 24h12v12H104zM24 64h12v12H24zM64 64h12v12H64zM104 64h12v12H104z'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '120px 120px'
           }}
    />
    <div 
      className="absolute inset-0 bg-gradient-to-t from-[#fffaf0] via-[#fffaf0]/85 to-[#fffaf0]/65"
      style={{ mixBlendMode: 'multiply' }}
    />
  </div>
  )
}

