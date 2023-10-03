
const ThemeButton = ({ text }: { text: string }) => {
  return (
    <button className='bg-blue-800 text-golden font-bold rounded-xl hover:scale-105 duration-300 px-3.5 py-2.5'>
      {text.toUpperCase()}
    </button>
  );
};

export default ThemeButton;
