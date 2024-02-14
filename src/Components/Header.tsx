type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header className="relative flex items-center h-80">
      <img
        src="/svenskaSkogen.png"
        alt="Logo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <h1 className="absolute z-10 text-2xl font-bold text-white m-4">
        {" "}
        {/* Justera margin efter behov */}
        {title}
      </h1>
    </header>
  );
}
