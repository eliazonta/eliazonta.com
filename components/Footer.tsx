export function Footer() {
  return (
    <footer className="py-6 bg-black border-t border-gray-800">
      <div className="container mx-auto text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Elia Zonta
      </div>
    </footer>
  );
}
