export default function VerifyPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-3xl bg-teal/15 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h1 className="font-heading font-900 text-2xl text-foreground mb-2">Перевірте вашу пошту</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ми надіслали вам посилання для входу. Натисніть на нього, щоб
          увійти до КазкоAI. Перевірте папку &ldquo;Спам&rdquo; якщо не знайдете листа.
        </p>
      </div>
    </div>
  );
}
