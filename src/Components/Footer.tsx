type Props = {
  title: string;
};

export default function Footer({ title }: Props) {
  return (
    <footer className="bg-zinc-300 rounded-md p-3">
      <h3 className="text-black text-center text-sm font-medium">{title}</h3>
    </footer>
  );
}
