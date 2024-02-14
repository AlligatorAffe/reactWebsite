type Props = {
  title: string;
  onClick: ()=> void;
};


export default function BlueButton({title}: Props){
  return(
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {title}
  </button>
)
}








