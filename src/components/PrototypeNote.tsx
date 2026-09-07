export default function PrototypeNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="prototype-note">
      <strong>Muestra:</strong> {children}
    </p>
  );
}
