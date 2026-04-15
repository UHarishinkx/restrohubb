const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h1>
    <p className="text-muted-foreground font-body">This section is coming soon.</p>
  </div>
);

export default PlaceholderPage;
