export default function AuthLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen">
            {children}
          </div>
        </body>
      </html>
    );
  }
  